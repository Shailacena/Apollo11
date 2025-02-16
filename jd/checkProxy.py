
import requests
 
def check_proxy(proxy):
    # print(proxy)
    try:
        response = requests.get('http://www.baidu.com', proxies={'http': proxy, 'https': proxy}, timeout=10)
        if response.status_code == 200:
            return True
        else:
            return False
    except requests.exceptions.RequestException as e:
        # print(e)
        return False
 
def check_proxy_demo():
    session = requests.session()
    API = 'https://api.wandouapp.com/?app_key=f8367eaaea4c2508afdba24c4d41ab3b&num=1&xy=1&type=1&lb=\r\n&nr=0&area_id=&isp=0&'#填写API
    ips = session.get(API).text.split('\r\n')

    print(ips)
    ips = ['211.95.152.53:15450']

    targetURL='http://www.baidu.com'#填写目标网址,使用前请在个人中心添加白名单IP
    session.verify = False
    session.headers = {}#根据访问的目标网站进行填写
    for x in ips:
        try:
            print(x)
            session.proxies={
                'http':x,
                'https':x
            }
            res = session.get(url=targetURL)
            if res.status_code == 200:
                print('成功访问')
                # print('{}:{}'.format(x,res.text))
        except Exception as e:
            print('{}:{}'.format(x,str(e)))

# 获取IP
# session = requests.session()
# API = 'https://api.wandouapp.com/?app_key=f8367eaaea4c2508afdba24c4d41ab3b&num=1&xy=1&type=1&lb=\r\n&nr=0&area_id=&isp=0&'
# ips = session.get(API).text.split('\r\n')
# print(ips)

# ips = ['27.158.8.144:7237']
# result = check_proxy(ips[0])
# print(result)