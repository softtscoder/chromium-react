FROM node:10.20

# Set working directory and copy project files
WORKDIR /opt/tracker
COPY . .

# Build project
RUN yarn install
RUN yarn build-core

# Launch project
EXPOSE 1340
ENTRYPOINT node ./dist/neotracker-core/bin/neotracker