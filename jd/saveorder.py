    # 保存微信支付链接
from datetime import datetime, timedelta
import json
import os

current_dir = current_dir = os.path.dirname(os.path.abspath(__file__))
todaystr = datetime.now().strftime("%Y%m%d")

# 新增新生成的订单
def addOrderWxurl(jdaccount, orderId, wxurl):
    with open(os.path.join(current_dir, 'data', todaystr, 'Jdorder', jdaccount+'.json'), mode='a+', encoding='utf-8') as f:
        data = f.read()
    try:
        orders = json.loads(data)
    except Exception as e:
        orders = []

    hasold = False
    for item in orders:
        if item['account'] == jdaccount and item['orderId'] == orderId:
            item['wxurl'] = wxurl
            item['wxurl_expiry'] = int((datetime.now() + timedelta(minutes=5)).timestamp())
            hasold = True
            break
    if hasold != True:
        orders.insert(0, {
            'account': jdaccount, 
            'wxurl': wxurl, 
            'wxurl_expiry': int((datetime.now() + timedelta(minutes=5)).timestamp()),
            'orderId': orderId, 
            'orderId_expiry': int((datetime.now() + timedelta(days=1)).timestamp()),
            'state': 0 # 0为未支付，1为已支付
            })
    
    with open(os.path.join(current_dir, 'data', todaystr, 'Jdorder', jdaccount+'.json'), mode='w+', encoding='utf-8') as f:
        f.write(json.dumps(orders))

# 删除过期且未完成的订单
def deleteOutexpOrder():
    lpath = os.path.join(current_dir, 'data', todaystr, 'Jdorder')
    for file_name in os.listdir(lpath):
        file_path = os.path.join(lpath, file_name)
        if os.path.isfile(file_path):
            with open(file_path, mode='r', encoding='utf-8') as f:
                data = f.read()
            try:
                orders = json.loads(data)
            except Exception as e:
                orders = []

            for key, value in list(orders.items()):
                if int(datetime.now().timestamp()) > key['orderId_expiry'] and key['state'] == 0:
                    os.remove(file_path)

# 删除订单
def deleteOrder(jdaccount, orderId):
    with open(os.path.join(current_dir, 'data', todaystr, 'Jdorder', jdaccount+'.json'), mode='r', encoding='utf-8') as f:
        data = f.read()
    try:
        orders = json.loads(data)
    except Exception as e:
        orders = []

    for key, value in list(orders.items()):
        if key['orderId'] == orderId:
            del orders[key]
    
    with open(os.path.join(current_dir, 'data', todaystr, 'Jdorder', jdaccount+'.json'), mode='w+', encoding='utf-8') as f:
        f.write(json.dumps(orders))

# 完成订单，将完成的订单状态修改
def finishOrder(jdaccount, orderId):
    with open(os.path.join(current_dir, 'data', todaystr, 'Jdorder', jdaccount+'.json'), mode='r', encoding='utf-8') as f:
        data = f.read()
    try:
        orders = json.loads(data)
    except Exception as e:
        orders = []

    finish_list = []
    for key, value in list(orders.items()):
        if key['orderId'] == orderId:
            key['state'] = 1
            finish_list.insert(0, orders[key])
    
    with open(os.path.join(current_dir, 'data', todaystr, 'Jdorder', jdaccount+'.json'), mode='w+', encoding='utf-8') as f:
        f.write(json.dumps(orders))