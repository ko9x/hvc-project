// I don't think we will go this route but leaving these two here for now
// const data = {items: [{id: 1, name: 'High Voltage Cable', CutInfo: [{}]}, {name: 'ebox'}]};
// const items = [{id: 1, name: 'High Voltage Cable', breakPoints: [{config1: []}], partInformation: [] }];

// The cutInfo object will hold the cutIn information for each configuration of Elite C Arm. ConfigID: 1 is standard 9"
//  Each breakPoint will have an id, startsAt, endsAt, and display. There must be at least one breakPoint for each config.
const cutInfo = [
  {
    configID: 1,
    breakPoints: [
      {
        id: 1,
        startsAt: "F9XXXX00001",
        endsAt: "F9XXXX00034",
        display: "5443126",
      },
      {
        id: 2,
        startsAt: "F9XXXX00035",
        endsAt: "F9XXTX00133",
        display: "5792202 (if unavailable, order 5877920)",
      },
      { id: 3, startsAt: "F9XXXX00035", endsAt: null, display: "5877920" },
    ],
  },
];

// *********************** Info above this line is just brainstorming *******************************************

// The configs object will just show the description of the C based on the 6 digit serial "code"
export const configs = [
  { id: 1, code: "F9XX", description: 'Standard C 9" Image Intensifier' },
  { id: 2, code: "F2XX", description: 'Standard C 12" Image Intensifier' },
  { id: 3, code: "FAXX", description: 'Ergo C 21cm Flat Panel Display' },
  { id: 4, code: "FBXX", description: 'Ergo C 31cm" Flat Panel Display' },
  { id: 5, code: "FSXX", description: 'Super C 9" Image Intensifier' },
  { id: 6, code: "FAHX", description: 'Super C 21cm Flat Panel Display' },
  { id: 7, code: "FBHX", description: 'Super C 31cm Flat Panel Display' },
  { id: 8, code: "FAMH", description: 'Motorized C 21cm Flat Panel Display' },
  { id: 9, code: "FBMH", description: 'Motorized C 31cm Flat Panel Display' },
];

// Here is an example of an itemInfo object that has the information filled out for configs.id 1 which is Standard 9"
export const itemInfo = {
  name: "High Voltage Cable",
  configs: [
    {
      id: 1,
      breakPoints: [
        { startsAt: "F9XXXX00001", endsAt: "F9XXXX00034", display: "5443126" },
        {
          startsAt: "F9XXXX00035",
          endsAt: "F9XXTX00133",
          display: "5792202 (if unavailable, order 5877920)",
        },
        { startsAt: "F9XXXX00035", endsAt: null, display: "5877920" },
      ],
    },
    {
      id: 2,
      breakPoints: [
        { startsAt: "F9XXXX00001", endsAt: "F9XXXX00034", display: "5443126" },
        {
          startsAt: "F9XXXX00035",
          endsAt: "F9XXTX00133",
          display: "5792202 (if unavailable, order 5877920)",
        },
        { startsAt: "F9XXXX00035", endsAt: null, display: "5877920" },
      ],
    },
    {
      id: 3,
      breakPoints: [
        { startsAt: "F9XXXX00001", endsAt: "F9XXXX00034", display: "5443126" },
        {
          startsAt: "F9XXXX00035",
          endsAt: "F9XXTX00133",
          display: "5792202 (if unavailable, order 5877920)",
        },
        { startsAt: "F9XXXX00035", endsAt: null, display: "5877920" },
      ],
    },
    {
      id: 4,
      breakPoints: [
        { startsAt: "F9XXXX00001", endsAt: "F9XXXX00034", display: "5443126" },
        {
          startsAt: "F9XXXX00035",
          endsAt: "F9XXTX00133",
          display: "5792202 (if unavailable, order 5877920)",
        },
        { startsAt: "F9XXXX00035", endsAt: null, display: "5877920" },
      ],
    },
    {
      id: 5,
      breakPoints: [
        { startsAt: "F9XXXX00001", endsAt: "F9XXXX00034", display: "5443126" },
        {
          startsAt: "F9XXXX00035",
          endsAt: "F9XXTX00133",
          display: "5792202 (if unavailable, order 5877920)",
        },
        { startsAt: "F9XXXX00035", endsAt: null, display: "5877920" },
      ],
    },
    {
      id: 6,
      breakPoints: [
        { startsAt: "F9XXXX00001", endsAt: "F9XXXX00034", display: "5443126" },
        {
          startsAt: "F9XXXX00035",
          endsAt: "F9XXTX00133",
          display: "5792202 (if unavailable, order 5877920)",
        },
        { startsAt: "F9XXXX00035", endsAt: null, display: "5877920" },
      ],
    },
    {
      id: 7,
      breakPoints: [
        { startsAt: "F9XXXX00001", endsAt: "F9XXXX00034", display: "5443126" },
        {
          startsAt: "F9XXXX00035",
          endsAt: "F9XXTX00133",
          display: "5792202 (if unavailable, order 5877920)",
        },
        { startsAt: "F9XXXX00035", endsAt: null, display: "5877920" },
      ],
    },
    {
      id: 8,
      breakPoints: [
        { startsAt: "F9XXXX00001", endsAt: "F9XXXX00034", display: "5443126" },
        {
          startsAt: "F9XXXX00035",
          endsAt: "F9XXTX00133",
          display: "5792202 (if unavailable, order 5877920)",
        },
        { startsAt: "F9XXXX00035", endsAt: null, display: "5877920" },
      ],
    },
    {
      id: 9,
      breakPoints: [
        { startsAt: "F9XXXX00001", endsAt: "F9XXXX00034", display: "5443126" },
        {
          startsAt: "F9XXXX00035",
          endsAt: "F9XXTX00133",
          display: "5792202 (if unavailable, order 5877920)",
        },
        { startsAt: "F9XXXX00035", endsAt: null, display: "5877920" },
      ],
    },
  ],
};
