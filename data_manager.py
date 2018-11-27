import connection


def fill_boards(boards):
    connection.delete_from('boards')
    for board in boards:
        connection.insert_to_boards(board)


def fill_cards(cards):
    connection.delete_from('cards')
    for card in cards:
        connection.insert_to_cards(card)