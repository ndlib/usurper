import urllib2
import json
import subprocess
import os
from hesburgh import heslog, hesutil
from datetime import datetime

scriptDir = os.path.dirname(__file__)
configParams = os.path.join(scriptDir, '../config/configParameters.js')
contentfulToken = subprocess.check_output(
  'node -e "const p = require(\'' + configParams + '\'); process.stdout.write(p.contentfulCdnToken)"',
  shell=True
)

token = "&access_token=%s" % contentfulToken
base = "https://cdn.contentful.com/spaces/%s" % hesutil.getEnv("SPACE", throw=True)
entryQuery = "/entries?select=%s&limit=200&content_type=%s"

now = datetime.now().strftime("%Y-%m-%d")
host = "https://library.nd.edu"

routeInfo = [
  {
    "route": "",
    "field": "fields.slug",
    "type": "page",
    "exclude": "fields.requiresLogin"
  },
  {
    "route": "/floor",
    "field": "fields.slug",
    "type": "floor",
  },
  {
    "route": "/news",
    "field": "fields.slug",
    "type": "news",
  },
  {
    "route": "/event",
    "field": "fields.slug",
    "type": "event",
  },
  {
    "route": "/database",
    "field": "sys.id",
    "type": "resource",
  },
]

# This should basically be the hard-coded routes in App/index.js
#  Excluding those that require login
staticRoutes = [
  '',
  '/about',
  '/chat',
  '/hours',
  '/events',
  '/news',
  '/libraries',
  '/subjects',
  '/research',
  '/services',
]

for char in "abcdefghijklmnopqrstuvwxyz#":
  staticRoutes.append('/databases/' + urllib2.quote(char))

routeCount = 0
skipped = 0

def query(url, contentType):
  have = 0
  total = 200
  data = None
  while have < total:
    req = urllib2.Request(url + token + '&skip=%s' % have)
    try:
      ret = urllib2.urlopen(req)
      data = json.loads(ret.read())

      total = data.get("total", 0)
      have += data.get("limit", 200)

      yield data
    except urllib2.HTTPError as e:
      heslog.error("%s" % e.code)
      heslog.error(e.read())
    except urllib2.URLError as e:
      heslog.error(e.reason)
  heslog.info("%s had %s entries" % (contentType, total))


def getField(entry, info):
  tmp = entry

  # Skip based on exclude data
  for f in info.get("exclude", "").split("."):
    tmp = tmp.get(f)
    if tmp is None:
      break
  if tmp:
    return None

  tmp = entry

  for f in info.get("field", "").split("."):
    tmp = tmp.get(f)
    if tmp is None:
      heslog.error("entry error on %s" % entry)
      return None
  return tmp


def writeRoute(file, route):
  global routeCount
  routeStr = '  <url>\n    <loc>%s%s</loc>\n    <lastmod>%s</lastmod>\n  </url>\n' % (host, route, now)
  file.write(routeStr)
  routeCount += 1


with open(os.path.join(scriptDir, '../public/sitemap.xml'), 'w') as f:
  f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
  for info in routeInfo:
    fieldIds = info.get("field")
    fieldIds += "," + info.get("exclude") if info.get("exclude") else ""
    url = base + entryQuery % (fieldIds, info.get("type"))

    for tmp in query(url, info.get("type")):
      for entry in tmp.get("items", []):
        slug = getField(entry, info)
        if slug is None:
          skipped += 1
        else:
          writeRoute(f, "%s/%s" % (info.get("route"), slug))

  for route in staticRoutes:
    writeRoute(f, route)
  f.write("</urlset>")

  heslog.info("Total Routes Written: %s Total Skipped: %s" % (routeCount, skipped))
