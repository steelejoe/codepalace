/**
 * CPEntity
 */

import { CPEntityType } from "./CPLevelConfig";

class CPEntity {

    name = "unknown";

    constructor(_type: CPEntityType) {
        this.name = typeof _type;
    }

    public render() {
        // TODO implement
    }

    public move() {
        // TODO implement
    }
}