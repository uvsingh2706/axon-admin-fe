#!/bin/bash
set -e

APP_DIR="/home/antino/axon-ev-admin-fe"
BRANCH="development"

cd "$APP_DIR"

echo "Deploying Axon frontend from branch: $BRANCH"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

docker compose down
docker compose up -d --build

