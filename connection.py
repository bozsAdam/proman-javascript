
import database_common


@database_common.connection_handler
def select_boards(cursor):
    query = """SELECT * FROM boards"""
    cursor.execute(query)
    boards = cursor.fetchall()
    return boards


@database_common.connection_handler
def select_cards(cursor):
    query = """SELECT * FROM cards"""
    cursor.execute(query)
    cards = cursor.fetchall()
    return cards


@database_common.connection_handler
def select_statuses(cursor):
    query = """SELECT * FROM statuses"""
    cursor.execute(query)
    statuses = cursor.fetchall()
    return statuses


@database_common.connection_handler
def select_users(cursor):
    query = """SELECT * FROM users"""
    cursor.execute(query)
    users = cursor.fetchall()
    return users




