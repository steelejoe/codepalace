# codepalace

## Overview
Game based on code base, related metadata and local file system it is stored in.

Think similar to AdventureOS but for code exploration. I like the idea of AdventureOS (although I have not been able to get it running). This also contains ideas from Topia - namely the simple navigation/interaction model.

What if I applied this concept to a codebase?

- I.e. pick a codebase as a starting point and it would generate rooms and characters from the folder, files and their contents.
- The layout could be based on various graphs of the code (e.g. dependency, flow, etc.). The characters also!

I could have a hidden folder for generated loot and such (and game specific overrides I want to add). I could tie in Git history and even bug history from Jira.

Older code would look like older characters. 

Levels and classes of character could be determined by semantic linkage to other code, frequency of usage, etc.

## Design and implementation

Ths design is currently being tracked in my Notion database. I will move stuff here as I get some stuff implemented. 
I will track stuff in the Github Issues for awhile as an experience.
