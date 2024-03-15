function getNeighborsFromPixel(x, y) {
    // TODO
}

function colorPixel(x, y) {
    // TODO
}

// ALGORITMO PPS SIMPLES
function simplePps(stack){
    while(!isStackEmpty(stack)) {
        let top = popStack(stack)
        colorPixel(top.x, top.y)
        let neighbors = getNeighborsFromPixel(top.x, top.y)
        neighbors.forEach(element => {
            // validar se pode adicionar na pilha
        });
    }
}

// Node
function getNode(x = null, y = null, next = null){
    return {
        x: x,
        y: y,
        next: next
    }
}


// Stack
function getStack(top = null, count = 0){
    return {
        top: top,
        count: count
    }
}

function pushStack(stack, x, y){
    let no = getNode(x, y)
    no.next = stack.top;
    stack.top = no;
    stack.count++;
}

function popStack(stack){
    if (stack.top === null){
        return null
    } else {
        let remover = stack.top
        stack.top = remover.next
        stack.count--
        return {
            x: remover.x,
            y: remover.y
        }
    }
}

function isStackEmpty(stack){
    return stack.count === 0
}