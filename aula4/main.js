import { build_shaders, create_buffer } from './shaders.js'
import { simplePPS, getStack, getNode } from './data_structures.js'

var canvas = document.getElementById("canvas")
var maxX = 500
var maxY = 500
canvas.width = maxX;
canvas.height = maxY;


var gl = canvas.getContext("webgl2")
gl.clearColor(0.75, 0.75, 0.75, 1)

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

create_buffer(gl, gl.ARRAY_BUFFER)

var vertexShader = `#version 300 es
precision mediump float;
in vec2 aPosition;

void main(){
    gl_PointSize = 22.0;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

var fragmentShader = `#version 300 es
precision highp float;
out vec4 fColor;

void main(){
    fColor = vec4(1.0, 0.0, 0.0, 1.0); // r,g,b,a
}
`

function convertX(x){
    return 2 * x / maxX - 1
}

function convertY(Y){
    return (2 * Y / maxY - 1) * -1
}

// ----------------------------------------------

var contorno = [
    getNode(100, 100),

    getNode(100, 125), //
    getNode(100, 150), //
    getNode(100, 175), //

    getNode(100, 200),

    getNode(125, 100), //
    getNode(150, 100), //
    getNode(175, 100), //

    getNode(200, 100),

    getNode(125, 200), //
    getNode(150, 200), //
    getNode(175, 200), //

    getNode(200, 125), //
    getNode(200, 150), //
    getNode(200, 175), //

    getNode(200, 200),

]

var stack = getStack(getNode(150, 150))
var vertices = simplePPS(stack, contorno)

var newVertices = []

vertices.forEach((e, i) => {
    if (i % 2 == 0){
        newVertices.push(convertX(e))
    } else {
        newVertices.push(convertY(e))
    }
})

contorno.forEach((e) => {
    newVertices.push(convertX(e.x))
    newVertices.push(convertY(e.y))
})

var program = build_shaders(gl, vertexShader, fragmentShader)

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newVertices), gl.STATIC_DRAW);

var positionLoc = gl.getAttribLocation(program, "aPosition");
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionLoc);

gl.drawArrays(gl.POINTS, 0, newVertices.length/2)
