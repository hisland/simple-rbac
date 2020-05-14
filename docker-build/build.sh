#!/bin/bash

cd /Users/hisland/Desktop/git-root/llmcxt-egg-vue2/


mkdir -p docker-build/llmcxt2-egg2-server

echo '1. Copy Files'
cp -r egg2-server/app docker-build/llmcxt2-egg2-server/
cp -r egg2-server/app.js docker-build/llmcxt2-egg2-server/
cp -r egg2-server/config docker-build/llmcxt2-egg2-server/
cp -r egg2-server/package.json docker-build/llmcxt2-egg2-server/
cp -r egg2-server/node_modules docker-build/llmcxt2-egg2-server/


echo '2. Build'
cd docker-build
docker build --rm -t llmcxt2:v2.7 .

echo '3. Clean'
cd ..
rm -rf docker-build/llmcxt2-egg2-server
