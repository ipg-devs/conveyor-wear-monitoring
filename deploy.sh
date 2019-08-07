#! /bin/bash
currentDate=`date`

# clean deployment directory
rm -rf deploy; echo "Deleting existing folder"
mkdir deploy; echo "Making new folder"

# copy app into deploy
cp -r app/bin deploy
cp -r app/scripts deploy
cp app/package.json deploy
cp app/Procfile deploy
cp app/release.sh deploy

# copy worker into deploy dir
mkdir deploy/worker;
cp ./worker/index.js deploy/worker; cp ./worker/saveMessage.js deploy/worker;

# build server app and move to deploy folder
mkdir deploy/server
cd server;
npm run build;
mv server ../deploy;
cd ..

# build client and move output to server folder
cd client;
npm run build;
cd ..;

cd deploy;
git init;
git add .;git commit -m 'deployment $currentDate';

git remote add origin git@github.com:ipg-devs/conveyor-wear-monitoring.git;

git push origin master:release --force;

