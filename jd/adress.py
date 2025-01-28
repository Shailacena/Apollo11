import os
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def adddress(app, adressstr):
    # current_dir = current_dir = os.path.dirname(os.path.abspath(__file__))
    # adresspath = os.path.join(current_dir, 'data/adress.txt')
    # with open(adresspath, mode='r', encoding='utf-8') as f:
    #     adress = f.read()
    # print(adressstr)

    # 新建地址按钮
    EmptyAddress_create_element = app.drive.find_element(By.XPATH, '//*[contains(@class,"EmptyAddress_create_")]')
    EmptyAddress_create_element.click()

    time.sleep(3)

    # 地址识别textarea输入
    IntellectAddress_textarea = app.drive.find_element(By.XPATH, '//*[contains(@class,"IntellectAddress_textarea_")]')
    taro_textarea = IntellectAddress_textarea.find_element(By.CLASS_NAME, 'taro-textarea')
    taro_textarea.clear()
    taro_textarea.send_keys(adressstr)

    time.sleep(3)

    # 点击识别
    IntellectAddress_sniffConfirm = app.drive.find_element(By.XPATH, '//*[contains(@class,"IntellectAddress_sniffConfirm")]')
    IntellectAddress_sniffConfirm.click()

    time.sleep(3)

    #保存并使用该地址
    ConfirmBtn_confirmBtn_ = app.drive.find_element(By.XPATH, '//*[contains(@class,"ConfirmBtn_confirmBtn_")]')
    ConfirmBtn_confirmBtn_.click()

    # 等待页面加载完成
    WebDriverWait(app.drive, 60).until(EC.url_changes(app.drive.current_url))
    
    # 获取当前页面的URL
    redirect_url = app.drive.current_url
    
    time.sleep(5)

def checkdress(app):
    try:
        app.drive.find_element(By.XPATH,'//*[contains(text(), "没有收货地址")]')
        return True
    except Exception as e:
        app.output['err']+[e]
        return False

