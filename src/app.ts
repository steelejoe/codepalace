/**
 * This is the main app server
 */

import chalk from "chalk";
import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import express from "express";
import { CPLevelConfig } from '../dist/CPLevelConfig.js';
import { CPLevelDatabase } from '../dist/CPLevelDatabase.js';

/**
 * Handle command line options
 */
const optionDefinitions = [
    {
        name: "install",
        type: Boolean,
        description: "Install codepalace in the current folder",
    },
    {
        name: "start",
        type: Boolean,
        description:
            "Start visiting the codepalace installed in the current folder",
    },
    {
        name: "port",
        alias: "p",
        type: Number,
        defaultValue: 9999,
        description: "Define a new port for this codepalace",
    },
    {
        name: "help",
        alias: "h",
        type: Boolean,
        description: "Display this usage guide.",
    },
];
const options = commandLineArgs(optionDefinitions);
if (options.help) {
    const header = `
▄████▄   ▒█████  ▓█████▄ ▓█████  ██▓███   ▄▄▄       ██▓    ▄▄▄       ▄████▄  ▓█████ 
▒██▀ ▀█  ▒██▒  ██▒▒██▀ ██▌▓█   ▀ ▓██░  ██▒▒████▄    ▓██▒   ▒████▄    ▒██▀ ▀█  ▓█   ▀ 
▒▓█    ▄ ▒██░  ██▒░██   █▌▒███   ▓██░ ██▓▒▒██  ▀█▄  ▒██░   ▒██  ▀█▄  ▒▓█    ▄ ▒███   
▒▓▓▄ ▄██▒▒██   ██░░▓█▄   ▌▒▓█  ▄ ▒██▄█▓▒ ▒░██▄▄▄▄██ ▒██░   ░██▄▄▄▄██ ▒▓▓▄ ▄██▒▒▓█  ▄ 
▒ ▓███▀ ░░ ████▓▒░░▒████▓ ░▒████▒▒██▒ ░  ░ ▓█   ▓██▒░██████▒▓█   ▓██▒▒ ▓███▀ ░░▒████▒
░ ░▒ ▒  ░░ ▒░▒░▒░  ▒▒▓  ▒ ░░ ▒░ ░▒▓▒░ ░  ░ ▒▒   ▓▒█░░ ▒░▓  ░▒▒   ▓▒█░░ ░▒ ▒  ░░░ ▒░ ░
  ░  ▒     ░ ▒ ▒░  ░ ▒  ▒  ░ ░  ░░▒ ░       ▒   ▒▒ ░░ ░ ▒  ░ ▒   ▒▒ ░  ░  ▒    ░ ░  ░
░        ░ ░ ░ ▒   ░ ░  ░    ░   ░░         ░   ▒     ░ ░    ░   ▒   ░           ░   
░ ░          ░ ░     ░       ░  ░               ░  ░    ░  ░     ░  ░░ ░         ░  ░
░                  ░                                                 ░`;
    const usage = commandLineUsage([
        {
            content: chalk.red(header),
            raw: true,
        },
        {
            header: "Options",
            optionList: optionDefinitions,
        },
        {
            content:
                "Project home: {underline https://github.com/steelejoe/codepalace}",
        },
    ]);
    console.log(usage);
    process.exit(1);
}

const port = options.port;
const home = process.cwd();

/**
 *  Scan the file system and generate the game files
 */

if (options.install) {
    const database = new CPLevelDatabase(home, false);
    // TODO write the configuration to disk!
    process.exit(1);
}

/**
 *  Start the server(s)
 */

if (options.start) {
    // TODO load the configuration from disk
    const database = new CPLevelDatabase(home, true);
    const app = express();

    app.get("/", (req, res) => {
        res.send("This ... is ... Code Palace!!!");
    });

    app.get("/config", (req, res) => {
        res.send(JSON.stringify(database.config));
    });

    app.listen(port, () => {
        return console.log(
            `codepalace is listening at http://localhost:${port}`
        );
    });
}
