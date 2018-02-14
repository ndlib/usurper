# Clone Contentful Space
## Introduction
The basic gist here is that you want to copy the content from one Contentful space to
another.

Here are the steps:
 1. export data from a desired space
 2. delete content from dev space
 3. import the exported data from step one into the content-empty dev space
 
If you wanted to be cautious you could export the data from the dev space prior
deleting all its content for a rollback option.

IMPORTANT:  the export space and import space must have identical content models.
Otherwise the import/export process will not work.

## Setup
First we need to install the import/export from Contentful via npm.
 1. npm install -g contentful-import
 2. npm install -g contentful-export
 
Next you'll need to checkout usuper for the python script which is responsible for
deleting all content from the development space.  For this you'll need python 2.7 and
the 'requests' module(install via pip).
 1. usuper/scripts/contentful.py

Also inside this directory are two configuration files for the import/export process.
 1. usuper/scripts/clone-import.json
 2. usuper/scripts/clone-export.json

## Executing the process
IN A TERMINAL WINDOW:
 1. cd <usuper dir>/scripts/
 2. contentful-export --space-id <space1> --management-token <token> --config clone-export.json
 3. python contentful.py --toSpace <space2> --oauthToken <token> --deleteContent
 4. contentful-import --space-id <space2> --management-token <token> --config clone-import.json

## Helpful links
1. CONTENFTFUL PROJECTS
 [contentful-import](https://github.com/contentful/contentful-import)
 [contentful-export](https://github.com/contentful/contentful-export)

2. CONTENTFLUL API
 [contentful api](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/)
 
