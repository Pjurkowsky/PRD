import mysql.connector


def connect():
    connection = mysql.connector.connect(
        host='192.168.1.17',
        user='root',
        password='test123',
        database='del'
    )
    return connection
