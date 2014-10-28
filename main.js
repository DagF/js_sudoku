/*
 var grid = [
 [null, 4, null, null, 7, null, 2, null, 8],
 [3, null, null, null, 4, null, null, 7, null],
 [null, null, null, null, null, 8, 5, null, null],
 [7, null, null, null, null, 2, 6, null, null],
 [9, null, null, null, 5, null, null, null, 3],
 [null, null, 5, 9, null, null, null, null, 1],
 [null, null, 1, 4, null, null, null, null, null],
 [null, 9, null, null, 2, null, null, null, 7],
 [5, null, 7, null, 3, null, null, 4, null]
 ];*/

/*var grid = [
 [null, null, null, 4, 7, null, 2, null, null],
 [null, null, 9, null, null, null, 8, null, 5],
 [null, 5, null, 8, null, null, null, 6, null],
 [6, null, 8, null, null, null, null, 2, 9],
 [null, 4, null, null, 9, null, null, 1, null],
 [9, 3, null, null, null, null, 7, null, 8],
 [null, 9, null, null, null, 4, null, 8, null],
 [5, null, 1, null, null, null, 9, null, null],
 [null, null, 6, null, 3, 1, null, null, null]
 ];
 */
var grid = [
    [3, null, 2, 8, null, null, 9, null, 1],
    [null, null, null, 1, null, 5, null, null, null],
    [null, null, 7, null, null, null, null, 6, null],
    [null, null, null, 3, null, null, 1, null, null],
    [null, 2, null, null, 4, null, null, 3, null],
    [null, null, 9, null, null, 8, null, null, null],
    [null, 7, null, null, null, null, 2, null, null],
    [null, null, null, 9, null, 4, null, null, null],
    [9, null, 5, null, null, 2, 7, null, 8]
];


var s = new Sudoku( grid );
s.solve();
var d = s.debugDraw();

document.getElementById("output").innerHTML = d;