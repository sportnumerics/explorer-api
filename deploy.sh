#!/bin/bash

set -e

./decrypt.sh
source ./env/env.sh
unset AWS_SESSION_TOKEN

if [ "$LAMBCI_BRANCH" = "master" ]; then
  pip install --user awscli
  STACK_PREFIX="sportnumerics-explorer-api"
  STAGE="prod-green"
  if aws cloudformation describe-stacks --stack-name "$STACK_PREFIX-$STAGE"; then
    STAGE="prod-blue"
  fi
else
  STAGE=dev
fi

node_modules/.bin/serverless deploy --stage=$STAGE --verbose
