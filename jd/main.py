from subprocess import TimeoutExpired
from selenium import webdriver
import time
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json

from undetected_chromedriver import Chrome, ChromeOptions
import undetected_chromedriver

# chrome_driver_path = '/chromedriver-win64/chromedriver'
# 自动下载并设置 ChromeDriver 路径
# driver_path = undetected_chromedriver.install()

class CookieLogin():
    def __init__(self):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
            'sec-ch-ua-platform' : '"Android"',
        }
        # opactions = webdriver.ChromeOptions()
        # opactions.add_argument(f"user-agent={headers['User-Agent']}")
        # opactions.add_argument('sec-ch-ua-platform="Android"')
        self.drive = Chrome()
        self.url = 'https://plogin.m.jd.com/login/login'

    # def justopen(self):
    #     self.drive.get('https://jd.com/')
    #     time.sleep(2000)

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
        with open('data/Jdcookie.txt', 'w') as f:
            f.write(cookieStr)

        print('cookie已写入')
        print(self.drive.current_url)
        self.drive.close()

    #读取cookie
    def readcookie(self):
        self.drive.get('https://m.jd.com/')
        with open('data/Jdcookie.txt',mode='r',encoding='utf-8') as f:
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

        time.sleep(100000)

        # self.drive.close()

if __name__ == '__main__':
    login = CookieLogin()
    # login.getcookie()
    login.readcookie()
