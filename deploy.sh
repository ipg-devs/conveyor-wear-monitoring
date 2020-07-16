#! /bin/bash
currentDate=$(date +'%d/%m/%Y')
echo $currentDate

# clean deployment directory
rm -rf deploy; echo "Deleting existing folder"
mkdir deploy; echo "Making new folder"

# copy app into deploy

echo "copy common files"
cp -r app/bin deploy
cp app/package.json deploy
cp app/Procfile deploy
echo "DONE"

# copy worker into deploy dir
echo "copy worker"
mkdir deploy/worker;
cp ./worker/index.js deploy/worker; cp ./worker/saveMessage.js deploy/worker;
echo "DONE"

# build server app and move to deploy folder
echo "build server app"
mkdir deploy/server
cd server;
npm run build;
mv server ../deploy;
cd ..
echo "DONE: Build Server"

# build client and move output to server folder
echo "build client"
cd client;
npm run build;
mv build ../deploy/server/public
cd ..;
echo "DONE: build client"

# echo "finish deploy"
# cd deploy;
# git init;
# git add .;git commit -m 'deployment $currentDate';

# git remote add origin https://github.com/ipg-devs/conveyor-wear-monitoring.git;

# git push origin master:release --force;

