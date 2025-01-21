from datetime import datetime, timedelta
from subprocess import TimeoutExpired
# import requests
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
import verify

# chrome_driver_path = '/chromedriver-win64/chromedriver'
# 自动下载并设置 ChromeDriver 路径
# driver_path = undetected_chromedriver.install()

class CookieLogin():
    def __init__(self):
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
        self.drive = uc.Chrome(driver_executable_path="/Users/admin/Documents/Apollo11/jd/chromedriver-mac-x64/chromedriver")
        print('创建Chrome')
        self.drive = Chrome(enable_cdp_events=True)
        self.drive.set_window_size(680, 980)
        # self.url = 'https://plogin.m.jd.com/login/login'
        
        self.drive.add_cdp_listener('Network.requestWillBeSent', self.inter_request)
        self.drive.add_cdp_listener('Network.dataReceived', self.inter_reponse)
        self.drive.add_cdp_listener('Network.getResponseBody', self.inter_reponse)

    def inter_request(self, request):
        if 'weixin' in request.params.documentURL:
            print('inter_request weixin pay', json.dumps(request))
            self.saveOrderWxurl(request.params.documentURL)
        if 'orderId' in request.params.documentURL:
            print('inter_request order', json.dumps(request))
            self.saveOrderId(request.params.documentURL)
    
    def inter_reponse(self, response):
        print('inter_reponse', response)

    def inter_reponseBody(self, response):
        print('inter_reponseBody', response)

    # 保存微信支付链接
    def saveOrderWxurl(self, jdaccount, wxurl):
        with open('data/Jdorder.json',mode='w+',encoding='utf-8') as f:
            data = f.read()
        try:
            orders = json.loads(data)
        except Exception as e:
            orders = []
        print(orders)
        hasold = False
        for item in orders:
            if item.account == jdaccount:
                item.wxurl = wxurl
                hasold = True
                break
        if hasold != True:
            orders.insert(0, {'account': jdaccount, 'wxurl': wxurl, 'wxurl_expiry': int((datetime.now() + timedelta(minutes=5)).timestamp())})
        
        with open('data/Jdorder.json',mode='w+',encoding='utf-8') as f:
            f.write(json.dumps(orders))

    # 保存订单号
    def saveOrderId(self, jdaccount, orderId):
        with open('data/Jdorder.json',mode='w+',encoding='utf-8') as f:
            data = f.read()
        try:
            orders = json.loads(data)
        except Exception as e:
            orders = []
        print(orders)
        hasold = False
        for item in orders:
            if item.account == jdaccount:
                item.orderId = orderId
                hasold = True
                break
        if hasold != True:
            orders.insert(0, {'account': jdaccount, 'orderId': orderId, 'orderId_expiry': int((datetime.now() + timedelta(minutes=5)).timestamp())})
        
        with open('data/Jdorder.json',mode='w+',encoding='utf-8') as f:
            f.write(json.dumps(orders))

    def getToken(self):
        # sess = requests.session()
        sess = ''
        cookie1 = 'pin=jd_umoLGScTnXXW;wskey=AAJnhLFuAEDIa-oEM7h7wp30mca70z1HuLeUmf_LCu0-16-zMuGrgmGIiV-U9ztc5ffDehvl73jILU21gFJ25odYxXRHGu-a;'
        token = jd_wskey.getToken(sess, cookie1)
        print('getToken:', token)
        if isinstance(token, str):
            #获取到的cookies是列表
            cookieDict  = sess.cookies.get_dict()
            print('getToken cookieDict:', cookieDict)

            cookieList = []
            for key, value in cookieDict.items():
                httponly = False
                if (key == 'pt_pin') or (key == 'pt_key'):
                    httponly = True
                cookieList.insert(0, {'name': key, 'value': value, "domain": ".jd.com", "expiry": int((datetime.now() + timedelta(days=365)).timestamp()),
                                      "httpOnly": httponly, "path": "/", "sameSite": "Lax", "secure": False})
            
            #转成字符串
            cookieStr = json.dumps(cookieList)

            # print(cookieStr)
            with open('data/JdcookieToken.json', 'w') as f:
                f.write(cookieStr)

            print('cookie已写入')
        
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
            print('超时了')

        #登录之后停2秒
        time.sleep(2)
        #获取到的cookies是列表
        cookieList  = self.drive.get_cookies()
        #转成字符串
        cookieStr = json.dumps(cookieList)

        # print(cookieStr)
        with open('data/JdcookieToken.json', 'w') as f:
            f.write(cookieStr)

        print('cookie已写入')
        print(self.drive.current_url)
        self.drive.close()

    #读取cookie
    def readcookie(self):
        self.drive.get('https://m.jd.com/')
        with open('data/JdcookieToken.json',mode='r',encoding='utf-8') as f:
            cookie = f.read()

        #读取到的是字符串类型，loads之后就变成了python中的字典类型
        cookie = json.loads(cookie)

        #先把所有的cookie全部删掉
        self.drive.delete_all_cookies()
        for item in cookie:
            print(type(item))
            print(item)
            if item.name == 'pt_pin':
                self.jdaccount = item.value
            self.drive.add_cookie(item)
        #是一个列表内套字典的形式

        self.drive.refresh()

        time.sleep(2)

        self.openGoods()

        time.sleep(100000)

        # self.drive.close()

    #打开商品
    def openGoods(self):
        url = 'https://item.m.jd.com/product/10135127527639.html'
        print('====================>打开商品', url)
        self.drive.get(url)
        print('====================>打开商品后')

        # 立即购买
        buyimielement = WebDriverWait(self.drive, 100).until(
            EC.element_to_be_clickable((By.ID, "rightBtn"))
        )
        print('====================>找到立即购买按钮')
        print(buyimielement.text)
        buyimielement.click()  # 点击元素
        print('====================>点击立即购买按钮后')

        time.sleep(5)

        # 是否要验证
        if self.checkVidff():
            # 去验证
            # verify.verify(self)
            print('需要验证')

        # 是否未填地址
        if self.checkdress():
            # 去填地址
            adress.adddress(self)

        self.takeOrder()

    # 下单
    def takeOrder(self):
        # 直接下单
        # buysureelement = WebDriverWait(self.drive, 10).until(
        #     self.drive.find_element(By.XPATH, '//*[contains(@class,"ActionBar_submit")]'))

        buysureelement = self.drive.find_element(By.XPATH, '//*[contains(@class,"ActionBar_submit")]')
        print('====================>找到下单按钮')
        print(buysureelement.text)

        # 点击立即支付
        buysureelement.click()
        print('====================>点击下单按钮后')

        time.sleep(5)

        #找到含有微信的节点
        pelement = self.drive.find_element(By.XPATH,'//*[contains(text(), "微信")]/parent::div/parent::div')

        # 打印元素的innerHTML
        # if isinstance(pelement, WebElement):
        #     print(pelement.get_attribute('innerHTML'))

        wechatcheckbox = pelement.find_element(By.CLASS_NAME, 'checkboxWrap')
        if isinstance(wechatcheckbox, WebElement):
            print(wechatcheckbox.get_attribute('innerHTML'))

        time.sleep(2)
        print('====================>找到微信支付checkbox')
        if isinstance(wechatcheckbox, WebElement):
            wechatcheckbox.click()
            print('====================>勾选checkbox后')
            # self.drive.execute_script("arguments[0].checked = true;", wechatcheckbox)

        time.sleep(2)
        paybtn = self.drive.find_element(By.CLASS_NAME, 'payBtn')
        print('====================>找到支付按钮')
        if isinstance(paybtn, WebElement):
            paybtn.click()
            print('====================>点击支付按钮后')

        try:
        # 等待页面加载完成
            WebDriverWait(self.drive, 60).until(EC.url_changes(self.drive.current_url))
            print('====================>重定向')
            # 获取当前页面的URL
            redirect_url = self.drive.current_url
            print("重定向链接:", redirect_url)

            # print(self.drive.page_source)
        except TimeoutExpired:
            print('超时了')

    # 检查有没有地址
    def checkdress(self):
        try:
            self.drive.find_element(By.XPATH,'//*[contains(@class,"EmptyAddress_create")]')
            print('没有填收货地址')
            return True
        except Exception as e:
            print('填了收货地址')
            return False
        
    # 检查有没有需要验证
    def checkVidff(self):
        try:
            self.drive.find_element(By.XPATH,'//*[contains(text(), "验证一下")]')
            print('需要验证')
            return True
        except Exception as e:
            print('不需要验证')
            return False
        
if __name__ == '__main__':
    print('开始')
    login = CookieLogin()
    # login.getcookie()
    # login.readcookie()
    # login.getToken()
    # adress.adddress()
    login.saveOrderWxurl('123', 'sIDDK')
    # login.saveOrderId('123', '300374748')
