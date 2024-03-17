import { build_shaders, create_buffer } from './shaders.js'

var canvas = document.getElementById("canvas")
canvas.width = 800;
canvas.height = 800;

var gl = canvas.getContext("webgl2")
gl.clearColor(0.08, 0.08, 0.08, 1)

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
// gl.clear(gl.COLOR_BUFFER_BIT)
// gl.clear(gl.DEPTH_BUFFER_BIT)
// gl.clear(gl.STENCIL_BUFFER_BIT)

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

function drawPoints() {
    create_buffer(gl, gl.ARRAY_BUFFER)

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

// drawTriangle()

function drawFace(){
    function mirrorPointsX(x, y){
        if (x === 0){
            return null
        } else {
            return [-x, y]
        }
    }

    create_buffer(gl, gl.ARRAY_BUFFER)
    var program = build_shaders(gl, vertexShader, fragmentShader)

    var points = [
        // border
        [.75, .9],
        [.9, .7],
        [.75, .7],
        [.75, .5],
        [.75, .3],
        [.75, 0],
        [.7, -.3],
        [.6, -.5],
        [.5, -.7],
        [.4, -.8],
        [0, -.9],

        // nose
        [.4, .4],
        [.3, .4],
        [.2, .4],
        [.09, .4],
        [.08, .3],
        [.09, .2],
        [.1, .1],
        [.1, 0],
        [0, -.05],

        // mouth
        [0, -.4],
        [0.1, -.4],
        [0.2, -.4],
    ]

    var pointsArray = []

    for (let i in points) {
        pointsArray.push(points[i][0])
        pointsArray.push(points[i][1])
        let mirror = mirrorPointsX(points[i][0], points[i][1])
        if (mirror !== null){
            pointsArray.push(mirror[0])
            pointsArray.push(mirror[1])
        }
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointsArray), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    gl.drawArrays(gl.POINTS, 0, pointsArray.length/2)

}

// drawFace()

function drawLine(){
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

    var vertices = [
        0.0, 0.0,
        0.5, 0.5,
        
        0.0, 0.0,
        -0.5, 0.5,
        
        0.0, 0.0,
        0.5, -0.5,

        0.0, 0.0,
        -0.5, -0.5,

        0.5, 0.5,
        0.5, -0.5,

        -0.5, 0.5,
        -0.5, -0.5,

        0.5, 0.5,
        -0.5, 0.5,

        0.5, -0.5,
        -0.5, -0.5,
    ]

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexPosition = gl.getAttribLocation(program, "vertexPosition");
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(vertexPosition);

    gl.drawArrays(gl.LINES, 0, vertices.length/2)
}

// drawLine()

function drawLineStrip(){
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

    var vertices = [
        0.0, 0.0,
        0.5, 0.5,
        -0.5, 0.5,
        0.5, -0.5,
        -0.5, -0.5,
        0.0, 0.0
    ]

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexPosition = gl.getAttribLocation(program, "vertexPosition");
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(vertexPosition);

    gl.drawArrays(gl.LINE_STRIP, 0, vertices.length/2)
}

// drawLineStrip()

function drawLineLoop(){
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

    var vertices = [
        0.0, 0.0,
        0.5, 0.5,
        -0.5, 0.5,
        0.5, -0.5,
        -0.5, -0.5,
    ]

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexPosition = gl.getAttribLocation(program, "vertexPosition");
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(vertexPosition);

    gl.drawArrays(gl.LINE_LOOP, 0, vertices.length/2)
}

// drawLineLoop()

function drawTriangleStrip(){
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

    var vertices = [
        0.0, 0.0,
        0.5, 0.5,
        -0.5, 0.5,
        0.5, -0.5,
        -0.5, -0.5,
    ]

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexPosition = gl.getAttribLocation(program, "vertexPosition");
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(vertexPosition);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length/2)
}

// drawTriangleStrip()

function drawTriangleFan(){
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

    var vertices = [
        0.0, 0.0,
        0.5, 0.5,
        -0.5, 0.5,
        0.5, -0.5,
        -0.5, -0.5,
    ]

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexPosition = gl.getAttribLocation(program, "vertexPosition");
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(vertexPosition);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length/2)
}

// drawTriangleFan()