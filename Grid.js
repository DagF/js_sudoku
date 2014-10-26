function Grid(){
    var groups = [],
        columns = [],
        rows = [],
        cells = [];

    for( var i = 1; i <= 9; i++ ){
        groups[i] = new CellCluster();
        columns[i] = new CellCluster();
        rows[i] = new CellCluster();
    }

    for( var c = 0; c < 9*9; c++ ){
        var cell = new Cell();
        cells[c + 1] = cell;

        var row = ( c - (c % 9)) / 9 + 1;
        rows[ row ].addCell( cell );

        var column = ( c % 9 ) + 1;
        columns[ column ].addCell( cell );

        var group = 1 + ((column - 1) - ((column - 1) % 3)) / 3 + (((row - 1) -((row - 1 ) % 3)) / 3) * 3;// 1 + (0-2) + (0-2) * 3
        groups[group].addCell( cell );
    }

    return{
        setValuesByRawGrid : function( grid ) {
            for( var y = 0; y < 9; y++){
                for (var x = 0; x < 9; x++) {
                    var value = grid[y][x];
                    if( value != null ){
                        rows[y+1].getCells()[x+1].setValue( value );
                    }
                }
            }
        },
        clone : function(){
            var g = new Grid();
            setValuesByExistingGrid( g, grid );
            return g;
        },
        draw : function(){

        },
        debugDraw : function(){
            var drawing = "+-------+-------+-------+-------+-------+-------+-------+-------+-------+\n";
            for( var y = 1; y <= 9; y++){
                var row1 = "|";
                var row2 = "|";
                var row3 = "|";

                for( var x = 1; x <= 9; x++){
                    var row = rows[ y ];
                    var cells = row.getCells();
                    console.log(cells);
                    var cell = cells[x];
                    var debug_drawing = cell.debugDraw();
                    var debug_drawing_rows = debug_drawing.split("\n");
                    row1 += debug_drawing_rows[0] + "|";
                    row2 += debug_drawing_rows[1] + "|";
                    row3 += debug_drawing_rows[2] + "|";
                }
                drawing += row1 + "\n";
                drawing += row2 + "\n";
                drawing += row3 + "\n";
                drawing += "+-------+-------+-------+-------+-------+-------+-------+-------+-------+\n";
            }
            return drawing;
        }
    }


    function setValuesByExistingGrid( new_grid, existing_grid ){

    }
}