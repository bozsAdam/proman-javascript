// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(this.showBoards);
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
                boardDiv.setAttribute('class', 'board');
                boardDiv.setAttribute('class', 'col-12');
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
    showCards: function (cards) {
        // shows the cards of a board
        let boardId = 'board' + cards[0].board_id;
        // it adds necessary event listeners also

        let board = document.getElementById(boardId)
        board.innerHTML = '';
        let boardContent = document.createElement('div')
        boardContent.id = 'container' + cards[0].board_id;
        boardContent.setAttribute('class', 'row');
        let statuses = ['New','In progress','Testing','Done'];
        for (let i = 0; i < statuses.length; i++) {
            let statusDiv = document.createElement('div');
            let cardContainer = document.createElement('div');
            cardContainer.id = 'dragme' + cards[0].board_id +'_'+(i+1);
            statusDiv.id = 'board' + cards[0].board_id + '_' +(i+1);
            statusDiv.setAttribute('class', 'col-lg-3 col-md-6');
            statusDiv.innerHTML = statuses[i];
            statusDiv.dataset.draggable = 'false';
            boardContent.appendChild(statusDiv);
            statusDiv.appendChild(cardContainer);
        }
        board.appendChild(boardContent);
        dragula([document.getElementById('dragme'+cards[0].board_id+'_'+1),
        document.getElementById('dragme'+cards[0].board_id+'_'+2),
        document.getElementById('dragme'+cards[0].board_id+'_'+3),
        document.getElementById('dragme'+cards[0].board_id+'_'+4)])
        for (let i = 0; i < cards.length; i++) {
            let cardDiv = document.createElement('div');
            cardDiv.innerHTML = cards[i].title
            cardDiv.dataset.order = cards.order
            let cardBox = document.getElementById('dragme'+cards[0].board_id +'_'+cards[i].status_id)
            cardBox.appendChild(cardDiv);
        }
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
}
;
