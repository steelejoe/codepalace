# Code Palace Future Thinking

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

REpresentational State Transfer

- Resources have an unique URI based on nouns
- POST means create
- GET means read
- PUT means update
- DELETE means delete
- good HTTP codes must be returned
- stateless
- use `limit` and `offset` for pagination returned results
- versioning using a prefix on the URI