// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(this.showBoards);
        this.buttonEvent();
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardsContainer = document.getElementById('boards');
        boardsContainer.innerHTML = '';
        for (let i = 0; i < boards.length; i++) {
            if (boards[i].is_active) {
                let boardDiv = document.createElement('div');
                boardDiv.id = 'board' + boards[i].id;
                boardDiv.setAttribute('class', 'col-12 board');
                boardDiv.innerHTML = boards[i].title;
                boardDiv.addEventListener('click', function () {
                   dom.loadCards(boards[i].id)
                });
                boardsContainer.appendChild(boardDiv);
            }
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, this.showCards)
    },
    showCards: function (cards, boardId) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let intBoardId = boardId;
        boardId = "board" + boardId;
        //board.innerHTML = '';
        let boardContent;

        let board = document.getElementById(boardId);
        if (document.getElementById('container' + intBoardId)) {
            boardContent = document.getElementById('container' + intBoardId);
            boardContent.innerHTML = '';
        }
        else {
            boardContent = document.createElement('div');
        }
        boardContent.id = 'container' + intBoardId;
        boardContent.setAttribute('class', 'row');
        let statuses = ['New','In progress','Testing','Done'];
        for (let i = 0; i < statuses.length; i++) {
            let statusDiv = document.createElement('div');
            let cardContainer = document.createElement('div');
            cardContainer.id = 'dragme' + intBoardId +'_'+(i+1);
            cardContainer.setAttribute('class','draggable col-12');
            cardContainer.dataset.status = i;
            statusDiv.id = 'board' + intBoardId + '_' +(i+1);
            statusDiv.setAttribute('class', 'col-lg-3 col-md-6 status');
            statusDiv.innerHTML = statuses[i];
            statusDiv.dataset.draggable = 'false';
            boardContent.appendChild(statusDiv);
            statusDiv.appendChild(cardContainer);
        }

        board.appendChild(boardContent);
        for (let i = 0; i < cards.length; i++) {
            let cardDiv = document.createElement('div');
            cardDiv.innerHTML = cards[i].title;
            cardDiv.dataset.order = cards[i].order;
            let cardBox = document.getElementById('dragme'+cards[0].board_id +'_'+cards[i].status_id)
            cardBox.appendChild(cardDiv);
        }
            dragula([document.getElementById('dragme'+intBoardId+'_'+1),
        document.getElementById('dragme'+intBoardId+'_'+2),
        document.getElementById('dragme'+intBoardId+'_'+3),
        document.getElementById('dragme'+intBoardId+'_'+4)]);
    },
    appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    // here comes more features
    buttonEvent: function() {
        let newBoardButton = document.getElementById('boardSubmit');
        newBoardButton.addEventListener('click',()=>{
            let title = document.getElementById('createBoard').value;
            dataHandler.createNewBoard(title,this.showBoards)
        })
    }

}
;
