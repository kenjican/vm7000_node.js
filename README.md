# vm7000_node.js
***TCP Modbus和VM7000通訊***
1: 每秒一次記錄在mongodb，用json格式
2：每秒取max和min，超過均溫設定就輸出警報到（1）：接樹莓派的喇叭（2）客戶端也發出警報聲音和畫面閃爍變紅色，（3）發短信 （4）發微信
3：VM7000的控制碼放在mongodb的collection
4：Chrome抓取mongodb任意時段，任何一台VM7000，畫曲線
5：其他設定可以用json檔案記錄
