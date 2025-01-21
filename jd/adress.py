import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def adddress(app):
    with open('data/adress.txt',mode='r',encoding='utf-8') as f:
        adress = f.read()
    print(adress)

    # 新建地址按钮
    EmptyAddress_create_element = app.drive.find_element(By.XPATH, '//*[contains(@class,"EmptyAddress_create_")]')
    EmptyAddress_create_element.click()

    # 地址识别textarea输入
    IntellectAddress_textarea = app.drive.find_element(By.XPATH, '//*[contains(@class,"taro-textarea")]')
    IntellectAddress_textarea.clear()
    IntellectAddress_textarea.send_keys(adress)

    time.sleep(10)

    #保存并使用该地址
    ConfirmBtn_confirmBtn_ = app.drive.find_element(By.XPATH, '//*[contains(@class,"ConfirmBtn_confirmBtn_")]')
    ConfirmBtn_confirmBtn_.click()

    # 等待页面加载完成
    WebDriverWait(app.drive, 60).until(EC.url_changes(app.drive.current_url))
    
    # 获取当前页面的URL
    redirect_url = app.drive.current_url
    
    print("重定向链接:", redirect_url)
    
    time.sleep(5000)

def checkdress(app):
    try:
        app.drive.find_element(By.XPATH,'//*[contains(text(), "没有收货地址")]')
        return True
    except Exception as e:
        return False

