// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const sys = require('child_process');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "wsu-vscode" is now active!');


	// Runs 'make' on the current project
	let makeProject = vscode.commands.registerCommand('wsuvscode.makeProject', () => {
		sys.exec('bash -c make > make.log', {cwd: vscode.workspace.rootPath}, (e, stdout, stderr) => {
			if(e) {
				vscode.window.showInformationMessage("Make failed. See make.log for more details");
			}

			else {
				vscode.window.showInformationMessage("Make succesful");
			}
		});

		
	})

	// Profile compiled programs
	let profileProject = vscode.commands.registerCommand('wsuvscode.profileProject', () => {

		
		// Get a list of all files with no file extension in the project tree
		//	This should detect all compiled linux programs, but also things like makefiles
		// TODO Would it be possible to ectract information from the makefiles to 
		// TODO detect what the filename of the compiled binaries would be
		vscode.workspace.findFiles("**/*", "**/*.*").then((files) => {

			// Create an array to hold filtered and processed filenames
			let processedFiles = []

			// And a regex to check if 
			let checkIsMakefile = /makefile$/;

			// Filter out all makefiles and convert the absolute paths to relative paths
			files.forEach((i) => {
				if(!checkIsMakefile.test(i))
					// TODO This is really a kinda hack-ey way to make it a realtive path.
					processedFiles.push('./' + i.path.substr(vscode.workspace.rootPath.length + 1));
			});

			// Allow the user to select which of the detected files should be profiled
			vscode.window.showQuickPick(processedFiles).then((program) => {
				// Let the user know that the profiler is running
				vscode.window.showInformationMessage("Profiling " + program);

				// ... And then ectually run the profiler
				sys.exec('bash -c "valgrind --tool=callgrind ' + program + '"', {cwd: vscode.workspace.rootPath}, (e, stdout, stderr) => {
					
					// If an error occured, display everything that popped up in sterr to the user
					if(e) {
						vscode.window.showInformationMessage("Error: " + stderr);
					}

					// If no error occured, then we can consider the profiuling to be done
					//  So notify the user of this fact
					else {
						vscode.window.showInformationMessage("Done profiling");
					}
				});
			});
		});
	})

	context.subscriptions.push(makeProject);
	context.subscriptions.push(profileProject);
	// context
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}


module.exports = {
	activate,
	deactivate
}
