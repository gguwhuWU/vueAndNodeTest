$(function () {
    let Hub = new Vue(); //創建事件中心

    const parent = new Vue({
        el: '#listExample',
        data: {
        },
        methods: {
            parentMethod: function() {
                console.log(this.parentData);
            }
        },
        components: {
            'my-component-input': GetComponentInput(Hub),
            'my-component-edit-list': GetComponentEditList(Hub),
            'my-component-switch-button-group': GetSwitchButtonGroup(Hub)
        }
    });

});

function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

function GetComponentInput(Hub){

    var componentInput = Vue.extend({
        template:  '#componentInput'
        ,data: function () {
            return {
                newJob: ""
            }
        }
        ,methods: {
            submit: function() {
                Hub.$emit('inputData', this.newJob); //Hub觸發事件
                this.newJob = "";
            }
        }
    });

    return componentInput;
}

function GetComponentEditList(Hub){

    var componentInput = Vue.extend({
        template:  '#componentEditList'
        ,data: function () {
            return {
                // items: [
                //     {
                //         value: 'test1',
                //         checked: false,
                //         isEditeState: false
                //     },
                //     {
                //         value: 'test2',
                //         checked: false,
                //         isEditeState: false
                //     }
                // ],
                // items: {
                //     "a5436691-350c-4ed0-862e-c8abc8509a4a": {
                //         value: 'test1',
                //         checked: false,
                //         isEditeState: false
                //     },
                //     "a98bf666-a710-43b2-81b2-60c68ec4688d": {
                //         value: 'test2',
                //         checked: false,
                //         isEditeState: false
                //     },
                //     "452ef417-033d-48ff-9fec-9d686c105dce": {
                //         value: 'test3',
                //         checked: false,
                //         isEditeState: false
                //     }
                //   },
                items: {},
                filter: 'all'
            }
        },
        created() {
            Hub.$on('inputData', (v) => { //Hub接收事件
                Vue.set(this.items, _uuid(), {
                    value: v,
                    checked: false,
                    isEditeState: false
                  });
            });

            Hub.$on('switchPage', (filter) => { //Hub接收事件
                this.filter = filter;
            });
        }
        ,computed: {
            list: function() {

                switch (this.filter)
                    {
                        case "all":
                        {
                            return this.items //Hub觸發事件
                        }
                        case "undo":
                        {
                            var list = {};

                            for (var index in this.items) {
                              if (this.items[index].checked == false) {
                                list[index] = this.items[index];
                              }
                            }

                            return list;

                            // return this.items.filter(function (item) {
                            //     return !item.checked
                            // });
                        }
                        case "complete":
                        {
                            var list = {};

                            for (var index in this.items) {
                              if (this.items[index].checked == true) {
                                list[index] = this.items[index];
                              }
                            }

                            return list;
                            // return this.items.filter(function (item) {
                            //     return item.checked
                            // });
                        } 
                    }

                return this.items
              }
        }
        ,methods: {
            switchState: function(key, e) {
                this.items[key].checked ? ( (this.$set(this.items[key], 'checked', false)) ) : ( this.$set(this.items[key], 'checked', true) );
                Hub.$emit('switchData', this.items[key].checked); //Hub觸發事件
            },
            deleteItem: function(key, e) {
                Hub.$emit('deleteData', this.items[key].checked); //Hub觸發事件
                Vue.delete(this.items, key);
            },
            openEditeInput: function(key, e) {
                this.$set(this.items[key], 'isEditeState', true)
            },
            closeEditeInput: function(key, e) {
                this.$set(this.items[key], 'isEditeState', false)
            }
        }
    });

    return componentInput;
}

function GetSwitchButtonGroup(Hub){

    var switchButtonGroup = Vue.extend({
        template:  '#switchButtonGroup'
        ,data: function () {
            return {
                allListTotal: 0,
                undoneTotal: 0,
                completedTotal: 0,
                isFilterAll: true,
                isFilterUndo: false,
                isFilterComplete: false
            }
        },
        created() {
            Hub.$on('inputData', () => { //Hub接收事件
                this.allListTotal++;
                this.undoneTotal++;
            });

            Hub.$on('deleteData', (e) => { //Hub接收事件
                this.allListTotal--;
                
                if (e) 
                {
                    this.completedTotal--;
                }
                else
                {
                    this.undoneTotal--;
                }
            });

            Hub.$on('switchData', (e) => { //Hub接收事件

                if (e) 
                {
                    this.completedTotal++;
                    this.undoneTotal--;
                }
                else
                {
                    this.completedTotal--;
                    this.undoneTotal++;
                }
            });
        } 
        ,methods: {
            switchPage: function (event) {

                switch (event)
                {
                    case "all":
                    {
                        this.isFilterAll = true;
                        this.isFilterUndo = false;
                        this.isFilterComplete = false;
                        Hub.$emit('switchPage', 'all'); //Hub觸發事件
                        break;
                    }
                    case "undo":
                    {
                        this.isFilterAll = false;
                        this.isFilterUndo = true;
                        this.isFilterComplete = false;
                        Hub.$emit('switchPage', 'undo'); //Hub觸發事件
                        break;
                    }
                    case "complete":
                    {
                        this.isFilterAll = false;
                        this.isFilterUndo = false;
                        this.isFilterComplete = true;
                        Hub.$emit('switchPage', 'complete'); //Hub觸發事件
                        break;
                    } 
                }
            }
        }
    });

    return switchButtonGroup;
}