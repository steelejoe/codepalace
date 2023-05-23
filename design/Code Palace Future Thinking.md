# Code Palace Future Thinking

## Game engine

I have picked [MelonJS](https://melonjs.org) for now because I need to run in the browser.
Is that possible with [Unity](https://unity.com)? [Yes](https://stackoverflow.com/questions/37720559/how-to-run-unity-game-on-browser)
Is Unity better for this? Maybe?

## Lazy map generation

I want the map to be lazily generated once the player enters that scene. If it has already been generated, the system should use the map already there. The maps should be 2d with ledges and I will have a multi-jumping mechanism.

## ML map generation

This is a platformer and I want the maps to be interesting (e.g. with jumping). I would like to use a trained network to generate them. To this end I must train the network with some viable maps AND provide a fitness method for testing. Alternatively I could allow the player to bail out of a map and say it is "bad". This would mean the map is either uninteresting or unplayable and would be used as a negative test case for future training.

Should I retrain the network right there? I could have a separate worker doing that in the background.

## Artwork generation

I should render some cool artwork via Midjourney to serve as the landscape and backdrops.

## Music and sounds

Interaction sounds? YES
- jumping
- opening
- picking up
- battling
T
Environmental music? maybe?
BOSS music? Yes, if I have bosses.

## Service Worker

The primary use case is offline. Currently I am thinking of this as a node app serving a web client.
Some of this functionality might work well as a PWA using web service instead.

- Could use an angular PWA for this? would that be better than React?
- How should I use caching in this app? Not really needed because the server is local - but would still speed things up.
  - At least for this static assets
- REST API is what I should support

## Online vs Offline

I could build a completely online version of this that relies on a Github (or similar file storage). This would make multi-player games easier to build, but would lose some flexibility. Ideally I would like to have both versions.

## RESTful APIs

REpresentational State Transfe
- Resources have an unique URI based on nouns
- POST means create
- GET means read
- PUT means update
- DELETE means delete
- good HTTP codes must be returned
- stateless
- use `limit` and `offset` for pagination returned results
- versioning using a prefix on the URI

## Construction/destruction

It would be cool to have a way to have the player construct of destroy permanent elements of the maps.
- Maybe an "Architect" ranking? or tool of some kind? Once you have visited the whole map

Some destructible elements should exist and should re-spawn once user has left the scene.

## Inventory

I think a simple inventory is good. I will have a heads up display the player can bring to the foreground with all the relevant details.

- Current Weapon
- Current Armor
- Items
- Map
- Menu

## HP, lives etc.

Should players die? YES

- Death will result in the scene resetting, losing any items from the current, and losing some percentage of their items.
  - Certainly anything gained in the level

Should players kill monsters?

Should there be battles?

- This means HP on both sides and an attack system
- Could include weapons, armor, etc. Could get them from the _friendly_ librarians?
- I was thinking yes and the more complex source files (or the ones with more bugs filed) could be stronger.
- Size of NPC could be based on file size in 5 classes.

## Talking

Should NPCs have conversations? NO - don't want that much complexity

- They _may_ say stuff when they meet you and that is it. You cannot respond.

## Generating maps

The map will be (width of screen) x 0.2 x (number of entities + doors) with a minimum map size of 1 screen width.

### Generation Affinity

When generating maps, certain entities have an "affinity" for each other and any algorithm placing them should take this account.
When interacting with a group of items in affinity with each other, they should be placed in the same "closeup" scene together.

### Generating with cellular automata

For a more "natural" look. 
Thoughts -- seed an area with various elements randomly, then apply a "growth" rule for a few generations to generate nearby content.
Then add the entities and items based on "affinity" with background elements.
The number of entities/items will generally determine the size of the map (with some exceptions?). E.g. T, S, M, L, E
Each map will have a hard border based on the theme.
A map can stretch beyond a single screen of content.
- (T)iny - 400x400 area aligned horizontal/vertical
- (S)mall - 800x800 area aligned horizontal/vertical
- (M)edium - 1600x1600 area aligned vertical
- (L)arge - 4800x1600 area aligned vertical
- (E)normous - 6400x1600 area aligned vertical

I want to be able to build a mental map of the maps, with a branching structure that mirrors the actual directory structure.

## Trying to simulate the earth

building open world models based on reality

- build a framework - the ground
- then run procedural routines  on top
- build textures/substances
- can be done with tiles
- painting can be added - on top of procedural stuff

Unity 2D Top-Down Game

- [Tutorial](https://www.youtube.com/watch?v=7iYWpzL9GkM&ab_channel=Chris%27Tutorials)
- I can use [Unity Personal](https://store.unity.com/#plans-individual) - but I will get a splash screen "Made with Unity"
  - do I care? 
  - maybe, depends on how much the platform helps me

How to support procedural generation?

- shape of tile?
- size of tile?
- Unity can split a combined tile image into individual tiles

What about having keys to open the doors/gates to next level?

- would that make remembering the level easier?
- would that be a good standard quest?

## Github version

I would like to have aversion of this embedded in the Git repo itself and a playable version available via Github Pages.
Should be possible - might need a service worker to cache the file system modifications.

## Intro screen

Would like to have some text to display when the game starts over a nice background.
Could use ChatGPT with a prompt like "Tell me a story about a warrior fighting monsters made from source code in castle, in the style of the Jabberwocky"

Could generate some really cool background images

### Generating algorithmically

Checkout this [Youtube video from Watt Designs](https://www.youtube.com/watch?v=dFYMOzoSDNE&ab_channel=WattDesigns).
Using the "Wave Function Collapse" algorithm (looks kinda like the game of life)
- given a few tile types a few simple rules
- make a grid of tiles
- each grid tile can have one type
- pick the first tile type randomly
  - then apply the rules to tiles around that tile
  - pick the one with the fewest available options for type
  - choose the type for that tile
  - choose the next tile
  - repeat!
- use a "stitcher" to make the tiles look natural next to each other

References:
- Boris the Brave
- Burst Compiler for C#
- Perlin Noise
- https://www.youtube.com/watch?v=9qOaII_PzGY&ab_channel=ArtemKirsanov (mapping in the brain)
