class Cloud {
    x: number;
    y: number;
    width: number;
    height: number;
    cloudColor: string;

    constructor(x: number, y: number, width: number, height: number, cloudColor: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cloudColor = cloudColor;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
       
        ctx.fillStyle = this.cloudColor;
        ctx.beginPath();
        ctx.arc(50, 50, 20, 0, Math.PI * 2);
        ctx.arc(80, 60, 25, 0, Math.PI * 2);
        ctx.arc(120, 50, 20, 0, Math.PI * 2);
        ctx.arc(150, 70, 30, 0, Math.PI * 2);
        ctx.fill();
    }

    move() {

    }
}

class Mountain {
    color: string;
    size: vector;
    position: vector;

    constructor(color: string, size: number, position: vector) {
        this.color = color;
        this.size = size;
        this.position = position;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}


class Tree {
    color: string;
    size: vector;
    position: vector;

    constructor(color: string, size: number, position: vector) {
        this.color = color;
        this.size = size;
        this.position = position;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}

class Duck {
    size: number;
    color: string;
    position: Vector;
    type: string;
    direction: vector;
    activity: string;
}

class Pond {
    color: string;
    size: vector;
    position: vector;

    constructor(color: string, size: number, position: vector) {
        this.color = color;
        this.size = size;
        this.position = position;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    move() {

    }

    
}

class Flower {
    color: string;
    size: vector;
    position: vector;

    constructor(color: string, size: number, position: vector) {
        this.color = color;
        this.size = size;
        this.position = position;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}

class Bush {
    color: string;
    size: vector;
    position: vector;

    constructor(color: string, size: number, position: vector) {
        this.color = color;
        this.size = size;
        this.position = position;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const sky = new Sky(0, 0, canvas.width, canvas.height * 0.6, 'white');
const mountain = new Mountain('gray', new Vector(canvas.width, canvas.height * 0.4), new Vector(0, canvas.height * 0.6));

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Cloud.draw(ctx);
    mountain.draw(ctx);
    
    requestAnimationFrame(drawScene);
}

drawScene();



/*
Aufgabe: <Ententeich>
Name: <Alita Maier>
Matrikel: <275106>
Datum: <11.05.24>
Quellen: <Zusammenarbeit mit Franciska Egri>
*/

