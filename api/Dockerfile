FROM node:15-alpine
RUN apk --no-cache add git openssh-client

WORKDIR /usr/src
# Allow SSH connections to github (for installing package dependencies using git+ssh:// links)
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

COPY package.json .
COPY yarn.lock .

# Specify the yarn cache folder to use to avoid the recursive yarn install issue caused by dependencies with a 'prepare' script
# https://github.com/yarnpkg/yarn/issues/7212#issuecomment-506155894
RUN mkdir .yarncache
# Run yarn install, using the mounted ssh agent from the host machine
RUN --mount=type=ssh yarn install --frozen-lockfile --cache-folder=./.yarncache
RUN rm -rf .yarncache

COPY . .

EXPOSE 4000

CMD ["yarn", "build"]
