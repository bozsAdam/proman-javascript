from flask import Flask, render_template, jsonify,request
import connection
from flask_cors import CORS
import data_manager


app = Flask(__name__)
CORS(app)

@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route('/get-data', methods=['POST'])
def get_boards():
    boards = connection.select_boards()
    cards = connection.select_cards()
    statuses = connection.select_statuses()
    data = [boards, cards, statuses]
    return jsonify(boards=boards, cards=cards, statuses=statuses)


@app.route('/save-data', methods=['POST'])
def save_data():
    data = request.get_json()['data']
    boards = data['boards']
    cards = data['cards']
    data_manager.delete()
    data_manager.fill_boards(boards)
    data_manager.fill_cards(cards)
    return ''



def main():
    app.run(debug=False)


if __name__ == '__main__':
    print('hello')
    main()

