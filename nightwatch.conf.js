const PKG = require('./package.json');
const GLOBALS = './test/e2e/nightwatch/globals.js';
const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
const config = {
  //測試程式碼的位置
  "src_folders": [
    "test/e2e/nightwatch/testCode"
  ],
  //測試報告的位置
  "output_folder": "./test/e2e/nightwatch/reports",
  //Page Objects 的位置
  "page_objects_path": './test/e2e/nightwatch/page_objects',
  //客製化指令的位置
  "custom_commands_path": './test/e2e/nightwatch/custom_commands',
  //客製化斷言的位置
  "custom_assertions_path": './test/e2e/nightwatch/custom_assertions',
  //External Globals 的位置
  "globals_path": GLOBALS,
  "selenium": {
    //是否自動管理 Selenium Process
    "start_process": true,
    //是否自動啟用 Selenium Session
    //"start_session": false,
    //Selenium Server 的位置，start_process 啟用時才需設定
    "server_path": seleniumServer.path,
    //log_path：Log 的位置
    "log_path": "",
    "host": "127.0.0.1",
    //Selenium 所佔用的埠號
    "port": 4444,
    //cli_args：要傳入 Selenium Process 的 cli 參數，這裡可分別對各個瀏覽器驅動程式的選項做設定
    "cli_args": {
      "webdriver.chrome.driver": chromedriver.path
    }
  },
  //是否即時顯示測試結果
  // "live_output": true,
  //使用 Test Workers 的數量
  "test_workers" : {
    "enabled": true,
    "workers": "auto"
  },
  "test_settings": {
    //Nightwatch Test Runner 可使用 --env 代入指定的測試環境。例如，在這裡有 default 和 staging 兩種環境，依照不同需求，我們可以分別測試任一環境或同時跑測試於這兩個環境。
    "default": {
      //載入的網址
      "launch_url": "http://localhost",
      //Selenium Server 所用的埠號
      "selenium_port": 4444,
      //Selenium Server 所用的 hostname / IP
      "selenium_host": "127.0.0.1",
      //對 Selenium Server 發出 HTTP Request 的 timeout 時間與重試次數
      //"request_timeout_options": "",
      //是否顯示更多 Selenium 指令紀錄
      "silent": true,
      //是否關閉 terminal output
      //"output": "",
      //是否關閉 terminal output 的顏色顯示
      //"disable_colors": "",
      //出錯時是否螢幕截圖
      "screenshots": {
        "enabled": false,
        "path": "./test/e2e/nightwatch/screenshots/",
        "on_failure": true,
        "on_error": true
      },
      //驗證時需要輸入的 username
      //"username": "",
      //驗證時需要輸入的 access_key
      //"access_key": "",
      //proxy
      //"proxy": "",
      //要忽略的測試資料夾或測試程式
      //"exclude" : "",
      //載入測試時需要被使用的資料夾或資料檔案
      //"filter": "",
      //Log 中的螢幕截圖是否使用 Base64 圖檔
      //"log_screenshot_data": "".
      //是否使用 Xpath 為預設的定位網頁元素方式
      //"use_xpath": "",
      //用來覆寫在 Selenium Server 相關設定中所設定的 Selenium Process 的 cli 參數
      //"cli_args": "",
      //當測試程式的斷言失敗時自動結束 Session
      //"end_session_on_fail": "",
      //當有 Test Case 錯誤出現時忽略後續的 Test Case
      //"skip_testcases_on_fail": "",
      //覆寫基本設定的測試報告的位置
      //"output_folder": "",
      //是否可覆寫 Test Globals
      //"persist_globals": "",
      //測試報告是否顯示詳細資料
      //"detailed_output": "",
      //測試環境所代入的物件資料
      "globals": {
        "waitForConditionTimeout": 10000,
        // "retryAssertionTimeout": 500,
        "rtContext": {}
      },
      //新建立 Session 時傳入 Selenium Webdriver 的物件
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "local": {
      "launch_url": "http://localhost",
      "selenium_port": 4444,
      "selenium_host": "127.0.0.1",
      "silent": true,
      "globals": {
        "waitForConditionTimeout": 15000
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}

module.exports = config;