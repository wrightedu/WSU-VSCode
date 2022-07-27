# Publication setup and configuration

## Install Node.js, `npm`, and `vcse`

Node.js and `npm` are required to build vscode extensions using the `vsce` tool. Because of the difficulties in installing these a singularity container build file is provided `node_vscode_ext.build`.

## Build the extension

Once `vsce` is installed or the container is ready, the vscode `.vsix` extension package can be built.
[This guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) provides a better understanding of the following TL/DR.

1. Update the version number in `package.json`
2. Add a section in `wsu-vscode/README.md` documenting the changes for the new version
3. Change directory in your terminal to the `wsu-vscode` subdirectory
4. Run `vsce package`. This should create a file called `wsu-cse-x.x.x.vsix` in the current directory.

## Publish the extension

1. Commit the new version to GitHub, merge the changes to master, and create a new release.
2. Go to the [extension management page](https://marketplace.visualstudio.com/manage/publishers/wrightstateuniversity-computerscience) and click on the three dots next to the WSU CSE extension on the table. This will open up a menu.
3. Select the `Update` option from the menu and upload the new `.vsix` file.

There is an alternative way to publish the extension completely from the command line using vsce and a personal access token, but it requires a bit more setup. Eventually, a GitHub action should be set up so that whenever a new release is made it will automatically publish the extension.
