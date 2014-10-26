function Sudoku( grid ){
    var active_grid = new Grid( );
    active_grid.setValuesByRawGrid( grid );


    return{
        solve : function(){

        },
        draw :function(){

        },
        debugDraw : function(){
            return active_grid.debugDraw();
        }
    }
}