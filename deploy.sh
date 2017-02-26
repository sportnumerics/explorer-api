#!/bin/bash

set -e

./decrypt.sh
source ./env/env.sh
unset AWS_SESSION_TOKEN

STAGE=dev

node_modules/.bin/serverless deploy --stage=$STAGE --verbose
