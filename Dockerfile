# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.29
FROM oven/bun:latest as base

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3


# Install node modules
COPY --link bun.lockb package.json ./

# Install node modules
RUN bun install 

# Copy the rest of the app
COPY --link bun.lockb . 