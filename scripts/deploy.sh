#!/usr/bin/env bash
set -e

IMAGE="intoskai/sbkbotv3"
VERSION=$(git describe --always --abbrev --tags --long)

docker build . -t ${IMAGE}:${VERSION}
docker tag ${IMAGE}:${VERSION} ${IMAGE}:latest

echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
docker push ${IMAGE}:${VERSION}