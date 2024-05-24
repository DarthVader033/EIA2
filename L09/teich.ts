// Namespace entfernt, da er nicht benötigt wird

class Background {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    clouds: Cloud[] = []; // Array für die Wolken

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Wolken erstellen
        for (let i = 0; i < 3; i++) {
            const cloud = new Cloud(-100 + i * 200, 50 + Math.random() * 50, 100, 40, 'white', 0.5);
            this.clouds.push(cloud);
        }
    }

    draw() {
        // Gras zeichnen
        this.ctx.fillStyle = '#70B85D'; // Grüne Farbe für das Gras
        this.ctx.fillRect(0, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.4);

        // Himmel zeichnen
        this.ctx.fillStyle = '#87CEEB'; // Blaue Farbe für den Himmel
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);

        // Wolken zeichnen und bewegen
        this.clouds.forEach(cloud => {
            cloud.move();
            cloud.draw(this.ctx);
        });

        // Berge zeichnen
        this.drawMountains(100, this.canvas.height * 0.6, 150, '#A9A9A9'); // Erster Berg
        this.drawMountains(300, this.canvas.height * 0.6, 120, '#A9A9A9'); // Zweiter Berg

        // Teich zeichnen
        this.drawPond(250, this.canvas.height * 0.7, 100, 50, '#4682B4'); // Position und Größe des Teichs
    }

    drawMountains(x: number, y: number, height: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + 75, y - height);
        this.ctx.lineTo(x + 150, y);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawPond(x: number, y: number, width: number, height: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2); // Zeichnet ein Oval
        this.ctx.closePath();
        this.ctx.fill();
    }
}

class Cloud {
    x: number;
    y: number;
    width: number;
    height: number;
    cloudColor: string;
    speed: number;

    constructor(x: number, y: number, width: number, height: number, cloudColor: string, speed: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cloudColor = cloudColor;
        this.speed = speed;
    }

    move() {
        // Bewegung von links nach rechts
        this.x += this.speed;

        // Wenn die Wolke aus dem Bildschirm herausgeht, wird sie wieder von links eingeführt
        if (this.x > 800) {
            this.x = -100;
            this.y = 50 + Math.random() * 50;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.cloudColor;
        ctx.beginPath();
        ctx.arc(this.x + 20, this.y, 20, 0, Math.PI * 2);
        ctx.arc(this.x + 50, this.y - 10, 25, 0, Math.PI * 2);
        ctx.arc(this.x + 90, this.y, 20, 0, Math.PI * 2);
        ctx.arc(this.x + 120, this.y + 10, 30, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Canvas-Element auswählen
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d'); // Zeichenkontext erhalten

// Hintergrundobjekt erstellen und zeichnen
const background = new Background(canvas);
background.draw();

class Duck {
    x: number;
    y: number;
    speed: number;
    direction: number;
    size: number;
    color: string;

    constructor(x: number, y: number, speed: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = Math.random() * Math.PI * 2; // Zufällige Startrichtung
        this.size = size;
        this.color = color;
    }

    draw() {
        // Kopf
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        // Körper
        ctx.beginPath();
        ctx.arc(this.x, this.y + this.size * 0.5, this.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        // Schnabel
        ctx.beginPath();
        ctx.moveTo(this.x + this.size * 0.8, this.y);
        ctx.lineTo(this.x + this.size * 1.2, this.y + this.size * 0.2);
        ctx.lineTo(this.x + this.size * 0.8, this.y);
        ctx.fillStyle = 'orange';
        ctx.fill();
    }

    update() {
        // Bewegung basierend auf der aktuellen Richtung und Geschwindigkeit
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        // Wenn die Ente den Bildschirmrand erreicht, ändert sie die Richtung
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.direction += Math.PI; // Ändere die Richtung um 180 Grad
        }
    }
}

// Enten erstellen
const ducks: Duck[] = [];
for (let i = 0; i < 3; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.5; // Enten im unteren Bereich des Teichs platzieren
    const speed = Math.random() * 2 + 1; // Zufällige Geschwindigkeit zwischen 1 und 3
    const size = Math.random() * 20 + 20; // Zufällige Größe zwischen 20 und 40
    const color = 'yellow'; // Enten sind gelb
    ducks.push(new Duck(x, y, speed, size, color));
}

function drawDucks() {
    ducks.forEach((duck) => {
        duck.draw();
    });
}

function updateDucks() {
    ducks.forEach((duck) => {
        duck.update();
    });
}

// Hauptprogramm
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Hintergrund zeichnen (Gras, Himmel, Berge, Teich)
    background.draw();

    // Enten zeichnen und aktualisieren
    drawDucks();
    updateDucks();

    requestAnimationFrame(drawScene);
}

drawScene();
