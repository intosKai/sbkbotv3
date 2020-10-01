#!/usr/bin/env bash
set -e

IMAGE="intoskai/sbkbotv3"
VERSION=$(git describe --always --abbrev --tags --long)

docker build . -t ${IMAGE}:${VERSION}
docker tag ${IMAGE}:${VERSION} ${IMAGE}:latest