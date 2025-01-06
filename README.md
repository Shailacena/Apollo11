# Apollo11 🚀 to the Moon!!!

go dowdloading 超时，设置代理
go env -w GOPROXY=https://goproxy.cn,direct

mysql password: abc123!!!

启动MySQL服务
sudo /usr/local/MYSQL/support-files/mysql.server start

停止MySQL服务
sudo /usr/local/mysql/support-files/mysql.server stop

重启MySQL服务
sudo /usr/local/mysql/support-files/mysql.server restart

登陆
/usr/local/MySQL/bin/mysql -u root -p

创建一个名字为 task_manage 数据库
create database task_manage character set utf8;

查看数据库
show databases;

进入数据库
use task_manage;

创建表，id, name, gebder, 并将id设为主键，
create table personTable (id int, name varchar(20), gender varchar(10), primary key(id));

查看表
show tables;

查看表结构
desc personTable;

修改表，增加字段
alter  table project add  project_name varchar(255) after id;

修改表，删除字段
alter table project drop name;