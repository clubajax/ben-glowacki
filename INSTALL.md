# Installation and Troubleshooting

## Windows Installation

### GitBash

This project currently uses GIT for its repo. The first thing needed is GIT tools:

[Git Bash & Git GUI](https://git-scm.com/download/win)

This will also install Node and NPM.

Next, open GitBash. For the next step it is important to open it with full permissions by right-clicking on the
shortcut and choosing _**Run as Administrator**_.

GitBash comes with a recent version of Node, but an old version of NPM (Node Package Manager). There are also times
when it doesn't install either one. So regardless, install the latest stable version of Node and NPM from here:

    [https://nodejs.org/en/](https://nodejs.org/en/)

### Node & NPM

You can ensure Node and NPM are installed by typing:

    node -v
    npm -v

#### Automated Upgrade

If you have _npm < 3_ or _node < 4_ you need to upgrade. There is a very promising tool to do this with Windows:

    https://github.com/felixrieseberg/npm-windows-upgrade

#### Manual Upgrade

If you are still seeing a version of NPM that is less than v3.0, you have to adjust the PATH. Specifically, the NPM
path needs to come after the Node path. Also note that there is a limit to the length of your PATH string. If it's too
long, try inserting this near the beginning.

For example, this is at the end of my PATH:

    C:\Program Files\nodejs\;C:\Users\{USER}\AppData\Roaming\NPM

A troubleshooting tip if `npm -v` fails is to try the full path and see if it's even in that folder. It may be missing.

    C:\Users\{USER}\AppData\Roaming\npm -v

Sometimes this fixes a bad installation:

       npm install -g npm@latest

For more, random, Windows issues:

    https://github.com/npm/npm/wiki/Troubleshooting#upgrading-on-windows

### Grunt

Next, you should install the task manager tool, [Grunt](http://gruntjs.com/):

    npm install -g grunt-cli

The `-g` switch installs it globally so it can be used in this or any other project.

Ensure that grunt is installed by typing:

    grunt

If this fails, you'll need to do some investigation that is unique to your system. Sometimes reopening the Bash shell
works, sometimes the system PATH needs to be modified. More suggestions and specifics can be found here:

    http://stackoverflow.com/questions/19135561/grunt-on-windows-8-grunt-is-not-recognized

### Bower

Next, you will need [Bower](http://bower.io/) for this project:

    npm install -g bower

Then navigate to the folder where you keep your projects, like for example:

    $ cd C:\sites\

Note that Bash allows for forward slashes. Then you can install the project:

    $ git clone http://CinGitLab01/UI/components.git

This will install into `C:\sites\components`.

## General Issues

If bower or NPM gives cryptic errors, try running Git Bash "As Administrator"

If while running bower or npm you get an error like _exit code of #128 fatal: unable to connect to github.com_, that could
be because you have a blocked port. If you are behind a firewall, which filters out a git port (9418/tcp), you may want
to rewrite URLs to use "https:"  instead of "git:". One way to do it is to rewrite URLs globally for a specific host:

    git config --global url."https://github.com/".insteadOf git://github.com/

You can rewrite it for all servers:

    git config --global url."https://".insteadOf git://

But make sure that all servers you use support "https:" transport properly.
