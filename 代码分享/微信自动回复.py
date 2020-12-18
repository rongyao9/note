import requests
import itchat

KEY = '2c242b43e94a4e0ca984629828d4e164'
def get_response(msg):

    apiUrl = 'http://www.tuling123.com/openapi/api'
    data = {
        'key'    : KEY,
        'info'   : msg,
        'userid' : 'wechat-robot',
    }
    try:
        r = requests.post(apiUrl, data=data).json()
        return r.get('text')
    except:
        return
@itchat.msg_register(itchat.content.TEXT, isGroupChat=True)
def tuling_reply_group(msg):
    print(msg)
    defaultReply = 'I received: ' + msg['Text']
    item = itchat.search_chatrooms(name=u'fearless')[0]['UserName']
    if msg['FromUserName'] == item:
        reply = get_response(msg['Text'])
        itchat.send(u'%s' % reply, item)
itchat.auto_login(hotReload=True)
itchat.run()