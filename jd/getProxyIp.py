# 获取IP
import requests

session = requests.session()
API = 'https://api.wandouapp.com/?app_key=f8367eaaea4c2508afdba24c4d41ab3b&num=1&xy=1&type=1&lb=\r\n&nr=0&area_id=&isp=0&'
ips = session.get(API).text.split('\r\n')
if '-1' in ips[0]:
    print('获取IP失败')
print(ips[0])