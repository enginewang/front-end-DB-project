#!/usr/bin/env sh
set -e

yarn build

cd dist

# git init
git add -A
git commit -m 'deploy'

# 部署到 https://enginewang.github.io/front-end-DB-project  https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:enginewang/front-end-DB-project.git master:gh-pages

cd -