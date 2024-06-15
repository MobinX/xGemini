-- Create the apikey table with id auto increment, apikey text, and uploaderid integer in SQLite
CREATE TABLE IF NOT EXISTS apikey (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    apikey TEXT,
    uploaderid INTEGER
);

-- Create the lastusedkey table with id auto increment, keyid integer, and userid integer
CREATE TABLE IF NOT EXISTS lastusedkey (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyid INTEGER,
    userid INTEGER
);

-- Create the user table with id auto increment, username text, and email text
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
);

-- npx wrangler d1 execute aiAPI --local --file=./schema.sql --
-- npx wrangler d1 execute aiAPI --remote --file=./schema.sql --