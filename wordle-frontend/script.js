const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const CORRECT_COLOR = "rgb(97, 160, 72)"
const ALMOST_COLOR = "rgb(207, 192, 53)"
const WRONG_COLOR = "grey"
const SQUARE_SIZE = 100;
const ROW_GAP = 10;








function drawBoard(){
  ctx.reset();
  // row 1 

  ctx.rect(ROW_GAP,ROW_GAP,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 2 + SQUARE_SIZE ,ROW_GAP,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 3 + SQUARE_SIZE * 2,ROW_GAP,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 4 + SQUARE_SIZE * 3,ROW_GAP,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 5 + SQUARE_SIZE * 4,ROW_GAP,SQUARE_SIZE, SQUARE_SIZE);
  
  //row 2

  ctx.rect(ROW_GAP,ROW_GAP * 2 + SQUARE_SIZE ,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 2 + SQUARE_SIZE ,ROW_GAP * 2 + SQUARE_SIZE ,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 3 + SQUARE_SIZE * 2,ROW_GAP * 2 + SQUARE_SIZE ,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 4 + SQUARE_SIZE * 3,ROW_GAP * 2 + SQUARE_SIZE ,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 5 + SQUARE_SIZE * 4,ROW_GAP * 2 + SQUARE_SIZE ,SQUARE_SIZE, SQUARE_SIZE);
  
  //row 3
  ctx.rect(ROW_GAP,ROW_GAP * 3 + SQUARE_SIZE * 2,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 2 + SQUARE_SIZE ,ROW_GAP * 3 + SQUARE_SIZE * 2,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 3 + SQUARE_SIZE * 2,ROW_GAP * 3 + SQUARE_SIZE * 2,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 4 + SQUARE_SIZE * 3,ROW_GAP * 3 + SQUARE_SIZE * 2,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 5 + SQUARE_SIZE * 4,ROW_GAP * 3 + SQUARE_SIZE * 2,SQUARE_SIZE, SQUARE_SIZE);
  
  //row 4
  ctx.rect(ROW_GAP,ROW_GAP * 4 + SQUARE_SIZE * 3,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 2 + SQUARE_SIZE ,ROW_GAP * 4 + SQUARE_SIZE * 3,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 3 + SQUARE_SIZE * 2,ROW_GAP * 4 + SQUARE_SIZE * 3,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 4 + SQUARE_SIZE * 3,ROW_GAP * 4 + SQUARE_SIZE * 3,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 5 + SQUARE_SIZE * 4,ROW_GAP * 4 + SQUARE_SIZE * 3,SQUARE_SIZE, SQUARE_SIZE);
  
  //row 5
  ctx.rect(ROW_GAP,ROW_GAP * 5 + SQUARE_SIZE * 4,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 2 + SQUARE_SIZE ,ROW_GAP * 5 + SQUARE_SIZE * 4,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 3 + SQUARE_SIZE * 2,ROW_GAP * 5 + SQUARE_SIZE * 4,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 4 + SQUARE_SIZE * 3,ROW_GAP * 5 + SQUARE_SIZE * 4,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 5 + SQUARE_SIZE * 4,ROW_GAP * 5 + SQUARE_SIZE * 4,SQUARE_SIZE, SQUARE_SIZE);
  
  //row 6
  ctx.rect(ROW_GAP,ROW_GAP * 6 + SQUARE_SIZE * 5,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 2 + SQUARE_SIZE ,ROW_GAP * 6 + SQUARE_SIZE * 5,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 3 + SQUARE_SIZE * 2,ROW_GAP * 6 + SQUARE_SIZE * 5,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 4 + SQUARE_SIZE * 3,ROW_GAP * 6 + SQUARE_SIZE * 5,SQUARE_SIZE, SQUARE_SIZE);
  ctx.rect(ROW_GAP * 5 + SQUARE_SIZE * 4,ROW_GAP * 6 + SQUARE_SIZE * 5,SQUARE_SIZE, SQUARE_SIZE);

  ctx.stroke();
}



function colorSquare(xCor, yCor, color){

  const colors = ["grey", "green", "yellow"]

  if (xCor > 4 || yCor > 5 || !colors.includes(color)){
    console.log("one or more parameters are not valid")
    return
  }

  if (color == "grey"){
    ctx.fillStyle = WRONG_COLOR
  } else if (color == "green"){
    ctx.fillStyle = CORRECT_COLOR
  } else if (color == "yellow"){
    ctx.fillStyle = ALMOST_COLOR
  }
  

  if (xCor == 0 && yCor == 0){
    ctx.fillRect(ROW_GAP ,ROW_GAP, SQUARE_SIZE, SQUARE_SIZE);
  } 
  else{
    if (xCor == 0){
      xCor = ROW_GAP
    }else{
      xCor ++
      xCor = ROW_GAP * xCor + SQUARE_SIZE * (xCor - 1)
    }
    if (yCor == 0){
      yCor = ROW_GAP
    }else{
      yCor++
      yCor =  ROW_GAP * yCor + SQUARE_SIZE * (yCor - 1)
    }
    ctx.fillRect(xCor, yCor,SQUARE_SIZE, SQUARE_SIZE);
  }
}



function assignLetter(xCor, yCor, letter, color="white"){
  ctx.font = "50px Arial";
  ctx.fillStyle = color;

  if (xCor == 0){
    xCor = 40
  }else{
    xCor = 40 + SQUARE_SIZE * xCor + ROW_GAP * xCor
  }
  if (yCor == 0){
    yCor = 80
  }
  else{
    yCor = 80 + SQUARE_SIZE * yCor + ROW_GAP * yCor
  }
  ctx.fillText(letter,xCor, yCor)
  
}



//ctx.stroke();

function newGamePrompt(){
  ctx.font = "50px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Press enter to start.", 60, 335);

  let enterKey = document.getElementById("enter")
  //enterKey.addEventListener("click", drawBoard());

  
  
}
newGamePrompt()




