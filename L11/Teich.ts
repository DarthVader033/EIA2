/*
Aufgabe: <Ententeich>
Name: <Alita Maier>
Matrikel: <275106>
Datum: <14.06.24>
Quellen: <Zusammenarbeit mit Franciska Egri>
*/
   
namespace L11_Ententeich {
    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let canvas: HTMLCanvasElement;
    let background: Background;
    let ducks: Ente[] = [];
    let babyDucks: Ente[] = [];
    let mountains: Mountain[] = [];
    let particles: Particle[] = [];
    let house: House; 
    const colors = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan'];

    function handleLoad(_event: Event): void {
        canvas = document.querySelector("canvas")!;
        crc2 = canvas.getContext("2d");
        canvas.width = 1440;
        canvas.height = 780;

        background = new Background(canvas);
        createDucks();
        createMountains();
        house = new House(canvas.width - 170, canvas.height * 0.6 - 200, 150, 200); 
        drawScene();

        canvas.addEventListener('click', handleCanvasClick);
    }

    abstract class Movable {
        position: Vector;
        direction: Vector;
        size: Vector;

        constructor(_position: Vector, _direction: Vector, _size: Vector) {
            this.position = _position;
            this.direction = _direction;
            this.size = _size;
        }

        move() {
            this.position.add(this.direction);
        }

        abstract draw(crc2: CanvasRenderingContext2D): void; 
    }

    class Mountain {
        x: number;
        y: number;
        height: number;
        color: string;
        exploded: boolean;

        constructor(x: number, y: number, height: number, color: string) {
            this.x = x;
            this.y = y;
            this.height = height;
            this.color = color;
            this.exploded = false;
        }

        draw(crc2: CanvasRenderingContext2D): void {
            if (!this.exploded) {
                crc2.fillStyle = this.color;
                crc2.beginPath();
                crc2.moveTo(this.x, this.y);
                crc2.lineTo(this.x + 75, this.y - this.height);
                crc2.lineTo(this.x + 150, this.y);
                crc2.closePath();
                crc2.fill();
            }
        }
    }

    class Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        color: string;

        constructor(x: number, y: number, vx: number, vy: number, color: string) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.color = color;
        }

        draw(crc2: CanvasRenderingContext2D): void {
            crc2.fillStyle = this.color;
            crc2.fillRect(this.x, this.y, 2, 2);
        }

        update(): void {
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    class House { 
        x: number;
        y: number;
        width: number;
        height: number;
        shaking: boolean = false;
        shakeOffset: number = 0;

        constructor(x: number, y: number, width: number, height: number) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        draw(crc2: CanvasRenderingContext2D): void {
            if (this.shaking) {
                this.shakeOffset = (Math.random() - 0.5) * 10;
            } else {
                this.shakeOffset = 0;
            }

            crc2.save();
            crc2.translate(this.shakeOffset, 0);

            crc2.fillStyle = '#8B4513';
            crc2.fillRect(this.x, this.y, this.width, this.height);

            crc2.fillStyle = '#A52A2A';
            crc2.beginPath();
            crc2.moveTo(this.x, this.y);
            crc2.lineTo(this.x + this.width / 2, this.y - this.height / 2);
            crc2.lineTo(this.x + this.width, this.y);
            crc2.closePath();
            crc2.fill();

            crc2.restore();
        }

        shake(): void {
            this.shaking = true;
            setTimeout(() => {
                this.shaking = false;
            }, 500);
        }
    }

    function createDucks(): void {
        for (let i = 0; i < 3; i++) { 
            const startX = canvas.width * 0.25; 
            const startY = canvas.height * 0.7 + i * 30; 
            const duck = new Ente(new Vector(20,20), 'yellow', canvas, crc2, new Vector(startX, startY));
            ducks.push(duck);
        }
    }

    function createMountains(): void {
        mountains.push(new Mountain(100, canvas.height * 0.6, 150, '#A9A9A9'));
        mountains.push(new Mountain(300, canvas.height * 0.6, 120, '#A9A9A9'));
        mountains.push(new Mountain(500, canvas.height * 0.6, 180, '#A9A9A9'));
        mountains.push(new Mountain(1000, canvas.height * 0.6, 180, '#A9A9A9'));
        mountains.push(new Mountain(1200, canvas.height * 0.6, 120, '#A9A9A9'));
    }

    function handleCanvasClick(event: MouseEvent): void {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        mountains.forEach(mountain => {
            if (!mountain.exploded &&
                mouseX > mountain.x &&
                mouseX < mountain.x + 150 &&
                mouseY > mountain.y - mountain.height &&
                mouseY < mountain.y) {
                explodeMountain(mountain);
            }
        });

        ducks.forEach(duck => {
            if (mouseX > duck.position.x - duck.size.x * 0.6 &&
                mouseX < duck.position.x + duck.size.x * 0.6 &&
                mouseY > duck.position.y - duck.size.y * 0.8 &&
                mouseY < duck.position.y + duck.size.y * 0.8) {
                createBabyDucks(duck);
            }
        });

        if (mouseX > house.x && mouseX < house.x + house.width &&
            mouseY > house.y && mouseY < house.y + house.height) {
            house.shake(); 
        }
    }

    function explodeMountain(mountain: Mountain): void {
        mountain.exploded = true;
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle(
                mountain.x + 75,
                mountain.y - mountain.height / 2,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                colors[Math.floor(Math.random() * colors.length)]
            ));
        }
    }

    function createBabyDucks(parentDuck: Ente): void {
        for (let i = 0; i < 3; i++) {
            const babyDuck = new Ente(
                new Vector(10, 10),
                'yellow',
                canvas,
                crc2,
                new Vector(parentDuck.position.x, parentDuck.position.y)
            );
            babyDucks.push(babyDuck);
        }
    }

    function drawScene(): void {
        moveClouds();
        drawBackground();
        drawBushes();
        drawMountains();
        drawParticles();
        drawDucks();
        drawBabyDucks();
        house.draw(crc2); 
        requestAnimationFrame(drawScene);
    }

    function moveClouds(): void {
        background.clouds.forEach(cloud => {
            cloud.move();
        });
    }

    function drawBackground(): void {
        crc2.clearRect(0, 0, canvas.width, canvas.height);
        background.draw();
    }

    function drawBushes(): void {
        //Büsche
        drawBush(canvas.width - 100, canvas.height * 0.8, 10, '#556B2F'); 
        drawBush(canvas.width - 400, canvas.height * 0.7, 10, '#556B2F');
        drawBush(canvas.width - 900, canvas.height * 0.9, 10, '#556B2F'); 
        drawBush(canvas.width - 600, canvas.height * 0.65, 10, '#556B2F');
        drawBush(canvas.width - 500, canvas.height * 0.85, 10, '#556B2F');
        drawBush(canvas.width - 300, canvas.height * 0.75, 10, '#556B2F');
        drawBush(canvas.width - 300, canvas.height * 0.75, 10, '#556B2F');
        drawBush(canvas.width - 800, canvas.height * 0.75, 10, '#556B2F');
    }

    function drawBush(x: number, y: number, size: number, color: string): void {
        crc2.fillStyle = color;
        crc2.beginPath();
        crc2.arc(x, y, size, 0, 2 * Math.PI);
        crc2.arc(x + size, y - size, size, 0, 2 * Math.PI);
        crc2.arc(x - size, y - size, size, 0, 2 * Math.PI);
        crc2.arc(x + size, y + size, size, 0, 2 * Math.PI);
        crc2.arc(x - size, y + size, size, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
    }

    function drawMountains(): void {
        mountains.forEach(mountain => {
            mountain.draw(crc2);
        });
    }

    function drawParticles(): void {
        particles.forEach(particle => {
            particle.update();
            particle.draw(crc2);
        });
    }

    function drawDucks(): void {
        ducks.forEach(duck => {
            duck.draw();
            duck.update();
        });
    }

    function drawBabyDucks(): void {
        babyDucks.forEach(duck => {
            duck.draw();
            duck.update();
        });
    }

    class Background {
        canvas: HTMLCanvasElement;
        crc2: CanvasRenderingContext2D;
        clouds: Wolke[] = [];
        pondWidth: number = 150;
        pondHeight: number = 70;

        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            this.crc2 = canvas.getContext('2d')!;

            for (let i = 0; i < 6; i++) { 
                const cloud = new Wolke('white', new Vector(1+Math.random() * 3, 0), new Vector(-200 + i * 250, 100), new Vector( 40, 0.5));
                this.clouds.push(cloud);
            }
        }

        draw(): void {
            this.crc2.fillStyle = '#70B85D';
            this.crc2.fillRect(0, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.4);

            this.crc2.fillStyle = '#87CEEB';
            this.crc2.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.6);

            this.clouds.forEach(cloud => {
                cloud.draw(this.crc2);
            });

            // Berge
            drawMountains();
            
            // Teich
            this.drawPond(250, this.canvas.height * 0.75, 250, 80, '#4682B4');
        }

        drawPond(x: number, y: number, width: number, height: number, color: string) {
            this.crc2.fillStyle = color;
            this.crc2.beginPath();
            this.crc2.ellipse(x, y, width, height, 0, 0, Math.PI * 2); 
            this.crc2.closePath();
            this.crc2.fill();
        }
    }

    class Wolke extends Movable {
        cloudColor: string;

        constructor(_cloudColor: string, _direction: Vector, _position: Vector, _size: Vector) {
            super(_position, _direction, _size);
            this.cloudColor = _cloudColor;
        }
        
        draw(crc2: CanvasRenderingContext2D): void {
            crc2.fillStyle = this.cloudColor;
            crc2.beginPath();
            crc2.arc(this.position.x + 20, this.position.y, 20, 0, Math.PI * 2);
            crc2.arc(this.position.x + 50, this.position.y - 10, 25, 0, Math.PI * 2);
            crc2.arc(this.position.x + 90, this.position.y, 20, 0, Math.PI * 2);
            crc2.arc(this.position.x + 120, this.position.y + 10, 30, 0, Math.PI * 2);
            crc2.fill();
        }
        
            
            
            
        move(): void {
            super.move();
            if (this.position.x > canvas.width)
                this.position.x = -1
        }
    }

    class Ente extends Movable {
        color: string;
        canvas: HTMLCanvasElement;
        crc2: CanvasRenderingContext2D;

        constructor (_size: Vector, _color: string, _canvas: HTMLCanvasElement, _crc2: CanvasRenderingContext2D, _position: Vector) {
            super(_position, randomPosition(), _size);
            this.color = _color;
            this.canvas = _canvas;
            this.crc2 = this.canvas.getContext("2d")!;
        }

        draw(): void {
            //Körper
            this.crc2.beginPath();
            this.crc2.arc(this.position.x, this.position.y, this.size.x * 0.6, 0, Math.PI * 2);
            this.crc2.fillStyle = 'yellow';
            this.crc2.fill();

            //Kopf
            this.crc2.beginPath();
            this.crc2.arc(this.position.x, this.position.y + this.size.x * 0.5, this.size.y * 0.8, 0, Math.PI * 2);
            this.crc2.fillStyle = 'yellow';
            this.crc2.fill();
        
            // Augen
            this.crc2.fillStyle = 'black';
            this.crc2.beginPath();
            this.crc2.arc(this.position.x - this.size.x * 0.2, this.position.y - this.size.y * 0.1, 2, 0, Math.PI * 2); // linkes Auge
            this.crc2.fill();
            this.crc2.beginPath();
            this.crc2.arc(this.position.x + this.size.x * 0.2, this.position.y - this.size.y * 0.1, 2, 0, Math.PI * 2); // rechtes Auge
            this.crc2.fill();
        }

        update(): void {
         
            const grassTopBoundary = this.canvas.height * 0.6; 
            const grassBottomBoundary = this.canvas.height; 
            const leftBoundary = this.canvas.width * 0.05; 
            const rightBoundary = this.canvas.width * 0.3; 
            
            const speed = 0.55;
            const nextX = this.position.x + Math.cos(this.direction.x) * this.direction.x;
            const nextY = this.position.y; 
        
            if (nextX >= leftBoundary && nextX <= rightBoundary) { 
                this.position.x = nextX;
            } else {
                this.direction.x = -this.direction.x; 
            }
        }
    }

    function randomPosition(): Vector {
        let x = Math.random() * Math.PI * 2;
        let y = Math.random() * Math.PI * 2;
        return new Vector(x, y);
    }
}
