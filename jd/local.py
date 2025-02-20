from datetime import datetime
import os
from subprocess import TimeoutExpired
from selenium import webdriver
import time
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver import ActionChains
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
        current_dir = os.path.dirname(os.path.abspath(__file__))
        path = os.path.join(current_dir, 'chromedriver-mac-x64-133', 'chromedriver')
        self.drive = Chrome(driver_executable_path=path)
        self.drive.set_window_size(320, 640)
    def checkWechatPay(self):
        # 获取本地HTML文件的路径
        # local_html_path = 'file:///' + os.path.abspath('F:/henry/z_local/Cooking/Apollo11/jd/files/京东收银台.html')
        local_html_path = 'file:///Users/admin/Documents/Apollo11/jd/files/京东收银台.html'
        print(local_html_path)
        # 使用Selenium打开本地HTML文件
        self.drive.get(local_html_path)

        #找到含有微信的节点
        try:
            pelement = self.drive.find_element(By.XPATH,'//*[contains(text(), "微信支付")]/parent::div/parent::div/parent::div/parent::div')
        except Exception as e:
            print('没找到', e)
            self.drive.quit()
            raise SystemExit("退出脚本。")

        # 打印元素的innerHTML
        if isinstance(pelement, WebElement):
            print(pelement.get_attribute('innerHTML'))

        wechatcheckbox = pelement.find_element(By.CLASS_NAME, 'checkboxWrap')
        # if isinstance(wechatcheckbox, WebElement):
        #     print(wechatcheckbox.get_attribute('innerHTML'))

        try:
            jdPayWrap = self.drive.find_element(By.CLASS_NAME, 'jdPayWrap')
            self.drive.execute_script("arguments[0].remove();", jdPayWrap)
        except Exception as e:
            print('no jdPayWrap')

        time.sleep(200)
        # wechatcheckbox.click()
        if isinstance(wechatcheckbox, WebElement):
            self.drive.execute_script("arguments[0].checked = true;", wechatcheckbox)

        time.sleep(2)
        paybtn = self.drive.find_element(By.CLASS_NAME, 'payBtn')
        # if isinstance(paybtn, WebElement):
        #     paybtn.click()

        paybottom = self.drive.find_element(By.CLASS_NAME, 'PayButtom')
        paybtn = paybottom.find_element(By.CLASS_NAME, 'payBtn')

        # 等待页面加载完成
        # WebDriverWait(self.drive, 60).until(EC.url_changes(self.drive.current_url))
        
        # 获取当前页面的URL
        # redirect_url = self.drive.current_url
        
        # print("重定向链接:", redirect_url)
        
        time.sleep(1)

    def checkAdrress(self):
        # 获取本地HTML文件的路径
        local_html_path = 'file:///'+os.path.abspath('F:/henry/z_local/Cooking/Apollo11/jd/files/确认订单_没有收获地址_新建地址.html')
        # local_html_path = 'file:///Users/admin/Documents/Apollo11/jd/files/确认订单_没有收获地址_新建地址.html'
        print(local_html_path)
        # 使用Selenium打开本地HTML文件
        self.drive.get(local_html_path)

        #找到含有没有收货地址的节点
        time.sleep(2)
        try:
            pelement = self.drive.find_element(By.XPATH,'//*[contains(text(), "没有收货地址")]')
        except Exception as e:
            print('没找到', e)
            self.drive.quit()
            raise SystemExit("退出脚本。")

        # 打印元素的innerHTML
        if isinstance(pelement, WebElement):
            print(pelement.get_attribute('innerHTML'))
        
        try:
            EmptyAddress_create_element = self.drive.find_element(By.XPATH, '//*[contains(@class,"EmptyAddress_create_")]')
        except Exception as e:
            print('没找到', e)
            self.drive.quit()
            raise SystemExit("退出脚本。")
        
        print('====================>找到创建地址按钮')
        EmptyAddress_create_element.click()
        print('====================>点击创建地址后')

    def addAdrress(self, address_str):
        # 获取本地HTML文件的路径
        # local_html_path = 'file:///'+os.path.abspath('F:/henry/z_local/Cooking/Apollo11/jd/files/确认订单_没有收获地址_新建地址.html')
        local_html_path = 'file:///Users/admin/Documents/Apollo11/jd/files/编辑收货地址.html'
        print(local_html_path)
        # 使用Selenium打开本地HTML文件
        self.drive.get(local_html_path)

        time.sleep(2)
        IntellectAddress_textarea = self.drive.find_element(By.XPATH, '//*[contains(@class,"taro-textarea")]')
        
        # 地址识别textarea输入
        IntellectAddress_textarea.clear()
        IntellectAddress_textarea.send_keys(address_str)

        time.sleep(2)
        
        #点击识别
        # IntellectAddress_sniffConfirm_ = self.drive.find_element(By.XPATH, '//*[contains(@class,"IntellectAddress_sniffConfirm_")]')
        # IntellectAddress_sniffConfirm_.click()

        time.sleep(10)

        #保存并使用该地址
        ConfirmBtn_confirmBtn_ = self.drive.find_element(By.XPATH, '//*[contains(@class,"ConfirmBtn_confirmBtn_")]')
        # ConfirmBtn_confirmBtn_.click()

        # 等待页面加载完成
        WebDriverWait(self.drive, 60).until(EC.url_changes(self.drive.current_url))
        
        # 获取当前页面的URL
        redirect_url = self.drive.current_url
        
        print("重定向链接:", redirect_url)
        
        time.sleep(5000)

    def checkSku(self):
        # 获取本地HTML文件的路径
        # local_html_path = 'file:///' + os.path.abspath('F:/henry/z_local/Cooking/Apollo11/jd/files/京东收银台.html')
        local_html_path = 'file:///Users/admin/Documents/Apollo11/jd/files/订单详情-待支付.html'
        print(local_html_path)
        # 使用Selenium打开本地HTML文件
        self.drive.get(local_html_path)
        time.sleep(100)
        #找到含有SKU
        try:
            selector = '[data-eparam*="skuid"]'
            # pelement = self.drive.find_element(By.CSS_SELECTOR,'//*[contains(text(), "skuid")]')
            pelement = self.drive.find_element(By.CSS_SELECTOR, selector)
        except Exception as e:
            print('没找到', e)
            self.drive.quit()
            raise SystemExit("退出脚本。")

        # 打印元素的innerHTML
        if isinstance(pelement, WebElement):
            print(pelement.get_attribute('data-eparam'))
            print(pelement.text)
        
        time.sleep(5)

    def takeOrder(self):
        # 获取本地HTML文件的路径
        # local_html_path = 'file:///' + os.path.abspath('F:/henry/z_local/Cooking/Apollo11/jd/files/京东收银台.html')
        local_html_path = 'file:///Users/admin/Documents/Apollo11/jd/files/确认订单3.html'
        print(local_html_path)
        # 使用Selenium打开本地HTML文件
        self.drive.get(local_html_path)
        # time.sleep(100)
        #找到含有SKU

        # pelement = self.drive.find_element(By.XPATH,'//taro-button-core[contains(text(), "在线支付")]')
        pelement = self.drive.find_element(By.XPATH, '//*[contains(@class,"ActionBar_submit")]')
        # 打印元素的innerHTML
        if isinstance(pelement, WebElement):
            print(pelement.get_attribute('innerHTML'))

    def checkeCardTip(self):
        # 获取本地HTML文件的路径
        # local_html_path = 'file:///' + os.path.abspath('F:/henry/z_local/Cooking/Apollo11/jd/files/京东收银台.html')
        local_html_path = 'file:///Users/admin/Documents/Apollo11/jd/files/填写订单-点卡.html'
        print(local_html_path)
        # 使用Selenium打开本地HTML文件
        self.drive.get(local_html_path)
        # time.sleep(100)
        #找到含有SKU
        time.sleep(1)
        nut_dialog__mask = self.drive.find_element(By.XPATH,'//*[contains(text(), "充值类商品")]/parent::div/parent::div/parent::div/parent::div')
        nut_button = nut_dialog__mask.find_element(By.XPATH, '//button[contains(@class,"nut-button")]/parent::div')
        print(1, nut_dialog__mask.get_attribute('offsetTop'))
        print(11, nut_dialog__mask.find_element(By.CLASS_NAME, 'nut-dialog__outer').get_attribute('offsetTop'))
        print(2, nut_button.get_attribute('innerHTML'))
        print(nut_button.rect)
        print(3, nut_button.location)
        print(4, nut_dialog__mask.location)
        
        # nut_button.click()
        self.drive.execute_script("arguments[0].click();", nut_button)

        documentx = self.drive.execute_script('return document.documentElement.clientWidth')
        documenty = self.drive.execute_script('return document.documentElement.clientHeight')
        print('网页尺寸  width:', documentx, 'height:', documenty)

        # ActionChains(self.drive).move_to_element(nut_button).perform()
        time.sleep(100)
        nut_button.click()
if __name__ == '__main__':
    login = CookieLogin()
    # with open('data/adress.txt',mode='r',encoding='utf-8') as f:
    #     adress = f.read()
    # print(adress)
    # login.addAdrress(adress)
    # login.checkWechatPay()
    login.checkeCardTip()
    # login.checkSku()
    login.drive.quit()
    # print(datetime.now().strftime("%Y%m%d"))
