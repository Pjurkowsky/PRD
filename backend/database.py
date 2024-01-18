import mysql.connector


def connect():
    connection = mysql.connector.connect(
        host='192.168.0.122',
        user='root',
        password='test123',
        connect_timeout=10,
        database='del'
    )
    return connection
