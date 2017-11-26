# Hugo Ehiogu

A playground for developing a pattern library and website using Hugo static site generator

## Installing

To get started you need to install:
- gulp globally
- hugo globally
- run npm-install at root

## Hugo first install

1. Move the content of app to a sub-folder for now
2. Follow the hugo quickstart guide, installing hugo into a sub-folder off 'app'
3. Move content from your sub-folder into 'app', allowing OS to overwrite

## Run Hugo website

1. In /app run 'hugo server'
2. At root run 'gulp'

## Updating Patterns

When you want to make an update to patterns from Hugo you must:

1. Delete Hugo's Public folder (TODO: Gulp runner)
2. In /app run 'hugo'. This re-builds the public folder
3. In root run 'gulp copy'. This copies all components and static assets into the patterns directory

## Running Patterns

1. At root run the 'gulp copy' command to pull across assets from HUGO
2. Run 'gulp patterns' to deliver pattern library
