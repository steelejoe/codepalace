/**
 * CPLevelConfig
 */

import fs from 'fs';

enum CPAreaType {
  Home = 0,
  Castle,
  Library,
  Forest,
  Lake,
  Mountain,
  Desert
}
class CPLevelConfig {
    parent?: CPLevelConfig;
    areaType: CPAreaType;
    path: string;
    map: string;
    npcs = [];
    monsters = [];
    items = [];
    areas = new Array<CPLevelConfig>();

  constructor(parent?: CPLevelConfig) {
    this.parent = parent;
  }

  fullPath(): string {
    const pathSegments = [ this.path ];
    let current = this.parent;
    while (current) {
      pathSegments.push(current.path);
      current = current.parent;
    }
    pathSegments.reverse();
    return pathSegments.join('/');
  }

  pickAreaType(): CPAreaType {
    // TODO implement a random picker
    return CPAreaType.Castle;
  }

  generateBaseConfig(path: string, ignoreList: Array<RegExp>) {
    this.path = path;
    this.areaType = this.parent ? CPAreaType.Home : this.pickAreaType();
    const entries = fs.readdirSync(this.fullPath(), { withFileTypes: true });
    entries.forEach(entry => {
      this.generateEntry(entry, ignoreList);
    });
  }

  generateEntry(entry: fs.Dirent, ignoreList: Array<RegExp>) {
    console.log(`found ${entry.name}`);

    // skip special directories
    if ((entry.name === "." || entry.name === "..") && entry.isDirectory()) {
      console.log(`==> ${entry.name} was skipped`);
      return;
    }

    // skip ignored files
    let skip = false;
    ignoreList.forEach(pattern => {
      if (entry.name.match(pattern)) {
        console.log(`==> ${entry.name} was ignored`);
        skip = true;
      }
    });
    if (skip) return;

    // recurse into subfolders
    if (entry.isDirectory()) {
      console.log(`==> ${entry.name} is a directory`);
      const config = new CPLevelConfig(this);
      this.areas.push(config);
      config.generateBaseConfig(entry.name, ignoreList);
      return;
    }
    
}

  load(path: string) {
    this.path = path;
    // TODO implement
    console.log(`load config for ${path} from disk path @ ${this.fullPath()}`);
  }

  store() {
    // TODO implement
    console.log(`store config for ${this.path} to disk @ ${this.fullPath()}`);
  }
}

export { CPLevelConfig };
