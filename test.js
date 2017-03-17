/**
 * Module dependencies.
 */

TopClient = require('./topClient').TopClient;

var client = new TopClient({
                            'appkey':'23442811',
                            'appsecret':'1a4f18df44d1a2eec3104df1a85a6261',
                            'REST_URL':'http://gw.api.taobao.com/router/rest'});

client.execute('alibaba.aliqin.fc.sms.num.send',
              {
                     'extend' : '' ,
                     'sms_type' : 'normal' ,
                     'sms_free_sign_name' : '快递单号' ,
                     'sms_param' : "{subject:'短信測試のばが',courier:'龙邦',awb:'55662266'}" ,
                     'rec_num' : '13013786354' ,
                     'sms_template_code' : "SMS_34660260"
              },
              function (error,response) {
                  if(!error) console.log(response);
                  else console.log(error);
              })
