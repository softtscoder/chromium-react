# DevOps

## Build 
For i.e.
```
cd ~/github/cronium-tracker/
git pull
docker-compose -f docker-stack.yml build
```

## Copy built image to the docker hub
```
# We built before image with name "docker tag cryptocean-cronium-tracker:latest" and rename it to the name of image in our "dockerhub.com/cronglobal" repository to name "cronium-tracker:latest"

docker tag cryptocean-cronium-tracker:latest cronglobal/cronium-tracker:latest
docker tag cryptocean-cronium-tracker:latest cronglobal/cronium-tracker:dev
```

## Setup name of docker image
`export DOCKER_IMAGE=cronglobal/cronium-tracker:latest`

## For load balancing we grow up 3 instances

### Run 1st Instance
```
cd /opt/cryptocean/cryptocean-cronium-tracker-proxy1/
export DOCKER_NAME=cryptocean-cronium-tracker.main
export TRACKER_PORT=1340:1340
export TRACKER_PATH=/opt/cryptocean/cryptocean-cronium-tracker-main/.neotrackerrc
docker-compose -f docker-stack.yml up -d
```
### Run 2nd Instance
```
cd /opt/cryptocean/cryptocean-cronium-tracker-proxy1/
export DOCKER_NAME=cryptocean-cronium-tracker.proxy-1
export TRACKER_PORT=1341:1340
export TRACKER_PATH=/opt/cryptocean/cryptocean-cronium-tracker-proxy1/.neotrackerrc
docker-compose -f docker-stack.yml up -d
```
### Run 3rd Instance
```
cd /opt/cryptocean/cryptocean-cronium-tracker-proxy2/
export DOCKER_NAME=cryptocean-cronium-tracker.proxy-2
export TRACKER_PORT=1342:1340
export TRACKER_PATH=/opt/cryptocean/cryptocean-cronium-tracker-proxy2/.neotrackerrc
docker-compose -f docker-stack.yml up -d
```

# Upload new build image to the dockerhub
```
docker push cronglobal/cronium-tracker:dev
docker push cronglobal/cronium-tracker:latest
```