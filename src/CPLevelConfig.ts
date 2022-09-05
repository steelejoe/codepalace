/**
 * CPLevelConfig
 */

import fs from "fs";
import nodePath from "node:path";
import { CPLevelMapping } from "./CPLevelMapping";

const verbose = false;

enum CPAreaType {
    Home = 0,
    Castle,
    Library,
    Forest,
    Lake,
    Mountain,
    Desert,
}

enum CPEntryType {
    NPC,
    Monster,
    Item,
}

class CPLevelConfig {
    parent?: CPLevelConfig;
    areaType: CPAreaType;
    path: string;
    map: string;
    npcs = new Array<string>();
    monsters = new Array<string>();
    items = new Array<string>();
    areas = new Array<CPLevelConfig>();

    constructor(parent?: CPLevelConfig) {
        this.parent = parent;
    }

    fullPath(): string {
        const pathSegments = [this.path];
        let current = this.parent;
        while (current) {
            pathSegments.push(current.path);
            current = current.parent;
        }
        pathSegments.reverse();
        return pathSegments.join("/");
    }

    pickAreaType(): CPAreaType {
        // TODO implement a random picker
        return CPAreaType.Castle;
    }

    generateBaseConfig(path: string, mapping: CPLevelMapping) {
        this.path = path;
        this.areaType = this.parent ? CPAreaType.Home : this.pickAreaType();
        const entries = fs.readdirSync(this.fullPath(), {
            withFileTypes: true,
        });
        entries.forEach((entry) => {
            this.generateEntry(entry, mapping);
        });
    }

    generateEntry(entry: fs.Dirent, mapping: CPLevelMapping) {
        if (verbose) console.log(`found ${entry.name}`);

        // skip special directories
        if (
            (entry.name === "." || entry.name === "..") &&
            entry.isDirectory()
        ) {
            if (verbose) console.log(`==> ${entry.name} was skipped`);
            return;
        }

        // skip ignored files
        let skip = false;
        mapping.ignore.forEach((pattern) => {
            if (entry.name.match(pattern)) {
                if (verbose) console.log(`==> ${entry.name} was ignored`);
                skip = true;
            }
        });
        if (skip) return;

        // recurse into subfolders
        if (entry.isDirectory()) {
            if (verbose) console.log(`==> ${entry.name} is a directory`);
            const config = new CPLevelConfig(this);
            this.areas.push(config);
            config.generateBaseConfig(entry.name, mapping);
            return;
        }

        // categorize
        const ext = nodePath.extname(entry.name);
        if (ext.match(mapping.npc)) {
            this.npcs.push(entry.name);
        } else if (ext.match(mapping.monster)) {
            this.monsters.push(entry.name);
        } else {
            this.items.push(entry.name);
        }
    }

    report() {
        console.log(`{
  path: ${this.path},
  areaType: ${this.areaType},
  numNPCs: ${this.npcs.length},
  numMonsters: ${this.monsters.length},
  numItems: ${this.items.length},
  areas: [`);
        this.areas.forEach((area) => area.report());
        console.log(`
  ]
}`
      );
    }

    load(path: string) {
        this.path = path;
        // TODO implement
        console.log(
            `load config for ${path} from disk path @ ${this.fullPath()}`
        );
    }

    store() {
        // TODO implement
        console.log(
            `store config for ${this.path} to disk @ ${this.fullPath()}`
        );
    }
}

export { CPLevelConfig };
