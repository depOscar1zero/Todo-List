const express = require('express');
const app = express();
const mysql = require('mysql2');

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'OEspinoza',
  password: '54321',
  database: 'todo_list_app_db'
});

db.connect();

app.use(express.json());

app.post('/api/todos', (req, res) => {
  const { title, description, status } = req.body;
  db.query(
    'INSERT INTO todos (title, description, status) VALUES (?, ?, ?)',
    [title, description, status],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error creating todo');
      } else {
        res.status(201).json({ id: result.insertId });
      }
    }
  );
});

app.put('/api/todos/:id', (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;
  db.query(
    'UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ?',
    [title, description, status, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating todo');
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    'DELETE FROM todos WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error deleting todo');
      } else if (result.affectedRows === 0) {
        res.status(404).send('Todo not found');
      } else {
        res.status(200).send('Todo deleted successfully');
      }
    }
  );
});


// Inicia el servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
