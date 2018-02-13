import requests
import json
from hesburgh import heslog, hesutil
import time

import argparse

# requires requests 2.9.1
# pip install 'requests==2.9.1'

TYPE_ENTRY="entries"
TYPE_CONTENT_TYPE="content_types"
TYPE_ASSET="assets"

LOC_US="en-US"

heslog.setLevels(heslog.LEVEL_INFO, heslog.LEVEL_WARN, heslog.LEVEL_ERROR)
timer = hesutil.Timer()

desiredDT = .015
def each(array):
  for a in array:
    shouldPublish = a.get("sys", {}).get("publishedVersion", -1) >= 0
    yield a, shouldPublish

    dt = timer.step(returnDTFromPrev=True)
    heslog.debug("dt: %s" % dt)
    if dt < desiredDT:
      time.sleep(desiredDT)


class Space(object):
  def __init__(self, spaceId, authToken):
    self.spaceId = spaceId
    self.baseUrl = "https://api.contentful.com/spaces/%s" % (spaceId)
    self.authHeader = "Bearer %s" % (authToken)

    self.postHeaders = {
      'Authorization': self.authHeader,
      'Content-Type': "application/vnd.contentful.management.v1+json",
    }

    self.getHeaders = {
      'Authorization': self.authHeader,
    }

    self._contentTypes = None
    self._entries = None
    self._assets = None

    self._assetMap = {}
    self._entryMap = {}


  def getAll(self):
    self.allContentTypes()
    self.allEntries()
    self.allAssets()


  def deleteDiff(self, other):
    self.getAll()
    other.getAll()

    # Helper to get and delete differences between data
    def _diff(compFn, otherData, localData, dataType):
      keep = []
      for o in otherData:
        for l in localData:
          if compFn(l, o):
            keep.append(l)
            localData.remove(l)
            break
      for l in localData:
        sys = l.get("sys", {})
        heslog.setContext({ "objId": sys.get("id") })
        if(sys.get("publishedVersion", -1) >= 0):
          self._publish(dataType, sys, unpublish=True)
        self._delete(dataType, sys)
      return keep

    self._contentTypes = _diff(lambda x, y: x.get("sys", {}).get("id") == y.get("sys", {}).get("id"),
      other.allContentTypes(), self._contentTypes, TYPE_CONTENT_TYPE)

    self._assets = _diff(lambda x, y: x.get("fields", {}).get("title") == y.get("fields", {}).get("title"),
      other.allAssets(), self._assets, TYPE_ASSET)

    self._entries = _diff(lambda x, y: x.get("fields", {}).get("url", {}).get(LOC_US, "") == y.get("fields", {}).get("url", {}).get(LOC_US, ""),
      other.allEntries(), self._entries, TYPE_ENTRY)

  def clone(self, other):
    self.deleteDiff(other)

    for ct, shouldPublish in each(other.allContentTypes()):
      fromId = ct.get("sys", {}).get("id")
      heslog.setContext({ "objType": "contentType", "fromId": fromId })
      self.createContentType(ct, shouldPublish)

    for asset, shouldPublish in each(other.allAssets()):
      fromId = asset.get("sys", {}).get("id")
      heslog.setContext({ "objType": "asset", "fromId": fromId })
      sys = self.createAsset(asset, shouldPublish)
      if sys is None:
        heslog.warn("asset %s invalid" % asset.get("sys", {}).get("id"))
        continue
      self._assetMap[fromId] = { "id": sys.get("id"), "version": sys.get("version") + 1 }

    # Helper to clone entries correctly
    def cloneEntries(entries, removeRelated):
      heslog.info("Cloning %s entries" % len(entries))
      skipped = []
      for entry, shouldPublish in each(entries):
        skip = False
        fromId = entry.get("sys", {}).get("id")
        heslog.setContext({ "objType": "entry", "fromId": fromId })
        fields = entry.get("fields", {})

        # check if we have all the information for this entry
        if not removeRelated:
          for related in fields.get("relatedPages", {}).get(LOC_US, []):
            if related.get("sys", {}).get("id") not in self._entryMap:
              skipped.append(entry)
              skip = True
          if skip:
            continue

          # link the related entries
          for related in fields.get("relatedPages", {}).get(LOC_US, []):
            entryId = related["sys"]["id"]
            related["sys"]["id"] = self._entryMap[entryId]
        else:
          heslog.info("Removing related fields from entry to prevent infinite loop")
          fields["relatedPages"] = { LOC_US: [] }

        # link asset to the one in new space
        if "image" in fields:
          assetId = fields["image"][LOC_US]["sys"]["id"]
          fields["image"][LOC_US]["sys"]["id"] = self._assetMap[assetId].get("id")

        sys = self.createEntry(entry, shouldPublish)
        if sys is None:
          heslog.warn("Entry %s invliad" % fromId)
        else:
          self._entryMap[fromId] = sys.get("id")
      return skipped

    # Get as many related pages as possible
    # if we have an x <-> y situation this would be an infinite loop
    skippedEntries = cloneEntries(other.allEntries(), False)
    cloneEntries(skippedEntries, True)

    # publish assets, hopefully they're processed by now
    for asset, shouldPublish in each(other.allAssets()):
      fromId = asset.get("sys", {}).get("id")
      toId = self._assetMap[fromId].get("id")
      heslog.setContext({ "fromId": fromId, "objId": toId })
      if shouldPublish:
        self._publish(TYPE_ASSET, { "id": toId, "version": self._assetMap[fromId].get("version", 2) })


  def _checkSys(self, responseObj, defaultVal = None):
    sys = responseObj.get("sys", {})
    sysType = sys.get("type", None)

    if sysType is None:
      heslog.error("No sys was found in response %s" % responseObj)
      return defaultVal

    if sysType == "Error":
      heslog.error(sys.get("id", ""))
      details = responseObj.get("details")
      if details is not None:
        heslog.error(details)
      return defaultVal

    return sys


  def _getAllType(self, objectType):
    start = 0
    total = 100

    items = []
    while start < total:
      url = self.baseUrl + ("/%s?skip=%s" % (objectType, start))
      response = requests.get(url, headers=self.getHeaders)
      responseObj = json.loads(response.text)

      if self._checkSys(responseObj) is None:
        return []

      start = responseObj.get("skip", 0) + responseObj.get("limit", 100)
      total = responseObj.get("total", 0)

      responseItems = responseObj.get("items", [])
      for item in responseItems:
        if item.get("sys", {}).get("archivedAt", None) is None:
          items.append(item)

    heslog.debug("got %s %s" % (len(items), objectType))

    return items


  def allContentTypes(self):
    if self._contentTypes is None:
      self._contentTypes = self._getAllType(TYPE_CONTENT_TYPE)

    return self._contentTypes


  def allAssets(self):
    if self._assets is None:
      self._assets = self._getAllType(TYPE_ASSET)

    return self._assets


  def allEntries(self):
    if self._entries is None:
      self._entries = self._getAllType(TYPE_ENTRY)

    return self._entries


  def _createOrUpdate(self, objectType, data, extraHeaders, defaultId=None, currentEntry=None, shouldPublish=False):
    action = "create"
    if currentEntry is not None:
      action = "update"

    heslog.info("Attempting to %s object" % action)

    headers = extraHeaders or {}

    url = self.baseUrl + ("/%s" % objectType)

    if currentEntry is not None:
      objId = currentEntry.get("id", defaultId)
    else:
      objId = defaultId

    heslog.addContext(objId=objId)

    verb="PUT"
    if objId is None:
      verb = "POST"
    else:
      url += "/%s" % objId

    if currentEntry is not None:
      headers.update({
        "X-Contentful-Version": currentEntry.get("version", 1)
      })

    headers.update(self.postHeaders)

    response = requests.request(verb, url, data=json.dumps(data), headers=headers)
    responseObj = json.loads(response.text)

    if self._checkSys(responseObj) is None:
      heslog.info("Failed to %s object" % action)
      return None

    sys = responseObj.get("sys", None)
    heslog.info("%sd Object %s" % (action, sys.get("id")))

    if shouldPublish:
      publishSys = self._publish(objectType, sys)
      if publishSys is not None:
        return publishSys

    return sys

  def deleteContent(self):
    for entry in (self.allEntries()):
      sys = entry.get("sys", {})
      if(sys.get("publishedVersion", -1) >= 0):
        self._publish(TYPE_ENTRY, sys, unpublish=True)
      self._delete(TYPE_ENTRY, sys)

  def _delete(self, objectType, entry):
    heslog.info("Deleting Object")
    if entry is None:
      heslog.error("No Entry")
      return False

    objId = entry.get("id")
    version = entry.get("version", 1)
    version = str(version)
    heslog.addContext(objId=objId)
    headers = {
      "X-Contentful-Version": version
    }

    url = self.baseUrl + ("/%s/%s" % (objectType, objId))
    headers.update(self.postHeaders)
    response = requests.delete(url, headers=headers)
    if response.text:
      responseObj = json.loads(response.text)
      return self._checkSys(responseObj)

    return True


  def getCurrentObject(self, objectType, constraints):
    url = self.baseUrl + "/%s" % objectType

    response = requests.get(url, headers=self.getHeaders, params=constraints)
    heslog.debug(response.url)
    responseObj = json.loads(response.text)

    self._checkSys(responseObj)

    items = responseObj.get("items", [])
    if len(items) > 0:
      sys = items[0].get("sys", {})
      heslog.debug("Found Entry")
      return sys
    return None


  def createContentType(self, obj, shouldPublish=False):
    name = obj.get("name")
    heslog.addContext(name=name)

    data = {
      "name": name,
      "displayField": obj.get("displayField"),
      "description": obj.get("description"),
      "fields": obj.get("fields", []),
    }

    defaultId = obj.get("sys", {}).get("id")

    constraints = {
      "name": name
    }
    currentEntry = self.getCurrentObject(TYPE_CONTENT_TYPE, constraints)

    return self._createOrUpdate(TYPE_CONTENT_TYPE, data, {}, defaultId, currentEntry, shouldPublish)


  def createEntry(self, item, shouldPublish=False):
    contentType = item.get("sys", {}).get("contentType", {}).get("sys", {}).get("id")
    if contentType is None:
      heslog.error("item has no specified contentType %s" % item)
      return None

    heslog.addContext(contentType=contentType)

    headers = {
      'x-contentful-content-type': contentType
    }

    data = { "fields": item.get("fields", {}) }

    # we're have to know what the unique field(s) are for each content type to do this search correctly
    constraints = { "fields.url": item.get("fields", {}).get("url", {}).get(LOC_US) }
    constraints["content_type"] = contentType
    currentEntry = self.getCurrentObject(TYPE_ENTRY, constraints)

    return self._createOrUpdate(TYPE_ENTRY, data, headers, None, currentEntry, shouldPublish)


  def createAsset(self, obj, shouldPublish=False):
    fields = obj.get("fields", {})
    file = fields.get("file", {}).get(LOC_US, None)
    if file is None:
      return None
    title = fields.get("title", {}).get(LOC_US)
    data = {
      "fields": {
        "file": {
          LOC_US: {
            "contentType": file.get("contentType"),
            "upload": file.get("url").replace("//", "http://"),
            "fileName": file.get("fileName"),
          }
        },
        "title": { LOC_US: title }
      }
    }

    currentEntry = None
    # we can't query for assets because "title" is type "Text" and thus we aparently can't use the `=` operator
    for a in self.allAssets():
      existingName = a.get("fields", {}).get("title", {}).get(LOC_US)
      if existingName == title:
        currentEntry = a.get("sys", {})
        break

    createdItem = self._createOrUpdate(TYPE_ASSET, data, {}, None, currentEntry, False)
    if createdItem is None:
      return None

    heslog.info("Processing Asset")
    url = self.baseUrl + "/%s/%s/files/en-US/process" % (TYPE_ASSET, createdItem.get("id"))
    headers = {
      'Authorization': self.authHeader,
      'X-Contentful-Version': createdItem.get("publishedVersion", 1)
    }
    response = requests.put(url, headers=headers)

    return createdItem


  def _publish(self, objectType, entry, unpublish=False):
    action = "Publishing"
    verb = "PUT"
    if unpublish:
      action = "Unpublishing"
      verb = "DELETE"

    heslog.info("%s object" % action)
    if entry is None:
      heslog.error("No Entry")
      return None
    version = entry.get("version", 1)
    version = str(version)
    url = self.baseUrl + "/%s/%s/published" % (objectType, entry.get("id"))

    headers = {
      "X-Contentful-Version": version
    }
    headers.update(self.postHeaders)

    response = requests.request(verb, url, headers=headers)
    responseObj = json.loads(response.text)

    if self._checkSys(responseObj) is None:
      heslog.info("Failed to publish object")
      return None

    sys = responseObj.get("sys", {})
    publishedVersion = sys.get("publishedVersion", None)
    if publishedVersion is not None:
      heslog.info("Published Version %s" % publishedVersion)
    return sys


def printSpace(space):
  heslog.addContext(space=space.spaceId)
  heslog.info("ContentTypes")
  print json.dumps(toSpace.allContentTypes(), indent=2)
  heslog.info("Assets")
  print json.dumps(toSpace.allAssets(), indent=2)
  heslog.info("Entries")
  print json.dumps(toSpace.allEntries(), indent=2)


if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument('--oauthToken', '-o', required=True,
    help="An OAUTH token for the account API")
# parser.add_argument('--fromSpace', '-f', required=True,
#   help="The space id to clone")
  parser.add_argument('--toSpace', '-t', required=True,
    help="The space id to clone into")

#   parser.add_argument('--deleteOnly', '-d', dest="deleteOnly", action="store_true",
#     help="Don't clone data, just delete the differences")
  parser.add_argument('--deleteContent', '-dc', dest="deleteContent", action="store_true",
    help="This will delete all the content from the 'toSpace'")
  parser.add_argument('--printToSpace', '-pt', dest="printToSpace", action="store_true",
    help="This will cause no clone to happen, but will print all data from the 'toSpace'")
#   parser.add_argument('--printFromSpace', '-pf', dest="printFromSpace", action="store_true",
#     help="This will cause no clone to happen, but will print all data from the 'fromSpace'")

  parser.add_argument('--debug', dest="debug", action="store_true")

  args = parser.parse_args()

  if args.debug:
    heslog.setLevels()

  printOnly = args.printToSpace# or args.printFromSpace

  timer.start()
# fromSpace = Space(args.fromSpace, args.oauthToken)
  toSpace = Space(args.toSpace, args.oauthToken)

  if printOnly:
    if args.printToSpace:
      printSpace(toSpace)
#   if args.printFromSpace:
#     printSpace(fromSpace)
# elif args.deleteOnly:
#   toSpace.deleteDiff(fromSpace)
  elif args.deleteContent:
      toSpace.deleteContent()
  else:
    print "...please specify a valid task"
    #toSpace.clone(fromSpace)

  totalTime = timer.end()
  heslog.info("Total time: %s Avg Time: %s" % (totalTime, timer.getAvgStep()))
