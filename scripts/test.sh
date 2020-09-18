#!/bin/bash
echo "[INFO] Deployment started"
REPO_URL="YOUR_REPO_URL"
nvm install v12
cd ~/apps
cd test
if [ $? -eq 0 ]
then
  echo "[INFO] Repo exist"
  cd .git
  if [ $? -eq 0 ]
  then
    echo "[INFO] Git exist"
    cd ..
    git pull
  else
    echo "[INFO] Git does not exist, folder deleting and cloning from origin.."
    cd ..
    rm -rf test
    git clone $REPO_URL
    cd test
  fi
else
  echo "[INFO] Repo does not exist, cloning.."
  git clone $REPO_URL
  cd test
fi
echo "[INFO] Dependencies installing"
npm install
pm2 stop test
pm2 start ./bin/www --name test
echo "[INFO] Deployment successful, app running."
