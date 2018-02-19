#!/bin/bash

set -e

./decrypt.sh
source ./env/env.sh
unset AWS_SESSION_TOKEN

if [ "$LAMBCI_BRANCH" = "master" ]; then
  pip install --user awscli
  CDN_STACK_REGION="ap-southeast-2"
  CDN_STACK_NAME="sportnumerics-explorer-cdn-prod"
  ACTIVE_DEPLOYMENT=$(aws --region $CD_STACK_REGION cloudformation describe-stacks --stack-name $CDN_STACK_NAME --query 'Stacks[0].Outputs[?OutputKey==`ExplorerStageDeployment`].OutputValue' --output text)
  if [ "$ACTIVE_DEPLOYMENT" = "prodgreen" ]; then
    STAGE="prodblue"
  else
    STAGE="prodgreen"
  fi
else
  STAGE=dev
fi

node_modules/.bin/serverless deploy --stage=$STAGE --verbose
