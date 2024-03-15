export function build_shaders(gl, vertexShader, fragmentShader){
    var vertShdr = gl.createShader( gl.VERTEX_SHADER );
    var fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource( vertShdr, vertexShader);
    gl.shaderSource( fragShdr, fragmentShader);
    gl.compileShader( vertShdr );
    gl.compileShader( fragShdr );


    if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
        var msg = "Vertex shader failed to compile. The error log, is:" + "<pre>" + gl.getShaderInfoLog( vertShdr ) + "</pre>";
        alert( msg );
    }

    if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
        var msg = "Fragment shader failed to compile. The error log, is:"+ "<pre>" + gl.getShaderInfoLog( fragShdr ) + "</pre>";
        alert( msg );
    }

    var program = gl.createProgram();
    gl.attachShader( program, vertShdr );
    gl.attachShader( program, fragShdr );
    gl.linkProgram( program );

    gl.useProgram(program)

    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        var msg = "Shader program failed to link. The error log is:"
        + "<pre>" + gl.getProgramInfoLog( program ) + "</pre>";
        alert( msg );
    }

    return program;
}

export function create_buffer(gl, buffer_type){
    var bufferId = gl.createBuffer();
    gl.bindBuffer(buffer_type, bufferId);
}