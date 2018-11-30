from flask import Flask, render_template, jsonify,request,session,redirect,url_for
import connection
from werkzeug.security import generate_password_hash,check_password_hash
from flask_cors import CORS
import data_manager


app = Flask(__name__)
CORS(app)
app.secret_key = 'MYSECRETKEY'

@app.route("/boards")
def boards():
    if 'username' in session:
        username = session['username']
        userId = session['id']
        return render_template('boards.html',username = username,userId = userId)
    else:
        return redirect(url_for('login'))


@app.route('/get-data', methods=['POST'])
def get_boards():
    boards = connection.select_boards()
    cards = connection.select_cards()
    statuses = connection.select_statuses()
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


@app.route('/')
def login():
    if 'username' in session:
        session.pop('username')
        session.pop('id')
    return render_template('login.html')


@app.route('/registration' ,methods = ['POST'])
def register_user():
    username = request.form['username']
    password = generate_password_hash(request.form['password'],method='pbkdf2:sha256', salt_length=8)
    if data_manager.check_username(username) == 'not-existing':
        connection.insert_new_user(username,password)
        session['username'] = username
        id = connection.get_user_id_by_username(username)
        session['id'] = id
        return redirect(url_for('boards'))
    else:
        return redirect(url_for('incorrect',error = 'taken'))


@app.route('/verification', methods = ['POST'])
def verification():
    username = request.form['username']
    password = request.form['password']
    hashed_pw = connection.get_hashed_password_by_username(username)
    print(hashed_pw)
    print(check_password_hash(hashed_pw,password))
    if check_password_hash(hashed_pw,password) == True:
        session['username'] = username
        id = connection.get_user_id_by_username(username)
        session['id'] = id
        return redirect(url_for('boards'))
    else:
        return redirect(url_for('incorrect'))



@app.route('/incorrect')
def incorrect():
    return render_template('falsepwd.html',error = request.args.get('error'))

def main():
    app.run(debug=False)


if __name__ == '__main__':
    main()

