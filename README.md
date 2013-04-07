# Chess Scouter

> WHAT THAT CAN'T BE RIGHT CHECK THE SCOUTER AGAIN

## Development

### Setup

You must have [node](http://nodejs.org/) installed. The latest version is node v0.10 but it breaks
things. If things are broken for you, use [n](https://npmjs.org/package/n) to back up to node 0.8.

After you have node installed, you need [Bower](http://twitter.github.io/bower/) and [Grunt](http://gruntjs.com/):

````
$ npm install -g bower grunt-cli
````

Next, install the dev dependencies with npm:

```
$ npm install
```

This pulls down the tools needed to run and develop ChessScouter locally.

After that is done, install the front end dependencies with bower:

````
$ bower install
````

(Don't worry, all of these install steps are just copying files from the internets to directories in your 
current one - node_modules and components. Uninstalling is as simple as deleting those directories.)

Now you are ready to launch the server.

### Hackz

Run the server:

````
$ grunt server
````

That will file up a node server, open a browser pointing to it, and set up live reload. If you edit a file, the page will automatically refresh. Woo!

### Git workflow

While we're at it, here is a simple git workflow. It assumes that everyone has their own fork of the repo,
and Andre's is the canonical one.

````
# See what remotes we have
# Andre is the canonical repo; my fork is my place to do whatever I want
$ git remote -v
andre git://github.com/CaptainStack/ChessScouter.git (fetch)
andre git://github.com/CaptainStack/ChessScouter.git (push)
origin  https://github.com/NickHeiner/ChessScouter.git (fetch)
origin  https://github.com/NickHeiner/ChessScouter.git (push)

# Start on master
$ git branch
* master  

# Pull the latest changes from the canonical repo
$ git pull andre master
everything up-to-date

# Make a new branch for whatever changes you want to make
$ git checkout -b adding-undo-feature
Switched to a new branch 'adding-undo-feature'

# Make some changes in your text editor of choice; verify that they work

# Add the files you changed
$ git add app/scripts/app.js

# Commit your changes
$ git commit -m "Adding ability to undo a move"

# Push your changes back to *your* fork
$ git push origin adding-undo-feature
````

Now you have pushed your branch with your changes to your fork.
Go to github.com and open up a pull request. When it is ready, Andre will merge it in to his repo,
and the next time people start this workflow with `git pull andre master`, your changes will be included.
