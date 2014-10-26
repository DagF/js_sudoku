function Cell(){
    var clusters = [];
    var is_set = false;
    var possibilities = {
        1:true,
        2:true,
        3:true,
        4:true,
        5:true,
        6:true,
        7:true,
        8:true,
        9:true
    };

    var value;

    return {
        getValue : function(){
            return value;
        },
        setValue : function( v ){
            if( is_set != true ){
                value = v;
                is_set = true;
                for( var i = 1; i <= 9; i++){
                    if( i != v ){
                        this.removePossibleValue( i );
                    }
                }
                return true;
            }
            return false;
        },
        addCluster : function( cluster ){
            clusters.push( cluster );
        },
        draw : function(){
        },
        debugDraw : function(){
            var drawing = "";

            for( var position = 1; position <= 9; position++){
                if( position % 3 === 1){
                    drawing += " ";
                }
                drawing += possibilities[ position ] ? position : " ";
                    if (position % 3 == 0) {
                        drawing += " \n";

                    }

                    else {
                        drawing += " ";
                    }
            }
            return drawing;

        },
        removePossibleValue : function( possible_value ){
            possibilities[ possible_value ] = false;
        }
    }
}