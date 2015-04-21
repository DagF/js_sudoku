function Grid(){
    var groups = [],
        columns = [],
        rows = [],
        cells = [];

    for( var i = 1; i <= 9; i++ ){
        groups[i] = new CellCluster( this );
        columns[i] = new CellCluster( this );
        rows[i] = new CellCluster( this);
    }

    for( var c = 0; c < 9*9; c++ ){
        var cell = new Cell( c+1 );
        cells[c + 1] = cell;

        var row = ( c - (c % 9)) / 9 + 1;
        rows[ row ].addCell( cell );

        var column = ( c % 9 ) + 1;
        columns[ column ].addCell( cell );

        var group = 1 + ((column - 1) - ((column - 1) % 3)) / 3 + (((row - 1) -((row - 1 ) % 3)) / 3) * 3;// 1 + (0-2) + (0-2) * 3
        groups[group].addCell( cell );
    }

    function setValuesByRawGrid( grid ) {
        for( var y = 0; y < 9; y++){
            for (var x = 0; x < 9; x++) {
                var value = grid[y][x];
                if( typeof value == "number" ){
                    rows[y+1].getCells()[x+1].setValue( value );
                }
            }
        }
    }

    function clone(){
        var g = new Grid();
        g.setValuesByExistingGrid( this );
        return g;
    }

    function isSolved(){
        for( var i = 1; i < cells.length; i++){
            var cell = cells[i];
            if( cell == undefined) console.log("out of range: "+i + "of:" + cells.length);
            if( !cell.isSet() ){
                console.log("not solved" + cells[i].getCellNumber());
                return false;
            }
        }
        return true;
    }

    function getCellWithFewPossibilities(){
        for( p = 2; p <= 9; p++){
            for( var i = 1; i <= cells.length; i++){
                if( cells[i].getPossibilities().length == p){
                    return cells[i];
                }
            }
        }
    }

    function debugDraw(){
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
    }

    function setCellsWithOnePossibleValue(){
        var values_set = 0;
        cells.forEach( function( cell ){
            if( cell.hasOnePossibleValue() && !cell.isSet() ){
                cell.setOnlyPossibleValue();
                values_set++;
            }
        });
        return values_set;
    }

    function setOnlyPossibleCellForValue(){
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
    }

    function getCells(){
        return cells;
    }

    function setValuesByExistingGrid( existing_grid ){
        var new_cells = this.getCells();
        var existing_cells = existing_grid.getCells();
        for( var c = 1; c <= 81; c++){
            var value = existing_cells[c].getValue();
            if( typeof value == "number" ){
                new_cells[c].setValue( value );
            }
        }

    }

    function getFirstUnsetCell( cell_number ){
        console.log( "c: " + cell_number )
        for( var c = cell_number; c <= 81; c++ ){
            if( !cells[ c ].isSet() ){
                console.log(cells[ c ].isSet())
                console.log("wtf:"+cells[ c ].getCellNumber());
                return cells[ c ];
            }
        }
        return null;
    }
    function getCellByNumber( cell_number ){
        return cell = cells[ cell_number ];
    }

    function setValueByGuess( guess ){
        var value = cells[ guess.getCellNumber()].setValue( guess.getValue());
        cells[ guess.getCellNumber()].setValue( value );
    }

    function getFirstGuess(){
        var first_unset_cell = getFirstUnsetCell(1);
        var possibilities = first_unset_cell.getPossibilities();
        return new Guess(first_unset_cell, possibilities[0])
    }

    function getNextGuess(active_guess){
        if(active_guess.getCellNumber()){
            var first_unset_cell = getFirstUnsetCell(active_guess.getCellNumber());
        }
        else{
            var first_unset_cell = getFirstUnsetCell(1);
        }

        if(!first_unset_cell){
            active_guess = active_guess.getParent();
            return null
        }
        else{
            var c = active_guess.getChildren();
            if(c.length > 0){
                first_unset_cell = getFirstUnsetCell(c[c.length-1].getCellByNumber());
            }
            else{
                first_unset_cell = getFirstUnsetCell(1);
            }
        }
        var possibilities = first_unset_cell.getPossibilities();
        return new Guess(first_unset_cell.getCellNumber(), possibilities[0])
    }

    return{
        setValuesByRawGrid : setValuesByRawGrid,
        clone :clone,
        debugDraw : debugDraw,
        setCellsWithOnePossibleValue : setCellsWithOnePossibleValue,
        setOnlyPossibleCellForValue : setOnlyPossibleCellForValue,
        getCells : getCells,
        setValuesByExistingGrid : setValuesByExistingGrid,
        getFirstUnsetCell : getFirstUnsetCell,
        getCellByNumber : getCellByNumber,
        setValueByGuess : setValueByGuess,
        getNextGuess : getNextGuess,
        isSolved:isSolved,
        getCellWithFewPossibilities:getCellWithFewPossibilities
    }


}