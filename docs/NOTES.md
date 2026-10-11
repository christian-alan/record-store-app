# Notes

How the code is organised, how the state works and what is still a stand-in.

## How it is organised

```
src/
  App.jsx                    which screen is open, plus the library and the turntable
  index.css                  Tailwind, the colour tokens (light and dark), two type utilities
  data/catalog.js            the records: cover, story, songs, artist
  hooks/
    usePlayer.js             the turntable: status, song, position, clock, sound
    useLibrary.js            the records you own, saved in the browser
    useVinylDrag.js          dragging the vinyl onto the platter
    useTheme.js              light or dark, set as data-theme on <html>
  lib/
    sound.js                 generated stand-in audio (swap for real playback)
    format.js  storage.js  cx.js
  components/
    TopBar.jsx  MiniPlayer.jsx  Button.jsx  HoldButton.jsx  Switch.jsx  Icons.jsx
    Sleeve.jsx               the sleeve and the vinyl
    Tracklist.jsx
    store/
      Store.jsx              the grid of records for sale
      RecordPage.jsx         one record: artist, story, songs, hold to buy
    library/
      Library.jsx            the three columns and the shelf
      Story.jsx              the story panel: one main card, two small cards
      Turntable.jsx  Transport.jsx  Shelf.jsx
```

## State

- **Screen** (`App.jsx`): `store`, `record` (with an id) or `library`.
- **Library** (`useLibrary`): a list of `{ id, bought, played }`, newest first.
- **Turntable** (`usePlayer`): `{ id, status, song, pos }` where status is
  `empty → stopped → playing ⇄ paused → finished`.
- **Picked record** (`App.jsx`): the record taken off the shelf. It can differ from the one that is playing.
- **Story layer** (`Library.jsx`): `song`, `record` or `artist`. It follows the moment unless you open one by hand.

## Styling

Colours are CSS variables in `src/index.css`, exposed to Tailwind through `@theme`, so `bg-ground`,
`text-ink`, `text-muted`, `bg-accent` and so on follow light and dark mode on their own.
The Dark switch in the top bar sets `data-theme` on `<html>`. Until it is used the app follows the
system setting; after that the choice is remembered in the browser. `dark:` utilities follow the switch too.
`caps` is the small mono label style and `headline` is the tight display style.
The vinyl's grooves and the seek bar are the only hand-written component CSS.

## Stand-ins

The records, artists, stories and cover art are invented, and the sound is generated in the browser.
To use real music, replace `src/data/catalog.js` and `src/lib/sound.js`; nothing else depends on them.
