# -*- coding: utf-8 -*
'''
new Env('wskey转换');
'''
import base64
import hashlib
import hmac
import json
import logging
import os
import random
import re
import socket
import struct
import sys
import time
import uuid

WSKEY_MODE = 0
# 0 = Default / 1 = Debug!

if "WSKEY_DEBUG" in os.environ or WSKEY_MODE:  # 判断调试模式变量
    logging.basicConfig(level=logging.DEBUG, format='%(message)s')  # 设置日志为 Debug等级输出
    logger = logging.getLogger(__name__)  # 主模块
    logger.debug("\nDEBUG模式开启!\n")  # 消息输出
else:
    logging.basicConfig(level=logging.INFO, format='%(message)s')  # Info级日志
    logger = logging.getLogger(__name__)  # 主模块

try:
    import requests  # 导入HTTP模块
except Exception as e:
    logger.info(str(e) + "\n缺少requests模块, 请执行命令：pip3 install requests\n")  # 日志输出
    sys.exit(1)  # 退出脚本
os.environ['no_proxy'] = '*'  # 禁用代理
requests.packages.urllib3.disable_warnings()  # 抑制错误
try:
    from notify import send  # 导入青龙消息通知模块
except Exception as err:
    logger.debug(str(err))  # 调试日志输出
    logger.info("无推送文件")  # 标准日志输出

ver = 40904  # 版本号


def ttotp(key):
    key = base64.b32decode(key.upper() + '=' * ((8 - len(key)) % 8))
    counter = struct.pack('>Q', int(time.time() / 30))
    mac = hmac.new(key, counter, 'sha1').digest()
    offset = mac[-1] & 0x0f
    binary = struct.unpack('>L', mac[offset:offset + 4])[0] & 0x7fffffff
    return str(binary)[-6:].zfill(6)


def sign_core(par):
    arr = [0x37, 0x92, 0x44, 0x68, 0xA5, 0x3D, 0xCC, 0x7F, 0xBB, 0xF, 0xD9, 0x88, 0xEE, 0x9A, 0xE9, 0x5A]
    key2 = b"80306f4370b39fd5630ad0529f77adb6"
    arr1 = [0 for _ in range(len(par))]
    for i in range(len(par)):
        r0 = int(par[i])
        r2 = arr[i & 0xf]
        r4 = int(key2[i & 7])
        r0 = r2 ^ r0
        r0 = r0 ^ r4
        r0 = r0 + r2
        r2 = r2 ^ r0
        r1 = int(key2[i & 7])
        r2 = r2 ^ r1
        arr1[i] = r2 & 0xff
    return bytes(arr1)

def get_sign(functionId, body, uuid, client, clientVersion, st, sv):
    all_arg = "functionId=%s&body=%s&uuid=%s&client=%s&clientVersion=%s&st=%s&sv=%s" % (
        functionId, body, uuid, client, clientVersion, st, sv)
    ret_bytes = sign_core(str.encode(all_arg))
    info = hashlib.md5(base64.b64encode(ret_bytes)).hexdigest()
    return info

def base64Encode(string):
    string1 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/"
    string2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    return base64.b64encode(string.encode("utf-8")).decode('utf-8').translate(str.maketrans(string1, string2))

def base64Decode(string):
    string1 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/"
    string2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    stringbase = base64.b64decode(string.translate(str.maketrans(string1, string2))).decode('utf-8')
    return stringbase

def genJDUA():
    st = round(time.time() * 1000)
    aid = base64Encode(''.join(str(uuid.uuid4()).split('-'))[16:])
    oaid = base64Encode(''.join(str(uuid.uuid4()).split('-'))[16:])
    ua_iphone = 'jdapp;iPhone;13.6.3;;;M/5.0;appBuild/169571;jdSupportDarkMode/0;ef/1;ep/{"ciphertype":5,"cipher":{"ud":"%s","sv":"CJqkCI4n","iad":""},"ts":%s,"hdid":"JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=","version":"1.0.3","appname":"com.360buy.jdmobile","ridx":-1};Mozilla/5.0 (iPhone; CPU iPhone OS 18_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;' % (aid, st)
    ua_android = 'jdapp;android;11.1.4;;;appBuild/98176;ef/1;ep/{"hdid":"JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=","ts":%s,"ridx":-1,"cipher":{"sv":"CJS=","ad":"%s","od":"%s","ov":"CzO=","ud":"%s"},"ciphertype":5,"version":"1.2.0","appname":"com.jingdong.app.mall"};Mozilla/5.0 (Linux; Android 12; M2102K1C Build/SKQ1.220303.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36' % (st, aid, oaid, aid)
    return ua_android

def genParams():
    suid = ''.join(str(uuid.uuid4()).split('-'))[16:]
    buid = base64Encode(suid)
    st = round(time.time() * 1000)
    sv = random.choice(["102", "111", "120"])
    ep = json.dumps({
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": st,
        "ridx": -1,
        "cipher": {
            "area": "CV8yEJUzXzU0CNG0XzK=",
            "d_model": "JWunCVVidRTr",
            "wifiBssid": "dW5hbw93bq==",
            "osVersion": "CJS=",
            "d_brand": "WQvrb21f",
            "screen": "CJuyCMenCNq=",
            "uuid": buid,
            "aid": buid,
            "openudid": buid
        },
        "ciphertype": 5,
        "version": "1.2.0",
        "appname": "com.jingdong.app.mall"
    }).replace(" ", "")
    body = '{"to":"https%3a%2f%2fplogin.m.jd.com%2fjd-mlogin%2fstatic%2fhtml%2fappjmp_blank.html"}'
    sign = get_sign("genToken", body, suid, "android", "11.1.4", st, sv)
    params = {
        'functionId': 'genToken',
        'clientVersion': '11.1.4',
        'build': '98176',
        'client': 'android',
        'partner': 'google',
        'oaid': suid,
        'sdkVersion': '31',
        'lang': 'zh_CN',
        'harmonyOs': '0',
        'networkType': 'UNKNOWN',
        'uemps': '0-2',
        'ext': '{"prstate": "0", "pvcStu": "1"}',
        'eid': 'eidAcef08121fds9MoeSDdMRQ1aUTyb1TyPr2zKHk5Asiauw+K/WvS1Ben1cH6N0UnBd7lNM50XEa2kfCcA2wwThkxZc1MuCNtfU/oAMGBqadgres4BU',
        'ef': '1',
        'ep': ep,
        'st': st,
        'sign': sign,
        'sv': sv
    }
    return params

# 返回值 bool jd_ck
def getToken(app, sess, wskey):  # 方法 获取 Wskey转换使用的 Token 由 JD_API 返回 这里传递 wskey
    params = genParams()
    headers = {
        'cookie': wskey,
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'charset': 'UTF-8',
        'accept-encoding': 'br,gzip,deflate',
        'user-agent': genJDUA()
    }  # 设置 HTTP头
    url = 'http://api.m.jd.com/client.action'  # 设置 URL地址
    data = 'body=%7B%22to%22%3A%22https%253a%252f%252fplogin.m.jd.com%252fjd-mlogin%252fstatic%252fhtml%252fappjmp_blank.html%22%7D&'  # 设置 POST 载荷
    try:
        res = sess.post(url=url, params=params, headers=headers, data=data, verify=False,
                            timeout=10)  # HTTP请求 [POST] 超时 10秒
        # print('res.status_code:', res.status_code)
        # print('res.text:', res.text)
        # print('jd_wskey getToken res.cookies', res.cookies.get_dict())
        res_json = json.loads(res.text)  # Json模块 取值
        tokenKey = res_json['tokenKey']  # 取出TokenKey
    except Exception as err:
        app.output['err']+["JD_WSKEY接口抛出错误 尝试重试 更换IP"]
        app['status'] = -2
        # return False, wskey  # 返回 -> False[Bool], Wskey
        return False  # 返回 -> False[Bool], Wskey
    else:
        return appjmp(app, sess, wskey, tokenKey)  # 传递 wskey, Tokenkey 执行方法 [appjmp]


# 返回值 bool jd_ck
def appjmp(app, sess, wskey, tokenKey):  # 方法 传递 wskey & tokenKey
    wskey = "pt_" + str(wskey.split(";")[0])  # 变量组合 使用 ; 分割变量 拼接 pt_
    if tokenKey == 'xxx':  # 判断 tokenKey返回值
        app.output['err']+[str(wskey) + ";疑似IP风控等问题 默认为失效"]
        app['status'] = -3
        # return False, wskey  # 返回 -> False[Bool], Wskey
        return False  # 返回 -> False[Bool], Wskey
    headers = {
        'User-Agent': genJDUA(),
        'accept': 'accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'x-requested-with': 'com.jingdong.app.mall'
    }  # 设置 HTTP头
    params = {
        'tokenKey': tokenKey,
        'to': 'https://plogin.m.jd.com/jd-mlogin/static/html/appjmp_blank.html'
    }  # 设置 HTTP_URL 参数
    url = 'https://un.m.jd.com/cgi-bin/app/appjmp'  # 设置 URL地址
    try:
        res = sess.get(url=url, headers=headers, params=params, verify=False, allow_redirects=False,
                           timeout=20)  # HTTP请求 [GET] 阻止跳转 超时 20秒
    except Exception as err:
        app.output['err']+["JD_appjmp 接口错误 请重试或者更换IP"]
        app['status'] = -4
        # return False, wskey  # 返回 -> False[Bool], Wskey
        return False  # 返回 -> False[Bool], Wskey
    else:
        try:
            res_set = res.cookies.get_dict()  # 从res cookie取出
            pt_key = 'pt_key=' + res_set['pt_key']  # 取值 [pt_key]
            pt_pin = 'pt_pin=' + res_set['pt_pin']  # 取值 [pt_pin]
            # if "WSKEY_UPDATE_HOUR" in os.environ:  # 判断是否在系统变量中启用 WSKEY_UPDATE_HOUR
            # if WSKEY_UPDATE_BOOL:
            #     jd_ck = str(pt_key) + ';' + str(pt_pin) + ';__time=' + str(time.time()) + ';'  # 拼接变量
            # else:
            jd_ck = str(pt_key) + ';' + str(pt_pin) + ';'  # 拼接变量
        except Exception as err:
            app.output['err']+["JD_appjmp提取Cookie错误 请重试或者更换IP"]
            app['status'] = -5
            # return False, wskey  # 返回 -> False[Bool], Wskey
            return False  # 返回 -> False[Bool], Wskey
        else:
            if 'fake' in pt_key:  # 判断 pt_key中 是否存在fake
                app.output['err']+[str(wskey) + ";WsKey状态失效;token有fake"]
                app['status'] = -6
                # return False, wskey  # 返回 -> False[Bool], Wskey
                return False  # 返回 -> False[Bool], Wskey
            else:
                # logger.info(str(wskey) + ";WsKey状态正常\n")  # 标准日志输出
                # return True, jd_ck  # 返回 -> True[Bool], jd_ck
                return jd_ck

if __name__ == '__main__':  # Python主函数执行入口
    getToken(sys.argv[1],sys.argv[2],sys.argv[3])
