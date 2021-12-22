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
    childrenArray.forEach(function (ojectValue) {
      var normalizedObj = {};
      normalizedObj["id"] = ojectValue.id;
      normalizedObj["name"] = ojectValue.name;

      output[ojectValue.id] = normalizedObj;

      if (ojectValue.children) {
        output[ojectValue.id]["children"] = ojectValue.children.map(function (
          child
        ) {
          return child.id;
        });
        children(ojectValue.children);
      }
    });
  }

  children(Object.values(input));

  return output;
}

console.log(normalize(input));
