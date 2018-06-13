$(function () {	
    vueDom();
    vueDom2();
    vueDom3();
    asyncAwaitTest2();

    testDecimal();
});

function testFloat(){
    console.log('直接加法運算 0.1 + 0.2 =', 0.1 + 0.2); //0.3?
    console.log('直接減法運算 1.0 - 0.7 =', 1.0 - 0.7); //0.3?
    console.log('直接乘法運算 1.01 * 1.003 =', 1.01 * 1.003); //1.01303?
    console.log('直接除法運算 0.029 / 10 =', 0.029 / 10); //0.0029?
}

function testDecimal(){
    console.log('直接加法運算 0.1 + 0.2 =', new Decimal(0.1).add(new Decimal(0.2)).toNumber()); //0.3?
    console.log('直接減法運算 1.0 - 0.7 =', new Decimal(1.0).sub(new Decimal(0.7)).toNumber()); //0.3?
    console.log('直接乘法運算 1.01 * 1.003 =', new Decimal(1.01).mul(new Decimal(1.003)).toNumber()); //1.01303?
    console.log('直接除法運算 0.029 / 10 =', new Decimal(0.029).div(new Decimal(10)).toNumber()); //0.0029?
}

function asyncAwaitTest2(){
    async function showGitHubUser(handle) {
        const url = `https://api.github.com/users/${handle}`;
        const response = await fetch(url);
        const user = await response.json();
        console.log(user.name);
        console.log(user.location);
      }
      
      console.log('before showGitHubUser');
      showGitHubUser('l7960261');
      console.log('after showGitHubUser');
}

async function asyncAwaitTest(){
    let runPromise = (someone, timer, success = true) => {
        console.log(`${someone} 開始跑開始`);
        return new Promise((resolve, reject) => {
          // 傳入 resolve 與 reject，表示資料成功與失敗
          if (success) {
            setTimeout(function () {
              // 3 秒時間後，透過 resolve 來表示完成
              resolve(`${someone} 跑 ${timer / 1000} 秒時間(fulfilled)`);
            }, timer);
          } else {
            // 回傳失敗
            reject(`${someone} 跌倒失敗(rejected)`)
          }
        });
      }

    /// 1. Promise  
    //   // 此段函式並不會影響其它函示的執行
    //   runPromise('小明', 3000).then(someone => {
    //     console.log('小明', someone)
    //   });

    //   // 以下這段 console 會在 promise 結束前就執行
    //   console.log('這裡執行了一段 console');

    /// 2. await2  
    // 此段函示會中斷其它函式的運行
    // let mingRun = await runPromise('小明', 2000)
    // console.log('跑完了:', mingRun);
    // let auntieRun = await runPromise('漂亮阿姨', 2500);
    // console.log('跑完了:', auntieRun);

    /// 3. await3
    // let allRun = await Promise.all([runPromise('小明', 3000), runPromise('漂亮阿姨', 2500)]);
    // console.log(allRun);
    // ["小明 跑 3 秒時間(fulfilled)", "漂亮阿姨 跑 2.5 秒時間(fulfilled)"]

    /// 4. await4
    // const asyncRun = async () => {
    //     let mingRun = await runPromise('小明', 2000);
    //     let auntieRun = await runPromise('漂亮阿姨', 2500);
    //     return `${mingRun}, ${auntieRun}`
    //   }
    //   asyncRun().then(string => {
    //     console.log(string)
    //   }).catch(response => {
    //     console.log(string)
    //   })

    /// 5. await2
    const asyncRunFail = async () => {
        let mingRun = await runPromise('小明', 2000, false);
        let auntieRun = await runPromise('漂亮阿姨', 2500);
        return `${mingRun}, ${auntieRun}`
      }
      asyncRunFail().then(string => {
        console.log(string);
      }).catch(response => {
        console.log(response);
        // 小明 跌倒失敗(rejected)
      })
}

function destructuring_function(){
    function callSomeone ({person = '小明', person2}) {
        console.log(`${person} 呼叫 ${person2}`)
      }
      callSomeone({ person: '杰倫', person2: '阿姨' }); // 杰倫 呼叫 阿姨
      callSomeone('杰倫', '阿姨'); // 小明 呼叫 undefined
      callSomeone({ person2: '阿姨' }); // 小明 呼叫 阿姨
      callSomeone({ person2: '杰倫', person: '啊罵' }); // 啊罵 呼叫 杰倫
      callSomeone({}); // 小明 呼叫 undefined
}

function arrary_methods(){
    let people = [
        {
          name: '小明',
          money: 500
        },
        {
          name: '漂亮阿姨',
          money: 3000
        },
        {
          name: '杰倫',
          money: 60000
        },
        {
          name: '老媽',
          money: Infinity
        }
      ];

    // 1.Filter
    var filterEmpty = people.filter(function(item, index, array){
    });
    console.log(filterEmpty);    // 沒有條件，會是一個空陣列
    var filterMoneyThan5000 = people.filter(function(item, index, array){
    return item.money > 5000;       // 取得大於五千元
    });
    console.log(filterMoneyThan5000); // 杰倫, 老媽 這兩個物件

    // 2.Find
    var findEmpty = people.find(function(item, index, array){
    });
    console.log(findEmpty);          // 沒有條件，會是 undefined
    var findMoneyThan5000 = people.find(function(item, index, array){
      return item.money > 5000;      // 取得大於五千元
    });
    console.log(findMoneyThan5000);  // 雖然答案有兩個，但只會回傳 '杰倫' 這一個物件
    var findJay = people.find(function(item, index, array){
      return item.name === '杰倫';    // 找到杰倫
    });
    console.log(findJay);            // '杰倫'

    // 3.Map
    // 沒有 return 也會產生 undefined
    var mapEmpty = people.map(function(item, index, array){
    });
    console.log(mapEmpty);    // [undefined, undefined, undefined, undefined]
    var everyoneAdd = people.map(function(item, index, array){
    item.money = item.money + 500; // 每個 money + 500
    return item;             // 回傳物件
    });
    console.log(everyoneAdd);  // 回傳每個處理後的數值，不過記得這是傳參考特性，會影響到原始的物件
    // {name: "小明", money: 1500}
    // {name: "漂亮阿姨", money: 3500}
    // {name: "杰倫", money: 60500}
    // {name: "老媽", money: Infinity}
    var mapMoneyThan5000 = people.map(function(item, index, array) {
    // 錯誤示範，長度不符合時
    if (item.money > 5000) {
        return item;              // 取得大於五千元
    }
    });
    console.log(mapMoneyThan5000);
    // [undefined, undefined, {name: "杰倫", money: 60000}, {name: "老媽", money: Infinity} ]

    // 4.every
    var ans = people.every(function(item, index, array){
        return item.money > 10000;
      });
      console.log(ans); // false: 只要有部分不符合，則為 false
      var ans2 = people.every(function(item, index, array){
        return item.money > 300;
      });
      console.log(ans2); // true: 大家錢都有超過 300

      // 5.some
      var ans = people.some(function(item, index, array){
        return item.money > 10000;
      });
      console.log(ans); // true: 只要有部分符合，則為 true
      var ans2 = people.some(function(item, index, array){
        return item.money < 300;
      });
      console.log(ans2); // false: 大家錢都不少於 300

      // 6.reduce
      people.pop(); // 老媽的錢深不可測，先移除掉
    var reducePlus = people.reduce(function(accumulator, currentValue, currentIndex, array){
    // 分別為前一個回傳值, 目前值, 當前索引值
    console.log(accumulator, currentValue, currentIndex);
    return accumulator + currentValue.money;  // 與前一個值相加
    }, 0);                                      // 傳入初始化值為 0
    console.log(reducePlus);                    // 總和為 63500
    
    var reduceBestOne = people.reduce(function(accumulator, currentValue, currentIndex, array){
        console.log('reduce', accumulator, currentValue, currentIndex)
        return Math.max(accumulator, currentValue.money); // 與前一個值比較哪個大
      }, 0);
      console.log(reduceBestOne);                  // 最大值為 60000
}

function destructuring_object(){
    let family = {
        ming: '小明',
        jay: '杰倫',
      };
      
    let { ming, jay } = family

    console.log(jay);

    let GinyuTeam = {
        Ginyu: '基紐',
        Jeice: '吉斯',
        burter: '巴特'
     }

    let { Ginyu: Goku } = GinyuTeam;

    console.log(Goku);

    let { ming: Goku2, family: [, mom] } = { ming: '小明', family: ['阿姨', '老媽', '老爸'] }
    console.log(Goku2, mom);
}

function destructuring_arrary(){
    let family = ['小明', '杰倫', '阿姨', '老媽', '老爸'];

    let [ming, jay, auntie, mom, papa] = family;

    console.log(auntie);

    let Goku = '悟空';
    let Ginyu = '基紐';
    [Goku, Ginyu] = [Ginyu, Goku];

    console.log(Goku);

    let str = '基紐特攻隊';
    [a, b, c, d, e] = str;

    console.log(b);
}

function spreadOperator(){
    let groupA = ['小明', '杰倫', '阿姨'];
    let groupB = ['老媽', '老爸'];
    const groupAll = [...groupA, ...groupB];
    console.log(groupAll);
    console.log(...groupA); 
    // ['小明', '杰倫', '阿姨', '老媽', '老爸'];

    // 這個屬於淺拷貝，所以不會影響到另一個物件
    let groupA = ['小明', '杰倫', '阿姨'];
    let groupB = [...groupA];
    groupB.push('阿明');
    console.log(groupA); // ['小明', '杰倫', '阿姨']
}

/*
基本錯誤如下：
不宣告直接賦予變數
刪除已經宣告的錯誤
物件內有重複屬性
數值使用 8 進位語法
不能使用 ‘with’ 語法
arguments、eval 不能作為變數名稱
新增的保留字也不能被作為變數名稱 implements, interface, let, package, private, protected, public, static, yield，這些是為了 ES6 做得準備。
*/
function UseStrict(){
    (function () {
        'use strict';
        auntie = '漂亮阿姨';
        // Uncaught ReferenceError: auntie is not defined
      })();
}

function defaultVar(){
    var originCash = 1000;
    function updateEasyCard(cash = 100) {
    var money = cash + originCash;
    console.log('我有 ' + money + ' 元');
    }
    updateEasyCard(); // 我有 1100 元
    updateEasyCard(0); // 我有 1000 元
}

function TemplateString(){
    const people = [
        {
          name: '小明',
          friends: 2
        },
        {
          name: '阿姨',
          friends: 999
        },
        {
          name: '杰倫',
          friends: 0
        }
      ]

    let ul = `
  <ul>
    <li>我叫做 ${people[0].name}</li>
    <li>我叫做 ${people[1].name}</li>
    <li>我叫做 ${people[2].name}</li>
  </ul>
`
    console.log(ul);
}

function abbreviation(){
    let Frieza = '弗利沙'
    const GinyuTeam = {
    Ginyu: '基紐',
    Jeice: '吉斯',
    burter: '巴特',
    }

    // 縮寫
    const newTeam = {
        GinyuTeam,
        Frieza
    }

    console.log(newTeam);

    let prop = 'Ming';
    let value = '小明';
    let teamMember = {
        [prop]: value,
        [`${prop}_invert`]: value.split("").reverse().join("")
    }

    console.log(teamMember);
}

function Closure(){
    // 使用閉包產生兩個作用域
    // 這裡的 money 代表身上帶的錢
    function buyItem(money) {
      var myMoney = money;
      return function (price) {
        // myMoney 第一次由外部傳入，接下來在這個 function 內不斷更新
        myMoney = myMoney - price;
        return myMoney;
      }
    }
    
    let MingCost = buyItem(1000); // 存取內部函式的變數，這個是小明錢包內的錢
    let JayCost = buyItem(10000); // 杰哥拿出的小錢

    // 小明的內層作用域變數，也就是小明剩的錢
    console.log(MingCost(100)); // 900
    console.log(MingCost(100)); // 800
    console.log(MingCost(100)); // 700
    // 杰哥的內層作用域變數，這裡是杰哥剩的錢
    console.log(JayCost(1000)); // 9000
    console.log(JayCost(1000)); // 8000
    console.log(JayCost(1000)); // 7000
}

function copyValue(){
    var auntie = { 
        name: '陳小美', 
        ages: 22,
          bwh: {
            strength: 34,
            agility: 25,
          intelligence: 96
        },
        single: true
      };

    //var auntie2 = jQuery.extend({}, auntie); // 淺複製
    //var auntie2 = jQuery.extend(true, {}, auntie); // 深度複製
    const auntie2 = Object.assign({}, auntie); //es6 淺複製
    auntie2.ages = 10;
    auntie2.bwh.strength = 10;

    console.log(auntie);
    console.log(auntie2);
}

function ConstructiveTest4(){
    const JayPhones = new MyPhones('杰倫', { name: 'iPhone' }, { name: 'Z' });
    console.log(JayPhones.length); // 傳入兩個值作為陣列，所以長度確實是 2
    JayPhones.add({name: 'G'}); // 再增加一個值
    console.log(JayPhones.length); // 陣列長度改為 3
    console.log(JayPhones.name); // '杰倫'：除了陣列外，名字也在裡面，因為陣列本質就是物件
    console.log(JayPhones[0].name); 
}

class MyPhones extends Array {
    constructor(name, ...phones) {
      super(...phones); // 繼承原本陣列的值
      this.name = name;
    }
    add (phone) { // 自訂的方法
      this.push(phone);
    }
}

function ConstructiveTest3(){
    var iPhone = new ApplePhone('Apple');
    console.log(iPhone); // 這個與先前的建構式有接近的格式
    iPhone.takePhoto();  // 由於沒有傳入相機功能，所以沒辦法
    iPhone.callSomeone('小明'); // 能使用上一個建構式的方法
    iPhone.hiSiri();  // 能使用新建構式方法
}

// 第一層
class PhoneTemplate3 {
    constructor (brand, modal, withCamera, ver) {
      this.brand = brand;
      this.modal = modal;
      this.ver = ver || '1.0';
      this.withCamera = withCamera || false;
    }
    takePhoto () {
      if (this.withCamera) {
        console.log(this.modal + ' 照相');
      } else {
        console.log(this.modal + ' 這台沒有照相功能');
      }
    }
    callSomeone (someone) {
      console.log('打通電話給 ' + someone);
    }
  };

// 利用上一個建構式作為延伸
class ApplePhone extends PhoneTemplate3 {
    constructor (brand, modal, withCamera) {
      super(brand); // 繼承原本的建構式中的變數
      this.modal = 'iPhone'; // 直接賦予變數
    }
    
    // 直接寫入新的方法
    hiSiri () {
      console.log('hi Siri:' + this.brand + " " + this.modal + " " + this.withCamera);
    }
}

function ConstructiveTest2(){
    const sonyPhone = new PhoneTemplate2('Sony', 'Z100', true);
    console.log(sonyPhone.core); // 1，預設的 _core
    sonyPhone.core = 4;  // 傳入 4
    console.log(sonyPhone.core); // 會透過 set core * 2，結果會是 8
}

function ConstructiveTest_Constructive(){
    var sonyPhone = new PhoneTemplate2('Sony', 'Z100', true);
    var nokiaPhone = new PhoneTemplate2('Nokia', '3310', false);

    sonyPhone.takePhoto();
    nokiaPhone.callSomeone('wu');

    setTimeout(function () {
        sonyPhone.viewbatter();
    }, 3000);

    PhoneTemplate2.info();

    // 靜態方法只能被原型使用，無法在創立的物件上使用。
    //sonyPhone.info();
}

// ES6 Constructor
class PhoneTemplate2 {
    // 定義基本屬性
    constructor (brand, modal, withCamera) {
      this.brand = brand;
      this.modal = modal;
      this.withCamera = withCamera || false;
      this.startTime = Date.now();
      this._core = 1;
    }
    
    // get, set
    get core () {
        return this._core
    }
    set core (coreNum) {
        let num = Number.parseInt(coreNum)
        this._core = num * 2
    }

    // 原型方法
    takePhoto () {
      if (this.withCamera) {
        console.log(this.modal + ' 照相');
      } else {
        console.log(this.modal + ' 這台沒有照相功能');
      }
    }

    callSomeone (someone) {
      console.log('打通電話給 ' + someone);
    }

    viewbatter () {
        var timeDiffSec = parseInt(Math.abs(Date.now() - this.startTime) / 1000);
        // 每過1秒就扣1%
        console.log('目前電量: ' + (100 - timeDiffSec).toString() + '%');
    }

    // 靜態方法
    static info() {
        console.log('這是手機原型');
    }
};

function ConstructiveTest_base(){
    // 原型方法
    PhoneTemplate.prototype.takePhoto = function (someone) {
        if (this.withCamera) {
            console.log(this.modal + ' 照相');
        } else {
            console.log(this.modal + ' 這台沒有照相功he能');
        }
    }
    PhoneTemplate.prototype.callSomeone = function (someone) {
        console.log('打通電話給 ' + someone)
    }
  var sonyPhone = new PhoneTemplate('Sony', 'Z100', true);
  var nokiaPhone = new PhoneTemplate('Nokia', '3310', false);
  
  sonyPhone.takePhoto();
  nokiaPhone.callSomeone('wu');
}

function PhoneTemplate(brand, modal, withCamera) {
    // 定義基本屬性
    this.brand = brand;
    this.modal = modal;
    this.withCamera = withCamera || false;
}

function testPromias4(){
    let runPromise = (someone, timer, success = true) => {
        console.log(`${someone} 開始跑開始`);
        return new Promise((resolve, reject) => {
          // 傳入 resolve 與 reject，表示資料成功與失敗
          if (success) {
            setTimeout(function () {
              // 3 秒時間後，透過 resolve 來表示完成
              resolve(`${someone} 跑 ${timer / 1000} 秒時間(fulfilled)`);
            }, timer);
          } else {
            // 回傳失敗
            reject(new Error(`${someone} 跌倒失敗(rejected)`))
          }
        });
      }

      runPromise('小明', 3000).then(mingString => { 
        console.log(mingString); // 小明 跑 3 秒時間(fulfilled)
        return runPromise('漂亮阿姨', 2500);
      }).then((autieString) => {
        console.log(autieString); // 漂亮阿姨 跑 2.5 秒時間(fulfilled)
        return runPromise('杰倫', 2000) ;
      }).then((jayString) => {
        console.log(jayString); // 杰倫 跑 2 秒時間(fulfilled)
      });
}

/*
    Promise 一個很重要的方法 then()，其實是可以不斷的做鏈接。
    基本的概念就是前一個 return 會是下一個 then() 傳送的變數。

    Promise 執行時可以使用 then 做串接，串接的方法在於需要使用 return 來做下一個 then() 的傳入值，
    透過這個方法可以避免 JavaScript 原始碼過巢導致難以閱讀。
*/
function testPromias3(){
    // 前面宣告的不重要
    let newPromise1 = new Promise((resolve, reject) => {
        let ran = parseInt(Math.random() * 5000); // 隨機成功或失敗
        setTimeout(function(){
            resolve('隨機時間完成');
        }, ran);
    });
    let newPromise2 = new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve('2 秒完成');
        }, 2000);
    });
    let newPromise3 = new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve('3 秒完成');
        }, 3000);
    });
    // 這段以前不重要
    // 鏈接方法
    newPromise1.then((data1) => {
        console.log('data1', data1);
        return newPromise2.then((data2) => {
            return `${data2} + ${data1}` // 回傳 Promise 內的值，讓下一個 then 可以接收
        });
    }).then((data3) => {
        console.log('data3', data3);
        return newPromise3.then((data4) => {
            return `${data4} + ${data3}` // 回傳 Promise 內的值，讓下一個 then 可以接收
        });
    }).then((data5) => {
        console.log(`最後的 + ${data5}`)
    });
}

/*
    Promise.all(): 此方法可以同時執行大量 Promise 物件，並且在 “全部” 完成後回傳陣列。
    Promise.race(): 此方法執行大量 Promise 物件，但僅會回傳最快回應的結果。
*/
function testPromias2(){
    // 宣告 promise 建構式
    let newPromise1 = new Promise((resolve, reject) => {
        let ran = parseInt(Math.random() * 5000); // 隨機成功或失敗
        setTimeout(function(){
            resolve('隨機時間完成');
        }, ran);
    });
    let newPromise2 = new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve('2 秒完成');
        }, 2000);
    });
    let newPromise3 = new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve('3 秒完成');
        }, 3000);
    });
    let newPromise4 = new Promise((resolve, reject) => {
        reject('失敗');
    });
    Promise.all([newPromise1, newPromise2, newPromise3, newPromise4]).then((data)=> {
        // 一次性同時回傳成功訊息，回傳以上三個數值的陣列
        console.log(data);
    }).catch( err => {
        // 失敗訊息 (立即)
        console.log(err)
    });
    Promise.race([newPromise1, newPromise2, newPromise3]).then((data)=> {
        // 僅會回傳一個最快完成的 resolve 或 reject
        console.log('race', data);
    }).catch( err => {
        // 失敗訊息 (立即)
        console.log(err)
    });
}

/**
 *  resolve: 完成的 callback
 *  reject: 失敗的 callback
 */
function testPromias(){
    // 宣告 promise 建構式
    let newPromise = new Promise((resolve, reject) => {
        // 傳入 resolve 與 reject，表示資料成功與失敗
        let ran = parseInt(Math.random() * 2); // 隨機成功或失敗
        console.log('Promise 開始')
        if (ran) {
            setTimeout(function(){
                // 3 秒時間後，透過 resolve 來表示完成
                resolve('3 秒時間(fulfilled)');
            }, 3000);
        } else {
            // 回傳失敗
            reject('失敗中的失敗(rejected)')
        }
    });
    newPromise.then((data)=> {
        // 成功訊息 (需要 3 秒)
        console.log(data);
    }).catch((err)=> {
        // 失敗訊息 (立即)
        console.log(err)
    });
}

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
                handler: function (val, oldVal) { 
                    //alert('user內的資料改變了'); 
                },
                deep: true
            },
            'userInfo.FirstName': {
                handler: function (val, oldVal) { alert('user FirstName資料改變了'); },
                deep: true
            }
        }
    });
}

