
import database_common


@database_common.connection_handler
def select_boards(cursor):
    query = """SELECT * FROM boards"""
    cursor.execute(query)
    boards = cursor.fetchall()
    return boards
