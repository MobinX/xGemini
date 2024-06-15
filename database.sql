PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE IF NOT EXISTS apikey (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    apikey TEXT,
    uploaderid INTEGER
);
INSERT INTO apikey VALUES(1,'AIzaSyCn9Bw2RX1yxpFkxhKs8vsAXzpbRVeTysM',1);
INSERT INTO apikey VALUES(2,'AIzaSyA6kX6ghSfO9ehL_TvI0YlYdUkhmYPqMdQ',1);
INSERT INTO apikey VALUES(3,'AIzaSyA6kX6ghSfO9ehL_TvI0YlYdUkhmYPqMdQ',1);
INSERT INTO apikey VALUES(4,'AIzaSyCqsgZLfLXOe3hg3kpadRU84GFVIZgjpoM',1);
INSERT INTO apikey VALUES(5,'AIzaSyDmWfogU2ChRc9QWLQgfPv4I2HYyKofui0',1);
INSERT INTO apikey VALUES(6,'AIzaSyCW2tfP-f7HO-lgdW9wpNnqE9KTgXIx5zw',1);
INSERT INTO apikey VALUES(7,'AIzaSyCQ8dPkYHXnYjd868Wh7Ke81hsIga_kGGE',1);
CREATE TABLE IF NOT EXISTS lastusedkey (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyid INTEGER,
    userid INTEGER
);
INSERT INTO lastusedkey VALUES(1,1,1);
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('apikey',7);
INSERT INTO sqlite_sequence VALUES('lastusedkey',1);
