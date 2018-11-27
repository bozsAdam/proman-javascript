from flask import Flask, render_template, jsonify
import connection


app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route('/get-data')
def get_boards():
    boards = connection.select_boards()
    cards = connection.select_cards()
    statuses = connection.select_statuses()
    data = [boards, cards, statuses]
    return jsonify(boards=boards, cards=cards, statuses=statuses)


def main():
    app.run(debug=False)


if __name__ == '__main__':
    print('hello')
    main()

