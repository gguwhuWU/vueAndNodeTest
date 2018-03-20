$(function () {	
    vueDom();
    vueDom2();
    vueDom3();
});

//computed methods
function vueDom3(){
    var vm = new Vue({
        el: '#userProfile',
        data: {
          wufirstName: 'Ralph',
          wulastName: 'Hsu',
          counter: 0
        },
        computed: {
          wufullName: function () {
              return this.wufirstName + ' ' + this.wulastName;
          },
          wushortName: function() {
              return this.wufirstName.split('')[0] + '. ' + this.wulastName;
          }
        },
        methods: {
            countUserClick: function (event) {
                this.counter += 1;
                console.info('Count: ' + this.counter);
            },
            say: function(msg, evt) {
                if (evt) evt.preventDefault();
                alert(msg);
            }
        }
      })
}

//components
function vueDom(){

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

    const data = {
        message: 'Hello Vue jojo!',
        user: 'ralph',
        role: 'developer'
    };
               
    const components = {
        'description-section': {
            template: '<p>{{ text }}</p>',
            data: function() {
                return {
                    text: 'Hello, I am Ralph.'
                }
            }
        }
    };

    var app = new Vue({
        el: '#app', /* 掛載點 */
        data: data,/* 初始資料 */
        components: components, /* 只在單一 Instance 用到的 components  -> 局部註冊(Local Registration)*/
        methods: { /* ... */}, /* 方法 */
    });
}

//watch filters
function vueDom2(){
    var app2 = new Vue({
        el: '#app2',
        data: { 
            msg: 'Vue rock!22',
            userInput: '',
            raw_html: '<div class="alert alert-info">123456</div>',
            dynamicId: 5,
            isDisabled: true,
            pageLink: 'http://www.google.com.tw',
            username : 'huanyuWu',
            activeColor : 'blue',
            fontSize: 16,
            btnType: 'default',
            userInfo: {
                FirstName: 'John',
                LastName: 'Doe',
                Age: 30
              }
	    },
        filters: {
          uppercase: function(v) {
            return v.toUpperCase();
          }
        },
        methods: {
            btnOptions: function() {
                return ['btn-' + this.btnType];
            }
        },
         watch: {
        //      userInput: function (val) {
        //          alert(val);
        //   }
            userInfo: {
                handler: function (val, oldVal) { alert('user內的資料改變了'); },
                deep: true
            }
        }
    });
}