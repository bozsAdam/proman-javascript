// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        userId = document.getElementById('userdata').dataset.userId;
        dataHandler.getBoards(userId,dom.showBoards);
        dom.buttonEvent();
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardsContainer = document.getElementById('boards');
        boardsContainer.innerHTML = '';
        for (let i = 0; i < boards.length; i++) {
            let boardDiv = document.createElement('div');
            boardDiv.id = 'board' + boards[i].id;
            boardDiv.setAttribute('class', 'col-12 board');
            boardDiv.innerHTML = boards[i].title;

            let input = document.createElement('input');
            let button = document.createElement('input');
            let delBtn = document.createElement("button");
            input.id = 'createCard' + boards[i].id;
            input.placeholder = 'Create new card';
            button.id = 'createCardBtn' + boards[i].id;
            button.type = 'submit';
            delBtn.innerText = 'Delete Board';
            delBtn.type = 'submit';
            delBtn.setAttribute('class', 'btn btn-info');
            button.setAttribute('class', 'btn btn-info');
            button.addEventListener('click', function () {
                dom.newCardEvent(boards[i].id);
            });
            delBtn.id = 'delete' + boards[i].id;
            boardDiv.appendChild(input);
            boardDiv.appendChild(button);
            boardDiv.appendChild(delBtn);

                boardDiv.addEventListener('click', function (event) {
                    if (event.target.parentElement.id === 'boards') {
                        if (boards[i].is_active === 'true') {
                            boardContent = document.getElementById('container' + parseInt(boards[i].id));
                            boardContent.innerHTML = '';
                            boards[i].is_active = 'false';
                            dataHandler._saveData()
                        } else {
                            dom.loadCards(boards[i].id);
                            boards[i].is_active = 'true';
                            dataHandler._saveData()
                        }
                    }
                });
                boardsContainer.appendChild(boardDiv);
                if (boards[i].is_active === 'true') {
                    dom.loadCards(boards[i].id)
                }
                boardsContainer.appendChild(boardDiv);
                delBtn.addEventListener('click', function () {
                    dataHandler.deleteBoardWithCards(boards[i].id, dom.showBoards)
                })
            }
        }
    ,
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
            cardContainer.dataset.status = i+1;
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
            cardDiv.dataset.id = cards[i].id;
            let delCardBtn = document.createElement('button');
            delCardBtn.innerText = 'X';
            delCardBtn.dataset.open = 'no';
            delCardBtn.style.display = 'none';
            delCardBtn.setAttribute('class', 'btn btn-info del');
            delCardBtn.addEventListener('click',(event)=>{
                let userId = document.getElementById('userdata').dataset.userId;
                dataHandler.deleteCardFromBoard(userId,event.target.parentNode.dataset.id,dom.showBoards)
            });
            cardDiv.appendChild(delCardBtn);
            cardDiv.setAttribute('class', 'card');
            cardDiv.addEventListener('click', function (event) {
                let del = event.target.children[0];
                if (del.dataset.open === 'no') {
                    del.style.display = 'block';
                    del.dataset.open = 'yes';
                } else {
                    del.style.display = 'none';
                    del.dataset.open = 'no';
                }
            });
            let cardBox = document.getElementById('dragme'+cards[0].board_id +'_'+cards[i].status_id);
            cardBox.appendChild(cardDiv);
        }
        let drake = dragula([document.getElementById('dragme'+intBoardId+'_'+1),
                    document.getElementById('dragme'+intBoardId+'_'+2),
                    document.getElementById('dragme'+intBoardId+'_'+3),
                    document.getElementById('dragme'+intBoardId+'_'+4)]);
        drake;
        drake.on('drop',(el,target,source,sibling)=>{
            let statusId = target.dataset.status;
            let cardId = el.dataset.id;
            let cardObject = dataHandler.getCardById(cardId);
            cardObject.status_id = statusId;
            dataHandler.deleteCard(cardId);
            dataHandler.addExistingCard(cardObject);
            let cardsOfContainer = target.children;
            for (let i = 0; i <cardsOfContainer.length ; i++) {
                cardsOfContainer[i].dataset.order = i;
                dataHandler.orderChange(cardsOfContainer[i].dataset.id,i)
            }
        }
            );
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
        let userId = document.getElementById('userdata').dataset.userId;
        let newBoardButton = document.getElementById('boardSubmit');
        newBoardButton.addEventListener('click',()=>{
            let title = document.getElementById('createBoard').value;
            dataHandler.createNewBoard(title,parseInt(userId),this.showBoards)
        })
    },
    newCardEvent: function(boardId) {
        let title = document.getElementById('createCard' + boardId).value;
        dataHandler.createNewCard(title,boardId,1,this.showCards)
    },
}
;
