// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
let dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _loadData: function () {
        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
        let localData = localStorage.getItem(this.keyInLocalStorage);
        this._data = JSON.parse(localData);
    },
    _saveData: function () {
        // it is not called from outside
        // saves the data from this._data to local storage
        localStorage.setItem('proman-data', JSON.stringify(this._data));
    },
    init: function () {
        this._loadData();
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards
        let boards = this._data.boards;
        callback(boards);
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
        let board;
        for (let i = 0; i < this._data.boards.length; i++) {
            if (this._data.boards[i].id === boardId) {
                board = this._data.boards[i];
            }
        }
        callback(board);
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
        let statuses = this._data.statuses;
        callback(statuses);
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
        let status;
        for (let i = 0; i < this._data.statuses.length; i++) {
            if (this._data.statuses[i].id === statusId) {
                status = this._data.statuses[i];
            }
        }
        callback(status);
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        let cards = [];
        for (let i = 0; i < this._data.cards.length; i++) {
            if (this._data.cards[i].board_id === boardId) {
                cards.push(this._data.cards[i]);
            }
        }
        cards.sort((a,b)=>{return a.order - b.order});
        callback(cards, boardId);
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
        let card;
        for (let i = 0; i < this._data.cards.length; i++) {
            if (this._data.cards[i].id === cardId) {
                card = this._data.cards[i];
            }
        }
        callback(card);
    },
    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        let newBoard = {
            "id": Math.max(...this._data.boards.map(x => x.id)) + 1,
            "title": boardTitle,
            "is_active": true
        };
        this._data.boards.push(newBoard);
        this._saveData();
        callback(this._data.boards);
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        let newCard = {
            "id": Math.max(...this._data.cards.map(x => x.id)) + 1,
            "title": cardTitle,
            "board_id": boardId,
            "status_id": statusId,
            "order": Math.max(...this._data.cards.map(x => x.order)) + 1,
        };
        this._data.cards.push(newCard);
        this._saveData();
        let cardsForBoard = this._data.cards.filter((card)=>card.board_id === boardId);
        callback(cardsForBoard,boardId);
    },
        // here comes more features

};
