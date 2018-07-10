#!/bin/bash

set -e

touch $HOME/.profile

curl -o- -L https://yarnpkg.com/install.sh | bash

source ~/.profile

yarn

yarn test

./deploy.sh