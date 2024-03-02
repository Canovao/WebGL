import { build_shaders, create_buffer } from './shaders.js'

var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth - 80;
canvas.height = window.innerHeight - 80;

var gl = canvas.getContext("webgl2")
gl.clearColor(0.08, 0.08, 0.08, 1)

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
// gl.clear(gl.COLOR_BUFFER_BIT)
// gl.clear(gl.DEPTH_BUFFER_BIT)
// gl.clear(gl.STENCIL_BUFFER_BIT)


function drawPoints() {
    create_buffer(gl, gl.ARRAY_BUFFER)

    var vertexShader = `#version 300 es
    precision mediump float;
    in vec2 aPosition;

    void main(){
        gl_PointSize = 10.0;
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

    var program = build_shaders(gl, vertexShader, fragmentShader)

    var vertices = [0.5, 0, 0, 0, 0.5, 0.5]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    gl.drawArrays(gl.POINTS, 0, vertices.length/2)
}

// drawPoints()

function drawTriangle() {
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
}

drawTriangle()