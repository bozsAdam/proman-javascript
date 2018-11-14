from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


def main():
    app.run(debug=False)


if __name__ == '__main__':
    print('hello')
    main()

