import mysql.connector


def connect():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='maniak123',
        database='del'
    )
