const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

// POST /todos — Add a new todo
router.post('/todos', (req, res) => {
  const { title } = req.body;
  const sql = 'INSERT INTO todos (title) VALUES (?)';

  db.query(sql, [title], (err, result) => {
    if (err) {
      console.error('Error inserting todo:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ id: result.insertId, title, completed: false });
  });


});

// GET /todos — fetch todos
router.get('/todos',(req,res)=>{
    const sql = 'SELECT * FROM todos';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching todos:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(result);
  });
})

// PUT /todos — update todos

router.put('/todos', (req, res) => {
  const { id, title, completed } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const fields = [];
  const values = [];

  if (title !== undefined) {
    fields.push('title = ?');
    values.push(title);
  }

  if (completed !== undefined) {
    fields.push('completed = ?');
    values.push(completed);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  values.push(id);

  const sql = `UPDATE todos SET ${fields.join(', ')} WHERE id = ?`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo updated successfully' });
  });
});

// DELETE /todos — Delete a todo by ID
router.delete('/todos', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const sql = `DELETE FROM todos WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting todo:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  });


});


module.exports = router;
