#!/bin/bash
IMAGENAME="projects.meerkats.com.au-nodebase"

echo "Building $IMAGENAME"
cp ../../package.json .
docker build -t $IMAGENAME --no-cache .
rc=$?;
rm package.json
if [[ $rc != 0 ]]; then
  echo "Build failed :("
  exit $rc;
fi
echo "Pushing $IMAGENAME"
docker tag -f $IMAGENAME registry.meerkats.com.au:5000/$IMAGENAME
docker push registry.meerkats.com.au:5000/$IMAGENAME
echo "Base image rebuilt and updated!"
