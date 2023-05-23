/**
 * CPLevelDatabase
 */

import { CPLevelConfig } from '../dist/CPLevelConfig.js';
import { CPLevelMapping } from './CPLevelMapping.js';

class CPLevelDatabase {
    dirty = false;
    homePath: string;
    homeConfig?: CPLevelConfig;

  constructor(homePath: string) {
    this.homePath = homePath;
  }

  generate(mapping: CPLevelMapping) {
    this.homeConfig = new CPLevelConfig();
    this.homeConfig.generateBaseConfig(this.homePath, mapping, 0);
    // TODO apply more complex metadata to the base config
    this.dirty = true;
  }

  load() {
    console.log(`load the database from disk`);
    this.dirty = false;
    this.homeConfig.load();
  }

  store() {
    console.log(`store the database to disk`);
    if (this.dirty) {    
      this.homeConfig.store();
      this.dirty = false;
    }
  }

  getConfig(_path: string) : CPLevelConfig | undefined {
    // TODO implement
    return undefined;
  }

  setConfig(_path: string, _config: CPLevelConfig) {
    // TODO implement
    this.dirty = true;
  }
}

export { CPLevelDatabase };
