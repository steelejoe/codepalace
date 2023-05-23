/**
 * CPLevelConfig
 */

import fs from "fs";
import nodePath from "node:path";
import { CPLevelMapping } from "./CPLevelMapping";

const verbose = false;

// Each of these types corresponds to different tileset
export enum CPAreaType {
    Home = "Home",
    Castle = "Castle",
    Library = "Library",
    Forest = "Forest",
    Lake = "Lake",
    Mountain = "Mountain",
    Desert = "Desert",
}

// Each of these types corresponds to an interactive entity
export enum CPEntityType {
    NPC = "NPC",
    Monster = "Monster",
    Item = "Item",
}

export class CPLevelConfig {
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

    // TODO this code does not take into account an existing level config
    // TODO as the user moves deeper into the map, this will be called with a depth of 0
    generateBaseConfig(path: string, mapping: CPLevelMapping, depth: number) {
        this.path = path;
        this.areaType = this.parent ? this.pickAreaType() : CPAreaType.Home;
        const entries = fs.readdirSync(this.fullPath(), {
            withFileTypes: true,
        });
        entries.forEach((entry) => {
            this.generateEntry(entry, mapping, depth);
        });
    }

    generateEntry(entry: fs.Dirent, mapping: CPLevelMapping, depth: number) {
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
        mapping.ignore.forEach((pattern) => {
            if (entry.name.match(pattern)) {
                if (verbose) console.log(`==> ${entry.name} was ignored`);
                return;
            }
        });

        // recurse into subfolders
        if (entry.isDirectory() && depth < 2) {
            if (verbose) console.log(`==> ${entry.name} is a directory`);
            const config = new CPLevelConfig(this);
            this.areas.push(config);
            config.generateBaseConfig(entry.name, mapping, depth + 1);
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

    reportAreas() : string {
        let output = `[`;
        if (this.areas.length > 0) {
            this.areas.forEach((area) => {
                output += area.report();
                output += ",";
            });
            output = output.substring(0, output.length - 1);
        }
        output += `]`;
        return output;
    }

    report() : string {
        let output = `{`;
        output += `path: "${this.fullPath()}",`;
        output += `areaType: ${JSON.stringify(this.areaType)},`;
        output += `numNPCs: ${this.npcs.length},`;
        output += `numMonsters: ${this.monsters.length},`;
        output += `numItems: ${this.items.length},`;
        output += `areas: ${this.reportAreas()}`;
        output += `}`;
        return output;
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
