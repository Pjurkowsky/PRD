import mysql.connector


def connect():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='test123',
        database='del'
    )
