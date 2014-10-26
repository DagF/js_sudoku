function CellCluster(){
    var cells = [];
    var length = 0;
    return {
        addCell : function( cell ){
            length++;
            cells[ length ] =  cell;
            cell.addCluster( this );
        },
        getCells : function(){
            return cells;
        }
    };
}