# Code Palace Implementation

## Restrictions

1. Multiple copies of Code Palace can be installed, but only one can be running at a time currently. We could change this later if desired.

## Components

These are the high level components that Code Palace is built from.

### Generator

This scans the code base for known file system entities and creates the initial configuration.
Some things will be randomized at this point. Some questions may be asked about what types of metadata to support.

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

### Map control

**Q: Should I generate the map once or every time? (what about "Tiled Map Editor"?)**
If I generate every time, layout changes may cause user confusion. This is a trade-off because the underlying folder contents may have changed and thus would have resulted in a different map if installed now. I think I will generate at install time for now and only make changes when things change type or disappear. E.g. if a folder was deleted, that building will become "dead" but remain on the map (at least for awhile). Same thing with NPCs, items and monsters



### Interaction control

### Console control