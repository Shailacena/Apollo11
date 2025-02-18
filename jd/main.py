# -*- coding: utf-8 -*-

from datetime import datetime, timedelta
import logging
import os
import re
import signal
from subprocess import TimeoutExpired
import sys

import threading
import traceback
# import requests
import requests
from selenium import webdriver
import time
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver import ActionChains
import json

from undetected_chromedriver import Chrome, ChromeOptions
import undetected_chromedriver as uc

import jd_wskey
import adress
import checkProxy
import saveorder

sys.stdout.reconfigure(encoding='utf-8')
requests.packages.urllib3.disable_warnings()  # 抑制错误
logging.basicConfig(level=logging.ERROR, format='%(message)s')  # Info级日志

# chrome_driver_path = '/chromedriver-win64/chromedriver'
# 自动下载并设置 ChromeDriver 路径
# driver_path = undetected_chromedriver.install()

class CookieLogin():
    def __init__(self):
        self.todaystr = datetime.now().strftime("%Y%m%d")
        self.isInit = True
        self.isTokenOk = False # 标记token是否正常状态，有时候会加载成功了，但是实际上是失效的，京东会跳去登陆窗口
        self.getTokening = False # 是否正在获取token，防止同一时间多次获取
        self.output = {
            'err': [],#错误信息列表
            'log': [], #日志
            'step':[],#记录步骤
            'jdaccount':'',#ck中提取的jd帐号jd_XgYOBMKfcELO
            'in_jdorderId':'',#传入的京东订单号
            'wxurl':'',#微信支付链接
            'jdorderId':'',#京东的订单id
            'orderId':'',#我们后台的订单id
            'sku':'',#商品sku
            'status':0 # 0(未完成); 1(成功); -1(token转换失败)
            # -2 JD_WSKEY接口抛出错误 尝试重试 更换IP
            # -3 疑似IP风控等问题 默认为失效
            # -4 JD_appjmp 接口错误 请重试或者更换IP
            # -5 JD_appjmp提取Cookie错误 请重试或者更换IP
            # -6 WsKey状态失效;token有fake

            # -7 代理ip失效
            
            # 100 已付款，待收货
            # 101 已完成
            # -101 没有最近一笔订单
            # -102 订单号不匹配
            # -103 订单已取消
            # -104 SKU不匹配
            # -105 待支付
            # -106 已请求微信支付，但是微信返回异常，应该重新根据jd订单再生成一次微信码
        }

    def init(self, params):
        try:
            self.action = params[1]
            self.ck = params[2]
            self.sku = params[3]
            self.our_orderid = params[4]
            self.in_jdorderId = params[5]
            self.adress = params[6]
            self.proxyip = params[7]
            self.jdorderId = ''
            self.output['sku'] = self.sku
            self.output['orderid'] = self.our_orderid
            self.output['in_jdorderId'] = self.in_jdorderId
        except Exception as e:
            self.addErr('init:')
            self.addErr(e)
        
        if hasattr(self, "proxyip") == False or self.proxyip == "":
            self.getProxyIp()

        # 设置超时时间，例如3秒
        timeout = 60
        signal.signal(signal.SIGALRM, self.logTimeoutAndRaise)
        signal.alarm(timeout)

        self.checkDir()

        # headers = {
        #     'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        #     'sec-ch-ua-platform' : '"Android"',
        # }
        # headers = {
        #     "Content-Type": "text/plain;charset=UTF-8",
        #     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
        #     "sec-ch-ua-platform": "macOS"
        # },
        # opactions = webdriver.ChromeOptions()
        # opactions.add_argument(f"user-agent={headers['User-Agent']}")
        # opactions.add_argument('sec-ch-ua-platform="Android"')
        options = ChromeOptions()
        # 禁止弹窗
        options.add_experimental_option("prefs", {"profile.default_content_setting_values.notifications" : 2})
        
        options.add_argument('--headless')

        if hasattr(self, "proxyip") and self.proxyip != "":
            options.add_argument("--proxy-server=%s" % self.proxyip)
        
        current_dir = os.path.dirname(os.path.abspath(__file__))

        # 平台判断
        if sys.platform == 'linux':
            path = os.path.join(current_dir, 'chromedriver-linux64', 'chromedriver')
            self.drive = uc.Chrome(options=options, enable_cdp_events=True, driver_executable_path=path)
        if sys.platform == 'darwin':
            path = os.path.join(current_dir, 'chromedriver-mac-x64-133', 'chromedriver')
            # path = '/Users/admin/Documents/Apollo11/jd/chromedriver-mac-x64-133/chromedriver'
            self.drive = uc.Chrome(options=options, enable_cdp_events=True, driver_executable_path=path)
            # self.drive = uc.Chrome(options=options, enable_cdp_events=True)
        if sys.platform == 'windows':
            # windows平台
            self.drive = uc.Chrome(enable_cdp_events=True, driver_executable_path=os.path.join(current_dir, 'chromedriver-win64', 'chromedriver.exe'))
        # print('创建Chrome')
        # self.drive = Chrome(enable_cdp_events=True)
        self.drive.set_window_size(320, 880)
        self.url = 'https://plogin.m.jd.com/login/login'
        self.drive.add_cdp_listener('Network.requestWillBeSent', self.inter_request)
        self.wait = WebDriverWait(self.drive, 5) 
        if hasattr(self, "proxyip") and self.proxyip != '':
            if checkProxy.check_proxy(self.proxyip) == False:
                self.output['status'] = -7
                self.addErr('ip time out' + self.proxyip)
                raise

    def inter_request(self, request):
        # print('inter_request', request)
        try:
            if 'params' in request:
                if 'plogin.m.jd.com' in request['params']['documentURL']:
                    #token过期了，重新获取token
                    self.output['step'].append('inter_request jump on plogin.m.jd.com')
                    self.isTokenOk = False
                    self.getToken(self.ck)
                    self.start(self.argv)

                if 'weixin' in request['params']['documentURL']:
                    # print('inter_request weixin pay', request['params']['documentURL'])
                    self.wxurl = request['params']['documentURL']
                    if hasattr(self, 'orderId'):
                        if login.saveOrder == False:
                            # saveorder.addOrderWxurl(self.jdaccount, self.jdorderId, self.wxurl)
                            self.loggetOrderPayUrlAndRaise()
                if 'orderId' in request['params']['documentURL']:
                    # print('inter_request order', json.dumps(request))
                    if hasattr(self, 'wxurl'):
                        if login.saveOrder == False:
                            pattern = "orderId=(.*?)&"
                            match = re.search(pattern, request['params']['documentURL'])
                            if match != None:
                                # print('inter_request orderId', match.group(1))
                                self.jdorderId = match.group(1)
                            # saveorder.addOrderWxurl(self.jdaccount, self.jdorderId, self.wxurl)
                            self.loggetOrderPayUrlAndRaise()
        except Exception as e:
            print(str(e))
            if (str(e) != 'No action exception to reraise'):
                self.addErr('inter_request:' + str(e))
                raise
    
    def loggetOrderPayUrlAndRaise(self):
        self.output['wxurl'] = self.wxurl
        self.output['jdorderId'] = self.jdorderId
        self.output['orderId'] = self.our_orderid
        self.output['jdaccount'] = self.jdaccount
        if self.wxurl and self.wxurl != '':
            if hasattr(self, 'jdorderId') and self.jdorderId != '':
                self.output['status'] = 1
        raise

    def logcheckOrderPayAndRaise(self, msg = ''):
        self.output['jdorderId'] = self.jdorderId
        self.output['orderId'] = self.our_orderid
        self.output['jdaccount'] = self.jdaccount
        raise ValueError(msg)
    
    def logTimeoutAndRaise(self, arg1, arg2):
        if hasattr(self, 'jdorderId'):
            self.output['jdorderId'] = self.jdorderId
        if hasattr(self, 'our_orderid'):
            self.output['orderId'] = self.our_orderid
        if hasattr(self, 'jdaccount'):
            self.output['jdaccount'] = self.jdaccount
        raise ValueError('Time out')

    def inter_reponse(self, response):
        print('inter_reponse', response)

    def inter_reponseBody(self, response):
        print('inter_reponseBody', response)

    # 获取Token
    def getToken(self, ck):
        self.output['step'].append('getToken in')
        if self.getTokening:
            self.output['step'].append('getToken getTokening...')
            return
        sess = requests.session()
        sess.keep_alive = False
        if hasattr(self, 'proxyip'):
            sess.proxies = {
                'http':self.proxyip,
                'https':self.proxyip
            }
        jdaccount = self.getPin(ck)
        self.getTokening = True
        jd_ck = jd_wskey.getToken(self, sess, ck)
        self.getTokening = False
        self.output['step'].append('getToken get jd_ck: ' + str(jd_ck))

        if isinstance(jd_ck, str):
            #获取到的cookies是列表
            cookieDict  = sess.cookies.get_dict()
            # print('getToken cookieDict:', cookieDict)
            sess.close()
            cookieList = []
            for key, value in cookieDict.items():
                httponly = False
                if (key == 'pt_pin') or (key == 'pt_key'):
                    httponly = True
                cookieList.insert(0, {'name': key, 'value': value, "domain": ".jd.com", "expiry": int((datetime.now() + timedelta(days=1)).timestamp()),
                                      "httpOnly": httponly, "path": "/", "sameSite": "Lax", "secure": False})
            
            #转成字符串
            cookieStr = json.dumps(cookieList)

            # print(cookieStr)
            current_dir = os.path.dirname(os.path.abspath(__file__))
            tokenpath = os.path.join(current_dir, 'data', self.todaystr, 'JdcookieToken', jdaccount+'.json')
            with open(tokenpath, 'w') as f:
                f.write(cookieStr)

            # print('cookie已写入')
        else:
            if jd_ck == False:
                raise ValueError('jd_ck is False')
        
    #先手动登录，让程序获取到cookie，保存下来
    def getcookie(self):
    	#首先直接访问登录的页面 passport.jd.com
        url='https://m.jd.com/'

        self.drive.get(url)
        
        time.sleep(2)

        self.drive.get(self.url)

        #扫码登录
        #登录之后的页面会跳转到这里，让浏览器等待，直到url完全匹配
        url='https://m.jd.com/'
        try:
            WebDriverWait(self.drive, 100).until(EC.url_to_be(url))
        except TimeoutExpired:
            self.addErr('扫码超时')

        #登录之后停2秒
        time.sleep(2)
        #获取到的cookies是列表
        cookieList  = self.drive.get_cookies()
        for value in cookieList:
            if value['name'] == 'pt_pin':
                jdaccount = value['value']
        #转成字符串
        cookieStr = json.dumps(cookieList)

        # print(cookieStr)
        current_dir = current_dir = os.path.dirname(os.path.abspath(__file__))
        tokenpath = os.path.join(current_dir, 'data', self.todaystr, 'JdcookieToken', jdaccount+'.json')
        with open(tokenpath, 'w') as f:
            f.write(cookieStr)

        # print('cookie已写入')
        # print(self.drive.current_url)
        self.drive.close()

    #加载cookie
    def loadcookie(self, ck):
        self.output['step'].append('loadcookie in')
        self.loadck = True
        jdaccount = self.getPin(ck)
        current_dir = current_dir = os.path.dirname(os.path.abspath(__file__))
        # print(current_dir)
        tokenpath = os.path.join(current_dir, 'data', self.todaystr, 'JdcookieToken', jdaccount+'.json')
        try:
            with open(tokenpath, mode='r', encoding='utf-8') as f:
                cookie = f.read()
        except Exception as e:
            self.addErr('loadcookie:')
            self.addErr(e)
            raise
        #读取到的是字符串类型，loads之后就变成了python中的字典类型
        cookie = json.loads(cookie)
        # print('读取cookie', cookie)
        self.output['step'].append('loadcookie start jd home')
        self.drive.get('https://m.jd.com/')
        time.sleep(1)
        #先把所有的cookie全部删掉
        self.drive.delete_all_cookies()
        for item in cookie:
            # print(type(item))
            # print(item)
            if item['name'] == 'pt_pin':
                self.jdaccount = item['value']
            self.drive.add_cookie(item)
            #是一个列表内套字典的形式
        self.output['step'].append('loadcookie before refresh')
        self.drive.refresh()
        self.output['step'].append('loadcookie success')
        time.sleep(2)

    #打开商品
    def openGoods2buy(self):
        url = 'https://item.m.jd.com/product/' + self.sku + '.html'
        # print('====================>打开商品', url)
        self.drive.get(url)
        # print('====================>打开商品后')
        self.output['step'].append('openGoods2buy in')

        # time.sleep(10000)

        # 立即购买
        buyimielement = self.wait.until(
            EC.element_to_be_clickable((By.ID, "rightBtn"))
        )
        # print('====================>找到立即购买按钮')
        # print(buyimielement.text)
        self.output['step'].append('openGoods2buy find [buy button]')
        buyimielement.click()  # 点击元素
        # print('====================>点击立即购买按钮后')

        time.sleep(3)

        if self.isTokenOk == False:
            raise ValueError('openGoods2buy token false')

        # 是否要验证
        if self.checkVidff():
            # 去验证
            # verify.verify(self)
            self.addErr('need vidff')
            raise

        # 点卡充值提示弹窗
        # try:
        #     nut_dialog__mask = self.drive.find_element(By.XPATH,'//*[contains(text(), "充值类商品")]/parent::div/parent::div/parent::div')
        #     nut_button = nut_dialog__mask.find_element(By.XPATH, '//button[contains(@class,"nut-button")]')
        #     # print(1, nut_dialog__mask.get_attribute('innerHTML'))
        #     # print(2, nut_button.get_attribute('innerHTML'))
        #     try:
        #         nut_button.click()
        #         self.output['step'].append('openGoods2buy click nut_button 1')
        #     except Exception as e:
        #         # 使用模拟鼠标点击
        #         try:
        #             ActionChains(self.drive).click(nut_button).perform()
        #             self.output['step'].append('openGoods2buy click nut_button 2')
        #         except Exception as e:
        #             try:
        #                 self.drive.execute_script("arguments[0].click();", nut_button)
        #                 self.output['step'].append('openGoods2buy click nut_button 3')
        #             except Exception as e:
        #                 self.output['step'].append('openGoods2buy can not click nut_button')
            
        #     # 删除mask
        #     # nut_dialog__mask = self.drive.find_element(By.XPATH, '//div[contains(@class,"nut-dialog__mask")]/parent::div')
        #     # self.drive.execute_script("arguments[0].remove();", nut_dialog__mask)

        #     self.output['step'].append('openGoods2buy find [nut_button and click]')
        # except Exception as e:
        #     self.addLog('no e card tip dialog')
        #     # print('没有点卡充值提示')

        # 是否未填地址
        if self.checkaddress():
            # 去填地址
            adress.adddress(self, self.adress)

        self.takeOrder()

    # 下单
    def takeOrder(self):
        self.output['step'].append('takeOrder in')
        # 直接下单

        if self.isTokenOk == False:
            raise ValueError('takeOrder token false')
        
        try:
            # locator = (By.XPATH, '//*[contains(@class,"ActionBar_submit")]')
            # buysureelement = self.wait.until(EC.visibility_of_element_located(locator))
            buysureelement = self.drive.find_element(By.XPATH, '//*[contains(@class,"ActionBar_submit")]')
        except Exception as e:
            # 超市卡是在线支付
            try:
                buysureelement = self.drive.find_element(By.XPATH,'//taro-button-core[contains(text(), "在线支付")]')
            except Exception as e:
                try:
                    buysureelement = self.drive.find_element(By.XPATH,'//div[contains(text(), "确认付款")]')
                except Exception as e:
                    # 点卡
                    self.output['step'].append('takeOrder try find e card')
                    buysureelement = self.drive.find_element(By.XPATH,'//button[contains(text(), "立即充值")]')
                    input_account = self.drive.find_element(By.CLASS_NAME, 'input-account')
                    input_account.clear()
                    input_account.send_keys('751700494')
                    self.output['step'].append('takeOrder find [e card and input success]')

                    time.sleep(1)
                    try:
                        nut_dialog__mask = self.drive.find_element(By.XPATH, '//div[contains(@class,"nut-dialog__mask")]/parent::div')
                        self.drive.execute_script("arguments[0].remove();", nut_dialog__mask)
                    except Exception as e:
                        self.output['step'].append('takeOrder not find nut_dialog__mask')

        # print('====================>找到下单按钮')
        # print(buysureelement.text)
        self.output['step'].append('takeOrder find [ActionBar_submit]')
        # 点击立即支付
        buysureelement.click()
        # print('====================>点击下单按钮后')

        self.shouyintai()

    # 收银台
    def shouyintai(self):
        self.output['step'].append('shouyintai in')

        time.sleep(5)
        # ===================只有微信支付方式==================================

        # 删除京东银行卡支付
        try:
            jdPayWrap = self.drive.find_element(By.CLASS_NAME, 'jdPayWrap')
            self.drive.execute_script("arguments[0].remove();", jdPayWrap)
        except Exception as e:
            self.output['step'].append('shouyintai delete jdPayWrap success')

        #找到含有微信的父父节点
        try:
            pelement = self.drive.find_element(By.XPATH,'//*[contains(text(), "微信支付")]/parent::div/parent::div/parent::div/parent::div')
        except Exception as e:
            self.output['step'].append('shouyintai not find wechat pay')
        # 打印元素的innerHTML
        # if isinstance(pelement, WebElement):
        #     print(pelement.get_attribute('innerHTML'))
        time.sleep(1)

        try:
            wechatcheckbox = pelement.find_element(By.CLASS_NAME, 'checkboxWrap')
        except Exception as e:
            # print(e)
            self.output['step'].append('shouyintai not find wechat checkboxWrap')
            # time.sleep(1000)

        time.sleep(1)

        # print('====================>找到微信支付checkbox')
        # if isinstance(wechatcheckbox, WebElement):
        #     print(wechatcheckbox.get_attribute('innerHTML'))
        
        try:
            wechatcheckbox.click()
            self.output['step'].append('shouyintai choose wechat pay success')
        except Exception as e:
            # 使用模拟鼠标点击
            try:
                ActionChains(self.drive).move_to_element(wechatcheckbox).click(wechatcheckbox).perform()
            except Exception as e:
                self.output['step'].append('shouyintai can not choose wechat pay')
        
        # print('====================>勾选checkbox后')
        self.drive.execute_script("arguments[0].checked = true;", wechatcheckbox)

        try:
            paybottom = self.drive.find_element(By.CLASS_NAME, 'PayButtom')
            paybtn = paybottom.find_element(By.CLASS_NAME, 'payBtn')
        except Exception as e:
            # paybtn = self.drive.find_element(By.XPATH,'//*[contains(text(), "确认付款")]/parent::div')
            paybtn = self.wait.until(
                        EC.element_to_be_clickable((By.XPATH, '//*[contains(text(), "确认付款")]/parent::div'))
                    )
            
        self.output['step'].append('shouyintai find [pay button]')
        # print('====================>找到支付按钮')

        # time.sleep(1)
        paybtn.click()

        # print('====================>点击支付按钮后')
        self.output['step'].append('shouyintai click [pay button]')

        # time.sleep(100)

        try:
        # 等待页面加载完成
            WebDriverWait(self.drive, 60).until(EC.url_changes(self.drive.current_url))
            # print('====================>重定向')
            # 获取当前页面的URL
            # redirect_url = self.drive.current_url
            # print("重定向链接:", redirect_url)

            # 等待10s
            time.sleep(5)

            try:
                self.drive.find_element(By.XPATH,'//*[contains(text(), "支付确认")]')
            except Exception as e:
                if hasattr(self, 'wxurl'):
                    if self.wxurl == '':
                        self.output['status'] = -106
                else:
                    self.output['status'] = -106

            # print(self.drive.page_source)
        except TimeoutExpired:
            self.addErr('收银台超时')

    # 检查token是否有效
    def checkToken(self, ck, isauto = True):
        self.output['step'].append('checkToken in')
        try:
            self.jdaccount = self.getPin(ck)
            current_dir = current_dir = os.path.dirname(os.path.abspath(__file__))
            tokenpath = os.path.join(current_dir, 'data', self.todaystr, 'JdcookieToken', self.jdaccount+'.json')
            with open(tokenpath, mode='r', encoding='utf-8') as f:
                cookie = f.read()
            cookie_list = json.loads(cookie)
            self.output['step'].append('checkToken load cookie file success' + tokenpath)
            if isauto:
                for item in cookie_list:
                    if item['name'] == 'pt_token':
                        if int(datetime.now().timestamp()) > item['expiry']:
                            # 过期了
                            self.output['step'].append('checkToken token out expiry')
                            self.getToken(ck)
                            break
        except Exception as e:
            #没有文件
            # print('没有token文件')
            self.getToken(ck)
        
        self.isTokenOk = True
        self.loadcookie(ck)
        
    # 检查有没有地址
    def checkaddress(self):
        self.output['step'].append('checkaddress in')
        try:
            self.drive.find_element(By.XPATH,'//*[contains(@class,"EmptyAddress_create")]')
            self.output['step'].append('checkdress find [EmptyAddress_create div]')
            # print('没有填收货地址')
            return True
        except Exception as e:
            # print('填了收货地址')
            return False
        
    # 检查有没有需要验证
    def checkVidff(self):
        self.output['step'].append('checkVidff in')
        try:
            self.drive.find_element(By.XPATH,'//*[contains(text(), "验证一下")]')
            self.output['step'].append('checkdress find [need checkVidff div]')
            # print('需要验证')
            return True
        except Exception as e:
            # print('不需要验证')
            return False
    
    # 打开个人主页
    def openSelfHome(self):
        self.output['step'].append('openSelfHome in')
        if self.loadck == False:
            self.loadcookie(self.ck)

        element = self.drive.find_element(By.ID, 'msShortcutMenu')
        self.output['step'].append('openSelfHome find [msShortcutMenu div]')
        element.click()

        time.sleep(3)

        if self.isTokenOk == False:
            raise ValueError('openSelfHome token false')
        
        # 一般会有个弹窗
        try:
            modal__wrap = self.drive.find_element(By.CLASS_NAME, 'modal__wrap')
            modal__close = modal__wrap.find_element(By.CLASS_NAME, 'modal__close')
            self.output['step'].append('openSelfHome find [modal__wrap div]')
            modal__close.click()
        except Exception as e:
            # print('没有提示跳转APP')
            time.sleep(1)

    #获取最近一笔订单号
    def getLastOrderId(self):
        self.output['step'].append('getLastOrderId in')
        self.openSelfHome()

        time.sleep(3)

        # my_order_entrance = self.drive.find_element(By.XPATH, '//*[contains(@class,"my_order_entrance")]')
        my_order_entrance = self.drive.find_element(By.XPATH,'//*[contains(text(), "全部订单")]/parent::div/parent::div')
        self.output['step'].append('getLastOrderId find [all order div]')
        my_order_entrance.click()

        time.sleep(3)

        try:
            indexmoduleorderbox = self.drive.find_element(By.XPATH, '//*[contains(@class,"index-module__order_box___")]')
            self.output['step'].append('getLastOrderId find [index-module__order_box___]')
            indexmoduleorderbox.click()

            # self.getOrderDeatilParam()
            time.sleep(3)
            
            self.output['step'].append('getLastOrderId in order detail')

            try:
                orderp = self.drive.find_element(By.XPATH, '//*[contains(@class,"index-module__regular")]')
            except Exception as e:
                orderp = self.drive.find_element(By.XPATH,'//*[contains(text(), "订单编号")]/parent::p')

            # print(orderp.get_attribute('textContent'))
            # print(orderp.text)

            # 获取字符串中的数字
            orderIds = re.findall(r'\d+', orderp.text)
            self.output['step'].append('getLastOrderId find [last order id] is' + str(orderIds))

            # 执行了re.findall的时候才是数组
            last_jdorderId = orderIds[0]
            self.jdorderId = last_jdorderId
            if hasattr(self, 'in_jdorderId') and self.in_jdorderId != '':
                # 订单号不匹配
                if self.in_jdorderId != last_jdorderId:
                    self.output['status'] = -102
                    self.addErr('in_jdorderId != last_jdorderId')
                    self.logcheckOrderPayAndRaise()

        except Exception as e:
            # print('没有订单')
            self.output['status'] = -101
            self.addErr('没有最近一笔订单')
            raise e

    #用最近一笔订单生成微信链接
    def useLastOrderGetUrl(self):
        self.output['step'].append('useLastOrderGetUrl in')
        try:
            self.getLastOrderId()

            try:
                paybtn = self.drive.find_element(By.XPATH,'//*[contains(text(), "去支付")]/parent::button')
                self.output['step'].append('useLastOrderGetUrl find [go to pay button]')
                paybtn.click()

                time.sleep(3)

                self.shouyintai()

            except Exception as e:
                self.addErr(e)
                # print('没有可支付的订单')
                #去下单
                login.openGoods2buy()

        except Exception as e:
            #没有最近一笔订单
            #或者订单号不匹配
            #去下单
            self.addErr(e)
            login.openGoods2buy()
        

    #查询最近一笔订单是否付款
    def checkLastOrderIsPay(self):
        self.output['step'].append('checkLastOrderIsPay in')

        self.getLastOrderId()

        # 查询有无订单状态字段
        # 已取消 有次字段
        try:
            index_module__state_txt = self.drive.find_element(By.XPATH, '//*[contains(@class,"index-module__state_txt")]')
            # 状态中的中文
            state_str = self.extract_chinese(index_module__state_txt.text)[0]
            self.output['step'].append('checkLastOrderIsPay find index-module__state_txt' + state_str)
            if (state_str == '已取消'):
                self.output['status'] = -103
                # print('已取消')
                self.output['step'].append('checkLastOrderIsPay find status ' + str(self.output['status']))
                self.logcheckOrderPayAndRaise('success')
            elif (state_str == '完成'):
                self.output['status'] = 101
                # print('已完成')
                self.output['step'].append('checkLastOrderIsPay find status ' + str(self.output['status']))
                self.logcheckOrderPayAndRaise('success')
            elif (state_str == '等待收货'):
                self.output['status'] = 100
                # print('已付款，待收货')
                self.output['step'].append('checkLastOrderIsPay find status ' + str(self.output['status']))
                self.logcheckOrderPayAndRaise('success')
        except Exception as e:
            # 如果没有报错，直接返回吧
            # print(str(e))
            # print(str(e) == 'success')
            if (str(e) == 'success'):
                raise
            self.output['step'].append('checkLastOrderIsPay not find index_module__state_txt')

        try:
            self.drive.find_element(By.XPATH,'//*[contains(text(), "确认收货")]/parent::div')
            self.output['step'].append('checkLastOrderIsPay find [confirm receive]')
            self.output['status'] = 100
            # print('已付款，待收货')
            self.logcheckOrderPayAndRaise('success')
        except Exception as e:
            if (str(e) == 'success'):
                raise
            # print('非已付款、待收货状态')
            self.output['step'].append('checkLastOrderIsPay not find confirm receive')

        try:
            self.drive.find_element(By.XPATH,'//*[contains(text(), "去支付")]/parent::button')
            self.output['step'].append('checkLastOrderIsPay find [go to pay]')
            self.output['status'] = -105
            self.logcheckOrderPayAndRaise('success')
        except Exception as e:
            if (str(e) == 'success'):
                raise
            # print('非待支付状态')
            self.output['step'].append('checkLastOrderIsPay not find go to pay')

        try:
            self.drive.find_element(By.XPATH,'//*[contains(text(), "已完成")]/parent::div')
            self.output['step'].append('checkLastOrderIsPay find [finish]')
            self.output['status'] = 101
            self.logcheckOrderPayAndRaise('success')
        except Exception as e:
            if (str(e) == 'success'):
                raise
            # print('非已完成状态')
            self.output['step'].append('checkLastOrderIsPay not find finish')

        try:
            self.drive.find_element(By.XPATH,'//*[contains(text(), "已取消")]/parent::div')
            self.output['step'].append('checkLastOrderIsPay find [cancel]')
            self.output['status'] = -103
            self.logcheckOrderPayAndRaise('success')
        except Exception as e:
            if (str(e) == 'success'):
                raise
            # print('非已完成状态')
            self.output['step'].append('checkLastOrderIsPay not find cancel')
        
        self.logcheckOrderPayAndRaise()

    def getProxyIp(self):
        self.output['step'].append('getProxyIp in')
        session = requests.session()
        API = 'https://api.wandouapp.com/?app_key=f8367eaaea4c2508afdba24c4d41ab3b&num=1&xy=1&type=1&lb=\r\n&nr=0&area_id=&isp=0&'
        ips = session.get(API).text.split('\r\n')
        if '-1' in ips[0]:
            self.addErr('getProxyIp fail')
            raise
        else:
            self.proxyip = ips[0]
            self.output['step'].append('getProxyIp success')
    
    def getOrderDeatilParam(self):
        try:
            # 待支付页面没有这个eparam
            selector = '[data-eparam*="skuid"]'
            pelement = self.drive.find_element(By.CSS_SELECTOR, selector)
        except Exception as e:
            print('没找到', e)
            self.drive.quit()
            raise SystemExit("退出脚本。")

        # 打印元素的innerHTML
        if isinstance(pelement, WebElement):
            print(pelement.get_attribute('data-eparam'))
            print(pelement.text)

    def checkDir(self):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        directory_path = os.path.join(current_dir, 'data', self.todaystr)
        if not os.path.exists(directory_path):
            os.makedirs(directory_path)
            os.makedirs(os.path.join(directory_path, 'JdcookieToken'))
            os.makedirs(os.path.join(directory_path, 'Jdorder'))

    # 正则匹配，获取JD账号
    def getPin(self, ck):
        pattern = "pin=(.*?);"
        match = re.search(pattern, ck)
        if match:
            return match.group(1)

    # 获取字符串中的中文，返回数组
    def extract_chinese(self, text):
        pattern = re.compile(r'[\u4e00-\u9fa5]+')
        chinese_chars = re.findall(pattern, text)
        return chinese_chars
    
    # 日志处理
    def addErr(self, msg):
        if self.test:
            print(msg)
        else:
            # traceback.print_exc()
            if (str(msg) != 'success'):
                self.output['err'].append(str(msg))
            else:
                self.output['log'].append(str(msg))
    
    def addLog(self, msg):
        if self.test:
            print(msg)
        else:
            traceback.print_exc()
            self.output['log'].append(str(msg))

    # 关闭浏览器
    def close(self):
        if hasattr(self, 'drive'):
            self.drive.quit()

    def start(self, argv):
        if argv[1] == 'getpayurl':
            # print(f"收到的参数: {argv[1]} {argv[2]}") 
            try:
                self.init(argv)
                # self.getcookie()
                # self.loadcookie(arg1)
                self.checkToken(self.ck)
                # self.getToken(self.ck)
                if self.in_jdorderId != '':
                    self.useLastOrderGetUrl()
                else:
                    self.openGoods2buy()
                # self.getLastOrderId()
                # adress.adddress()
                # saveorder.addOrderWxurl('123', 'sIDDK')
            except Exception as e:
                self.addErr(e)
            finally:
                try:
                    self.drive.switch_to.alert.accept()
                except Exception as e:
                    self.output['step'].append('alert')

                try:
                    while True:
                        time.sleep(1)
                except KeyboardInterrupt:
                    self.close()
                    if (len(self.output['err'])) > 0:
                        print(json.dumps(self.output))
                    raise ValueError('Interrupt out')
        elif argv[1] == 'checkorder':
            try:
                self.init(argv)
                # self.getcookie()
                self.checkToken(self.ck, False)
                self.checkLastOrderIsPay()
            except Exception as e:
                self.addErr(e)
            finally:
                self.close()
                if (len(self.output['err'])) > 0:
                    print(json.dumps(self.output))
        elif argv[1] == 'getpayurl_my':
            try:
                self.init(argv)
                # self.getcookie()
                self.checkToken(self.ck, False)
                self.checkLastOrderIsPay()
            except Exception as e:
                self.addErr(e)
            finally:
                self.close()
                if (len(self.output['err'])) > 0:
                    print(json.dumps(self.output))

if __name__ == '__main__':
    # print('开始')
    login = CookieLogin()
    #标记是否加载过ck到浏览器中
    login.loadck = False
    login.test = False
    #标记是否保存过wxurl链接到缓存订单中
    login.saveOrder = False
    login.argv = sys.argv
    # a = [
    #     "",
    #     # "getpayurl",
    #     "checkorder",
    #     "pin=jd_NnRLHEZashtE;wskey=AAJnkAPKAECpKtR5aTHqaMQFZiekKQxPhlLqnTWFdEBtFHapDD0CrI9I-jIjV7QzxQHVCsUCMQm4aC4EgfRodXVaNIgIYVoN;",
    #     "10077221265581",
    #     "df7643b5586d43b49bc3ce17487f687c",
    #     "310406434923",
    #     "李先生 13756376578 江西省宜春地区宜春市 建设路11号19A",
    #     "1",
    # ]
    # login.argv = a
    login.start(login.argv)
    



