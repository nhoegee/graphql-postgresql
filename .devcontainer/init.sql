CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS recipes (
  id uuid DEFAULT uuid_generate_v4 (),
  title TEXT NOT NULL,
  description TEXT,
  creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
  ingredients TEXT [],
  PRIMARY KEY (id)
);

INSERT INTO recipes 
  (title, description, ingredients)
  VALUES 
    ('Tosti ham kaas','Nom nom nom…',ARRAY ['2 sneetjes brood', 'plakje ham', 'plakje kaas']);
