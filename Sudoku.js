function Sudoku( grid ){
    var active_grid = new Grid(),
        is_solvable = true,
        is_solved = false,
        grids = [],
        guesses = [];

    active_grid.setValuesByRawGrid( grid );

    if( !active_grid.isSolvable() ){
        return {};
    }

    function rollBack(){
        active_grid = grids.pop();
    }

    function setPredictableValues(){
        var values_set;
        do{
            values_set= 0;
            values_set += active_grid.setCellsWithOnePossibleValue();
            values_set += active_grid.setOnlyPossibleCellForValue();
            console.log(values_set);
        }while( values_set > 0 );
    }

    function guess(){
        if( guesses.length > 0 ){
            var first_unset_cell = active_grid.getFirstUnsetCell( 1 );
            var guess = new Guess( first_unset_cell.getNumber(), first_unset_cell.getFirstPossibleValueGreaterThan( 0 ) );
            active_grid.setValueByGuess( guess );
            guesses.push( guess );
        }
        else{
            guess = getNextGuess( guesses[ guesses.length - 1 ] );
            active_grid.setValueByGuess( guess );
            guesses.push( guess );
        }


    };

    function getNextGuess( guess ){
        var cell = active_grid.getCellByNumber( guess.getNumber() );
        if( !cell.isSet() ){

        }
        else{
            cell = active_grid.getFirstUnsetCell( guess.getNumber() );
            var pos = cell.getPossibilities();
            guess = new Guess( cell.getNumber(), pos[0] );
        }
        return guess;
    }

    return{
        draw :function(){

        },
        debugDraw : function(){
            return active_grid.debugDraw();
        },
        solve : function(){
            var lim = 6;
            while( lim > 0 && is_solved != true && is_solvable == true ){
                grids.push( active_grid.clone() );
                try {
                    setPredictableValues();
                    //guess();
                } catch(e) {
                    console.log( e );
                    rollBack();
                }
                lim--;
            }
            console.log(grids);
        }
    }



}