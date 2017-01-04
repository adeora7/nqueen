var nQueen = 4;
//utility functions start
function drawRects(){
	for (var i = 0 ; i < nQueen; i++) {
		for(var j = 0; j< nQueen ; j++){
			if( (i%2)^(j%2) )
				rect(i*64, j*64, 64, 64);
		}
	}
}

//utitlity functions end
function setup(){
	createCanvas(nQueen*64, nQueen*64);
}

function draw(){
	clear();
	background(45);
	drawRects();
}