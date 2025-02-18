# -*- coding: utf-8 -*-

from datetime import datetime, timedelta
import os
import re
from subprocess import TimeoutExpired
import sys
# import requests
import requests
from selenium import webdriver
import time
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
import json

from undetected_chromedriver import Chrome, ChromeOptions
import undetected_chromedriver as uc

import jd_wskey
import adress

sys.stdout.reconfigure(encoding='utf-8')

# chrome_driver_path = '/chromedriver-win64/chromedriver'
# 自动下载并设置 ChromeDriver 路径
# driver_path = undetected_chromedriver.install()

class CookieLogin():
    def __init__(self):
        self.init = True
        self.output = {
            'err': [],#错误信息列表
            'jdaccount':'',#ck中提取的jd帐号jd_XgYOBMKfcELO
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
        }

    

    def init1(self):
        options = ChromeOptions()
        options.add_argument('--headless')
        current_dir = os.path.dirname(os.path.abspath(__file__))
        # mac平台
        if sys.platform == 'linux':
            path = os.path.join(current_dir, 'chromedriver-linux64', 'chromedriver')
            self.drive = uc.Chrome(options=options, enable_cdp_events=True, driver_executable_path=path)
        if sys.platform == 'darwin':
            path = os.path.join(current_dir, 'chromedriver-mac-x64-133', 'chromedriver')
            # path = '/Users/admin/Documents/Apollo11/jd/chromedriver-mac-x64-133/chromedriver'
            self.drive = uc.Chrome(options=options, enable_cdp_events=True, driver_executable_path=path)
        if sys.platform == 'windows':
            # windows平台
            self.drive = uc.Chrome(enable_cdp_events=True, driver_executable_path=r"F:\henry\z_local\Cooking\Apollo11\jd\chromedriver-win64\chromedriver.exe")
        print(self.drive)
        self.drive.set_window_size(680, 980)
        self.url = 'https://baidu.com'
        
        self.drive.add_cdp_listener('Network.requestWillBeSent', self.inter_request)

        self.drive.get(self.url)

        time.sleep(20)

    def inter_request(self, request):
        print('inter_request', request)
             
    
    def logOrderAndRaise(self):
        self.output['wxurl'] = self.wxurl
        self.output['jdorderId'] = self.jdorderId
        self.output['orderId'] = self.our_orderid
        self.output['jdaccount'] = self.jdaccount
        if self.wxurl and self.wxurl != '':
            if self.jdorderId and self.jdorderId != '':
                self.output['status'] = 1
        raise

    def inter_reponse(self, response):
        print('inter_reponse', response)

    def inter_reponseBody(self, response):
        print('inter_reponseBody', response)

    # 获取Token
    def getToken(self, ck):
        sess = requests.session()
        jdaccount = self.getPin(ck)
        jd_ck = jd_wskey.getToken(self, sess, ck)
        # print('getToken:', jd_ck)
        if isinstance(jd_ck, str):
            #获取到的cookies是列表
            cookieDict  = sess.cookies.get_dict()
            # print('getToken cookieDict:', cookieDict)

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
            current_dir = current_dir = os.path.dirname(os.path.abspath(__file__))
            tokenpath = os.path.join(current_dir, 'data', 'JdcookieToken', jdaccount+'.json')
            with open(tokenpath, 'w') as f:
                f.write(cookieStr)

            # print('cookie已写入')
        else:
            if jd_ck == False:
                raise
        
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
            self.output['err']+['扫码超时']

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
        tokenpath = os.path.join(current_dir, 'data', 'JdcookieToken', jdaccount+'.json')
        with open(tokenpath, 'w') as f:
            f.write(cookieStr)

        # print('cookie已写入')
        # print(self.drive.current_url)
        self.drive.close()

    #加载cookie
    def loadcookie(self, ck):
        self.loadck = True
        jdaccount = self.getPin(ck)
        current_dir = current_dir = os.path.dirname(os.path.abspath(__file__))
        # print(current_dir)
        tokenpath = os.path.join(current_dir, 'data', 'JdcookieToken', jdaccount+'.json')
        try:
            with open(tokenpath, mode='r', encoding='utf-8') as f:
                cookie = f.read()
        except Exception as e:
            self.output['err']+[e]
            raise

        #读取到的是字符串类型，loads之后就变成了python中的字典类型
        cookie = json.loads(cookie)
        # print('读取cookie', cookie)
        self.drive.get('https://m.jd.com/')
        #先把所有的cookie全部删掉
        self.drive.delete_all_cookies()
        for item in cookie:
            # print(type(item))
            # print(item)
            if item['name'] == 'pt_pin':
                self.jdaccount = item['value']
            self.drive.add_cookie(item)
            #是一个列表内套字典的形式

        self.drive.refresh()

        time.sleep(2)

    #打开商品
    def openGoods(self):
        url = 'https://item.m.jd.com/product/' + self.sku + '.html'
        # print('====================>打开商品', url)
        self.drive.get(url)
        # print('====================>打开商品后')

        # 立即购买
        buyimielement = WebDriverWait(self.drive, 100).until(
            EC.element_to_be_clickable((By.ID, "rightBtn"))
        )
        # print('====================>找到立即购买按钮')
        # print(buyimielement.text)
        buyimielement.click()  # 点击元素
        # print('====================>点击立即购买按钮后')

        time.sleep(5)

        # 是否要验证
        if self.checkVidff():
            # 去验证
            # verify.verify(self)
            self.output['err']+['需要验证']
            raise

        # 是否未填地址
        if self.checkdress():
            # 去填地址
            adress.adddress(self, adress)

        self.takeOrder()

    # 下单
    def takeOrder(self):
        # 直接下单
        # buysureelement = WebDriverWait(self.drive, 10).until(
        #     self.drive.find_element(By.XPATH, '//*[contains(@class,"ActionBar_submit")]'))

        buysureelement = self.drive.find_element(By.XPATH, '//*[contains(@class,"ActionBar_submit")]')
        # print('====================>找到下单按钮')
        # print(buysureelement.text)

        # 点击立即支付
        buysureelement.click()
        # print('====================>点击下单按钮后')

        time.sleep(5)

    # 收银台
    def shouyintai(self):
        # ===================只有微信支付方式==================================

        # #找到含有微信的父父节点
        # pelement = self.drive.find_element(By.XPATH,'//*[contains(text(), "微信")]/parent::div/parent::div')

        # # 打印元素的innerHTML
        # if isinstance(pelement, WebElement):
        #     print(pelement.get_attribute('innerHTML'))

        # try:
        #     wechatcheckbox = pelement.find_element(By.CLASS_NAME, 'checkboxWrap')
        # except Exception as e:
        #     print(e)
        #     time.sleep(1000)

        # time.sleep(2)

        # print('====================>找到微信支付checkbox')
        # wechatcheckbox.click()
        # print('====================>勾选checkbox后')
        # # self.drive.execute_script("arguments[0].checked = true;", wechatcheckbox)

        # time.sleep(2)

        paybtn = self.drive.find_element(By.CLASS_NAME, 'payBtn')
        # print('====================>找到支付按钮')
        if isinstance(paybtn, WebElement):
            paybtn.click()
            # print('====================>点击支付按钮后')

        try:
        # 等待页面加载完成
            WebDriverWait(self.drive, 60).until(EC.url_changes(self.drive.current_url))
            # print('====================>重定向')
            # 获取当前页面的URL
            # redirect_url = self.drive.current_url
            # print("重定向链接:", redirect_url)

            # 等待10s
            time.sleep(10)
            # print(self.drive.page_source)
        except TimeoutExpired:
            self.output['err']+['收银台超时']

    # 检查token是否有效
    def checkToken(self, ck):
        try:
            jdaccount = self.getPin(ck)
            current_dir = current_dir = os.path.dirname(os.path.abspath(__file__))
            tokenpath = os.path.join(current_dir, 'data', 'JdcookieToken', jdaccount+'.json')
            with open(tokenpath, mode='r', encoding='utf-8') as f:
                cookie = f.read()
            cookie_list = json.loads(cookie)
            for item in cookie_list:
                if int(datetime.now().timestamp()) > item['expiry']:
                    # 过期了
                    # print('Token过期了')
                    self.getToken(ck)
                    break
        except Exception as e:
            #没有文件
            # print('没有token文件')
            self.getToken(ck)

        self.loadcookie(ck)
        
    # 检查有没有地址
    def checkdress(self):
        try:
            self.drive.find_element(By.XPATH,'//*[contains(@class,"EmptyAddress_create")]')
            # print('没有填收货地址')
            return True
        except Exception as e:
            # print('填了收货地址')
            return False
        
    # 检查有没有需要验证
    def checkVidff(self):
        try:
            self.drive.find_element(By.XPATH,'//*[contains(text(), "验证一下")]')
            # print('需要验证')
            return True
        except Exception as e:
            # print('不需要验证')
            return False
    
    # 打开个人主页
    def openSelfHome(self):
        if self.loadck == False:
            self.loadcookie(self.ck)

        element = self.drive.find_element(By.ID, 'msShortcutMenu')
        element.click()

        time.sleep(5)

        try:
            modal__wrap = self.drive.find_element(By.CLASS_NAME, 'modal__wrap')
            modal__close = modal__wrap.find_element(By.CLASS_NAME, 'modal__close')
            modal__close.click()
        except Exception as e:
            # print('没有提示跳转APP')
            time.sleep(1)

    #获取最近一笔订单号
    def getLastOrderId(self):
        self.openSelfHome()

        time.sleep(3)

        my_order_entrance = self.drive.find_element(By.XPATH, '//*[contains(@class,"my_order_entrance")]')
        my_order_entrance.click()

        time.sleep(3)

        try:
            indexmoduleorderbox = self.drive.find_element(By.XPATH, '//*[contains(@class,"index-module__order_box___")]')
            indexmoduleorderbox.click()

            time.sleep(3)
            
            orderp = self.drive.find_element(By.XPATH,'//*[contains(text(), "订单编号")]/parent::p')

            orderId = re.findall(r'\d+', orderp.text)

            self.jdorderId = orderId
        except Exception as e:
            # print('没有订单')
            raise

    #用最近一笔订单生成微信链接
    def useLastOrderGetUrl(self):
        try:
            self.getLastOrderId()
        except Exception as e:
            #没有最近一笔订单
            #去下单
            login.openGoods()

        try:
            paybtn = self.drive.find_element(By.XPATH,'//*[contains(text(), "去支付")]/parent::button')
            paybtn.click()

            time.sleep(3)

            self.shouyintai()

        except Exception as e:
            # print('没有可支付的订单')
            #去下单
            login.openGoods()

    # 正则匹配，获取JD账号
    def getPin(self, ck):
        pattern = "pin=(.*?);"
        match = re.search(pattern, ck)
        if match:
            return match.group(1)

    # 关闭浏览器
    def close(self):
        self.drive.quit()

if __name__ == '__main__':
    # print('开始')

    login = CookieLogin()
    #标记是否加载过ck到浏览器中
    login.loadck = False
    #标记是否保存过wxurl链接到缓存订单中
    login.saveOrder = False
    login.init1()
    # login.getcookie()
    # login.loadcookie(arg1)
    # login.checkToken(login.ck)
    # login.getToken(login.ck)
    # login.useLastOrderGetUrl()
    # login.getLastOrderId()
    # adress.adddress()
    # saveorder.addOrderWxurl('123', 'sIDDK')
    login.close()

