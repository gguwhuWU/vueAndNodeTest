module.exports = {
    GetItems : function(){
        return 'getListsOk';
    },
    GetItem : function(){
        return 'wuwu';
    },
    DeleteItem : function(id){
        return 'deleteOK:' + id;
    },
    CreateItem: function(id, value){
        return 'createOK:' + id;
    },
    UpdateItem: function(id, value){
        return 'updateOK:' + id;
    }
  };