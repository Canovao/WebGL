export function getNeighborsFromPixel(x, y) {
    return [
        {
            x: x + 25,
            y: y,
        },
        {
            x: x - 25,
            y: y,
        },
        {
            x: x,
            y: y + 25,
        },
        {
            x: x,
            y: y - 25,
        }
    ]
}

export function findInList(list, item){
    let found = false
    list.forEach((e) => {
        if(e.x == item.x && e.y == item.y){
            found = true
        }
    })
    return found
}

// ALGORITMO PPS SIMPLES
export function simplePPS(stack, contorno){
    let pixelToColor = []

    let inStack = []
    let topPoppeds = []

    while(!isStackEmpty(stack)) {
        let top = popStack(stack)

        topPoppeds.push(top)

        pixelToColor.push(top.x)
        pixelToColor.push(top.y)

        let neighbors = getNeighborsFromPixel(top.x, top.y)

        neighbors.forEach(element => {
            if (
                !(findInList(inStack, element) ||
                findInList(topPoppeds, element) ||
                findInList(contorno, element))
            ) {
                inStack.push(element)

                pushStack(stack, element.x, element.y)
            }
        });
    }

    return pixelToColor
}

// Node
export function getNode(x = null, y = null, next = null){
    return {
        x: x,
        y: y,
        next: next
    }
}


// Stack
export function getStack(top = null){
    return {
        top: top,
        count: 1
    }
}

export function pushStack(stack, x, y){
    let no = getNode(x, y)
    no.next = stack.top;
    stack.top = no;
    stack.count++;
}

export function popStack(stack){
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

export function isStackEmpty(stack){
    return stack.count === 0
}
