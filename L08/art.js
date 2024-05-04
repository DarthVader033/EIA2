var canvas = document.querySelector ('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

c.fillStyle = "coral";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "lightblue";
c.fillRect(400, 100, 100, 100);
c.fillStyle = "lightgreen";
c.fillRect(300, 300, 100, 100);
console.log(canvas);

c.beginPath();
c.moveTo(60, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "grey";
c.stroke();

c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = 'pink';
c.stroke();

for (var i = 0; i < 50; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = 'pink';
    c.stroke();
}

//Aufgabe: L08
//Name: Alita Maier
//Matrikel: 275106
//Datum: 05.05.24
//Quellen: Zusammenarbeit mit Franciska Egri