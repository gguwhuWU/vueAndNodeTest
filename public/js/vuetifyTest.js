$(function () {	
   method1();
});

function method1(){
    const Foo = { template: '<div>foo</div>' };
    const Bar = { template: '<div>bar</div>' };

    const routes = [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
    ];

    const router = new VueRouter({
        routes
    });

    new Vue({
        el: '#app',
        router: router,
        data: {
          drawer: true,
          page: "phone",
        },
        methods: {
          switchPage(page) {
            this.page = page
          }
        },
        components: {
            'my-component-input': GetComponentInput()
        }
      })
}

function GetComponentInput(){

    var componentInput = Vue.extend({
        template:  '#componentInput'
        ,data: function () {
            return {
                value1: 33
            }
        }
        ,methods: {
            submit: function() {
                
            }
        }
    });

    return componentInput;
}