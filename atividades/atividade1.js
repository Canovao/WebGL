/*
  Passo 0:  Inicializando o Canvas e o context.
 */
var canvas = document.getElementById('canvas');

var gl = canvas.getContext('webgl2');

gl.clearColor(0.1, 0.2, 0.3, 0.4);

gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);


/*
Passo 1: Enviando os dados para a GPU
*/

var bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

/*
Passo 2: Criando o código dos shaders que serão executados
na GPU.
*/

var vertexShader = `#version 300 es
precision mediump float;

in vec2 aPosition;

void main(){
gl_PointSize = 10.0;
gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

var fragmentShader = `#version 300 es
precision highp float;
out vec4 fColor;
void main(){
    fColor=vec4(1.0, 0.0, 0.0, 1.0);
}`;

/*
Passo 3: Compilando os códigos e enviando para a GPU. Essa parte do
código é sempre igual para todos os programas que criaremos.
*/

var vertShdr = gl.createShader( gl.VERTEX_SHADER );
var fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
gl.shaderSource( vertShdr, vertexShader);
gl.shaderSource( fragShdr, fragmentShader);
gl.compileShader( vertShdr );
gl.compileShader( fragShdr );

if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
    var msg = "Vertex shader failed to compile.  The error log is:"
        + "<pre>" + gl.getShaderInfoLog( vertShdr ) + "</pre>";
    alert( msg );
}

if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
    var msg = "Fragment shader failed to compile.  The error log is:"
        + "<pre>" + gl.getShaderInfoLog( fragShdr ) + "</pre>";
    alert( msg );
}

var program = gl.createProgram();
gl.attachShader( program, vertShdr );
gl.attachShader( program, fragShdr );
gl.linkProgram( program );

if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
    var msg = "Shader program failed to link.  The error log is:"
        + "<pre>" + gl.getProgramInfoLog( program ) + "</pre>";
    alert( msg );
}

/*
Passo 4: precisamos linkar as variáveis criadas nos shaders com os
dados que enviamos à GPU para que o programa consiga usar o que foi
enviado.
*/

gl.useProgram(program);
var positionLoc = gl.getAttribLocation(program, "aPosition");
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionLoc);

/*
Passo 5: finalmente, agora que está tudo pronto, podemos fazer uma
chamada para realmente colocar os gráficos na tela.
*/

var vertices = []


function plotarPixelXY(x, y){
    vertices.push(2 * x/maxX - 1)
    vertices.push(2 * y/maxY - 1)
}

function drawDda(x1, x2, y1, y2) {
    let length, deltaX, deltaY;

    if (Math.abs(x2 - x1) >= Math.abs(y2 - y1)){
        length = Math.abs(x2 - x1)
    } else {
        length = Math.abs(y2 - y1)
    }

    deltaX = (x2 - x1)/length
    deltaY = (y2 - y1)/length

    let x = x1 + 0.5
    let y = y1 + 0.5

    for (let i = 1; i <= length; i++){
        plotarPixelXY(x, y)
        x = x + deltaX
        y = y + deltaY
    }
}

var maxX = 200
var maxY = 200

let escolhaX1 = 0, escolhaY1 = 0
let escolhaX2 = 200, escolhaY2 = 130

drawDda(escolhaX1, escolhaX2, escolhaY1, escolhaY2)

function drawBresenham(x1, x2, y1, y2) {
    let x = x1
    let y = y1
    let deltaX = x2 - x1
    let deltaY = y2 - y1
    let m = deltaY/deltaX
    let e = m - 1/2

    for(let i=1;i < deltaX;i++){
        plotarPixelXY(x, y)
        while(e > 0){
            y = y + 1
            e = e - 1
        }
        x = x + 1
        e = e + m
    }
}

// drawBresenham(escolhaX1, escolhaX2, escolhaY1, escolhaY2)


console.log(vertices)

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.drawArrays(gl.POINTS, 0, vertices.length/2);