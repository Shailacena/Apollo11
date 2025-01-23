
import mysql.connector

def getConfig():
    # 连接到MySQL数据库
    config = {
        'user': 'root',
        'password': '12345678',
        'host': '127.0.0.1:3306',
        'database': 'gva'
    }
    return config

# 新增新生成的订单
def addOrderWxurl():
    config = getConfig()
    # 执行一个查询
    cnx = mysql.connector.connect(**config)
    # 创建一个游标对象
    cursor = cnx.cursor()
    query = ("SELECT * FROM python_order")
    cursor.execute(query)
    
    # 获取查询结果
    for (column1, column2) in cursor:
        print("{}, {}".format(column1, column2))
    
    # 关闭游标和连接
    cursor.close()
    cnx.close()
