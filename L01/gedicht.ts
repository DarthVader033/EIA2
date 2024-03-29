
//arrays für subjekt, prädikat, objekt
let randomPoemArray = {
    subjekt: ["Anakin", "Luke", "Obi-Wan", "Yoda", "Palpatine", "Leia"],
    prädikat: ["Tötet", "Manipuliert", "Zerstört", "Tröstet", "Bekämpft", "Umarmt"],
    objekt: ["R2D2", "Chewbacca", "Jedi-Ritter", "Mandalorians", "C3PO", "Darth Plagueis"]
}


//ausgabe in der konsole 
console.log("Subjekt", randomPoemArray.subjekt);
console.log("Prädikate:", randomPoemArray.prädikat);
console.log("Objekte:", randomPoemArray.objekt);

//for schleife, rückwärts zählung
for (let index = randomPoemArray.subjekt.length; index > 0; index--){
    console.log();
    let sentence: string = getVerse(randomPoemArray.subjekt, randomPoemArray.prädikat, randomPoemArray.objekt);
    console.log(sentence)
}


//funktion getVerse
function getVerse(subjekt: string[], prädikat: string[], objekt: string[]): string {
    let vers: string = "";


// zufällige auswahl
const randomSubjektIndex: number = Math.floor(Math.random() * subjekt.length);
const randomPrädikatIndex: number = Math.floor(Math.random() * prädikat.length);
const randomObjektIndex: number = Math.floor(Math.random() * objekt.length);

    
// Erstellen des Verses
vers += subjekt.splice(randomSubjektIndex, 1)[0] + " ";
vers += prädikat.splice(randomPrädikatIndex, 1)[0] + " ";
vers += objekt.splice(randomObjektIndex, 1)[0];

return vers;
}





/*
Aufgabe: <Zufallsgedichtt>
Name: <Alita Maier>
Matrikel: <275106>
Datum: <29.03.24>
Quellen: <Zusammenarbeit mit Franciska Egri>
*/

