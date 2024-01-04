#!/bin/sh
echo "Placing root files into dummy_app for testing"
mkdir -p tests/dummy_app/packages/meteor-mocha
rsync -av ./package/ tests/dummy_app/packages/meteor-mocha
cd tests/dummy_app/
# meteor npm install

# We expect all unit tests to pass
meteor npm run test:unit:puppeteer 2> /dev/null
echo "npm run test:unit:puppeteer exited with code $?"

if [ $? -ne 0 ]; then
  exit 1 # Our suite fails because tests that should have passed failed
fi

# We expect all app tests to fail
meteor npm run test:app:puppeteer 2> /dev/null
echo "npm run test:app:puppeteer exited with code $?"

if [ $? -ne 1 ]; then
  exit 1 # Our suite fails because tests that should have failed passed
fi

exit 0
