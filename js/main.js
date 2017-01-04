var nQueen = 8;
var board = new Array();
//utility functions start
function drawRects(){
	for (var i = 0 ; i < nQueen; i++) {
		for(var j = 0; j< nQueen ; j++){
			fill(255);
			if( (i%2)^(j%2) )
				rect(i*64, j*64, 64, 64);
			fill(45);
		}
	}
}

function drawQueens(){
	for(var i = 0; i< nQueen; i++){
		for(var j = 0; j<nQueen; j++){
			if(board[i][j] == 1){
				fill(100,0,0);
				rect(i*64, j*64, 64, 64);
				fill(255);
			}
		}
	}
}
function isSafe(row, col){
	var i;
	var j;
	for (i = 0; i < col; i++)
        if (board[row][i])
            return false;

    for (i=row, j=col; i>=0 && j>=0; i--, j--)
        if (board[i][j])
            return false;
 
    /* Check lower diagonal on left side */
    for (i=row, j=col; j>=0 && i<nQueen; i++, j--)
        if (board[i][j])
            return false;
 
    return true;
}
function setBoard(col){
	if(col>=nQueen)
		return true;
	for(var i = 0; i< nQueen; i++){
		if(isSafe(i, col)){
			board[i][col] = 1;
			if(setBoard(col+1))
				return true;
			else
				board[i][col] = 0;
		}
	}

	return false;
}
//utitlity functions end
function setup(){
	createCanvas(nQueen*64, nQueen*64);
	for(var i = 0; i<nQueen; i++){
		board[i] = new Array();
		for(var j = 0; j<nQueen; j++)
			board[i][j] = 0;
	}
	setTimeout(function(){
		setBoard(0);
	}, 1000);
}

function draw(){
	clear();
	background(45);
	drawRects();
	drawQueens();
}