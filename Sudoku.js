function Sudoku( grid ){
    var active_grid = new Grid( );
    active_grid.setValuesByRawGrid( grid );
    var is_solvable = true;
    var is_solved = false;
    var grids = [];

    return{
        solve : function(){

        },
        draw :function(){

        },
        debugDraw : function(){
            return active_grid.debugDraw();
        },
        solve : function(){
            var lim = 6;
            while( lim > 0 && is_solved != true && is_solvable == true ){
                grids.push( active_grid.clone() );
                active_grid.setCellsWithOnePossibleValue();
                active_grid.setOnlyPossibleCellForValue();
                lim--;
            }
        }
    }



}