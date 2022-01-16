import { HTMLUnderlineByCharacterIndex } from "../utils/utility";
import { DAYS_OF_WEEK } from "./calendar";

export const SCHEDULE = [
  {
    id: 1,
    value: "Daily",
    displayValue: "Daily",
    endAfter: {
      occurences: 5,
    },
    weeklyRepeatBy: [],
    repeatsEvery: {
      label: HTMLUnderlineByCharacterIndex("days"),
      range: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    display: true,
  },
  {
    id: 2,
    value: "EveryWeekDay",
    displayValue: "Every weekday (Monday to Friday)",
    display: true,
    weeklyRepeatBy: [],
    repeatsEvery: {
      label: HTMLUnderlineByCharacterIndex("weeks"),
      range: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    endAfter: {
      occurences: 35,
    },
  },
  {
    id: 3,
    value: "EveryMonWedFriday",
    displayValue: "Every Monday, Wednesday, and Friday",
    display: true,
    weeklyRepeatBy: [],
    repeatsEvery: {
      label: HTMLUnderlineByCharacterIndex("weeks"),
      range: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    endAfter: {
      occurences: 35,
    },
  },
  {
    id: 4,
    value: "EveryTueThu",
    displayValue: "Every Tuesday and Thursday",
    display: true,
    weeklyRepeatBy: [],
    repeatsEvery: {
      label: HTMLUnderlineByCharacterIndex("weeks"),
      range: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    endAfter: {
      occurences: 35,
    },
  },
  {
    id: 5,
    value: "Weekly",
    displayValue: "Weekly",
    display: true,
    weeklyRepeatBy: DAYS_OF_WEEK,
    repeatsEvery: {
      label: HTMLUnderlineByCharacterIndex("weeks"),
      range: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    endAfter: {
      occurences: 35,
    },
  },
  {
    id: 6,
    value: "Monthly",
    displayValue: "Monthly",
    display: false,
    weeklyRepeatBy: [],
    repeatsEvery: {
      label: "months",
      range: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    endAfter: {
      occurences: 5,
    },
  },
  {
    id: 7,
    value: "Yearly",
    displayValue: "Yearly",
    display: false,
    weeklyRepeatBy: [],
    repeatsEvery: {
      label: "years",
      range: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    endAfter: {
      occurences: 5,
    },
  },
];
export const DEFAULTS={
  TIME_ID:291,
  DEAD_TIME_ID:290
}
export const SCHEDULE_MESSAGES={
  START_TIME:{
    ERROR:`The start time you selected is not available. We've selected you a suitable start time.`
  }
}
