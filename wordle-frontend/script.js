const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "50px sans-serif";
const CORRECT_COLOR = "rgb(108,169,101)"
const ALMOST_COLOR = "rgb(200,182,83)"
const WRONG_COLOR = "rgb(120,124,127)"
const SQUARE_SIZE = 100;
const ROW_GAP = 10;

let correctAnswer = "STARS"







class Square {
  constructor (xCor, yCor){
    this.xCor = xCor;
    this.yCor = yCor;
    this.letter = "";
    this.squareColor = "white";
    this.letterColor = "black";
    this.canvasX = 0;
    this.canvasY = 0;
    this.letterX = 0;
    this.letterY = 0;
  }
}


class Row {
  constructor(index){
    this.index = index;
    this.squares= [];
    this.createSquares();
  }
  createSquares(){
    for ( let i = 0 ; i < 5; i++){
      const newSquare = new Square(i, this.index);
      this.squares.push(newSquare);
    }
  }
}


class Board {
  constructor(answer){
    this.rows = [];
    this.currentLetterIndex = 0;
    this.currentRowIndex = 0;
    this.currentGuess = [];
    this.greenKeys = [];
    this.yellowKeys = [];
    this.answer = [...answer];
    this.answerInfo = [];
    this.indexesAlreadyColored = [];
    this.getAnswerInfo();
    this.createRows();
    this.calculateLocations();
  }
  getAnswerInfo(){
    let info = [];
    let existingLetters = [];
    
    for (const letter of this.answer){
      let count = 0;
      for (const i of this.answer){
        if ( i === letter){
          count ++
        }
      }
      if (!existingLetters.includes(letter)){
        info.push({letter:letter, amount:count});
        existingLetters.push(letter);
      }
      count = 0
    }

    this.answerInfo = info;
    console.log(this.answerInfo + "test")
  }
  
  isHintsAvailable(guess){
    for (let l of this.answerInfo){
      if (l.letter === guess && l.amount > 0){
        return true
      }
    } 
    return false  
  }

  useHint(guess){
    for (let l of this.answerInfo){
      if (l.letter === guess && l.amount > 0){
        l.amount --
      }
    } 
  }

  createRows(){
    for (let i = 0; i < 6; i++){
      const newRow = new Row(i);
      this.rows.push(newRow);
    }
  }

  calculateLocations(){
    for (let i = 0; i < 6; i ++){
      for(let j = 0; j< 5; j ++){
        if (this.rows[i].squares[j].xCor == 0 && this.rows[i].squares[j].yCor == 0){
          this.rows[i].squares[j].canvasX = ROW_GAP
          this.rows[i].squares[j].canvasY = ROW_GAP
          this.rows[i].squares[j].letterX = 40
          this.rows[i].squares[j].letterY = 80
        } 
        else{
          if (this.rows[i].squares[j].xCor == 0){
            this.rows[i].squares[j].canvasX  = ROW_GAP
            this.rows[i].squares[j].letterX = 40
          }else{
            this.rows[i].squares[j].canvasX = ROW_GAP * (this.rows[i].squares[j].xCor + 1) + SQUARE_SIZE * (this.rows[i].squares[j].xCor)
            this.rows[i].squares[j].letterX = 40 + SQUARE_SIZE * this.rows[i].squares[j].xCor + ROW_GAP * this.rows[i].squares[j].xCor
          }
          if (this.rows[i].squares[j].yCor == 0){
            this.rows[i].squares[j].canvasY = ROW_GAP
            this.rows[i].squares[j].letterY = 80
          }else{
            this.rows[i].squares[j].canvasY =  ROW_GAP * (this.rows[i].squares[j].yCor + 1) + SQUARE_SIZE * (this.rows[i].squares[j].yCor)
            this.rows[i].squares[j].letterY = 80 + SQUARE_SIZE * this.rows[i].squares[j].yCor + ROW_GAP * this.rows[i].squares[j].yCor
          }
        }
      }
    } 
  }

  drawBoard(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i <6 ; i++){
      for (let j = 0; j < 5; j++){
        ctx.fillStyle = this.rows[i].squares[j].squareColor;
        ctx.fillRect(this.rows[i].squares[j].canvasX, this.rows[i].squares[j].canvasY, SQUARE_SIZE, SQUARE_SIZE);
        ctx.fillStyle = "black";
        ctx.strokeRect(this.rows[i].squares[j].canvasX, this.rows[i].squares[j].canvasY, SQUARE_SIZE, SQUARE_SIZE);
        ctx.fillStyle = this.rows[i].squares[j].letterColor;
        ctx.fillText(this.rows[i].squares[j].letter, this.rows[i].squares[j].letterX, this.rows[i].squares[j].letterY);
      }
    }    
  }

  guessLetter(letter){
    if (this.currentLetterIndex < 5){
      this.rows[this.currentRowIndex].squares[this.currentLetterIndex].letter = letter;
      this.currentGuess.push(letter);
      this.currentLetterIndex ++;
    }
    this.drawBoard();
  }

  backspace(){
    if (this.currentLetterIndex > 0){
      this.currentLetterIndex --;
      this.currentGuess.pop();
      this.rows[this.currentRowIndex].squares[this.currentLetterIndex].letter = ""; 
    }
    this.drawBoard();
  }



  findGreens(){
    for(let i = 0; i < 5; i++){
      const letter = this.currentGuess[i]
      if (letter === this.answer[i]){
        console.log("this matches and is green")
        this.greenKeys.push(letter)
        this.updateSquare(CORRECT_COLOR, i)
        this.updateKeyboard(letter)
        this.indexesAlreadyColored.push(i);
        this.useHint(letter)

      }
    }
    console.log(this.indexesAlreadyColored);
  }

  findYellows(){
    for(let i =0; i <5; i++){
      const letter = this.currentGuess[i]
      if (!this.indexesAlreadyColored.includes(i) && this.answer.includes(letter) && this.isHintsAvailable(letter) && this.answer[i] != letter){
        console.log("this it a yellow")
        this.yellowKeys.push(letter)
        this.updateSquare(ALMOST_COLOR, i)
        this.updateKeyboard(letter)
        this.indexesAlreadyColored.push(i);
        this.useHint(letter)

      }
    }
  }

  findGrays(){
    for(let i = 0; i < 5; i++){
      const letter = this.currentGuess[i]
      if (!this.indexesAlreadyColored.includes(i) ){
        console.log("grays have been made")
        this.updateSquare(WRONG_COLOR, i)
        this.updateKeyboard(letter)
      }
    }
  }

  updateSquare(color, index){
    this.rows[this.currentRowIndex].squares[index].squareColor = color
    this.rows[this.currentRowIndex].squares[index].letterColor = "white"
    
  }

  guess(){
    if (this.currentLetterIndex === 5){

      //do greens first
      this.findGreens()
      // do yellows next
      this.findYellows()
      //rest is gray
      this.findGrays()

      this.drawBoard();
      this.currentGuess = [];
      this.currentRowIndex ++;
      this.currentLetterIndex = 0;
      this.getAnswerInfo();
      this.indexesAlreadyColored = [];
    }
  }

  updateKeyboard(letter){
    if (!this.greenKeys.includes(letter) && !this.yellowKeys.includes(letter)){
      document.getElementById("key-" + letter).className = "letter-key " + "wrong"
    } else if(this.yellowKeys.includes(letter) && !this.greenKeys.includes(letter)){
      document.getElementById("key-" + letter).className = "letter-key " + "almost"
    } else(
      document.getElementById("key-" + letter).className = "letter-key " + "correct"
    )
    document.getElementById("letter-" + letter).className = "text-white";
  }
}

let board = new Board(correctAnswer);
board.drawBoard();


const letterKeys = document.querySelectorAll('.letter-key');
letterKeys.forEach(key => {
  key.addEventListener("click", () => {
    const letter = key.getAttribute("data-key");
    board.guessLetter(letter);
  });
});

document.querySelectorAll(".function-key").forEach(key => {
  if (key.id === "key-backspace") {
    key.addEventListener("click", () =>{
      board.backspace();
    })
  } else if(key.id === "key-enter"){
    key.addEventListener("click", () =>{
      board.guess();
    })
  }
})




