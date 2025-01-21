import time
import pyautogui
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PIL import ImageGrab
# from YdmVerify import YdmVerify

def verify(app):
    # 新建地址按钮
    verifyBtn = app.drive.find_element(By.CLASS_NAME, 'verifyBtn')
    verifyBtn.click()

    time.sleep(3)

    click_verify()

    time.sleep(3)

def click_verify():
    # 图标点选
    try:
        ##截图保存
        img = ImageGrab.grab(bbox=(759, 421, 1141, 793))
        img.save('./sel.jpg')
        with open(r'./sel.jpg', 'rb') as f:
            im =f.read()
        ##图像识别
        ret=y.click_verify(image=im,verify_type="30330")
        print("ret="+ret)
        ret=str(ret)
        pos=ret.split(',')
        pos[0]=int(pos[0])
        pos[1] = int(pos[1])
        # 移动鼠标到起始位置
        pyautogui.moveTo(pos[0]+759, pos[1]+421, duration=0.3)
        # 按下鼠标左键
        pyautogui.mouseDown()
        # 松开鼠标左键
        pyautogui.mouseUp()

        time.sleep(2)
        
        ##失败 再次点选
        click_verify()

    except Exception as e:
        print('click_verify err:', e)


