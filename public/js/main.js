$(function () {	
    vueDom();
    vueDom2();
    vueDom3();
    testLodash();
});

function testLodash(){
    // 去掉falsy值后的数组
    console.log(_.compact([0, 1, false, 2, '', 3]));
    // 找出数组中不同的值
    console.log(_.difference([1, 2, 3, 4, 5], [5, 2, 10]));

    // 根据条件找出数组元素的索引值，未找到则返回 -1
    var characters = [
        { 'name': 'barney',  'age': 36, 'blocked': false },
        { 'name': 'fred',    'age': 40, 'blocked': true },
        { 'name': 'pebbles', 'age': 1,  'blocked': false }
    ];
    console.log(_.findIndex(characters, function(chr) {
        return chr.age < 20;
    }));

    console.log(_.findIndex(characters, { 'age': 36 }));
    console.log(_.findIndex(characters, 'blocked'));

    // 找出数组中相同的值
    console.log(_.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]));

    // 找出数组中最后的值
    console.log(_.last([1, 2, 3]));
    console.log(_.last([1, 2, 3], 2));

    // 找出某个值最后出现的索引
    console.log(_.lastIndexOf([1, 2, 3, 1, 2, 3], 2));

    // 移除数组中指定的值
    var array = [1, 2, 3, 1, 2, 3];
    _.pull(array, 2, 3);
    console.log(array);

    // 返回一个范围数组
    // _.range([start=0], end, [step=1])
    console.log(_.range(0, 20, 5));

    // 移除数组中匹配条件的值
    var array = [1, 2, 3, 4, 5, 6];
    var evens = _.remove(array, function(num) { return num % 2 == 0; });
    console.log(array);
    console.log(evens);
}

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