# from subprocess import TimeoutExpired

# from selenium import webdriver
# import time
# from selenium.webdriver.support.wait import WebDriverWait
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.remote.webelement import WebElement
# import json

from undetected_chromedriver import Chrome, ChromeOptions
import undetected_chromedriver

# import jd_wskey

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
        self.drive = Chrome()
        # self.drive = Chrome(enable_cdp_events=True)
        # self.url = 'https://plogin.m.jd.com/login/login'

if __name__ == '__main__':
    login = CookieLogin()
    # login.getcookie()
    # login.readcookie()
    # login.getToken()
    # adress.adddress()
