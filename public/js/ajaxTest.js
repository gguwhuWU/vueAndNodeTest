//var mock = new AxiosMockAdapter(axios);

$(function () {
    Vue.use(VeeValidate);
    axiosTest1();
    propTest1();
    lifeCycle();
    ComponentTest();
    MixinsTest();
});

function axiosTest1(){
    new Vue({
        el: '#axiosTest1',
        data: {
          userId: '',
          userName: '',
          userPassword: ''
        },
        methods: {
          getData: function() {
            this.$validator.validateAll().then((result) => {

                if (result) {
                    let _this = this;
            
                    // mock.onGet('/user?id=70915').reply(200, {
                    //   name: 'wu',
                    //   password: '123456789' 
                    // });      
                    
                    
                    // mock.onGet('/user', {
                    //     params: {
                    //         id: '70915'
                    //     }
                    // }).reply(200, {
                    //     name: 'wu',
                    //     password: '123456789' 
                    // });      
                   
                    axios
                    //   .get(`/user?id=${_this.userId}`)
                      .get('/user', {
                        params: {
                          id: _this.userId
                        }
                      })
                      .then(function (response) {
                        _this.userName = response.data.name
                        _this.userPassword = response.data.password
                        toastr.success(`使用者姓名是 ${response.data.name}，密碼是 ${response.data.password}`, 'success');
                      })
                      .catch(function (error) {
                        toastr.error('取得資料失敗', 'fail');
                      })
                      .finally(() => {
                        toastr.info(`查詢編號: ${_this.userId} 的資料`, 'info');
                      });

                  return;
                }

                toastr.error('Correct them errors!', 'fail');
              });
          },
          postData: function() {
            let _this = this
            
            // mock.onPost('/user').reply(200, {
            //   id: 2, 
            //   aName: 'jojo'
            // })
            
            axios
              .post('/user', {
                name: this.userName,
                password: this.userPassword
              })
              .then(function (response) {
                toastr.success(`成功送出資料，使用者暱稱是 ${response.data.aName}，編號是 ${response.data.id}`, 'success');
              })
              .catch(function (error) {
                toastr.error('送出失敗', 'fail');
              });
          }
        }
      });
}

function propTest1(){
   
    var record = Vue.extend({
        //template: '<div :disabled="{{recordHasChanged}}"><span>{{ record.author }}</span><button @click="changeAuthor("Raf")">change author</button></div>',
        template: `<div>
                    <input type="text" :disabled = "recordHasChanged" v-model="record.author"/>
                    <button class="btn btn-info" @click="changeAuthor('Raf')">change author</button>
                   </div>`,
        props: ['record'],
        data: function () {
            return {
                recordHasChanged: false
            }
        },
        methods: {
            changeAuthor: function(username) {
                this.record.author = username;
                /* 做了一些事 */
                /* 把該筆記錄變成Raf的，並存回後端 */
                this.$set(this, "recordHasChanged", true)
                this.$emit('after-update');
            }
        }
    });
    
    var child = Vue.extend({
        props: ['type', 'myMessage'],
        template: '<span v-bind:class="[type]" >{{ myMessage }}</span>'
    });

    var component = Vue.extend({
        template: '#my-component'
    });

    var inline = Vue.extend({
        data () {
            return {
                message: 'Hello World!'
            }
        },
        mounted() {
            console.log('mounted')
        },
        ready() {
            console.log('ready')
        },
        created() {
            console.log('created')
        }
    });

    new Vue({
        el: '#propTest1',
        data: {
            list: [{author: "initName"}],
            classType: 'primary',
            msg: 'hello!'
        },
        methods: {
            updateList: function() {
                /* 前後端同步，跟後端要最新資料 */
                /* 寫回 list */
                var maxNum = 100;  
                var minNum = 1;  
                var n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;  
                this.list.push({author: "name"+n});
            }
        },
        components: {
            'record-element': record,
            'child' :child,
            'my-component' :component,
            'admin-post': inline
        }
    });
}

function lifeCycle(){
    var example = Vue.extend({
        template: '<span>lifeCycle</span>'
    });

    var app = new Vue({
        el: '#lifecycle',
        beforeCreate: function() {
            //vue instance 被 constructor 建立前
            console.log('beforeCreate');
          },
          created: function() {
            //vue instance 被 constructor 建立後，在這裡完成 data binding
            console.log('created');
          },
          beforeMount: function() {
            //綁定 DOM 之前
            console.log('beforeMount');
          },
          mounted: function() {
            //綁定 DOM 之後
            console.log('mounted');
          },
          beforeUpdate: function() {
            //資料更新，但尚未更新 DOM
            console.log('beforeUpdate');
          },
          updated: function() {
            //因資料更新，而更新 DOM
            console.log('updated');
          },
          beforeDestroy: function() {
            //移除 vue instance 之前
            console.log('beforeDestroy');
          },
          destroyed: function() {
            //移除 vue instance 之後
            console.log('destroyed');
          }
    });
}

function ComponentTest(){

    var child = Vue.extend({
        template: `<button @click="$parent.parentMethod">parent</button>`
        // template: '<button @click="$root.parentMethod">parent</button>'
        ,data: function () {
            return {
                childData: "55555"
            }
        }
        ,methods: {
            childMethod: function() {
                console.log("childMethod");
                console.log(this.childData); 
            }
        }
    });
    
    var child2 = Vue.extend({
        template: `<span>child2</span>`
        ,data: function () {
            return {
                testData: "ttttt"
            }
        }
        ,methods: {
            testMethod: function() {
                console.log("testMethod");
                console.log(this.testData);
            }
        }
    });

    const parent = new Vue({
        el: '#componentTest',
        data: {
            parentData: "jojo",
            msg: "77777777777777",
            list: [1,2,3]
        },
        methods: {
            parentMethod: function() {
                console.log(this.parentData);
            },
            callChildMethod: function() {
                this.$children[0].childMethod();
            },
            calltestMethod: function() {
                var childObject = this.$refs.profile;
                childObject.testMethod();
            }
        },
        components: {
            'child': child,
            'user-profile':child2
        }
    });
}

function MixinsTest(){
    //全域宣告和使用 Mixins。
    Vue.mixin({
        created: function() {
          var myOption = this .$options.myOption
          if (myOption) {
            console .log(myOption);
          }
        }
      });

    var mixObj = {
        created: function() {
          this.hello();
        },
        methods: {
          hello: function() {
            console.log('Hello from Mixin');
          }
        }
      }
      
      var mixObjAnother = {
        created: function() {
          this.prompt();
        },
        data: function () {
            return {
                mixData: "77889"
            }
        },
        methods: {
          prompt: function() {
            console.log('Prompt from Mixin');
          },
          hello: function() {
            console.log('Hello from Mixin Another ' + this.mixData);
          },
          foo: function() {
            console.log('foo');
          },
          conflicting: function() {
            console.log('from mixin');
          }
        }
      }
      
      var Component = Vue.extend({
        mixins: [mixObj, mixObjAnother],
        created: function () {
            console.log('component hook called');
          },
        methods: {
            bar: function() {
              console.log('bar');
            },
            conflicting: function() {
              console.log('from self');
            }
          }
      });
      
      var component = new Component();
      component.foo();
      component.bar();
      component.conflicting();

      new Vue({
        myOption: 'Hello World!'
      });
}