const pool = require('../utils/pool');

class Book {
  id;
  name;
  genre;
  author;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.genre = row.genre;
    this.author = row.author ?? [];
  }

  static async insert({ name, genre, author }) {
    const { rows } = await pool.query(
      'INSERT INTO books (name, genre, author) VALUES ($1, $2, $3) RETURNING *',
      [name, genre, author]
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

  static async getAll() {}
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      books.*, 
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE authors.id IS NOT NULL), '[]'
    ) as authors from books 
      LEFT JOIN author_books on books.id = author_books.book_id 
      LEFT JOIN authros on author_books.author_id = authors.id
      WHERE books.id = $1
      GROUP BY books.id`,
      [id]
    );
    return new Book(rows[0]);
  }
}
module.exports = Book;
