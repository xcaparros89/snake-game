const grid = document.getElementById("grid")
function createGrid(x){
    for (let i=0; i<x; i++){
    let newDiv = document.createElement("div");
    //aqui esta lu de ficar numeros a les caselles:
    //newDiv.innerHTML = i;
    grid.appendChild(newDiv)
    }
}
let squares = Array.from(document.querySelectorAll("#grid div"));

export {createGrid}