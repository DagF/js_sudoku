function Cell(n){
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
    var number = n;
    var possibility_count = 9;

    var value;

    return {
        getValue : function(){
            return value;
        },
        setValue : function( v ){
            if( is_set != true && possibilities[ v ] ){
                value = v;
                is_set = true;
                for( var i = 1; i <= 9; i++){
                    if( i != value ){
                        this.removePossibleValue( i );
                    }
                }
                clusters.forEach( function( cluster ){ cluster.removePossibleValue( value );});

            }
            else{
                console.log( v );
                throw "Value already set";
            }
        },
        addCluster : function( cluster ){
            clusters.push( cluster );
        },
        debugDraw : function(){
            var drawing = "";

            if( is_set != true ){
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
            }
            else{
                drawing += "       \n   " + value + "   \n       ";
            }
            return drawing;

        },
        removePossibleValue : function( possible_value ){
            if( possibilities[ possible_value ]){
                possibility_count--;
                possibilities[ possible_value ] = false;
                clusters.forEach( function( cluster ){ cluster.decreasePossibility( possible_value ) });
            }
            if( !is_set && possibility_count < 1 ){
                throw "No more possible values";
            }
        },
        getPossibilityCount : function(){
            return possibility_count;
        },
        setOnlyPossibleValue : function(){
            if( possibility_count == 0 ) return false;
            for( var p = 1; p <= 9; p++ ){
                if( possibilities[p] ){
                    this.setValue( p );
                    return true;
                }
            }
        },
        isSet : function(){
            return is_set;
        },
        getPossibilities : function(){
            var poss = [];
            for( var p = 1; p <= 9; p++ ){
                if( possibilities[p] ){
                    poss.push( p );
                }
            }
            return poss;
        },
        getCellNumber : function(){
            return number;
        },
        hasOnePossibleValue : function(){
            if( possibility_count == 1) return true;
            return false;
        },
        hasPossibleValueGreaterThan : function( n ){
            for( var p = n + 1; p <= 9; p++ ){
                if( possibilities[p] ){
                    return true;
                }
            }
            return false;
        },
        getFirstPossibleValueGreaterThan : function( n ){
            for( var p = n + 1; p <= 9; p++ ){
                if( possibilities[p] ){
                    return p;
                }
            }
        }
    }
}