// It is just an idea how you can structure your data during your page is running.
// You can use it for testing purposes by simply copy/paste/run in the Console tab in your browser

let keyInLocalStorage = 'proman-data';

let sampleData = {
    "statuses": [
        {
            "id": 1,
            "name": "New"
        },
        {
            "id": 2,
            "name": "In progress"
        },
        {
            "id": 3,
            "name": "Testing"
        },
        {
            "id": 4,
            "name": "Done"
        }
    ],
    "boards": [
        {
            "id": 1,
            "title": "Sprint1",
            "is_active": true
        }
    ],
    "cards": [
        {
            "id": 1,
            "title": "Boards / List page",
            "board_id": 1,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 2,
            "title": "Boards / Detailed page ",
            "board_id": 1,
            "status_id": 1,
            "order": 2
        },
        {
            "id": 3,
            "title": "Cards / Order",
            "board_id": 1,
            "status_id": 1,
            "order": 1
        },
        {
            "id": 4,
            "title": "Cards / Statuses",
            "board_id": 1,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 5,
            "title": "Cards / Edit title",
            "board_id": 1,
            "status_id": 1,
            "order": 2
        },
    ]
};

localStorage.setItem(keyInLocalStorage, JSON.stringify(sampleData));

