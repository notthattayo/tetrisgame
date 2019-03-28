const cvs = document.getElementById("tetris");
const canvas = cvs.getContext("2d");
const Row = 20;
const column = 10;
const vacant = "black"
const sq = 20;
let gameover = false;
let score = document.getElementById("score");
scoreVAL = 0;
var left = document.getElementById("left");
var right = document.getElementById("right");
var up = document.getElementById("up");
var down = document.getElementById("down");

const I = [

	[

		[0, 0, 0, 0],

		[1, 1, 1, 1],

		[0, 0, 0, 0],

		[0, 0, 0, 0],

	],

	[

		[0, 0, 1, 0],

		[0, 0, 1, 0],

		[0, 0, 1, 0],

		[0, 0, 1, 0],

	],

	[

		[0, 0, 0, 0],

		[0, 0, 0, 0],

		[1, 1, 1, 1],

		[0, 0, 0, 0],

	],

	[

		[0, 1, 0, 0],

		[0, 1, 0, 0],

		[0, 1, 0, 0],

		[0, 1, 0, 0],

	]

];



const J = [

	[

		[1, 0, 0],

		[1, 1, 1],

		[0, 0, 0]

	],

	[

		[0, 1, 1],

		[0, 1, 0],

		[0, 1, 0]

	],

	[

		[0, 0, 0],

		[1, 1, 1],

		[0, 0, 1]

	],

	[

		[0, 1, 0],

		[0, 1, 0],

		[1, 1, 0]

	]

];



const L = [

	[

		[0, 0, 1],

		[1, 1, 1],

		[0, 0, 0]

	],

	[

		[0, 1, 0],

		[0, 1, 0],

		[0, 1, 1]

	],

	[

		[0, 0, 0],

		[1, 1, 1],

		[1, 0, 0]

	],

	[

		[1, 1, 0],

		[0, 1, 0],

		[0, 1, 0]

	]

];



const O = [

	[

		[0, 0, 0, 0],

		[0, 1, 1, 0],

		[0, 1, 1, 0],

		[0, 0, 0, 0],

	]

];



const S = [

	[

		[0, 1, 1],

		[1, 1, 0],

		[0, 0, 0]

	],

	[

		[0, 1, 0],

		[0, 1, 1],

		[0, 0, 1]

	],

	[

		[0, 0, 0],

		[0, 1, 1],

		[1, 1, 0]

	],

	[

		[1, 0, 0],

		[1, 1, 0],

		[0, 1, 0]

	]

];



const T = [

	[

		[0, 1, 0],

		[1, 1, 1],

		[0, 0, 0]

	],

	[

		[0, 1, 0],

		[0, 1, 1],

		[0, 1, 0]

	],

	[

		[0, 0, 0],

		[1, 1, 1],

		[0, 1, 0]

	],

	[

		[0, 1, 0],

		[1, 1, 0],

		[0, 1, 0]

	]

];



const Z = [

	[

		[1, 1, 0],

		[0, 1, 1],

		[0, 0, 0]

	],

	[

		[0, 0, 1],

		[0, 1, 1],

		[0, 1, 0]

	],

	[

		[0, 0, 0],

		[1, 1, 0],

		[0, 1, 1]

	],

	[

		[0, 1, 0],

		[1, 1, 0],

		[1, 0, 0]

	]

];





function drawsq(x,y,color){
canvas.fillStyle = color;
canvas.fillRect(x*sq,y*sq,sq,sq);

canvas.strokeStyle = "white";
canvas.strokeRect(x*sq,y*sq,sq,sq);
}


let board=[]
for(r = 0; r < Row; r++){
    board[r]=[];
    for(c=0; c < column; c++){
        board[r][c]= vacant; 
       
    }
}
function drawBoard(){ 
for(r = 0; r < Row; r++){
    for(c = 0; c < column; c++){
       drawsq(c, r, board[r][c]); 
    }
}
}

drawBoard();

const PIECES = [
[Z, 'red'],
[S, 'green' ],
[T, 'blue'],
[O, 'yellow'],
[L,  'cyan'],
[I, 'purple'],
[J, 'orange'],
];

let p = randompiece();

function piece(tetris, color){
    this.tetris = tetris;
    this.color = color;
    this.tetrisN = 0;
    this.currentTetris = this.tetris[this.tetrisN];
    this.x = 3;
    this.y = 0;
}


piece.prototype.draw = function(){
    for(r = 0; r < this.currentTetris.length; r++){
        for(c = 0; c < this.currentTetris.length; c++){

    if(this.currentTetris[r][c])
  drawsq(this.x + c, this.y + r, this.color);
}
}
};



piece.prototype.undraw = function(){
    for(r = 0; r < this.currentTetris.length; r++){
        for(c = 0; c < this.currentTetris.length; c++){

    if(this.currentTetris[r][c])
  drawsq(this.x + c, this.y + r, vacant);
}
}
};  

let dropstart = Date.now();


piece.prototype.down = function(){
	if(!this.collision(0,1,this.currentTetris)){
 this.undraw();   
 this.y++;
 this.draw();
	}
	else{
		this.lock();
        p = randompiece();
	}
}

piece.prototype.right = function(){
	if(!this.collision(1, 0, this.currentTetris)){
	 this.undraw();   
	 this.x++;
	 this.draw();
	}
	}
	piece.prototype.left = function(){
		if(!this.collision(-1, 0, this.currentTetris)){
		 this.undraw();   
		 this.x--;
		 this.draw();
		}
		}
		piece.prototype.rotate = function(){
			let nexttetris = this.tetris[(this.tetrisN + 1) % this.tetris.length];
			let kick = 0;
			
			if(this.collision(0,0,nexttetris)){
				if(this.x > column/2){
					kick = -1;
				}else{
					kick = 1;
				}
			}
			if(!this.collision(kick,0,nexttetris)){
			 this.undraw(); 
			 this.x += kick;
			 this.tetrisN = (this.tetrisN + 1) % this.tetris.length;
			 this.currentTetris = this.tetris[this.tetrisN];
			 this.draw();
			}
			}
			document.addEventListener("keydown",CONTROL);

			function CONTROL(event){
				if(event.keyCode == 37){
				   p.left();
				   dropstart = Date.now();
				}else if(event.keyCode == 38){
					p.rotate();
					dropstart = Date.now();
		
				}else if(event.keyCode == 39){
					p.right();
					dropstart = Date.now();
				}
				else if(event.keyCode == 40){
				   p.down();
				   dropstart = Date.now();
				}
			}
			left.addEventListener("click",pleft)
			up.addEventListener("click",protate)
			right.addEventListener("click",pright)
			down.addEventListener("click",pdown)
			
			
			function pleft(){
				   p.left();
				   dropstart = Date.now();
				
			}
			function protate()	{
					p.rotate();
					dropstart = Date.now();
				}
				function pright()	{
					p.right();
					dropstart = Date.now();
				}
				function pdown(){
				   p.down();
				   dropstart = Date.now();
				}
			
piece.prototype.collision = function(x,y,piece){
	for (r=0; r < piece.length; r++){
		for(c=0; c < piece.length; c++){
            if(!piece[r][c]){
				continue;
			}

			let newx = this.x + c + x;
			let newy = this.y + r + y;
		if(newx < 0 || newx >= column || newy >= Row){
			return true;
		}
		if(newy < 0){
			continue;
		}
	if(board[newy][newx] != vacant){
		return true;
	}
}
}
return false;
}

piece.prototype.lock = function(){
	for(r = 0; r < this.currentTetris.length; r++){
        for(c = 0; c < this.currentTetris.length; c++){

			if(!this.currentTetris[r][c]){
				continue;
				}
    if(this.y+r <= 0){
		alert("You don Lose :(");
		gameover = true;
		break;
		
	}
	board[this.y+r][this.x+c] = this.color;
	}
	}
	for(r = 0; r < Row; r++){
		let isRowFull = true;
		for(c=0; c<column; c++){
			isRowFull= isRowFull && (board[r][c] != vacant)
		}
		if(isRowFull){
			for(y=r; y > 1; y--){
				for(c=0; c < column; c++){
					board[y][c]= board[y-1][c];
					
				}
			}
		 for(c = 0; c < column; c++){
			board[0][c] = vacant;

		}
		scoreVAL += 10;
		score.innerHTML=scoreVAL;
	}
	
}
drawBoard();
}




function randompiece(){
  let r = Math.floor(Math.random() * PIECES.length );
  return new piece(PIECES[r][0], PIECES[r][1]);
}


function drop(){
    let now = Date.now();
	let delta = now - dropstart;
	
    if(delta > 1000){
    p.down();
    dropstart = Date.now();
	}
	if(!gameover){
	requestAnimationFrame(drop);
	}
}

drop();
