#!/bin/bash

set -e

./decrypt.sh
source ./env/env.sh
unset AWS_SESSION_TOKEN

if [ "$LAMBCI_BRANCH" = "master" ]; then
  pip install --user awscli
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
