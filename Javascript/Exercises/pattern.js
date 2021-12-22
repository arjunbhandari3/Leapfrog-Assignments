function pattern(n) {
  let star = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      star += "*";
    }
    star += "\n";
  }
  return star;
}
console.log(pattern(5));
