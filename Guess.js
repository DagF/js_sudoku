function Guess( number, value ){
    var children = [];
    var parent = [];
    return {
        getCellNumber : function(){
            return number;
        },
        getValue : function(){
            return value || 0;
        },
        getParent : function(){
            return parent;
        },
        setParent : function(parent){
            parent = parent;
        },
        getChildren: function(){
            return children;
        },
        addChild : function(child){
            child.setParent(this);
            children.push(child)
        }
    }
}
