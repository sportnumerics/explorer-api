#!/bin/bash

set -e

if [ "$LAMBCI_BRANCH" = "master" ]; then
  ACTIVE_DEPLOYMENT=$(./node_modules/.bin/explorer-cdn describe-active-stage)
  if [ "$ACTIVE_DEPLOYMENT" = "prodgreen" ]; then
    STAGE="prodblue"
  else
    STAGE="prodgreen"
  fi
else
  STAGE=dev
fi

node_modules/.bin/serverless deploy --stage=$STAGE --verbose

# TODO - add cache invalidation here.
