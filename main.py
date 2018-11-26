from flask import Flask, render_template, jsonify
import connection


app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route('/get-boards')
def get_boards():
    boards = connection.select_boards()
    return jsonify(boards=boards)


def main():
    app.run(debug=False)


if __name__ == '__main__':
    print('hello')
    main()

