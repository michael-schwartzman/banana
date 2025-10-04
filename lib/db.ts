import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'storybook.db'));

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    favorite_thing TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id INTEGER,
    prompt TEXT NOT NULL,
    template_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (character_id) REFERENCES characters(id)
  );

  CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    story_id INTEGER,
    page_number INTEGER,
    image_data TEXT,
    image_mime_type TEXT,
    text_content TEXT,
    FOREIGN KEY (story_id) REFERENCES stories(id)
  );
`);

export default db;
