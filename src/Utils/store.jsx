import A from "../assets/images/A.png";
import B from "../assets/images/B.png";
import C from "../assets/images/C.png";
import one from "../assets/images/one.png";
import two from "../assets/images/two.png";
import three from "../assets/images/three.png";

import rat from "../assets/images/rat.jpg";
import rabbit from "../assets/images/rabbit.jpg";
import cat from "../assets/images/cat.jpg";
import police from "../assets/images/police.png";
import school from "../assets/images/school.png";
import playground from "../assets/images/playground.jpg";
import html from "../assets/images/html.png";
import css from "../assets/images/css.png";
import JS from "../assets/images/javascript.png";

export const dataOfLesson1 = [
  {
    qid: "1",
    question: "Q-1. 4+5=?",
    answer: "9",
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    answeredByStudent: "",
  },
  {
    qid: "2",
    question: "Q-2. 4*6=?",
    answer: "24",
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    answeredByStudent: "",
  },
  {
    qid: "3",
    question: "Q-3. 4-7=?",
    answer: "-3",
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    answeredByStudent: "",
  },
  {
    qid: "4",
    question: "Q-4. 8/4=?",
    answer: "2",
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    answeredByStudent: "",
  },
  {
    qid: "5",
    question: "Q-5. 4*4+4=?",
    answer: "20",
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    answeredByStudent: "",
  },
];
export const dataOfLesson2 = [
  {
    qid: "1",
    question: "Q-1. Capital Of USA ?",
    isVisited: false,
    answer: "Washington DC",
    Options: ["New York", "Washington DC", "Los Angeles"],
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    answeredByStudent: "",
  },

  {
    qid: "2",
    question: "Q-2. Delhi is  the Capital of ?",

    answer: "India",
    Options: ["India", "France", "China"],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    answeredByStudent: "",
    natureOfAttempt: "",
  },
  {
    qid: "3",
    question: "Q-3. Most Populated country in world",

    answer: "India",
    Options: ["China", "India", "USA"],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    answeredByStudent: "",
    natureOfAttempt: "",
  },
  {
    qid: "4",
    question: "Q-4. Zero was invented by which country",

    answer: "India",
    Options: ["China", "India", "USA"],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    answeredByStudent: "",
    natureOfAttempt: "",
  },
  {
    qid: "5",
    question: "Q-5. Longest river in World",
    answer: "Nile",
    Options: ["Amazon River", "Nile", "Mississippi River"],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    answeredByStudent: "",

    natureOfAttempt: "",
  },
];

export const dataOfLesson3 = [
  {
    qid: "1",
    question: "Q-1. Select the numbers, that is  divisible by 5",
    Options: ["20", "40", "3", "8", "60"],
    answer: ["20", "40", "60"],
    optionsSelected: {
      "20": false,
      "40": false,
      "3": false,
      "8": false,
      "60": false,
    },
    answeredByStudent: [],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },
  {
    qid: "2",
    question: "Q-2. Select the numbers That is  divisible by 10",
    Options: ["20", "4", "50", "8", "60"],
    answer: ["20", "50", "60"],
    optionsSelected: {
      "20": false,
      "4": false,
      "50": false,
      "8": false,
      "60": false,
    },
    answeredByStudent: [],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },
  {
    qid: "3",
    question: "Q-3. Select the numbers That is  divisible by 15",

    Options: ["20", "45", "55", "58", "60"],
    answer: ["45", "60"],

    optionsSelected: {
      "20": false,
      "45": false,
      "55": false,
      "58": false,
      "60": false,
    },

    answeredByStudent: [],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },
  {
    qid: "3",
    question: "Q-3. Select the numbers That is  divisible by 15",

    Options: ["20", "45", "55", "58", "60"],
    answer: ["45", "60"],

    optionsSelected: {
      "20": false,
      "45": false,
      "55": false,
      "58": false,
      "60": false,
    },

    answeredByStudent: [],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },
  {
    qid: "5",
    question: "Q-5. Select the numbers That is  divisible by 2",

    Options: ["2", "4", "5", "8", "6"],
    answer: ["2", "4", "6", "8"],

    optionsSelected: {
      "2": false,
      "4": false,
      "5": false,
      "8": false,
      "6": false,
    },

    answeredByStudent: [],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },
];

export const dataOfLesson4 = [
  {
    qid: "1",
    question: "Sort All below in Alphabatically increasing order",
    Options: ["A", "B", "D", "C"],
    answer: ["A", "B", "C", "D"],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },

  {
    qid: "2",
    question: "Sort All below in ascending order",
    Options: ["10", "20", "40", "30"],

    answer: ["10", "20", "30", "40"],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },

  {
    qid: "3",
    question: "Sort All below in descending order",
    Options: ["10", "20", "40", "30"],
    answer: ["40", "30", "20", "10"],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },
  {
    qid: "4",
    question: "Sort All below in descending order",
    Options: ["10", "20", "40", "30"],
    answer: ["40", "30", "20", "10"],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },

  {
    qid: "5",
    question: "Sort All below in Alphabatically decreasing order",
    Options: ["10", "20", "40", "30"],
    answer: ["40", "30", "20", "10"],
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },
];
export const dataOfLesson5 = [
  {
    qid: "1",
    question: "Match the options",
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    fixedOptions: ["A", "B", "C"],
    answeredByStudent: [],

    DragabbleOptions: [
      {
        img: B,
        type: "B",
      },
      {
        img: C,
        type: "C",
      },
      {
        img: A,
        type: "A",
      },
    ],
  },
  {
    qid: "2",
    question: "Match the options",
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    fixedOptions: ["1", "2", "3"],
    answeredByStudent: [],

    DragabbleOptions: [
      {
        img: two,
        type: "2",
      },
      {
        img: three,
        type: "3",
      },
      {
        img: one,
        type: "1",
      },
    ],
  },

  {
    qid: "3",
    question: "Match the options",
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    fixedOptions: ["rat", "rabbit", "cat"],
    answer: [],

    DragabbleOptions: [
      {
        img: rabbit,
        type: "rabbit",
      },
      {
        img: cat,
        type: "cat",
      },
      {
        img: rat,
        type: "rat",
      },
    ],
  },
  {
    qid: "4",
    question: "Match the options",
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    fixedOptions: ["school", "police", "ground"],
    answeredByStudent: [],

    DragabbleOptions: [
      {
        img: police,
        type: "police",
      },
      {
        img: school,
        type: "school",
      },
      {
        img: playground,
        type: "ground",
      },
    ],
  },

  {
    qid: "5",
    question: "Match the options",
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    fixedOptions: ["JS", "CSS", "HTML"],
    answeredByStudent: [],

    DragabbleOptions: [
      {
        img: html,
        type: "HTML",
      },
      {
        img: css,
        type: "CSS",
      },
      {
        img: JS,
        type: "JS",
      },
    ],
  },
];

export const dataOfLesson6 = [
  {
    qid: "1",
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
    answeredByStudent: [],

    question: "Fill in the Blank",
    sentance: "I  _  to  *  Cricket $",
    Options: ["like", "alot", "watch", "bath", "eat"],
    answer: ["like", "watch", "alot"],
    wordsOrder: { like: "", watch: "", alot: "" },
  },

  {
    qid: "2",
    question: "Fill in the Blank",
    sentance: "I study in _",
    Options: ["field", "school", "playground"],
    answeredByStudent: [],
    answer: ["school"],
    wordsOrder: { school: "" },

    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },
  {
    qid: "3",
    question: "Fill in the Blank",
    sentance: "I play in _",
    Options: ["forest", "school", "playground"],
    answeredByStudent: [],
    answer: ["playground"],
    wordsOrder: { playground: "" },

    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },

  {
    qid: "4",
    question: "Fill in the Blank",
    sentance: "I _ watching movie before * ",
    Options: ["study", "was", "cat"],
    answeredByStudent: [],
    answer: ["was", "study"],
    wordsOrder: { study: "", was: "" },
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },

  {
    qid: "5",
    question: "Fill in the Blank",
    sentance: "I _ studying right * ",
    Options: ["was", "am", "now"],
    answeredByStudent: [],
    answer: ["am", "now"],
    wordsOrder: { am: "", now: "" },
    isVisited: false,
    isFlag: false,
    noOfAttempts: 7,
    natureOfAttempt: "",
  },
];
