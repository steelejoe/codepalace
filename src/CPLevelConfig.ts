/**
 * CPLevelConfig
 */

import fs from 'fs';

class CPLevelConfig {
    type: string;
    path: string;
    map: string;
    npcs: [];
    monsters: [];
    items: [];
    areas: []; // CPLevelConfig

  constructor(path: string, type: string) {
    this.type = type;
    this.path = path;
    const entries = fs.readdirSync(path, { withFileTypes: true });
    entries.forEach(entry => {
      this.identify(entry);
    });
  }

  identify(entry: fs.Dirent) {
    console.log(`found ${entry.name} of type ${entry.isDirectory() ? 'folder' : 'file'}`);
  }
}

export { CPLevelConfig };
