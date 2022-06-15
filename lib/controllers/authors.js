const { Router } = require('express');
const { Author } = require('../models/Author');
module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const author = await Author.insert(req.body);
      if (req.body.petIds) {
        await Promise.all(req.body.bookIds.map((id) => author.addBookById(id)));
      }
      res.json(author);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const author = await Author.getById(req.params.id);
      res.json(author);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    const respData = authors.map(({ id, name }) => ({ id, name }));
    res.json(respData);
  });







  
