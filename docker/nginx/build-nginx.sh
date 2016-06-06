#!/bin/bash
IMAGENAME="projects.meerkats.com.au-nginx"

if [ $# -ne 1 ]; then
  echo "No environment supplied.  Valid options are live or staging"
  exit 1;
fi
if [ $1 == "staging" ]; then
  LATESTTAG="staging"
  MODE="staging"
elif [ $1 == "live" ]; then
  LATESTTAG="latest"
  MODE="live"
else
  echo "Environment invalid.  Valid optons are live or staging"
  exit 1
fi

echo "Building $IMAGENAME:$TAG under the $MODE environment."
cp $MODE.conf default.conf
docker build -t $IMAGENAME:$TAG .
rc=$?;
# Clean up work files
rm default.conf
if [[ $rc != 0 ]]; then
  echo "Build failed :("
  exit $rc;
fi
echo "Pushing $IMAGENAME:$TAG"
docker tag -f $IMAGENAME:$TAG registry.meerkats.com.au:5000/$IMAGENAME:$TAG
docker tag -f $IMAGENAME:$TAG registry.meerkats.com.au:5000/$IMAGENAME:$LATESTTAG
docker push registry.meerkats.com.au:5000/$IMAGENAME:$TAG
docker push registry.meerkats.com.au:5000/$IMAGENAME:$LATESTTAG
cat <<EOM
$IMAGENAME:$TAG image built and pushed to docker registry:
registry.meerkats.com.au:5000/$IMAGENAME:$LATESTTAG
Containers need to be refreshed.
EOM
