function Grid(){
    var groups = [],
        columns = [],
        rows = [],
        cells = [],
        is_solvable = true;

    for( var i = 1; i <= 9; i++ ){
        groups[i] = new CellCluster( this );
        columns[i] = new CellCluster( this );
        rows[i] = new CellCluster( this);
    }

    for( var c = 0; c < 9*9; c++ ){
        var cell = new Cell( c );
        cells[c + 1] = cell;

        var row = ( c - (c % 9)) / 9 + 1;
        rows[ row ].addCell( cell );

        var column = ( c % 9 ) + 1;
        columns[ column ].addCell( cell );

        var group = 1 + ((column - 1) - ((column - 1) % 3)) / 3 + (((row - 1) -((row - 1 ) % 3)) / 3) * 3;// 1 + (0-2) + (0-2) * 3
        groups[group].addCell( cell );
    }


    return{
        setUnsolvable : function(){
            is_solvable = false;
        },
        isSolvable : function(){
            return is_solvable;
        },
        setValuesByRawGrid : function( grid ) {
            for( var y = 0; y < 9; y++){
                for (var x = 0; x < 9; x++) {
                    var value = grid[y][x];
                    if( typeof value == "number" ){
                        rows[y+1].getCells()[x+1].setValue( value );
                    }
                }
            }
        },
        clone : function(){
            var g = new Grid();
            g.setValuesByExistingGrid( this );
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
                var row = rows[ y ];
                var cells = row.getCells();

                for( var x = 1; x <= 9; x++){
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
        },
        setCellsWithOnePossibleValue : function(){
            var values_set = 0;
            cells.forEach( function( cell ){
                if( cell.hasOnePossibleValue() && !cell.isSet() ){
                    cell.setOnlyPossibleValue();
                    values_set++;
                }
            });
            return values_set;
        },
        setOnlyPossibleCellForValue : function(){
            var values_set = 0;
            rows.forEach( function( row ){
                if( row.hasOnePossibleCellForAValue() ){
                    row.setOnlyPossibleCell();
                    values_set++;
                }
            });

            columns.forEach( function( row ){
                if( row.hasOnePossibleCellForAValue() ){
                    row.setOnlyPossibleCell();
                    values_set++;
                }
            });

            groups.forEach( function( row ){
                if( row.hasOnePossibleCellForAValue() ){
                    row.setOnlyPossibleCell();
                    values_set++;
                }
            });
            return values_set;
        },
        getCells : function(){
            return cells;
        },
        setValuesByExistingGrid : function( existing_grid ){
            var new_cells = this.getCells();
            var existing_cells = existing_grid.getCells();
            for( var c = 1; c <= 81; c++){
                var value = existing_cells[c].getValue();
                if( typeof value == "number" ){
                    new_cells[c].setValue( value );
                }
            }

        },
        getFirstUnsetCell : function( cell_number ){
            console.log( "c: " + cell_number )
            for( var c = cell_number; c < 81; c++ ){
                if( !cells[ c ].isSet() ){
                    return cells[ c ];
                }
            }
        },
        getCellByNumber : function( cell_number ){
            return cell = cells[ cell_number ];
        },
        setValueByGuess : function( guess ){
            var value = cells[ guess.getNumber()].getPossibilities()[ guess.getValue() ];
           cells[ guess.getNumber()].setValue( value );
        }
    }


}