// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
let dataHandler = {
    _data : {},
    _saveData: function () {
        let body = JSON.stringify({'data':this._data});
        fetch('http://127.0.0.1:5000/save-data',
            {
                method: 'POST',
                body: body,
                headers:{
                    "Content-Type" : "application/json"
                }
            })
    },
    init: function (callback) {
        fetch(' http://127.0.0.1:5000/get-data',
            {
                method: 'POST'
            })
            .then((response) => response.json())
            .then((data) => {
                this._data = data;
                callback();
            })
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
        let id;
        if(this._data.boards.length ===0){
            id = 0
        }else{
            id = Math.max(...this._data.boards.map(x => x.id)) + 1
        }
        let newBoard = {
            "id": id,
            "title": boardTitle,
            "is_active": false,
            "user_id": 1
        };
        this._data.boards.push(newBoard);
        this._saveData();
        callback(this._data.boards);
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        let order;
        let id;
        if(this._data.cards.length === 0){
            order = 1;
            id = 1
        }else{
            order = Math.max(...this._data.cards.map(x => x.card_order)) + 1;
            id = Math.max(...this._data.cards.map(x => x.id)) + 1
        }
        let newCard = {
            "id": id,
            "title": cardTitle,
            "board_id": boardId,
            "status_id": statusId,
            "card_order": order ,
        };
        this._data.cards.push(newCard);
        this._saveData();
        let cardsForBoard = this._data.cards.filter((card)=>card.board_id === boardId);
        callback(cardsForBoard,boardId);
    },
        // here comes more features
    getCardById: function (cardId) {
        // the card is retrieved and then the callback function is called with the card
        let card = this._data.cards.filter(x=>x.id === parseInt(cardId));
        return(card[0])
    },
    addExistingCard: function(existingCard){
        this._data.cards.push(existingCard);
        console.log(existingCard);
    },
    orderChange: function(cardId,order_id){
        let card = this._data.cards.filter(x=>x.id === parseInt(cardId));
        card[0].card_order = order_id;
        this._saveData()
    },
    deleteCard: function(cardId){
        let card = this.getCardById(cardId);
        this._data.cards = this._data.cards.filter(card=>card.id !== parseInt(cardId));
        return card
    },
    deleteCardFromBoard: function(cardId,callback){
        this._data.cards = this._data.cards.filter(card=>card.id !== parseInt(cardId));
        this._saveData();
        callback()
    },
};
