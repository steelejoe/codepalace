# Code Palace Implementation

## Restrictions

1. Multiple copies of Code Palace can be installed, but only one can be running at a time currently. We could change this later if desired.

## Components

These are the high level components that Code Palace is built from.

### Generator

This scans the code base for known file system entities and creates the initial configuration.
Some things will be randomized at this point. Some questions may be asked about what types of metadata to support.

The map generation process looks roughly like this:

- Determine map grid size (small, medium, large) based on the number of elements
- Determine map theme based on the types of elements and depth
- Place portals randomly in the grid
- Place seed tiles for each portal
- Generate the map based on the seed tiles and the rules on tile placement
- Stitch the tiles together (cleanup borders, connect paths, etc.)
- Place the items
- Place the npcs

### Client

This is the interface provided for navigating the game. This is implemented as a React app.. The app relies on APIs which are provided by the Server.

There are 3 screens:

1. Loading -- this is displayed briefly while the game is loading up. This display various game and user statistics.
2. Map - this is the main screen the user sees and displays the level map the user is on. This is a "top down" view/
3. Interaction/Console - this is displayed when the user is interacting with an item, NPC or monster. This is a "close up" view.

### Server

This is the local server which provides all the data needed for the client. This is responsible for serving up the files needed for the Client interface as well as for serving the APIs the Client uses to get config information. This is implemented as a Node application using Express to serve pages and APIs.

### Monitor

Unclear how this will be implemented yet. This might be part of the Server or implemented as a separate process. It server the purpose of monitoring the various data sources that are used to generate the app configuration. For example:

- File system changes
- Git changes
- JIRA changes
- Direct config changes
- Remote user updates (for multiplayer)

## Flow

1. Install Code Palace with `codepalace install`. This will run the Generator and produce the initial configuration for the code base it is run inside of.
2. Customize your configuration. This is optional and involves directly editing the config files produced as desired.
3. Start Code Palace with `codepalace start`. This will kick off the Server and Monitor and report the URI for the Client.
4. Open the Client interface in a browser using the reported URI. You will start in the home level (the root of the code base).


## Client Interface

### Mouse controls

**None** - keyboard, joy-pad only.

### Map control

**Q: Should I generate the map once or every time? (what about "Tiled Map Editor"?)**
If I generate every time, layout changes may cause user confusion. This is a trade-off because the underlying folder contents may have changed and thus would have resulted in a different map if installed now. I think I will generate at install time for now and only make changes when things change type or disappear. E.g. if a folder was deleted, that building will become "dead" but remain on the map until the engine is restarted. Same thing with NPCs, items and monsters

**Q: How deep should I iterate**
I will need to iterate at least one layer deeper than the user is in order to generate the correct imagery.
Each time the users descends a level I will need to make sure I know the contents of the next layer down.
For a large folder hierarchy the report could grow quite large, so this is really just for debugging. Probably that won't even work at some point.
HOw should I be tracking this? I know where the user is - so that should be my limiting factor.

### Map keyboard controls

WASD and arrow keys for directions. Up and down only make sense when there is a climbing surface (e.g. a ladder).
E or Enter for interaction. Open a door, talk to an NPC, etc.
Space to jump
H to switch to HUD interface
C to switch to Console interface

If I have battling:

- Left button mouse or F for fight

If I have re-architecting:

- X to destroy an element
- C to add an element

## Map layout

The maps will be 2D platformer maps, with ledges and pits. Falling into a pit means death.
A background image will scroll along behind the foreground elements.
Certain items can be suspended in mid air. The player will have to jump (maybe multi-jump) to get to these.

## Enemy behavior

Most objects in the scene will be either items or ambivalent NPCs.
When entering a scene a random number of NPCs will be marked "aggro".
If an NPC is "aggro" it will move towards the player when it can and attack.
"Aggro" NPCs will jump off ledges to come after the player. This can result in their death if there is a pit.
If any NPC is attacked and has "friends", the friends will become "aggro" and attack.
Defeated enemies will remain as corpses and become non-interactive. They will be re-spawned on the next play-through.
If an NPC is non-aggro it can be walked past without interacting (although they may say something).
You can choose to interact by stopping next to them and choosing the interaction command.

## Item behavior

Items are picked up when the player touches them. Items can be dropped from the inventory.

## "Heads Up Display" aka HUD

There will be two versions of this:

- A minimal non-interactive version displayed as part of the console at the bottom.
- An interactive version the user can move around it and edit.

The non-interactive HUD will contain:

- Title
- Experience (as a pie)
- Num of Items
- Health (as a pie) (if battling)
- Num of Enemies defeated (if battling)
- Current Weapon (icon) (if battling)
- Current Armor (icon) (if battling)

The interactive HUD will contain:

- Title
- Experience
- Items listed by category
- Overmap
- Menu (save, quit, settings)
- Health (if battling)
- Current Weapon (if battling)
- Current Armor (if battling)
- Special attributes (if re-architecting)
- Debugging information (if debugging)

The interactive HUD will animate when selected, expanding up from the non-interactive HUD.

### HUD keyboard controls

WASD and arrow keys to move around in the interface.
E or Enter to activate the selected button.
Esc to exit back to the map.

### Console

The console is for various interactions I didn't want to make specific UI for.
Talking, editing text, debugging, etc.

### Console keyboard controls

All text editing characters allowed.
Enter to submit current text.
Esc to exit back to the map or HUD (depending on where you came from).

## Items

Items will be of various types

- (config files?) food, potions -- these will give health
- (images, videos, binary assets) gems, coins -- these will give wealth
- (.md, .log, .txt) scrolls -- these will give experience (maybe skills and/or attributes?)
- (dropped by NPCs) weapons, armor -- if battling
- other??
