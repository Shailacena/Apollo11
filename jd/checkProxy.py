
import requests
 
def check_proxy(proxy):
    print(proxy)
    try:
        response = requests.get('http://www.baidu.com', proxies={'http': proxy, 'https': proxy}, timeout=10)
        if response.status_code == 200:
            print('icccc success')
            return True
        else:
            print('icccc fail')
            return False
    except requests.exceptions.RequestException as e:
        print(e)
        return False
 
# proxy = '127.0.0.1:8080'  # 假设这是代理IP
# result = check_proxy(proxy)
# print(result)