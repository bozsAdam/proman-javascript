CREATE TABLE statuses (
    id serial NOT NULL,
    name varchar (20)
);


CREATE TABLE boards (
    id serial NOT NULL,
    title varchar (255),
    is_active boolean
);


CREATE TABLE cards (
    id serial NOT NULL,
    title varchar (255),
    board_id integer,
    status_id integer,
    card_order integer
);


CREATE TABLE users (
    id serial NOT NULL,
    nick_name varchar (255),
    hashed_password varchar(255)
);


ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_status_id PRIMARY KEY (id);


ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_board_id PRIMARY KEY (id);


ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_card_id PRIMARY KEY (id);


ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_card_id FOREIGN KEY (board_id) REFERENCES boards(id);


ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_id FOREIGN KEY (status_id) REFERENCES statuses(id);


ALTER TABLE boards
ADD COLUMN user_id integer;


ALTER TABLE ONLY users
    ADD CONSTRAINT pk_user_id PRIMARY KEY (id);


ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_board_id FOREIGN KEY (user_id) REFERENCES users(id);


ALTER TABLE boards
    ALTER COLUMN is_active TYPE varchar(20);


INSERT INTO users (nick_name, hashed_password)
VALUES ('test', 'pbkdf2:sha256:50000$wRWgA7bU$8ebc306a280437154a93291461ebba5462fabb95ac3e1927723ac126d8cdcc3c');

