import os
from subprocess import TimeoutExpired
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
        headers = {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
            'sec-ch-ua-platform' : '"Android"',
        }
        # opactions = webdriver.ChromeOptions()
        # opactions.add_argument(f"user-agent={headers['User-Agent']}")
        # opactions.add_argument('sec-ch-ua-platform="Android"')
        self.drive = Chrome()
        # 获取本地HTML文件的路径
        local_html_path = 'file:///' + os.path.abspath('F:/henry/z_local/Cooking/Apollo11/jd/files/京东收银台.html')
        
        # 使用Selenium打开本地HTML文件
        self.drive.get(local_html_path)

        #找到含有微信的节点
        pelement = self.drive.find_element(By.XPATH,'//*[contains(text(), "微信")]/parent::div')
        print('含有微信节点', pelement.text)
        # 打印元素的innerHTML
        print(pelement.get_attribute('innerHTML'))
        # 使用JavaScript获取相邻节点
        javascript = "var prev = arguments[0].previousSibling; return prev || null;"
        previous_sibling = self.drive.execute_script(javascript, pelement)
        print('找到', len(previous_sibling), '个')
        for index, value in enumerate(previous_sibling):
            if isinstance(value, WebElement):
                print(index, value.get_attribute('innerHTML'))
                if hasattr(value, 'text'):
                    print(value.text)
        # elements = self.drive.find_elements(By.CLASS_NAME, 'checkbox')
        # print(len(elements))
        # for e in elements:
        #     # 使用JavaScript获取相邻节点
        #     javascript = "var prev = arguments[0].previousSibling; return prev || null;"
        #     previous_sibling = self.drive.execute_script(javascript, e)
            
        #     # 如果存在相邻节点，打印它的文本内容
        #     if previous_sibling:
        #         print(previous_sibling.text)

        

        time.sleep(5000)

if __name__ == '__main__':
    login = CookieLogin()
