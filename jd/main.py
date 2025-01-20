from subprocess import TimeoutExpired
import requests
from selenium import webdriver
import time
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
import json

from undetected_chromedriver import Chrome, ChromeOptions
import undetected_chromedriver

# chrome_driver_path = '/chromedriver-win64/chromedriver'
# 自动下载并设置 ChromeDriver 路径
# driver_path = undetected_chromedriver.install()

class CookieLogin():
    def __init__(self):
        # headers = {
        #     'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        #     'sec-ch-ua-platform' : '"Android"',
        # }
        headers = {
            "Content-Type": "text/plain;charset=UTF-8",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
            "sec-ch-ua-platform": "macOS"
        },
        # opactions = webdriver.ChromeOptions()
        # opactions.add_argument(f"user-agent={headers['User-Agent']}")
        # opactions.add_argument('sec-ch-ua-platform="Android"')
        self.drive = Chrome(enable_cdp_events=True)
        self.url = 'https://plogin.m.jd.com/login/login'
        
        self.drive.add_cdp_listener('Network.requestWillBeSent', self.inter_request)
        self.drive.add_cdp_listener('Network.dataReceived', self.inter_reponse)

    def inter_request(self, request):
        print('inter_request', json.dumps(request))
    
    def inter_reponse(self, response):
        print('inter_reponse', response)

    # def getToken(self, cookie):
    #     sess = requests.session()
    #     token = jd_wskey.getToken(sess, cookies1)

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
        with open('data/Jdcookie.json', 'w') as f:
            f.write(cookieStr)

        print('cookie已写入')
        print(self.drive.current_url)
        self.drive.close()

    #读取cookie
    def readcookie(self):
        self.drive.get('https://m.jd.com/')
        with open('data/Jdcookie.json',mode='r',encoding='utf-8') as f:
            cookie = f.read()

        #读取到的是字符串类型，loads之后就变成了python中的字典类型
        cookie = json.loads(cookie)
       
        #先把所有的cookie全部删掉
        self.drive.delete_all_cookies()
        for item in cookie:
            print(type(item))
            print(item)
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
        try:
            element = WebDriverWait(self.drive, 100).until(
                EC.element_to_be_clickable((By.ID, "rightBtn"))
            )
            print('====================>找到立即购买按钮')
            print(element.text)
            element.click()  # 点击元素
            print('====================>点击立即购买按钮后')
        except TimeoutExpired:
            print('超时了')
        finally:
            # self.drive.quit()
            time.sleep(2)
            try:
                time.sleep(5)
                # element = WebDriverWait(self.drive, 100).until(
                    # self.drive.find_element(By.XPATH, '//*[starts-with(@class,"button_button_")]'))
                element = self.drive.find_element(By.XPATH, '//*[starts-with(@class,"button_button_")]')
                print('====================>找到下单按钮')
                print(element.text)

                # 点击立即支付
                element.click()
                print('====================>点击下单按钮后')
                time.sleep(5)

                #找到含有微信的节点
                pelement = self.drive.find_element(By.XPATH,'//*[contains(text(), "微信")]/parent::div/parent::div')
                print('含有微信节点', pelement.text)
                # 打印元素的innerHTML
                if isinstance(pelement, WebElement):
                    print(pelement.get_attribute('innerHTML'))

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

            except TimeoutExpired:
                print('超时了')

if __name__ == '__main__':
    login = CookieLogin()
    # login.getcookie()
    login.readcookie()
