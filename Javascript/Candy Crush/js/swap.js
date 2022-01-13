class Swap {
  constructor(selectedCandy, candiesArray) {
    this.selectedCandy = selectedCandy;
    this.candiesArray = candiesArray;
  }

  swapCandies(direction) {
    if (this.selectedCandy.type === "color_bomb") {
      return this.flipCandy(direction);
    } else {
      if (this.checkMatch(direction)) {
        return this.flipCandy(direction);
      } else {
        swapMusic.play();
        return false;
      }
    }
  }

  flipCandy(direction) {
    let swapCandyRow = this.selectedCandy.row;
    let swapCandyCol = this.selectedCandy.column;
    let candyToSwap;
    dropMusic.play();
    if (direction === "left") {
      swapCandyCol = this.selectedCandy.column - 1;
      candyToSwap = this.moveSwappingCandy(swapCandyRow, swapCandyCol);
      candyToSwap.column += 1;
      this.selectedCandy.column -= 1;
    } else if (direction === "right") {
      swapCandyCol = this.selectedCandy.column + 1;
      candyToSwap = this.moveSwappingCandy(swapCandyRow, swapCandyCol);
      candyToSwap.column -= 1;
      this.selectedCandy.column += 1;
    } else if (direction === "up") {
      swapCandyRow = this.selectedCandy.row + 1;
      candyToSwap = this.moveSwappingCandy(swapCandyRow, swapCandyCol);
      candyToSwap.row -= 1;
      this.selectedCandy.row += 1;
    } else if (direction === "down") {
      swapCandyRow = this.selectedCandy.row - 1;
      candyToSwap = this.moveSwappingCandy(swapCandyRow, swapCandyCol);
      candyToSwap.row += 1;
      this.selectedCandy.row -= 1;
    }
    this.resetSwappedPosition(candyToSwap, swapCandyRow, swapCandyCol);
    return [this.selectedCandy, candyToSwap];
  }

  checkMatch(direction) {
    let newArray = this.candiesArray;

    if (direction !== "no-move") {
      let swapCandyCol = this.selectedCandy.column;
      let swapCandyRow = this.selectedCandy.row;

      if (direction === "left") {
        swapCandyCol = this.selectedCandy.column - 1;
      } else if (direction === "right") {
        swapCandyCol = this.selectedCandy.column + 1;
      } else if (direction === "up") {
        swapCandyRow = this.selectedCandy.row + 1;
      } else if (direction === "down") {
        swapCandyRow = this.selectedCandy.row - 1;
      }
      let candyToSwap = newArray[swapCandyCol][swapCandyRow];

      if (candyToSwap.type === "color_bomb") {
        return true;
      } else {
        newArray[this.selectedCandy.column][this.selectedCandy.row] =
          candyToSwap;
        newArray[swapCandyCol][swapCandyRow] = this.selectedCandy;

        let checkMatch = new CheckMatches(newArray);
        if (
          checkMatch.checkThreeMatches("vertical").length === 0 &&
          checkMatch.checkThreeMatches("horizontal").length === 0
        ) {
          newArray = null;
          return false;
        } else {
          newArray = null;
          return true;
        }
      }
    }
  }

  resetSwappedPosition(candyToSwap, swapCandyRow, swapCandyCol) {
    this.candiesArray[swapCandyCol][swapCandyRow] = this.selectedCandy;
    this.selectedCandy.resetPosition();
    candyToSwap.resetPosition();
  }

  moveSwappingCandy(swapCandyRow, swapCandyCol) {
    let candyToSwap = this.candiesArray[swapCandyCol][swapCandyRow];
    this.candiesArray[this.selectedCandy.column][this.selectedCandy.row] =
      candyToSwap;
    return candyToSwap;
  }
}
