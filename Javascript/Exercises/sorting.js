var arr = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Mary",
  },
  {
    id: 3,
    name: "Andrew",
  },
];

function sortBy(array, key) {
  let newArray = array.map((val) => val);

  let temp;
  for (let i = 0; i < newArray.length; i++) {
    for (let j = i; j < newArray.length; j++) {
      if (newArray[i][key] > newArray[j][key]) {
        temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
      }
    }
  }
  return newArray;
}

var sorted = sortBy(arr, "name");

console.log("Sorted Array:", sorted);
console.log("Original Array:", arr);
