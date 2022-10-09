# Notes on MelonsJS implementation

## `game`

Loading and storing this to disk should be easy.

## Platformer vs Map

This engine is targeted at 2d platformers. Can I make this game using it?
Can this concept be a 2d platformer instead of a map?

- Yes, I could just have an **overmap** that shows positions but not used for interacting with.
- Each generated map could easily be a loop.
- If I want more complicated topology:
  - I can add an interactive "path" that the player can select along the main path.
  - I can make each branch point its own screen with multiple paths to select.

## Using the Tiled package

I will need to pre-generate tile-sets for each of the map flavors I want.
Then I can generate the actual layout programmatically.

 I will probably need to add my own metadata layer for the tile-sets, to indicate if the tiles require special placement. E.g. some tiles may only make sense at the bottom, or as ledges. I think I will need at least the following types for each tile.

- Pit
- Bottom only
- Top only
- Floor
- Wall
- Corner
- Background
- NPC
- Item

I will also need to indicate what layer they should go in:

- Front
- Back
- Object

And the nature of the tile-set itself

- Indoor
- Outdoor

I will need to figure out some kind of generation algorithm.
Maybe something like this?

- Going from left to right in the Object layer
  - Generate a set of tiles for this column
    - Must be a minimum of 3 empty tiles
  - Ensure top and bottom are respected
    - If a bottom tile is generated, put on the bottom
    - If a top tile is generated put on the top
    - If extra bottom or top tiles are generated, pick new ones to replace them
    - Top tiles are only generated for indoor locations
  - Ensure passages exist
    - An empty tile in location (X,Y) requires an empty tile in locations (X,Y+1) or (X,Y-1) or (X+1,Y)
  - Ensure items are reachable
    - An item must be placed above the lowest floor tile
  - Make ledges more likely
    - If a floor tile in location (X,Y), prefer a floor tile in locations (X+1,Y) or (X+1,Y-1) or (X+1,Y+1)
  
## Writing the maps and entity sets

 The Tiled engine will consume specially constructed map.tsx and tile.tsx files.
 I will construct those for each level using the images and a text editor.

To build a theme set:

- Collect the set of images
- Pick your set of objects
- Make object sets using original image files and parameters
- Create combined image sets so the Tiled loader can handle it

```ts
entity: {
    name: string; // Human readable name
    id: string; // UUID for references
    entityGroup: enum;
    entityType: enum;
    x: number;
    y: number;
    height: number;
    width: number;
}
entitySet: {
    name: string; // Human readable name
    id: string; // UUID for references
    entities: entity[];
    filename: string; // relative to installation root
}
```
