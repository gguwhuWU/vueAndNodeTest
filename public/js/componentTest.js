$(function () {	
    cTest();
    propTest();
    propTest2();
    propTest3();
    propTest4();
    propTest5();
    propTest6();
    propTest7();
    propTest8();
    propTest9();
    propTest10();
    propTest11();
    propTest12();
});

//extend component
function cTest(){
    //全域註冊(Global Registration)，讓 Instance 皆可使用
    /*
    Vue.component('menu-section', {
        template: '<ul><li v-for="item in menuItems">{{ item.text }}</li></ul>',
        data: function() {
            return {
                menuItems: [{
                    text: 'About me'
                }, {
                    text: 'Articles'
                }, {
                    text: 'contact'
                }]
            };
        }
    });
    */

    //我們的組件會根據註冊在哪，有不同語意名。 用 Vue.extend 方法，將組件定義拆出來。
   var MenuItem = Vue.extend({
        template: '<ul><li v-for="item in menuItems">{{ item.text }}</li></ul>',
        data: function() {
            return {
                menuItems: [{
                    text: 'About me'
                }, {
                    text: 'Articles'
                }, {
                    text: 'contact'
                }]
            };
        }
    });

    var app1 = new Vue({
        el: '#app1',
        data: {
            message: 'Hello Vue!'
        },
        components: {
            'description-section': {
                template: '<p>{{ text }}</p>',
                data: function() {
                    return {
                        text: 'Hello, I am Ralph.'
                    }
                }
            },
            'menu-section': MenuItem
        }
        /* 有註冊 <description-section> */
    });
    var app2 = new Vue({
        el: '#app2',
        components: {
            'my-menu': MenuItem
        }
    });
}

//全域 component
function propTest(){

    Vue.component('child', {
        props: ['myMessage'],
        template: '<span>{{ myMessage }}</span>'
    })

    Vue.component('prompt-component', {
        template: '<button @click="sayHi(userName)">Say Hi!</button>',
        props: ['user-name'], //使用`props`聲明它所獲得的資料
        methods: {
          sayHi: function(name) {
            toastr.info(`Hi ${name}`, 'son data');
          }
        }
    })

    Vue.component('todo-item', {
        template: '<span>{{ text }} + {{ isComplete }}</span>',
        props: ['text','isComplete']
    })

    new Vue({
        el: '#app',
        data: {
            name: 'Peter',
            todo: {
                text: 'Learn Vue',
                isComplete: false
            }
        },
        methods: {
           
        }
    })
}

//區域 component
function propTest2(){
    const components = {
        'productCard': {
            template: 
            '<div class="product-card">\
                <div class="card">\
                    <h3 class="card-header">{{clonedMadeFrom}}\
                        <label class="btn btn-warning  btn-sm" @click="modifyMadeFrom">modify string prop</label>\
                    </h3>\
                    <div class="card-block">\
                        <h4 class="card-title">{{product.name}}</h4>\
                        <p class="text-danger">${{product.price}}\
                            <label class="btn btn-warning  btn-sm" @click="modifyProductPrice">modify object prop</label>\
                        </p>\
                        <p class="card-text">{{product.description}}</p>\
                        <a href="#" class="btn btn-primary" @click="moreInfo(product.name)">More Info</a>\
                    </div>\
                </div>\
            </div>',
            props: {
                madeFrom: {
                    type: String,
                    default: 'default country',
                    required: false
                },
                product: {
                    type: Object,
                    default: function () {
                        return {
                            name: 'default name',
                            description: 'default description',
                            price: 300.00
                        }
                    }
                },
                moreInfo: {
                    type: Function,
                    required: true
                }
            },
            // 資料區塊
             data() {
                return {
                    // 無須通知父組件 madeFrom 異動資訊
                    internalMadeFrom: this.madeFrom
                }
            },
            // 屬性區塊
            computed: {
                clonedMadeFrom: {
                    get: function () {
                        //console.log('get');
                        return this.madeFrom;
                    },
                    set: function (newValue) {
                        //console.log('newValue:'+newValue);
                        // 將異動後的數值送給父祖件
                        this.$emit('madeFromChanged', newValue);
                    }
                }
            },
            // 方法區塊
            methods: {
                modifyMadeFrom: function () {
                    // 修改 string 型態的 props 屬性
                     this.clonedMadeFrom = 'Japan' + new Date().getSeconds();
                },
                modifyProductPrice: function () {
                    // 修改 object 型態的 props 屬性
                     this.product.price += 1;
                }
            }
        }
    }

    new Vue({
        el: '#propsTester',
        data: {
            madeFrom: 'Taiwan',
            product: {
                name: 'Big Pen',
                description: 'What a nice pen!! Buy it now.',
                price: 99.12
            }
        },
        methods: {
            onMadeFromChanged: function (updatedMadeFrom) {
                //console.log("updatedMadeFrom:"+updatedMadeFrom);
                // 更新 madeFrom 為子組件修改的新數值
                this.madeFrom = updatedMadeFrom
                // emit the event and pass with it an object of "event data".
                this.$bus.$emit('specialEvent', {
                    msg: 'This message came from the specialEvent.',
                    title: 'Trigger by PropsTester'
                });
            },
            showMoreInfo: function (id) {
                toastr.info(`show [${id}] info called by sub component!!`, 'More Info')
            }
        },
        components: components
    })
}

function propTest3(){
    Vue.component('currency-input', {
        template: '\
          <span>\
            <input\
              ref="input"\
              v-bind:value="value"\
              v-on:input="updateValue($event.target.value)">\
          </span>\
        ',
        props: ['value'],
        methods: {
          // Instead of updating the value directly, this
          // method is used to format and place constraints
          // on the input's value
          updateValue: function (value) {
            var formattedValue = value
              // Remove whitespace on either side
              .trim()
              // Shorten to 2 decimal places
              .slice(
                0,
                value.indexOf('.') === -1
                  ? value.length
                  : value.indexOf('.') + 3
              )
            // If the value was not already normalized,
            // manually override it to conform
            if (formattedValue !== value) {
              this.$refs.input.value = formattedValue
            }
            // Emit the number value through the input event
            this.$emit('input', Number(formattedValue))
          }
        }
      })

    Vue.component('button-counter', {
        template: '<button class="btn btn-info" v-on:click="incrementCounter">{{ door }}來客 ( {{ counter }} )</button>',
        props: ['door'],
        data: function () {
          return {
            counter: 0
          }
        },
        methods: {
          incrementCounter: function () {
            //console.log('子先執行');
            this.counter += 1
            this.$emit('increment')
          }
        },
      })
      
      new Vue({
        el: '#counter-event-example',
        data: {
          total: 0,
          price: 0
        },
        methods: {
          incrementTotal: function () {
            //console.log('父再被呼叫');
            this.total += 1
          }
        }
      })
}

//兄弟互傳
function propTest4(){
    let Hub = new Vue(); //創建事件中心
    new Vue({
        el: '#propTest4',
        methods: {
            eve() {
                console.log('123');
                Hub.$emit('msg','我要傳給兄弟組件們，你收到沒有','傳送的資料2'); //Hub觸發事件
            }
        }
      });

      new Vue({
        el: '#propTest4_2',
        data() {
            return {
              message:  ''
            }
          },
        created() {
            Hub.$on('msg', (e,a) => { //Hub接收事件
                console.log(e);
                this.message = a;
            });
        }
      });
}

//父子互傳 / extend component
function propTest5(){
    var Header = Vue.extend({
        template: '<div id="son">\
                    <span>子在這</span>\
                    <br>\
                    <span>{{msg}}</span>\
                    <button class="btn btn-info" @click="send">點擊向父組件傳值</button>\
　　　             </div>',
        props: ['msg'], //拿到父組件傳過來的數據
        data: function () {
            return {
              sonData: '我是來自兒子的數據'
            }
        },
        methods:{
            send(){
        　　    this.$emit('toparent', this.sonData);
            }
        }
    });

    new Vue({
        el: '#propTest5',
        data: {
            dady: '這是來自爸爸的數據',
            momo: '這是來自媽媽的數據'
        },
        components: {
            'my-header': Header
        },
        methods:{
            fromSon(data){
                toastr.info(`${data}`, 'son data'); //我是來自兒子的數據
            }
        }
      })
}

//覆蓋
function propTest6(){
    // 註冊
    Vue.component('my-component', {
     template: '<div id="mount-point">A custom component!</div>'
    })

  var vm = new Vue({
    el: '#propTest6',
    data: {
    } 
  })

  // 創建構造器
var Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function () {
      return {
        firstName: 'Walter',
        lastName: 'White',
        alias: 'Heisenberg'
      }
    }
  })
  
  // 創建 Profile 實例，並掛載到一個元素上。 (會替換 #mount-point 內容)
  new Profile().$mount('#mount-point')
}

//Single Slot
function propTest7(){
    Vue.component('app-layout', {
        template: `
          <div class="layout">
            <h1>我是父元件的標題</h1>
            <p>我是父元件的內容</p>
            <slot></slot>
          </div>`
      });
      
      Vue.component('app-header', {
        props: ['id'],
        template: `
          <div>
            <h1>我是子元件 app-header 的標題 #</h1>
            <slot>只有在父元件沒有要分發的內容時才會顯示。</slot>
          </div>`
      });
      
      Vue.component('app-footer', {
        props: ['id'],
        template: `
          <div>
            <h1>我是子元件 app-footer 的標題 #</h1>
            <slot>只有在父元件沒有要分發的內容時才會顯示。</slot>
          </div>`
      });
      
      var vm = new Vue({
        el: '#propTest7'
      });
}

//Named Slots
function propTest8(){
    var layout = Vue.extend({
        template: `
        <div class="container">
          <p>-{{test}}-</p>
          <header>
            <slot name="header"></slot>
          </header>
          <main>
            <slot></slot>
          </main>
          <footer>
            <slot name="footer"></slot>
          </footer>
        </div>`,
        data: function () {
            return {
              test: 'test8'
            }
        }
    });

    var vm = new Vue({
        el: '#propTest8',
        components: {
            'test8layout': layout
        }
    });
}

//Scoped Slots
function propTest9(){
    Vue.component('app-layout2', {
        template: `
          <div class="layout">
            <h1>我是父元件的標題2</h1>
            <p>我是父元件的內容2</p>
            <slot></slot>
          </div>`
      });
      
      Vue.component('app-header2', {
        template: `
          <div>
            <h1>我是子元件 app-header2 的標題</h1>
            <slot text="app-header 跟大家打招呼！">
             只有在父元件沒有要分發的內容時才會顯示。
            </slot>
          </div>`
      });
      
      Vue.component('app-footer2', {
        template: `
          <div>
            <h1>我是子元件 app-footer2 的標題</h1>
            <slot text="app-footer 跟大家打招呼！">
             只有在父元件沒有要分發的內容時才會顯示。
            </slot>
          </div>`
      });
      
      var vm = new Vue({
        el: '#propTest9'
      });
}

//Scoped Slots-list object
function propTest10(){
    Vue.component('test10list', {
        props: ['items'],
        template: `
          <ul>
            <slot name="item" v-for="item in items" :text="item.text">
            </slot>
          </ul>`
      });
      
      var vm = new Vue({
        el: '#propTest10',
        data: {
          items: [
            { id: 1, text: '項目 1' },
            { id: 2, text: '項目 2' },
            { id: 3, text: '項目 3' }
          ]
        }
      });
}

//Dynamic Components
function propTest11(){
    var vm = new Vue({
        el: '#propTest11',
        data: {
          view: 'home'
        },
        methods: {
          changeView(viewName) {
            this.view = viewName 
          }
        },
        components: {
          home: {
            template: "<div class='card text-center'> \
                            <div class='card-body'>This is home.</div>\
                        </div>"
          },
          posts: {
            template: "<div class='card text-center'> \
                            <div class='card-body'>This is posts.</div>\
                        </div>"
          },
          archive: {
            template: "<div class='card text-center'> \
                            <div class='card-body'>This is archive.</div>\
                        </div>"
          }
        }
      })
}

function propTest12(){
    var vm = new Vue({
        el: '#propTest12',
        data: {
          view: 'home'
        },
        methods: {
          changeView(viewName) {
            this.view = viewName 
          }
        },
        components: {
          home: {
            template: "<div class='card text-center'> \
                            <div class='card-body'> \
                            This is home. \
                            <input type='text' placeholder='Hello World!'> \
                            </div>\
                        </div>"
          },
          posts: {
            template: "<div class='card text-center'> \
                            <div class='card-body'>This is posts.</div>\
                        </div>"
          },
          archive: {
            template: "<div class='card text-center'> \
                            <div class='card-body'>This is archive.</div>\
                        </div>"
          }
        }
    })
}