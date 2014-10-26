function Guess( number, value ){
    return {
        getNumber : function(){
            return number;
        },
        getValue : function(){
            return value || 0;
        }
    }
}
