const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
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
    this.keysToReset = new Set([]);
    this.answerText = answer;
    this.answer = [...answer];
    this.answerInfo = [];
    this.indexesAlreadyColored = [];
    this.getAnswerInfo();
    this.createRows();
    this.calculateLocations();
    this.guessedCorrect = false;
    this.gameOver = false;
    this.showValuesInConsole = false
    this.printValuesToConsole();
  }

  printValuesToConsole(){
    if(this.showValuesInConsole){
      console.log("this.rows: ",this.rows)  
      console.log("this.currentLetterIndex: ",this.currentLetterIndex)
      console.log("this.currentRowIndex: ",this.currentRowIndex)
      console.log("this.currentGuess: ",this.currentGuess)  
      console.log("this.greenKeys: ",this.greenKeys)  
      console.log("this.yellowKeys: ",this.yellowKeys)  
      console.log("this.keysToReset: ",this.keysToReset)
      console.log("this.answerText: ", this.answerText)
      console.log("this.guessedCorrect: ", this.guessedCorrect)
      console.log("this.answer: ",this.answer)
      console.log("this.answerInfo: ",this.answerInfo)
      console.log("this.indexesAlreadyColored: ",this.indexesAlreadyColored)  
      console.log("this.gameOver: ",this.gameOver)
    }
  }


  resetKeys(){
    this.keysToReset.forEach((letter) =>{
      document.getElementById("key-" + letter).className = "letter-key " + "neutral"
      document.getElementById("letter-" + letter).className = "key-text";
    })
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

  isGuessCorrect(){
    for (let i = 0; i < 5; i++){
      if (this.currentGuess[i] !== this.answer[i]){
        return false
      }
    }
    this.guessedCorrect = true;
    return true
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
    ctx.font = "50px sans-serif";
    
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
    this.printValuesToConsole();
  }

  drawNewGamePrompt(){
    ctx.font = "42px sans-serif";
    if (!this.guessedCorrect){
      ctx.fillStyle = "rgb(0,0,0)"
      ctx.fillRect(canvas.width/2 - SQUARE_SIZE, SQUARE_SIZE/2, SQUARE_SIZE * 2, SQUARE_SIZE)
      ctx.fillStyle = "white";
      ctx.fillText(this.answerText, canvas.width/2 - SQUARE_SIZE + ROW_GAP * 3, SQUARE_SIZE + ROW_GAP * 2);
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.86)"
    ctx.fillRect(0,canvas.height / 2 - (SQUARE_SIZE/2), canvas.width, SQUARE_SIZE);
    ctx.strokeRect(0,canvas.height / 2 - (SQUARE_SIZE/2), canvas.width, SQUARE_SIZE);
    ctx.fillStyle = "black";
    ctx.fillText("Click the board to play again!", ROW_GAP, canvas.height / 2 + ROW_GAP);


  }



  newGamePrompt(){
    this.gameOver = true;
    this.drawNewGamePrompt();

  }

  guessLetter(letter){
    if (this.currentLetterIndex < 5 && !this.gameOver){
      this.rows[this.currentRowIndex].squares[this.currentLetterIndex].letter = letter;
      this.currentGuess.push(letter);
      this.currentLetterIndex ++;
      this.drawBoard();
    }
  }

  backspace(){
    if (this.currentLetterIndex > 0 && !this.gameOver){
      this.currentLetterIndex --;
      this.currentGuess.pop();
      this.rows[this.currentRowIndex].squares[this.currentLetterIndex].letter = ""; 
      this.drawBoard();
    }
  }



  findGreens(){
    for(let i = 0; i < 5; i++){
      const letter = this.currentGuess[i]
      if (letter === this.answer[i]){
        this.greenKeys.push(letter)
        this.updateSquare(CORRECT_COLOR, i)
        this.updateKeyboard(letter)
        this.indexesAlreadyColored.push(i);
        this.useHint(letter)
      }
    }
  }

  findYellows(){
    for(let i =0; i <5; i++){
      const letter = this.currentGuess[i]
      if (!this.indexesAlreadyColored.includes(i) && this.answer.includes(letter) && this.isHintsAvailable(letter) && this.answer[i] != letter){
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
    if (this.currentLetterIndex === 5 && !this.gameOver){

      //do greens first
      this.findGreens()
      // do yellows next
      this.findYellows()
      //rest is gray
      this.findGrays()

      this.drawBoard();

      if (this.isGuessCorrect() || this.currentRowIndex === 5){
        console.log("newgame")
        this.newGamePrompt();
      }else{
        //reset values for next guess
        this.currentGuess = [];
        this.currentRowIndex ++;
        this.currentLetterIndex = 0;
        this.getAnswerInfo();
        this.indexesAlreadyColored = [];

      }

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
    this.keysToReset.add(letter)

  }
}

let board = new Board(correctAnswer);
board.drawBoard();

function newGame(answer){
  board.resetKeys();
  board = new Board(answer)
  board.drawBoard();
}


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

canvas.addEventListener('click', function(event){
  if (board.gameOver){
    newGame("GHOST")

  }
})




