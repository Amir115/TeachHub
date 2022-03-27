import lecturers from "./lecturers";
import {LecturePreview} from "../types";

export default [{
    id: 1,
    name: "lecture",
    topic: "history",
    lecturer: lecturers[0],
    information: "This is a lecture info",
    date: new Date(),
    cost: 10,
    duration: '1h'
},
    {
        id: 2,
        name: "lecture",
        topic: "history",
        lecturer: lecturers[0],
        information: "This is a lecture info",
        date: new Date(),
        cost: 10,
        duration: '1h'
    },
    {
        id: 3,
        name: "lecture",
        topic: "history",
        lecturer: lecturers[0],
        information: "This is a lecture info",
        date: new Date(),
        cost: 10,
        duration: '1h'
    },
    {
        id: 4,
        name: "lecture",
        topic: "history",
        lecturer: lecturers[0],
        information: "This is a lecture info",
        date: new Date(),
        cost: 10,
        duration: '1h'
    },
    {
        id: 5,
        name: "lecture",
        topic: "history",
        lecturer: lecturers[0],
        information: "This is a lecture info",
        date: new Date(),
        cost: 10,
        duration: '1h'
    },
    {
        id: 6,
        name: "lecture",
        topic: "history",
        lecturer: lecturers[0],
        information: "This is a lecture info",
        date: new Date(),
        cost: 10,
        duration: '1h'
    },
    {
        id: 7,
        name: "lecture",
        topic: "history",
        lecturer: lecturers[0],
        information: "This is a lecture info",
        date: new Date(),
        cost: 10,
        duration: '1h'
    },
    {
        id: 8,
        name: 'History Of Sushi',
        topic: 'sushi',
        lecturer: lecturers[1],
        information: 'Sushi (すし, 寿司, 鮨, 鮓, pronounced [sɯɕiꜜ] or [sɯꜜɕi]) is a traditional Japanese dish of prepared vinegared rice (鮨飯, sushi-meshi), usually with some sugar and salt, accompanied by a variety of ingredients (ねた, neta), such as seafood, often raw, and vegetables. Styles of sushi and its presentation vary widely, but the one key ingredient is "sushi rice", also referred to as shari (しゃり), or sumeshi (酢飯).[1]',
        date: new Date(),
        duration: '1h',
        cost: 40
    }
] as LecturePreview[];