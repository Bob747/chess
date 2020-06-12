var chessBoard = [];
var me = true;

// 赢法数组，这是一个三维数组
var wins = [];

for(var i=0;i<15;i++){
    chessBoard[i] = [];
    for(var j=0;j<15;j++){
        chessBoard[i][j] = 0;
    }
}

for(var i=0;i<15;i++){
    wins[i] = [];
    for(var j=0;j<15;j++){
        wins[i][j] = [];
    }
}

var count = 0;   // 赢法种类的索引
for(var i=0; i<15; i++){
    for(var j=0; j<11; j++){
        for(var k=0; k<5; k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}

console.log(count);

var chess = document.getElementById('chess');
var context = chess.getContext('2d');
context.strokeStyle = '#BFBFBF';

var logo = new Image();
logo.src = "images/basketball.gif";
// 先加载图片在画棋盘
logo.onload = function(){
    context.drawImage(logo, 0, 0, 450, 450);
    drawChessBoard();
}

var drawChessBoard = function(){
    for(var i=0; i<15; i++){
        // 画横线
        context.moveTo(15 + i*30, 15);
        context.lineTo(15 + i*30, 435);
        context.stroke();
        // 画纵线
        context.moveTo(15, 15 + i*30);
        context.lineTo(435, 15 + i*30);
        context.stroke();  // stroke()是用来描边的
    }
}

var oneStep = function(i, j, me){
    context.beginPath();
    context.arc(15 + i*30, 15 + j*30, 13, 0, 2 * Math.PI);
    context.closePath();
    // 创建一个渐变对象，渐变的原心要有一定的偏移
    var cradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30 + 2, 15 + j*30 - 2, 0);
    if(me){
        cradient.addColorStop(0, "#0A0A0A");
        cradient.addColorStop(1, "#636766");
    }else{
        cradient.addColorStop(0, "#D1D1D1");
        cradient.addColorStop(1, "#F9F9F9");
    }
    
    context.fillStyle = cradient;
    context.fill();  // fill()是用来填充的
}

chess.onclick = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if(chessBoard[i][j] == 0){
        oneStep(i, j, me);
        if(me){
            chessBoard[i][j] = 1;
        }else{
            chessBoard[i][j] = 2;
        }
    }
    me = !me;
}




