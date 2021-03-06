import database_common
from psycopg2 import sql

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


@database_common.connection_handler
def delete_from(cursor,table):
    query = sql.SQL("""DELETE FROM {}""").format(sql.Identifier(table))
    cursor.execute(query)


@database_common.connection_handler
def insert_to_boards(cursor,params):
    query = """
                INSERT INTO boards(id, title, is_active, user_id)
                VALUES(%(id)s,%(title)s,%(is_active)s,%(user_id)s)
            """
    cursor.execute(query,params)


@database_common.connection_handler
def insert_to_cards(cursor,params):
    query = """
                INSERT INTO cards(id, title, board_id, status_id, card_order)
                VALUES(%(id)s,%(title)s,%(board_id)s,%(status_id)s,%(card_order)s) 
            """
    cursor.execute(query,params)


@database_common.connection_handler
def insert_new_user(cursor,username,hashed_password):
    query= """
                INSERT INTO users(nick_name,hashed_password)
                VALUES(%(username)s,%(hashed_password)s)
            """
    params={
            'username':username,
            'hashed_password':hashed_password
            }
    cursor.execute(query,params)


@database_common.connection_handler
def get_hashed_password_by_username(cursor,username):
    query="""
            SELECT hashed_password FROM users
            WHERE nick_name = %(username)s    
        """
    params = {'username':username}
    cursor.execute(query,params)
    hashed_pwd = cursor.fetchone()
    if hashed_pwd is not None:
        return hashed_pwd['hashed_password']
    else:
        return ''


@database_common.connection_handler
def get_all_usernames(cursor):
    query = """
                SELECT nick_name FROM users
            """
    cursor.execute(query)
    return cursor.fetchall()


@database_common.connection_handler
def get_user_id_by_username(cursor,username):
    query = """
                SELECT id FROM users
                WHERE nick_name = %(username)s
            """
    params = {'username':username}
    cursor.execute(query,params)
    id = cursor.fetchone()
    return id['id']
