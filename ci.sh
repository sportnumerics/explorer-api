#!/bin/bash

set -e

yarn

yarn test

./deploy.sh