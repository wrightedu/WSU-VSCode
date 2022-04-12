# Publication setup and configuration

## Install npm and node js

Node.js and npm are required to build vscode extensions, so get them installed. Unfortunately node version 14 or newer which isn't in the ubuntu or pop default repos, so you'll have to add it to your sources list.

1. For safety, make sure that there are no pre-existing installs of node.js or npm by running `sudo apt purge nodejs npm nodejs-*`
2. Update the package index with `sudo apt update`
3. Add the node.js 14 repository to your sources list by running `curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -`
4. Update the package index again with `sudo apt update`
5. Install node.js and npm with `sudo apt install nodejs`
6. Verify that node.js is installed and has the proper version by running `node -v`. It should print that it is version 14.x.x.

## Install vsce

vsce is the build tool used by vscode to publish and build the extensions.

1. Install vsce with `sudo npm install -g vsce`

## Build the extension

Once vsce is installed, the package is ready to be built

1. Update the version number in `package.json`
2. Add a section in `wsu-vscode/README.md` documenting the changes for the new version
3. Change directory in your terminal to the `wsu-vscode` subdirectory
4. Run `vsce package`. This should create a file called `wsu-cse-x.x.x.vsix` in the current directory.

## Publish the extension

1. Commit the new version to GitHub, merge the changes to master, and create a new release.
2. Go to the [extension management page](https://marketplace.visualstudio.com/manage/publishers/wrightstateuniversity-computerscience) and click on the three dots next to the WSU CSE extension on the table. This will open up a menu.
3. Select the `Update` option from the menu and upload the new `.vsix` file.

There is an alternative way to publish the extension completely from the command line using vsce and a personal access token, but it requires a bit more setup. Eventually I'll try and get a GitHub action set up so that whenever a new release is made it will automatically publish the extension.
