#!/bin/bash

set -e

./decrypt.sh
source ./env/env.sh
unset AWS_SESSION_TOKEN

if [ "$LAMBCI_BRANCH" = "master" ]; then
  STAGE=prod
else
  STAGE=dev
fi

node_modules/.bin/serverless deploy --stage=$STAGE --verbose
