var input = {
  1: {
    id: 1,
    name: "John",
    children: [
      { id: 2, name: "Sally" },
      {
        id: 3,
        name: "Mark",
        children: [{ id: 4, name: "Harry" }],
      },
    ],
  },
  5: {
    id: 5,
    name: "Mike",
    children: [{ id: 6, name: "Peter" }],
  },
};

function normalize(input) {
  var output = {};

  function children(childrenArray) {
    childrenArray.forEach((objectValue) => {
      var normalizedObj = {};
      normalizedObj["id"] = objectValue.id;
      normalizedObj["name"] = objectValue.name;

      output[objectValue.id] = normalizedObj;

      if (objectValue.children) {
        output[objectValue.id]["children"] = objectValue.children.map(
          (child) => child.id
        );
        children(objectValue.children);
      }
    });
  }

  children(Object.values(input));

  return output;
}

console.log(normalize(input));
