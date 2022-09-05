/**
 * CPLevelDatabase
 */

import { CPLevelConfig } from '../dist/CPLevelConfig.js';
import { CPLevelMapping } from './CPLevelMapping.js';

class CPLevelDatabase {
    dirty = false;
    homePath: string;
    homeConfig?: CPLevelConfig = undefined;

  constructor(homePath: string) {
    this.homePath = homePath;
  }

  generate(mapping: CPLevelMapping) {
    this.homeConfig = new CPLevelConfig(undefined);
    this.homeConfig.generateBaseConfig(this.homePath, mapping);
    // TODO apply more complex metadata to the base config
    this.dirty = true;
  }

  load(): CPLevelConfig|undefined {
    console.log(`load the database from disk`);
    // TODO implement
    this.dirty = false;
  }

  store() {
    console.log(`store the database to disk`);
    if (this.dirty) {    
      // TODO implement
      this.homeConfig.report();
      this.dirty = false;
    }
  }

  getConfig(path: string) : CPLevelConfig | undefined {
    // TODO implement
    return undefined;
  }

  setConfig(path: string, config: CPLevelConfig) {
    // TODO implement
    this.dirty = true;
  }
}

export { CPLevelDatabase };
