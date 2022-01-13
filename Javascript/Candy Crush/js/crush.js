class CheckMatches {
  constructor(candiesArray) {
    this.candiesArray = candiesArray;
    this.isStable = false;
    this.score = 0;
  }

  //* clear all the matched candies until there is no match and brings the candies down
  clearMatchesUntilStable(score, initial, updateScore, onCandiesClear) {
    this.score = score;

    while (!this.isStable) {
      let h3 = this.checkThreeMatches("horizontal");
      this.clearMatchedCandies(initial, updateScore, h3, "horizontal");
      let v3 = this.checkThreeMatches("vertical");
      this.clearMatchedCandies(initial, updateScore, v3, "vertical");
      let h4 = this.checkFourMatches("horizontal");
      this.clearMatchedCandies(initial, updateScore, h4, "horizontal");
      let v4 = this.checkFourMatches("vertical");
      this.clearMatchedCandies(initial, updateScore, v4, "vertical");
      let h5 = this.checkFiveMatches("horizontal");
      this.clearMatchedCandies(initial, updateScore, h5, "horizontal");
      let v5 = this.checkFiveMatches(3, "vertical");
      this.clearMatchedCandies(initial, updateScore, v5, "vertical");

      let match = h5.concat(v5, h4, v4, h3, v3);
      if (match.length === 0) {
        if (initial === false) {
          onCandiesClear();
        }
        this.isStable = true;
      }
    }
  }

  //*check the match of three candies
  checkThreeMatches(move) {
    // match represents match in overall grid
    let match = [];

    for (let i = 0; i < this.candiesArray.length; i++) {
      // group represent matches in a row or a column
      let group = [];
      for (let j = 0; j < this.candiesArray[i].length - 2; j++) {
        if (move === "vertical") {
          if (
            this.candiesArray[i][j].color ===
              this.candiesArray[i][j + 1].color &&
            this.candiesArray[i][j + 1].color ===
              this.candiesArray[i][j + 2].color
          ) {
            group.push([
              { row: j, col: i },
              { row: j + 1, col: i },
              { row: j + 2, col: i },
            ]);
          }
        } else if (move === "horizontal") {
          if (
            this.candiesArray[j][i].color ===
              this.candiesArray[j + 1][i].color &&
            this.candiesArray[j + 1][i].color ===
              this.candiesArray[j + 2][i].color
          ) {
            group.push([
              { row: i, col: j },
              { row: i, col: j + 1 },
              { row: i, col: j + 2 },
            ]);
          }
        }
      }
      group = this.removeRepeatedGroups(group, move);
      if (group.length !== 0) match.push(group);
    }
    return match;
  }

  //*check the match of four candies
  checkFourMatches(move) {
    let match = [];

    for (let i = 0; i < this.candiesArray.length; i++) {
      let group = [];
      for (let j = 0; j < this.candiesArray[i].length - 3; j++) {
        if (move === "vertical") {
          if (
            this.candiesArray[i][j].color ===
              this.candiesArray[i][j + 1].color &&
            this.candiesArray[i][j + 1].color ===
              this.candiesArray[i][j + 2].color &&
            this.candiesArray[i][j + 2].color ===
              this.candiesArray[i][j + 3].color
          ) {
            group.push([
              { row: j, col: i },
              { row: j + 1, col: i },
              { row: j + 2, col: i },
              { row: j + 3, col: i },
            ]);
          }
        } else if (move === "horizontal") {
          if (
            this.candiesArray[j][i].color ===
              this.candiesArray[j + 1][i].color &&
            this.candiesArray[j + 1][i].color ===
              this.candiesArray[j + 2][i].color &&
            this.candiesArray[j + 2][i].color ===
              this.candiesArray[j + 3][i].color
          ) {
            group.push([
              { row: i, col: j },
              { row: i, col: j + 1 },
              { row: i, col: j + 2 },
              { row: i, col: j + 3 },
            ]);
          }
        }
      }
      group = this.removeRepeatedGroups(group, move);
      if (group.length !== 0) match.push(group);
    }
    return match;
  }

  //*clear the matched of 5 candies
  checkFiveMatches(move) {
    let match = [];

    for (let i = 0; i < this.candiesArray.length; i++) {
      let group = [];
      for (let j = 0; j < this.candiesArray[i].length - 4; j++) {
        if (move === "vertical") {
          if (
            this.candiesArray[i][j].color ===
              this.candiesArray[i][j + 1].color &&
            this.candiesArray[i][j + 1].color ===
              this.candiesArray[i][j + 2].color &&
            this.candiesArray[i][j + 2].color ===
              this.candiesArray[i][j + 3].color &&
            this.candiesArray[i][j + 3].color ===
              this.candiesArray[i][j + 4].color
          ) {
            group.push([
              { row: j, col: i },
              { row: j + 1, col: i },
              { row: j + 2, col: i },
              { row: j + 3, col: i },
              { row: j + 4, col: i },
            ]);
          }
        } else if (move === "horizontal") {
          if (
            this.candiesArray[j][i].color ===
              this.candiesArray[j + 1][i].color &&
            this.candiesArray[j + 1][i].color ===
              this.candiesArray[j + 2][i].color &&
            this.candiesArray[j + 2][i].color ===
              this.candiesArray[j + 3][i].color &&
            this.candiesArray[j + 3][i].color ===
              this.candiesArray[j + 4][i].color
          ) {
            group.push([
              { row: i, col: j },
              { row: i, col: j + 1 },
              { row: i, col: j + 2 },
              { row: i, col: j + 3 },
              { row: i, col: j + 4 },
            ]);
          }
        }
      }

      group = this.removeRepeatedGroups(group, move);

      if (group.length !== 0) match.push(group);
    }
    return match;
  }

  //* remove repeated groups
  removeRepeatedGroups(group, move) {
    let repeatIndex = [];
    for (let i = 0; i < group.length - 1; i++) {
      if (move === "horizontal") {
        if (group[i][group[i].length - 1].col >= group[i + 1][0].col) {
          repeatIndex.push(i + 1);
        }
      } else {
        console.log(group);
        if (group[i][group[i].length - 1].row >= group[i + 1][0].row) {
          repeatIndex.push(i + 1);
        }
      }
    }

    for (let i = 0; i < repeatIndex; i++) {
      group.splice(repeatIndex[i], 1);
    }

    return group;
  }

  //* remove the matched candies
  clearMatchedCandies(initial, updateScore, match, move) {
    for (let group of match) {
      for (let matchObject of group) {
        let col = matchObject[0].col;
        let row = matchObject[0].row;
        let stripedCandy = null;

        for (let obj of matchObject) {
          if (
            this.candiesArray[obj.col][obj.row].type === "verticallyStriped"
          ) {
            stripedCandy = this.candiesArray[obj.col][obj.row];
            stripedCandy.image = new Image();
            stripedCandy.image.src = `../images/${stripedCandy.color}-striped-vertical.png`;
            console.log("stripedCandy", stripedCandy);
          } else if (
            this.candiesArray[obj.col][obj.row].type === "horizontallyStriped"
          ) {
            stripedCandy = this.candiesArray[obj.col][obj.row];
            stripedCandy.image = new Image();
            stripedCandy.image.src = `../images/${stripedCandy.color}-striped-horizontal.png`;
            console.log("stripedCandy", stripedCandy);
          }
        }

        this.bringCandiesDown(
          initial,
          updateScore,
          row,
          col,
          matchObject.length,
          stripedCandy,
          move
        );
        scoreContainer.innerHTML = this.score;
        if (stripedCandy !== null) {
          console.log(stripedCandy, "stripedCandy");
          this.addNewCandies(stripedCandy.type, stripedCandy.color);
        } else {
          this.addNewCandies();
        }
      }
    }
  }

  // * bring the candies down
  bringCandiesDown(
    initial,
    updateScore,
    row,
    col,
    matchObjectLength,
    stripedCandy,
    move
  ) {
    // vertical match
    if (move === "vertical") {
      // striped candy present in the match
      if (stripedCandy) {
        if (stripedCandy.type === "verticallyStriped") {
          for (let candy of this.candiesArray[stripedCandy.column]) {
            if (candy.type === "horizontallyStriped") {
              this.removeRowCandies(candy.row);
              this.resetUpperCandiesPosition(candy.row);
            }
          }
          this.candiesArray[stripedCandy.column] = [];
          this.score += 8;
        }
        // striped candy is horizontally striped
        else {
          for (let column of this.candiesArray) {
            if (this.candiesArray.findIndex((val) => val === column) !== col) {
              if (column[stripedCandy.row].type === "verticallyStriped") {
                column = [];
                this.score += 8;
              } else {
                column.splice(stripedCandy.row, 1);
                this.score += 1;
                for (let j = stripedCandy.row; j < column.length; j++) {
                  column[j].row = j;
                  column[j].isMoving = true;
                }
              }
            }
          }
          this.removeColumnCandies(row, col, matchObjectLength);
          this.resetUpperColumnCandies(row, col);
        }
      }
      // striped candy not present in the match
      else {
        if (
          matchObjectLength === 4 &&
          initial === false &&
          move === "vertical"
        ) {
          this.candiesArray[col][row].type = "verticallyStriped";
          this.removeColumnCandies(
            row + 1,
            col,
            matchObjectLength - 1,
            initial
          );
        } else if (
          matchObjectLength === 4 &&
          initial === false &&
          move === "horizontal"
        ) {
          this.candiesArray[col][row].type = "horizontallyStriped";
          this.removeColumnCandies(
            row + 1,
            col,
            matchObjectLength - 1,
            initial
          );
        } else if (matchObjectLength === 5 && initial === false) {
          this.candiesArray[col][row].type = "color_bomb";
          this.candiesArray[col][row].color = "bomb";
          this.removeColumnCandies(
            row + 1,
            col,
            matchObjectLength - 1,
            initial
          );
        } else {
          this.removeColumnCandies(row, col, matchObjectLength, initial);
        }

        for (let k = row; k < this.candiesArray[col].length; k++) {
          if (
            (matchObjectLength === 4 || matchObjectLength === 5) &&
            initial === false
          ) {
            if (k >= row + 1) {
              this.candiesArray[col][k].row = k;
              this.candiesArray[col][k].isMoving = true;
            }
          } else {
            this.candiesArray[col][k].row = k;
            this.candiesArray[col][k].isMoving = true;
          }
        }
      }
    }
    // horizontal match
    else {
      if (stripedCandy) {
        if (stripedCandy.type === "verticallyStriped") {
          for (let candy of this.candiesArray[stripedCandy.column]) {
            if (candy !== stripedCandy) {
              if (candy.type === "horizontallyStriped") {
                this.removeRowCandies(candy.row);
                this.resetUpperCandiesPosition(candy.row);
              }
            }
          }

          this.candiesArray[stripedCandy.column] = [];
          this.score += 8;

          for (let j = col; j < col + matchObjectLength; j++) {
            if (j !== stripedCandy.column) {
              this.candiesArray[j].splice(row, 1);
              this.score += 1;
            }
          }
          for (let j = col; j < col + matchObjectLength; j++) {
            if (j !== stripedCandy.column) {
              this.resetUpperColumnCandies(row, j);
            }
          }
        }
        // candy is horizontally striped
        else {
          for (let column of this.candiesArray) {
            if (column[stripedCandy.row].type === "verticallyStriped") {
              column.splice(0, 8);
              this.score += 8;
            }
          }
          for (let column of this.candiesArray) {
            if (column[stripedCandy.row]) {
              column.splice(stripedCandy.row, 1);
              this.score += 1;
            }
          }

          for (let column of this.candiesArray) {
            if (column[stripedCandy.row]) {
              this.resetUpperColumnCandies(
                stripedCandy.row,
                this.candiesArray.findIndex((val) => val === column)
              );
            }
          }
        }
      }
      // striped candy not present in the match
      else {
        for (let j = col; j < col + matchObjectLength; j++) {
          if (j === col) {
            if (matchObjectLength === 4 && initial === false) {
              console.log(this.candiesArray[j][row], "arjun");
              this.candiesArray[j][row].type = `${move}lyStriped`;
              this.candiesArray[j][row].image = new Image();
              this.candiesArray[j][
                row
              ].image.src = `../images/${this.candiesArray[j][row].color}-striped-${move}.png`;
              this.score += 1;
            } else if (matchObjectLength === 5 && initial === false) {
              this.candiesArray[j][row].color = "all_color";
              this.candiesArray[j][row].type = "bomb";
              this.candiesArray[j][row].image = new Image();
              this.candiesArray[j][row].image.src = `../images/bomb.png`;
              this.score += 1;
            } else {
              this.candiesArray[j].splice(row, 1);
            }
          } else {
            this.candiesArray[j].splice(row, 1);
          }

          if (initial === false) {
            this.score += 1;
          }
        }

        for (let j = col; j < col + matchObjectLength; j++) {
          for (let i = row; i < this.candiesArray[j].length; i++) {
            if (
              (matchObjectLength === 4 || matchObjectLength === 5) &&
              initial === false
            ) {
              if (j !== col) {
                this.candiesArray[j][i].row = i;
                this.candiesArray[j][i].isMoving = true;
              }
            } else {
              this.candiesArray[j][i].row = i;
              this.candiesArray[j][i].isMoving = true;
            }
          }
        }
      }
    }
    if (initial === false) {
      updateScore(this.score);
    }
  }

  //* remove row candies in the array
  removeRowCandies(row) {
    for (let column of this.candiesArray) {
      column.splice(row, 1);
      this.score += 1;
    }
  }

  //* remove column candies in the array
  removeColumnCandies(row, col, matchObjectLength, initial) {
    this.candiesArray[col].splice(row, matchObjectLength);
    if (initial === false) {
      this.score += matchObjectLength;
    }
  }

  //* reset position of upper row candies in the array
  resetUpperCandiesPosition(row) {
    for (let i = 0; i < this.candiesArray.length; i++) {
      for (let j = row; j < this.candiesArray[i].length; j++) {
        this.candiesArray[i][j].row = j;
        this.candiesArray[i][j].isMoving = true;
      }
    }
  }

  //* reset position of upper column candies in the array
  resetUpperColumnCandies(row, col) {
    for (let j = row; j < this.candiesArray[col].length; j++) {
      this.candiesArray[col][j].row = j;
      this.candiesArray[col][j].isMoving = true;
    }
  }

  //* add new candies to the array
  addNewCandies(type = "solid", color) {
    for (let j = 0; j < 8; j++) {
      let len = this.candiesArray[j].length;
      for (let i = this.candiesArray[j].length; i < 8; i++) {
        let candyObj = new Candy().getRandomCandy(type, color);
        // the candy to be filled in the first vacant row of a column will be situated just above the canvas
        let startY = Math.abs(7 - (i + (8 - len))) * GRID_HEIGHT;
        let startX = j * GRID_WIDTH + CANDY_PADDING;
        candyObj.image.id = `${i}-${j}`;
        let candy = new Candy(
          candyObj.color,
          candyObj.type,
          candyObj.image,
          startX,
          startY,
          i,
          j,
          true
        );
        this.candiesArray[j].push(candy);
      }
    }
  }

  //* if there is color bomb, remove all candies and add new candies
  handleColorBomb(swap, score, updateScore) {
    this.score = score;
    this.updateScore = updateScore;

    if (swap[0].type === "color_bomb") {
      this.candiesArray[swap[0].column].splice(swap[0].row, 1);
      this.score += 1;
      this.removeCandiesOfColor(swap[1].color);
    } else {
      this.candiesArray[swap[1].column].splice(swap[1].row, 1);
      this.score += 1;
      this.removeCandiesOfColor(swap[0].color);
    }

    scoreContainer.innerHTML = this.score;

    this.addNewCandies();
  }

  //* remove all candies of a color
  removeCandiesOfColor(color) {
    // get the row and col of the same colored candies
    let splicedCandy = [];
    for (let j = 0; j < this.candiesArray.length; j++) {
      let rows = [];
      splicedCandy.push({ rows: rows, col: j });
      for (let i = 0; i < this.candiesArray[j].length; i++) {
        if (this.candiesArray[j][i].color === color) {
          rows.push(i);
        }
      }
    }

    // remove all the same colored candies
    for (let obj of splicedCandy) {
      if (obj.rows.length > 0) {
        let len = obj.rows.length;
        for (let k = 0; k < len; k++) {
          this.candiesArray[obj.col].splice(obj.rows[k], 1);
          this.score += 1;
          console.log("score", this.score);
          for (let m = k + 1; m < len; m++) {
            obj.rows[m] -= 1;
          }
        }
      }
    }

    this.updateScore(this.score);

    // bring the upper candies down
    for (let j = 0; j < this.candiesArray.length; j++) {
      this.resetUpperColumnCandies(0, j);
    }
  }
}
