// The catalogue. Records, artists and stories are invented stand-ins.
// Cover art is drawn with CSS: each cover is a background colour plus a few absolutely positioned shapes.

const song = (title, seconds, story) => ({ title, dur: seconds, story });

export const RECORDS = [
  {
    id: "blue_hour",
    title: "Blue Hour Radio",
    artist: "Sam Okafor",
    year: 2021,
    genres: "Late-night soul / Lo-fi",
    price: "€15.98",
    cover: {
      bg: "#7FA6D9",
      label: "#14213D",
      art: [
        { left: "15%", top: "30%", width: "70%", height: "35%", borderRadius: "999px 999px 0 0", background: "#14213D" },
        { left: "15%", top: "69%", width: "70%", height: "1.5%", background: "#14213D" },
      ],
    },
    story: [
      "Sam Okafor hosted a night show on a community station in Leeds for four years, taking calls from people who could not sleep. When the station closed, he wrote a record that sounds like the hour he used to fill.",
      "Every song starts the way his show did: a few seconds of dead air, then a voice.",
    ],
    songs: [
      song("Dead Air", 192, "The opening is the actual silence from his last broadcast. He left it in because, he said, that was the part people stayed up for."),
      song("Caller Four", 245, "Written about a regular who rang every Thursday and never gave a name. The melody is the tune she used to hum while on hold."),
      song("Night Rate", 220, "Named after the cheap taxi fare after midnight. It is the only song on the record you could dance to, and only slowly."),
      song("Sign Off", 288, "He recorded the vocal in one take at four in the morning, the hour the show used to end. You can hear a chair creak when he stands up."),
    ],
    about: {
      from: "Leeds, England",
      since: "2014",
      plays: "Voice, electric piano",
      bio: [
        "Sam Okafor is a singer and former night-radio host from Leeds. He started writing songs between calls and still records after midnight, when, he says, his voice finally slows down.",
      ],
    },
  },
  {
    id: "last_tram",
    title: "Last Tram",
    artist: "The Night Shift",
    year: 2018,
    genres: "Post-punk / New wave",
    price: "€18.50",
    cover: {
      bg: "#101820",
      label: "#E63946",
      art: [
        { left: "0", top: "45%", width: "100%", height: "9%", background: "#E63946" },
        { left: "0", top: "58%", width: "100%", height: "1%", background: "#F5F5F0" },
      ],
    },
    story: [
      "The Night Shift were four hospital porters from Gothenburg who rehearsed after work and caught the last tram home together. The record was written on that tram, in the twenty minutes between the depot and the river.",
      "It is fast, short and impatient, like people who have to be up again in six hours.",
    ],
    songs: [
      song("Depot", 161, "Their first song, built on the rhythm of the tram doors. The drummer taps the door chime on the hi-hat."),
      song("Line 11", 182, "A love song to a tram route. The chorus is the list of stops, shouted."),
      song("Six Hours", 174, "About how little sleep is left once you get home. It ends in the middle of a bar, on purpose."),
      song("River Stop", 213, "The only slow one. Written the night one of them left the band, about the stop where he used to get off."),
    ],
    about: {
      from: "Gothenburg, Sweden",
      since: "2015",
      plays: "Guitar, bass, drums, organ",
      bio: [
        "The Night Shift are four hospital porters from Gothenburg who formed the band on their break. Three of them still work nights, and they tour in their holiday weeks.",
      ],
    },
  },
  {
    id: "still_water",
    title: "Still Water",
    artist: "Ines Varga",
    year: 2019,
    genres: "Solo piano / Folk / Ambient",
    price: "€15.98",
    cover: {
      bg: "#1C2B94",
      label: "#1C2B94",
      art: [
        { left: "26.5%", top: "33%", width: "47%", aspectRatio: "1 / 1", borderRadius: "50%", background: "#F2E9D8" },
        { left: "0", top: "57%", width: "100%", height: "43%", background: "repeating-linear-gradient(180deg, #1C2B94 0 4.2%, rgba(28,43,148,0) 4.2% 6.4%)" },
      ],
    },
    story: [
      "Ines Varga left her home town at nineteen and did not go back for six years. Still Water is the record she made when she finally did: five songs written on her aunt’s upright piano, each about a place she could see from the window.",
      "She has said it is not a sad record. It is about what stays put while you are away.",
    ],
    songs: [
      song("Low Tide", 228, "The first song is the view at six in the morning, when the boats sit on the mud. She plays it with the soft pedal down the whole way."),
      song("Harbour Lights", 266, "The first thing she wrote after coming home. The harbour in the title is the one she sailed out of at nineteen, seen from her aunt’s back room six years later. The piano is a single take; you can hear the pedal creak a little past the two-minute mark."),
      song("Still Water", 302, "The title song is the slowest thing she has recorded. She wrote it about the pond behind the school, which looked exactly as she had left it."),
      song("Paper Boats", 171, "A children’s game, played alone as an adult. It is the one moment on the record where she lets herself be funny."),
      song("North Window", 185, "The last song faces the other way, towards the road out. She has said she wrote it so the record would not end by standing still."),
    ],
    about: {
      from: "Ålesund, Norway",
      since: "2012",
      plays: "Piano, voice",
      bio: [
        "Ines Varga is a pianist and songwriter from the Norwegian west coast. She trained as a piano tuner before she released a record, and still tunes the instrument herself before every session.",
        "She writes slowly, about one record every three years, and rarely plays live.",
      ],
    },
  },
  {
    id: "honeycomb",
    title: "Honeycomb",
    artist: "Amara Diallo",
    year: 2022,
    genres: "Afrobeat / Jazz",
    price: "€21.00",
    cover: {
      bg: "#F08A4B",
      label: "#2A1206",
      art: [
        { left: "22%", top: "22%", width: "56%", height: "56%", background: "repeating-conic-gradient(#2A1206 0% 25%, rgba(42,18,6,0) 0% 50%)", backgroundSize: "50% 50%" },
      ],
    },
    story: [
      "Amara Diallo grew up above her grandfather’s honey shop in Dakar and learned to count by stacking jars. Honeycomb is built the same way: small repeating cells of rhythm that lock into something much larger.",
      "She wrote it for an eight-piece band and insisted they record in one room, facing each other.",
    ],
    songs: [
      song("Six Sides", 250, "Everything here is in six: six players come in one at a time, six bars apart. It is how she teaches the band to listen."),
      song("Smoke", 216, "Beekeepers calm a hive with smoke. This is the calm song, with the horns playing as quietly as horns can."),
      song("The Shop", 284, "A portrait of her grandfather’s counter, down to the bell on the door, played on a cowbell."),
      song("Sweet Work", 238, "The closing song is the fastest. She calls it a thank-you to people who do the same careful thing every day."),
    ],
    about: {
      from: "Dakar, Senegal",
      since: "2010",
      plays: "Saxophone, bandleader",
      bio: [
        "Amara Diallo is a saxophonist and bandleader from Dakar. She leads the same eight players she met at music school and writes every part with one of them in mind.",
      ],
    },
  },
  {
    id: "long_division",
    title: "Long Division",
    artist: "Halvar",
    year: 2020,
    genres: "Minimal electronic",
    price: "€15.98",
    cover: {
      bg: "#F5F5F0",
      label: "#F5F5F0",
      art: [
        { left: "22%", top: "47%", width: "56%", height: "6%", background: "#16130F" },
        { left: "44.5%", top: "27%", width: "11%", aspectRatio: "1 / 1", borderRadius: "50%", background: "#16130F" },
        { left: "44.5%", top: "62%", width: "11%", aspectRatio: "1 / 1", borderRadius: "50%", background: "#16130F" },
      ],
    },
    story: [
      "Halvar is a former maths teacher from Tromsø who makes music from a single rule: take a loop and keep dividing it. Long Division is four pieces, each one a different way of running out of numbers.",
      "It sounds colder than it is. Underneath the arithmetic, it is a record about patience.",
    ],
    songs: [
      song("Remainder", 260, "A loop of seven notes divided by two until one note is left over. That leftover note is the melody."),
      song("Carry the One", 195, "Built on a mistake he made at the blackboard. He kept the error and wrote the piece around it."),
      song("Show Your Working", 301, "The longest piece lets you hear every step. Nothing is hidden, and that is the point."),
      song("Zero", 168, "It ends on almost nothing: one tone, fading for the last full minute."),
    ],
    about: {
      from: "Tromsø, Norway",
      since: "2016",
      plays: "Synthesisers, tape",
      bio: [
        "Halvar taught secondary-school maths in Tromsø for eleven years before releasing any music. He builds each piece from a rule he could explain on a blackboard, and usually does.",
      ],
    },
  },
  {
    id: "velvet",
    title: "Velvet Arcade",
    artist: "Nova Reyes",
    year: 2023,
    genres: "Synth-pop / Disco",
    price: "€24.50",
    cover: {
      bg: "#5B2A86",
      label: "#FF8FB1",
      art: [
        { left: "0", top: "0", width: "100%", height: "100%", background: "#FF8FB1", clipPath: "polygon(50% 18%, 84% 78%, 16% 78%)" },
      ],
    },
    story: [
      "Nova Reyes spent her teens in a seaside arcade her mother managed, doing homework between the machines. Velvet Arcade is her love letter to that room: the lights, the noise, and the feeling of being somewhere you were not quite supposed to be.",
      "It is a bright record about a place that has since closed.",
    ],
    songs: [
      song("Insert Coin", 202, "It opens with a real coin dropping into a real machine, the last one from the arcade, which she now owns."),
      song("High Score", 227, "Her initials stayed at the top of one machine for nine years. This is the victory lap."),
      song("Closing Time", 255, "Her mother switching the machines off one by one. Each verse loses an instrument."),
      song("Free Play", 185, "The night before the arcade shut, every machine was set to free play. She wrote this the morning after."),
    ],
    about: {
      from: "Blackpool, England",
      since: "2018",
      plays: "Voice, synthesisers",
      bio: [
        "Nova Reyes is a singer and producer who grew up in a seaside town in the north of England. She makes dance music about ordinary places and insists every song has to work on a cheap speaker.",
      ],
    },
  },
  {
    id: "open_window",
    title: "Open Window",
    artist: "Theo Marsh",
    year: 2017,
    genres: "Acoustic / Field recordings",
    price: "€15.98",
    cover: {
      bg: "#BEE3DB",
      label: "#F4A261",
      art: [
        { left: "30%", top: "18%", width: "40%", height: "64%", boxSizing: "border-box", border: "5px solid #FFFDF7" },
        { left: "42%", top: "30%", width: "16%", aspectRatio: "1 / 1", borderRadius: "50%", background: "#F4A261" },
      ],
    },
    story: [
      "Theo Marsh recorded this album in a rented room in Lisbon with the window open, and refused to close it. Trams, neighbours, a dog and one thunderstorm are all on the tape.",
      "He has said the songs are only half of it. The other half is the city answering back.",
    ],
    songs: [
      song("Third Floor", 210, "The first thing you hear is the street, not the guitar. He waits for a scooter to pass before he starts."),
      song("Neighbour’s Radio", 178, "A neighbour’s radio drifted in halfway through a take, in a different key. He retuned and played along."),
      song("Rain Take", 262, "Recorded during the storm. He nearly stops twice, and keeps going both times."),
      song("Leave It Open", 221, "The last song is about not shutting things out. The tape runs on for a while after he puts the guitar down."),
    ],
    about: {
      from: "Bristol, England",
      since: "2009",
      plays: "Guitar, voice",
      bio: [
        "Theo Marsh is a guitarist and songwriter who has not recorded in a studio since 2012. He rents a room in a different city for each record and lets the place decide how it sounds.",
      ],
    },
  },
  {
    id: "rust_roses",
    title: "Rust & Roses",
    artist: "Dalia Kent",
    year: 2016,
    genres: "Country soul / Americana",
    price: "€18.50",
    cover: {
      bg: "#8C2F39",
      label: "#F2E9D8",
      art: [
        { left: "22%", top: "22%", width: "56%", aspectRatio: "1 / 1", boxSizing: "border-box", borderRadius: "50%", border: "5px solid #F2E9D8" },
        { left: "43%", top: "43%", width: "14%", aspectRatio: "1 / 1", borderRadius: "50%", background: "#F2E9D8" },
      ],
    },
    story: [
      "Dalia Kent wrote Rust & Roses in the year she spent restoring her late father’s pickup truck, one song for each part she replaced. The truck runs now. She drove it to the studio.",
      "It is a record about fixing what you can and keeping what you cannot.",
    ],
    songs: [
      song("Carburettor", 198, "The first part she replaced and the first song she wrote. The rhythm is the engine failing to turn over."),
      song("Rosa", 242, "Named after the rosebush her father planted by the garage, which outlived him."),
      song("Rust", 224, "About the things that cannot be sanded off. She sings it lower than anything else on the record."),
      song("First Drive", 207, "The engine you hear at the end is the real one, started for the first time in eleven years."),
    ],
    about: {
      from: "Tulsa, Oklahoma",
      since: "2008",
      plays: "Voice, guitar",
      bio: [
        "Dalia Kent is a singer from Oklahoma who kept the books at a repair shop until her thirties. Her songs are about repair, in every sense, and she writes most of them in the garage.",
      ],
    },
  },
  {
    id: "salt",
    title: "Salt",
    artist: "Mara Lund",
    year: 2020,
    genres: "Chamber folk / Strings",
    price: "€15.98",
    cover: {
      bg: "#ECE7DD",
      label: "#ECE7DD",
      art: [
        { left: "22%", top: "22%", width: "56%", aspectRatio: "1 / 1", boxSizing: "border-box", borderRadius: "50%", border: "5px solid #1A1A1A", borderLeftColor: "rgba(26,26,26,0)", borderBottomColor: "rgba(26,26,26,0)", transform: "rotate(18deg)" },
      ],
    },
    story: [
      "Mara Lund comes from four generations of salt workers on the Danish west coast. Salt is her record about that work: slow, repetitive, and at the mercy of the weather.",
      "She recorded the strings in the old drying shed, where the air does half the reverb.",
    ],
    songs: [
      song("Evaporation", 271, "A single chord, thinning out for four minutes. It is how salt is made: you wait for everything else to leave."),
      song("West Wind", 189, "The wind that ruins a harvest. The violins play it as something you have to respect anyway."),
      song("Grandmother’s Hands", 232, "Her grandmother raked salt until she was eighty. The cello line is the motion of the rake."),
      song("Harvest", 200, "The only song in a major key. It is short, like the season."),
    ],
    about: {
      from: "Ribe, Denmark",
      since: "2013",
      plays: "Cello, voice",
      bio: [
        "Mara Lund is a cellist and composer from the Danish west coast. She left for the conservatory at seventeen and moved back at thirty, and has recorded everything since within a mile of the sea.",
      ],
    },
  },
  {
    id: "tidewater",
    title: "Tidewater Motel",
    artist: "June Castell",
    year: 2021,
    genres: "Surf rock / Dream pop",
    price: "€21.00",
    cover: {
      bg: "#2A9D8F",
      label: "#F4A261",
      art: [
        { left: "28%", top: "24%", width: "44%", aspectRatio: "1 / 1", borderRadius: "50%", background: "#F4A261" },
        { left: "0", top: "54%", width: "100%", height: "46%", background: "repeating-linear-gradient(180deg, #2A9D8F 0 9%, #264653 9% 12%)" },
      ],
    },
    story: [
      "June Castell’s parents ran a twelve-room motel on the Oregon coast, and she grew up cleaning rooms that strangers had just left. Each song on Tidewater Motel is a room and the person she imagined in it.",
      "The reverb is the real swimming pool, drained for the winter.",
    ],
    songs: [
      song("Room 4", 194, "A man who paid for a week and never unpacked. She wrote the whole lyric from what he left in the bin."),
      song("Vacancy", 230, "The neon sign outside buzzed in F sharp. The song is in F sharp."),
      song("Ice Machine", 167, "An instrumental built on the rhythm of the ice machine outside her bedroom window."),
      song("Check Out", 246, "Her parents sold the motel in 2019. This is her handing back the key."),
    ],
    about: {
      from: "Oregon coast, USA",
      since: "2017",
      plays: "Guitar, voice",
      bio: [
        "June Castell is a guitarist and songwriter from the Oregon coast. She learned to play on a guitar a guest left behind in room nine, and still uses it.",
      ],
    },
  },
  {
    id: "paper_lanterns",
    title: "Paper Lanterns",
    artist: "The Oslo Rooms",
    year: 2015,
    genres: "Indie pop",
    price: "€18.50",
    cover: {
      bg: "#F2B5C0",
      label: "#C8323F",
      art: [
        { left: "14%", top: "18%", width: "42%", aspectRatio: "1 / 1", borderRadius: "50%", background: "#C8323F" },
        { left: "54%", top: "46%", width: "28%", aspectRatio: "1 / 1", borderRadius: "50%", background: "#E0604A" },
        { left: "36%", top: "72%", width: "13%", aspectRatio: "1 / 1", borderRadius: "50%", background: "#7A1626" },
      ],
    },
    story: [
      "The Oslo Rooms formed at a lantern festival where none of them knew anyone, and wrote their first song that night on a borrowed guitar. Paper Lanterns is a record about small brave things: saying hello, staying late, lighting something and letting it go.",
      "It is the warmest record in the shop.",
    ],
    songs: [
      song("Borrowed Guitar", 175, "The song they wrote the night they met, almost unchanged. The guitar is still out of tune."),
      song("Stay Late", 208, "About the moment a party thins out and the good conversations start."),
      song("Lanterns", 241, "Two hundred lanterns went up that night. The chorus counts some of them."),
      song("Let Go", 196, "The lantern does not come back. They decided that was a happy ending."),
    ],
    about: {
      from: "Oslo, Norway",
      since: "2013",
      plays: "Five voices, guitars, drums",
      bio: [
        "The Oslo Rooms are five friends who met as strangers at a festival and have shared a flat in Oslo ever since. They write in the kitchen and take turns singing lead.",
      ],
    },
  },
  {
    id: "low_sun",
    title: "Low Sun",
    artist: "Aya Morel",
    year: 2022,
    genres: "Ambient / Modern classical",
    price: "€24.50",
    cover: {
      bg: "#3D405B",
      label: "#F2CC8F",
      art: [
        { left: "20%", top: "50%", width: "60%", height: "30%", borderRadius: "999px 999px 0 0", background: "#F2CC8F" },
        { left: "0", top: "80%", width: "100%", height: "20%", background: "#2B2D42" },
      ],
    },
    story: [
      "Aya Morel wrote Low Sun during a winter in northern Finland, when the sun barely cleared the horizon for two hours a day. She worked only in those hours, and stopped when the light went.",
      "The record is short because the days were.",
    ],
    songs: [
      song("Eleven A.M.", 225, "The first light. One piano note, repeated until the room is bright enough to see the keys."),
      song("Long Shadows", 252, "At noon in January, shadows there are longer than the people casting them. The strings stretch each note the same way."),
      song("Blue Minute", 159, "The minute after sunset when the snow turns blue. It lasts about as long as the song."),
      song("Lamp", 213, "Written after dark, breaking her own rule. It is the only song with a voice on it."),
    ],
    about: {
      from: "Lyon, France",
      since: "2015",
      plays: "Piano, strings",
      bio: [
        "Aya Morel is a composer from Lyon who writes for piano and small string groups. She works to limits she sets herself, such as the hours of daylight or a single week, and stops when the limit does.",
      ],
    },
  },
];

export const BY_ID = Object.fromEntries(RECORDS.map((r) => [r.id, r]));

export const totalSeconds = (record) => record.songs.reduce((sum, s) => sum + s.dur, 0);

// What the library holds the first time the app opens.
export const STARTER_LIBRARY = [
  { id: 'paper_lanterns', bought: '2026-08-02', played: true },
  { id: 'salt', bought: '2026-06-14', played: true },
  { id: 'open_window', bought: '2026-03-21', played: true },
];
