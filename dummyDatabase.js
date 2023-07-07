export const configs = [
  { id: 1, code: "F9XX", description: 'Standard C 9" Image Intensifier', pattern: '[Ff]9[Xx][Xx][TtXx][Xx][0-9]{5}'},
  { id: 2, code: "F2XX", description: 'Standard C 12" Image Intensifier', pattern: '[Ff]2[Xx][Xx][TtXx][Xx][0-9]{5}'},
  { id: 3, code: "FAXX", description: "Ergo C 21cm Flat Panel Display", pattern: '[Ff][Aa][Xx][Xx][TtXx][Ee][0-9]{5}'},
  { id: 4, code: "FBXX", description: "Ergo C 31cm Flat Panel Display", pattern: '[Ff][Bb][Xx][Xx][TtXx][Ee][0-9]{5}'},
  { id: 5, code: "FSXX", description: 'Super C 9" Image Intensifier', pattern: '[Ff][Ss][Xx][Xx][TtXx][Xx][0-9]{5}'},
  { id: 6, code: "FAHX", description: "Super C 21cm Flat Panel Display", pattern: '[Ff][Aa][Hh][Xx][TtXx][Xx][0-9]{5}'},
  { id: 7, code: "FBHX", description: "Super C 31cm Flat Panel Display", pattern: '[Ff][Bb][Hh][Xx][TtXx][Xx][0-9]{5}'},
  { id: 8, code: "FAMH", description: "Motorized C 21cm Flat Panel Display", pattern: '[Ff][Aa][Mm][Xx][TtXx][Xx][0-9]{5}'},
  { id: 9, code: "FBMH", description: "Motorized C 31cm Flat Panel Display", pattern: '[Ff][Bb][Mm][Xx][TtXx][Xx][0-9]{5}'},
];

// We can get rid of this later but it is nice to have as a reference while we are building the form and stuff
export const items = [
  {
    name: "High Voltage Cable Part#:",
    configs: [
      {
        id: 1,
        breakPoints: [
          {
            startsAt: "F9XXXX00001",
            endsAt: "F9XXXX00034",
            display: "5443126",
          },
          {
            startsAt: "F9XXXX00035",
            endsAt: "F9XXTX00133",
            display: "5792202 (if unavailable, order 5877920)",
          },
          {
            startsAt: "F9XXXX00035",
            endsAt: "F9XXTX99999",
            display: "5877920",
          },
        ],
      },
      {
        id: 2,
        breakPoints: [
          {
            startsAt: "F2XXXX00001",
            endsAt: "F2XXXX00031",
            display: "5443126",
          },
          {
            startsAt: "F2XXXX00032",
            endsAt: "F2XXTX00298",
            display: "5792202 (if unavailable, order 5877920)",
          },
          {
            startsAt: "F2XXXX00032",
            endsAt: "F2XXTX99999",
            display: "5877920",
          },
        ],
      },
      {
        id: 3,
        breakPoints: [
          {
            startsAt: "FAXXXE00001",
            endsAt: "FAXXXE99999",
            display: "5759488 (if unavailable, order 5792201)",
          },
          {
            startsAt: "FAXXTE00001",
            endsAt: "FAXXTE99999",
            display: "5792201",
          },
        ],
      },
      {
        id: 4,
        breakPoints: [
          {
            startsAt: "FBXXXE00001",
            endsAt: "FBXXXE99999",
            display: "5759488 (if unavailable, order 5792201)",
          },
          {
            startsAt: "FBXXTE00001",
            endsAt: "FBXXTE99999",
            display: "5792201",
          },
        ],
      },
      {
        id: 5,
        breakPoints: [
          {
            startsAt: "FSXXXX00001",
            endsAt: "FSXXTX99999",
            display: "5443126",
          },
        ],
      },
      {
        id: 6,
        breakPoints: [
          {
            startsAt: "FAHXXX00001",
            endsAt: "FAHXXX00106",
            display: "5458880",
          },
          {
            startsAt: "FAHXXX00107",
            endsAt: "FAHXTX99999",
            display: "5790094",
          },
        ],
      },
      {
        id: 7,
        breakPoints: [
          {
            startsAt: "FBHXXX00001",
            endsAt: "FBHXXX00195",
            display: "5458880",
          },
          {
            startsAt: "FBHXXX00196",
            endsAt: "FBHXTX99999",
            display: "5790094",
          },
        ],
      },
      {
        id: 8,
        breakPoints: [
          {
            startsAt: "FAMHXX00001",
            endsAt: "FAMHXX00009",
            display: "5428385",
          },
          {
            startsAt: "FAMHXX00010",
            endsAt: "FAMHTX99999",
            display: "5786472",
          },
        ],
      },
      {
        id: 9,
        breakPoints: [
          {
            startsAt: "FBMHXX00001",
            endsAt: "FBMHXX00020",
            display: "5428385",
          },
          {
            startsAt: "FBMHXX00021",
            endsAt: "FBMHTX99999",
            display: "5786472",
          },
        ],
      },
    ],
  },
];
