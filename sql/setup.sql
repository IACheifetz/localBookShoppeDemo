-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists author_books;
DROP table if exists authors;
DROP table if exists books;

CREATE table books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  releasedate INT NOT NULL,
  genre VARCHAR NOT NULL
);

INSERT INTO books (name, releasedate, genre) VALUES 
('The Fellowship of the Ring', 1954, 'Fantasy'),
('A Wizard of Earthsea', 1968, 'Fantasy'),
('Dune', 1965, 'Sci Fi'),
('Crime and Punishment ', 1866, 'Fiction'),
('The Way of Shadows', 2008, 'Fantasy');


CREATE table authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  dob VARCHAR NOT NULL,
  pob VARCHAR NOT NULL
);

INSERT INTO authors (name, dob, pob) VALUES
('J. R. R. Tolkien', '2 January 1892', 'Bloemfontein'),
('Ursula K. Le Guin', '21 October 1929', 'Berkeley California'),
('Frank Herbert', '8 October 1920', 'Tacoma Washington'),
('Fyodor Dostoevsky', '11 November 1821', 'Moscow'),
('Brent Weeks', '7 March 1977', 'Montana');

CREATE table author_books(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author_id BIGINT,
  book_id BIGINT,
  FOREIGN KEY (author_id) REFERENCES authors(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO author_books (author_id, book_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);