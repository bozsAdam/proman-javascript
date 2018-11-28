import connection


def delete():
    connection.delete_from('cards')
    connection.delete_from('boards')


def fill_boards(boards):
    for board in boards:
        connection.insert_to_boards(board)


def fill_cards(cards):
    for card in cards:
        connection.insert_to_cards(card)