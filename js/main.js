var nQueen = 6;
var queens = new Array();
var board = new Array();
var allStates = new Array();
//utility functions start
function drawRects(){
	for (var i = 1 ; i <=nQueen; i++) {
		for(var j = 0; j<nQueen ; j++){
			if( (i%2)^(j%2) )
				fill(255);
			else
				fill(45);
			rect(i*64, j*64, 64, 64);
			fill(45);
		}
	}
}
function drawQueens(){
	for(var i =0; i< queens.length; i++){
		fill(100,0,0);
		ellipse(queens[i].xCoord + 32, queens[i].yCoord + 32, 48, 48);
	}
}
function isSafe(row, col){
	var i;
	var j;
	for (i = 0; i < row; i++)
        if (board[i][col])
            return false;

    for (i=row, j=col; i>=0 && j>=0; i--, j--)
        if (board[i][j])
            return false;
 
    for (i=row, j=col; i>=0 && j<nQueen; j++, i--)
        if (board[i][j])
            return false;
 
    return true;
}
function setBoard(row){
	if(row>=nQueen)
		return true;
	for(var i = 0; i< nQueen; i++){
		if(isSafe(row, i)){
			board[row][i] = 1;
			var l = allStates.length;
			allStates[l] = new Array();
			for(var li = 0; li < nQueen; li++){
				allStates[l][li] = new Array();
				for(var lj = 0; lj <nQueen; lj++){
					allStates[l][li][lj] = board[li][lj];
				}
			}

			if(setBoard(row+1))
				return true;
			else
				board[row][i] = 0;
			l = allStates.length;
			allStates[l] = new Array();
			for(var li = 0; li < nQueen; li++){
				allStates[l][li] = new Array();
				for(var lj = 0; lj <nQueen; lj++){
					allStates[l][li][lj] = board[li][lj];
				}
			}
		}
	}

	return false;
}

function animateQueens(){
	if(allStates.length == 0)
		return;
	setTimeout(function(){
		allStates.shift();
		animateQueens();	
	}, 1000);
}

//utitlity functions end
function preload(){
	for(var i =0; i<nQueen; i++){
		queens.push({"xCoord": 0, "yCoord" : i*64});
	}
	for(var i = 0; i<nQueen; i++){
		board[i] = new Array();
		for(var j = 0; j<nQueen; j++)
			board[i][j] = 0;
	}
	
	setBoard(0);
	console.log(allStates.length);
}

function setup(){
	createCanvas(nQueen*64 + 64, nQueen*64);
	animateQueens();
}
function draw(){

	clear();
	background(10,100,100);
	drawRects();
	var flg = false;
	if(allStates.length > 0){
		for(var i =0; i<nQueen; i++){
			flg = false;
			for(var j = 0; j< nQueen; j++){
				if(allStates[0][i][j] == 1){		
					queens[i].xCoord = lerp(queens[i].xCoord, (j+1)*64, 0.1);
					flg= true;
				}
			}
			if(!flg){
				queens[i].xCoord = lerp(queens[i].xCoord, 0, 0.1);
			}
		}
	}

	drawQueens();
}