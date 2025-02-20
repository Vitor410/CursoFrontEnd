//Matrizes
//exemplo de matriz 2D - bidimencional
let matriz = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
console.log(matriz[1][1]); //5

//criar uma matriz identidade
let MIdentidade = [[],[],[]];

MIdentidade[0][0] = 1;
MIdentidade[0][1] = 0;
MIdentidade[0][2] = 0;
MIdentidade[1][0] = 0;
MIdentidade[1][1] = 1;
MIdentidade[1][2] = 0;
MIdentidade[2][0] = 0;
MIdentidade[2][1] = 0;
MIdentidade[2][2] = 1;

console.log(MIdentidade);

for (let i =0; i < MIdentidade.length; i++) {
    for(let j = 0; j< MIdentidade[i].length; j++)
    console.log(MIdentidade[i][j]);
    
}