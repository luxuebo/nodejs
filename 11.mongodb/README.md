mongodv版本：4.2.1
nodejs driver：http://mongodb.github.io/node-mongodb-native/3.3/quick-start/quick-start/


# mongo原生操作语句
1.打开数据库
mongod --dbpath 数据库文件夹地址
2.使用数据库
mongo
2.1查看当前存在的数据库
show dbs
2.2查看当前所在的数据库
db 
2.3创建一个新的数据库(切换数据库),同时会切换到当前数据库
use 名称
2.4在当前数据库中创建集合
db.集合名称
2.5增加
db.集合名称.insert({"name":"demo"})
2.6删除
db.集合名称.remove({"name":"demo"})
2.7修改
db.集合名称.update({"name":"demo"},{$set:{"name":"demo1"}})
2.8查询
db.集合名称.find({"name":"demo"})