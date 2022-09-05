/**
 * CPLevelDatabase
 */

import { CPLevelConfig } from '../dist/CPLevelConfig.js';

class CPLevelDatabase {
    dirty: boolean = false;
    homePath: string = ".";
    homeConfig?: CPLevelConfig;

  constructor(homePath: string, installed: boolean) {
    this.homePath = homePath;
    this.homeConfig = installed ? this.load() : new CPLevelConfig(homePath, "home");
  }

  load(): CPLevelConfig|undefined {
    // TODO implement
    console.log(`load the database from disk`);
  }

  store() {
    // TODO implement
    console.log(`store the database to disk`);
  }
}

export { CPLevelDatabase };
