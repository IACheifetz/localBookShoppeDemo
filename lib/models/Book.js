const pool = require('../utils/pool');

class Book {
  id;
  name;
  genre;
  released;
  authors;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.genre = row.genre;
    this.released = row.releasedate;
    this.authors = row.authors ?? [];
  }

  static async insert({ name, genre, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (name, genre, releasedate) VALUES ($1, $2, $3) RETURNING *',
      [name, genre, released]
    );
    return new Book(rows[0]);
  }
  async addAuthorById(authorId) {
    await pool.query(
      'INSERT INTO authors_books (author_id, book_id) VALUES ($1, $2) RETURNING *',
      [authorId, this.id]
    );
    return this;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from books');
    return rows.map((row) => new Book(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      books.*, 
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE authors.id IS NOT NULL), '[]'
    ) AS authors FROM books 
      LEFT JOIN author_books ON books.id = author_books.book_id 
      LEFT JOIN authors ON author_books.author_id = authors.id
      WHERE books.id = $1
      GROUP BY books.id`,
      [id]
    );
    return new Book(rows[0]);
  }
}
module.exports = Book;
