# Hugo Ehiogu

A playground for developing a pattern library and website using Hugo static site generator

## Installing

To get started you need to install:
- gulp globally
- hugo globally
- run npm-install at root

## Hugo first install

1. Move the content of /app to a sub-folder for now
2. Follow the hugo quickstart guide, installing hugo into a folder called 'app'
3. Move the content from your sub-folder into the 'app' folder, allowing overwriting on replaced files

## Run Hugo website (need)

1. In /app run 'hugo server -v'
2. In root run 'gulp'

## Running Patterns

Pattern copies core elements from the Hugo site and generates a style guide. To do this, run the following.

1. In root, run 'gulp build'. This builds all the needed files for patterns
2. In another tab, in root run 'gulp patterns'. This starts the pattern library server
3. At any point, run 'gulp build' in a separate tab to update patterns to the latest version. If this errors the server, just re-start it with 'gulp patterns' 
