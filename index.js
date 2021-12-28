let tasks = [
  {
    id: 1,
    title: "Git Assignment 1",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Git",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Git/",
  },
  {
    id: 2,
    title: "Git Assignment 2",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/",
  },
  {
    id: 3,
    title: "Lo-fi Designs",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Design/Tutangle-LoFi",
    demo: "",
  },
  {
    id: 4,
    title: "Design Assignment 1:1A-home-search",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Design/tutangle",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Design/tutangle/",
  },
  {
    id: 5,
    title: "Design Assignment 1:1A-home-search-responsive",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Design/Tutangle - responsive",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Design/Tutangle - responsive/",
  },
  {
    id: 6,
    title: "Design Final Project: Foodies (Responsive)",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Design/Foodies",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Design/Foodies/",
  },
  {
    id: 7,
    title: "JS Exercises",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Javascript/Exercises",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Javascript/Exercises/",
  },
  {
    id: 8,
    title: "JS DOM Exercises: scatter-plot",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Javascript/DOM-Exercise/scatter-plot",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Javascript/DOM-Exercise/scatter-plot",
  },
  {
    id: 9,
    title: "JS DOM Exercises: bounce-ball",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Javascript/DOM-Exercise/bounce-ball",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Javascript/DOM-Exercise/bounce-ball",
  },
  {
    id: 10,
    title: "JS DOM Exercises: bounce-ball-OOP",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Javascript/DOM-Exercise/bounce-ball-OOP",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Javascript/DOM-Exercise/bounce-ball-OOP/",
  },
  {
    id: 11,
    title: "Image Carousel",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Javascript/Assignments/ast1",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Javascript/Assignments/ast1/",
  },
  {
    id: 12,
    title: "Image Carousel with Hold Time",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Javascript/Assignments/ast2",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Javascript/Assignments/ast2/",
  },
  {
    id: 13,
    title: "Ball Collission",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Javascript/Assignments/ast3",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Javascript/Assignments/ast3/",
  },
  {
    id: 14,
    title: "Ant Smasher",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Javascript/Assignments/ast3-ant-smasher",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Javascript/Assignments/ast3-ant-smasher/",
  },
  {
    id: 15,
    title: "Car Lane Game",
    code: "https://github.com/arjunbhandari3/Leapfrog-Assignments/tree/master/Javascript/Assignments/ast4",
    demo: "https://arjunbhandari3.github.io/Leapfrog-Assignments/Javascript/Assignments/ast4/",
  },
];

const createRow = ({ id, title, code, demo }) => `
    <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td><a href="${code}" target="_blank"><button class="button button-code">Code</button></a></td>
       ${
         demo != ""
           ? `<td>
             <a href="${demo}" target="_blank">
               <button class="button button-demo">Demo</button>
             </a>
           </td>`
           : `<td></td>`
       }
    </tr>
`;

let newRow = "";

tasks.forEach((row) => {
  newRow += createRow(row);
});

document.querySelector("tbody").innerHTML = newRow;
