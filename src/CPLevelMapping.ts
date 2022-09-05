/**
 * CPLevelMapping
 * This is used to avoid rebuilding these RegExp object more than once.
 */

class CPLevelMapping {
    ignore = [
        new RegExp('^\\..+'),
        new RegExp('node_modules')
    ];
    npc = new RegExp("^\\.{ts|js|json|gif}");
    monster = new RegExp("^\\.{jpg|ico|png|gif}");
}

export { CPLevelMapping };
