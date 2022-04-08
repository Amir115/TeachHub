import lecturers from "./lecturers";
import {LecturePreview} from "../types";

export default [{
  id: 1,
  name: "The art of pizza",
  topic: "history",
  lecturer: lecturers[0],
  information: "Pizza (Italian: [ˈpittsa], Neapolitan: [ˈpittsə]) is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients (such as anchovies, mushrooms, onions, olives, pineapple, meat, etc.), which is then baked at a high temperature, traditionally in a wood-fired oven.[1] A small pizza is sometimes called a pizzetta. A person who makes pizza is known as a pizzaiolo.",
  date: new Date(),
  cost: 10,
  duration: '1h',
  tags: ['history', 'baking'],
  image: '/static/images/lecture1.jpg'
},
  {
    id: 2,
    name: "MasterJS",
    topic: "js",
    lecturer: lecturers[0],
    information: "JavaScript (/ˈdʒɑːvəskrɪpt/),[10] often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.[11] Over 97% of websites use JavaScript on the client side for web page behavior,[12] often incorporating third-party libraries.[13] All major web browsers have a dedicated JavaScript engine to execute the code on users' devices.",
    date: new Date(),
    cost: 10,
    duration: '1h',
    tags: ['JS', 'programming'],
    image: '/static/images/lecture2.jpg'
  },
  {
    id: 3,
    name: "How to make money",
    topic: "money",
    lecturer: lecturers[0],
    information: "Teach and learn about earning and making money. Learn about different ways that people make money in different careers, jobs, and lines of work.\n" +
      "\n" +
      "Practice reading and understanding employee earnings statements, paychecks, time card sheets, income, health insurance, deductions and other lessons related to earning and making money.",
    date: new Date(),
    cost: 10,
    duration: '1h',
    tags: ['economics', 'money'],
    image: '/static/images/lecture3.jpg'
  },
  {
    id: 4,
    name: "Breaking Windows",
    topic: "innovation",
    lecturer: lecturers[0],
    information: "A catalyst for research, our innovation unites academia, private initiatives and government agencies. \n" +
      "\n" +
      "According to the World Economic Forum’s 2016-2017 Global Competitiveness Report , Israel is the second most innovative country in the world. The study ranked 138 countries in terms of competitiveness, and Israel moved up three steps this year, to hold a place in the top 25",
    date: new Date(),
    cost: 10,
    duration: '1h',
    tags: ['innovation', 'high tech'],
    image: '/static/images/lecture4.jpg'
  },
  {
    id: 5,
    name: "All about protein",
    topic: "bodybuilding",
    lecturer: lecturers[0],
    information: "When trying to optimize muscle growth, protein intake is essential. But you are limited by how much protein you can synthesize to repair and grow your muscles. This brings into question the importance of protein timing and amounts and how to best stimulate muscles to grow.",
    date: new Date(),
    cost: 10,
    duration: '1h',
    tags: ['body building', 'sport'],
    image: '/static/images/lecture5.jpg'
  },
  {
    id: 6,
    name: "Technology Over History",
    topic: "history",
    lecturer: lecturers[0],
    information: "Technology is the continually developing result of accumulated knowledge and application in all techniques, skills, methods, and processes used in industrial production and scientific research. Technology is embedded in the operation of all machines, with or without detailed knowledge of their function, for the intended purpose of an organization. The technologies of society consist of what is known as systems.",
    date: new Date(),
    cost: 10,
    duration: '1h',
    tags: ['history', 'technology', 'innovation'],
    image: '/static/images/lecture6.jpg'
  },
  {
    id: 7,
    name: "Chess and Real Estate",
    topic: "real estate",
    lecturer: lecturers[0],
    information: "Real estate is property consisting of land and the buildings on it, along with its natural resources such as crops, minerals or water; immovable property of this nature; an interest vested in this (also) an item of real property, (more generally) buildings or housing in general.[1][2]\n" +
      "\n" +
      "Real estate is different from personal property, which is not permanently attached to the land, such as vehicles, boats, jewelry, furniture, tools and the rolling stock of a farm.",
    date: new Date(),
    cost: 10,
    duration: '1h',
    tags: ['real estate', 'money'],
    image: '/static/images/lecture7.jpg'
  },
  {
    id: 8,
    name: 'History Of Sushi',
    topic: 'sushi',
    lecturer: lecturers[1],
    information: 'Sushi (すし, 寿司, 鮨, 鮓, pronounced [sɯɕiꜜ] or [sɯꜜɕi]) is a traditional Japanese dish of prepared vinegared rice (鮨飯, sushi-meshi), usually with some sugar and salt, accompanied by a variety of ingredients (ねた, neta), such as seafood, often raw, and vegetables. Styles of sushi and its presentation vary widely, but the one key ingredient is "sushi rice", also referred to as shari (しゃり), or sumeshi (酢飯).[1]',
    date: new Date(),
    duration: '2h',
    cost: 40,
    tags: ['history', 'cooking'],
    image: '/static/images/lecture8.jpg'
  }
] as LecturePreview[];