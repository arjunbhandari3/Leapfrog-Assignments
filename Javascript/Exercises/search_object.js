var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" },
];

function searchByName(array, name) {
  return array.filter((fruit) => fruit.name === name);
}

function searchByKey(array, key, value) {
  return array.filter((fruit) => fruit[key] === value);
}

console.log(searchByName(fruits, "Apple"));
console.log(searchByKey(fruits, "name", "Banana"));
