function CellCluster(){
    var cells = [];
    var length = 0;
    var possibilities = {
        1:9,
        2:9,
        3:9,
        4:9,
        5:9,
        6:9,
        7:9,
        8:9,
        9:9
    };
    return {
        addCell : function( cell ){
            length++;
            cells[ length ] =  cell;
            cell.addCluster( this );
        },
        getCells : function(){
            return cells;
        },
        decreasePossibility : function( value ){
            possibilities[ value ]--;
        },
        removePossibleValue : function( value ){
            cells.forEach( function( cell ){ cell.removePossibleValue( value );})
        },
        hasOnePossibleCellForAValue : function(){
            for( var p = 1; p <= 9; p++)
                if( possibilities[p] == 1 ) return true;
        },
        setOnlyPossibleCell : function(){
            for( var p = 1; p <= 9; p++)
                if( possibilities[p] == 1 ) break;

            cells.forEach( function(cell){
                var pos = cell.getPossibilities();
                if( pos.indexOf( p ) >= 0 ){
                    cell.setValue( p );
                }
            });
        }
    };
}