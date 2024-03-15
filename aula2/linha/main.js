import { build_shaders, create_buffer } from './shaders.js'


var canvas = document.getElementById("canvas")
var maxX = window.innerWidth - 80
var maxY = window.innerHeight - 80
canvas.width = maxX;
canvas.height = maxY;


var gl = canvas.getContext("webgl2")
gl.clearColor(0.08, 0.08, 0.08, 1)

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

/*function drawTriangle() {
    create_buffer(gl, gl.ARRAY_BUFFER)

    var vertexShader = `#version 300 es
    precision mediump float;
    
    in vec2 vertexPosition;

    void main(){
        gl_Position = vec4(vertexPosition, 0.0, 1.0);
    }
    `

    var fragmentShader = `#version 300 es
    precision highp float;
    
    out vec4 fColor;

    void main(){
        fColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `

    var program = build_shaders(gl, vertexShader, fragmentShader)

    const triangle_vertices = [
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ]

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle_vertices), gl.STATIC_DRAW);

    var vertexPosition = gl.getAttribLocation(program, "vertexPosition");
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(vertexPosition);

    gl.drawArrays(gl.TRIANGLES, 0, triangle_vertices.length/2)
}*/

// drawTriangle()

// ---------------------------------------

create_buffer(gl, gl.ARRAY_BUFFER)

var vertexShader = `#version 300 es
precision mediump float;

in vec2 vertexPosition;

void main(){
    gl_Position = vec4(vertexPosition, 0.0, 1.0);
}
`

var fragmentShader = `#version 300 es
precision highp float;

out vec4 fColor;

void main(){
    fColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

var program = build_shaders(gl, vertexShader, fragmentShader)

// ----------------------------------------------

var vertices = []

function render(){
    let new_vertices = []

    vertices.map((element, index) => {
        if (index % 2 === 0) {
            new_vertices.push(2 * element / maxX - 1)
        } else {
            new_vertices.push((2 * element / maxY - 1) * -1)
        }
    });
    
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(new_vertices), gl.STATIC_DRAW);

    var vertexPosition = gl.getAttribLocation(program, "vertexPosition");
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(vertexPosition);

    gl.drawArrays(gl.LINES, 0, new_vertices.length/2)
}

var isDown = false;

var downX = null
var downY = null

var moveX = null
var moveY = null

canvas.addEventListener('mouseup', (e) => {
    isDown = false;
});

canvas.addEventListener('mousedown', (e) => {
    downX = e.offsetX;
    downY = e.offsetY;
    isDown = true;
    vertices[0] = downX
    vertices[1] = downY
});

canvas.addEventListener('mousemove', (e) => {
    if (isDown){
        moveX = e.offsetX;
        moveY = e.offsetY;
        vertices[2] = moveX
        vertices[3] = moveY
        render()
    }
});

