function Sudoku( grid ){
    var active_grid = new Grid();

    try {
        active_grid.setValuesByRawGrid(grid);
    }
    catch(e){
        return null;
    }

    try {
        active_grid = solve( active_grid );
    }
    catch(e){
        console.log("stop")
        return null;
    }


    function setPredictableValues(grid){
        var values_set;
        do{
            values_set= 0;
            values_set += grid.setCellsWithOnePossibleValue();
            values_set += grid.setOnlyPossibleCellForValue();
            console.log(values_set);
        }while( values_set > 0 );
    }

    function solve(grid){
        try {
            setPredictableValues(grid);
            if(grid.isSolved()){
                console.log("solved");
                return grid;
            }
             return guess(grid);
        }
        catch (e){
            console.log(e);
            return null;
        }

    }

    function guess(grid){
        cell = grid.getCellWithFewPossibilities();
        for( var i = 0; i < cell.getPossibilities().length; i++){
            g = grid.clone();
            g.getCells()[cell.getCellNumber()].setValue(cell.getPossibilities()[i]);
            solve(g);
            if(g.isSolved()){
                console.log("solved");
                return g;
            }
        }
    }

    function getCellValues(){
        var cells = active_grid.getCells();
        var values = [];
        for( var c = 1; c <=81; c++ ){
            values.push(cells[c].getValue());
        }
        return values;
    }

    return{
        debugDraw : function(){
            return active_grid.debugDraw();
        },
        getCellValues:getCellValues,
        solve : solve
    }
}