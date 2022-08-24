#!/bin/sh

diff -Nq package.json .package.json.last_installed || {
  npm install && \
  cp package.json .package.json.last_installed
}
