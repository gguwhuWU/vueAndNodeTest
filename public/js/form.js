$(function () {	
    formVueDom1();
});

function formVueDom1(){
    const data = {
        message: '請輸入!',
        selected: '',
        developer: 'ddd',
        manager : 'mmm',
        designer : 'design',
        role  : '',
        options: ['gaming', 'coding', 'hiking', 'alwayEat', 'alwaysSleep'],
        habits : [],
        numberValue : 0,
        trimValue : '', 
        lazyValue : '',
        isMoeMoe: false, /* 萌萌嗎 */
        a: 'Yes',
        toggle: '',
        swords: [
			'老媽的鹹魚',
			'尚方寶劍',
			'清朝的刀'
        ],
        selectedValue : null
    };
    

    /*
    理論上，複選框的值應該是boolean，true-value和false-value的意思是，用指定值替換選中使本來應該的true，反之亦然。
    所以這個地方，的意思是，當選中後，變量toggle的值不再是true的，而是一個 a; 當撤銷選中後，變量toggle的值不再是false的，而是 b;
    当选中时
    vm.toggle === vm.a
    当没有选中时
    vm.toggle === vm.b
    */

    var app = new Vue({
        el: '#app',/* 掛載點 */
        data: data,/* 初始資料 */
        methods: { /* ... */}, /* 方法 */
        computed: {
		    b: function() {
			    return (this.isMoeMoe) ? 'Yes' : 'No';
		    }
	    }
    });
}