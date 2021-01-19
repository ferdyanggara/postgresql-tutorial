const express = require('express');
const app = express();
const cors = require('cors')
const pool = require('./db');
const { Pool } = require('pg');


app.use(cors())
app.use(express.json())

// routes 

//create a todo 
app.post('/todos', async(req,res) => {
  //await 
  try {
    const {description} = req.body;
    const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *", [description])
    res.json(newTodo)
  } catch (err) {
    console.log(err);
  }
})

//get all todos
app.get('/todos', async(req,res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows)
  } catch (err) {
    console.log(err);
  }
})
//get a todo 
app.get('/todos/:id', async(req,res) => {
  const {id} = req.params
  try {
    const oneTodo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
    res.json(oneTodo.rows)
  } catch (err) {
    console.log(err);
  }
})
// update a todo
app.put('/todos/:id', async(req,res) => {
  try {
    const {id} = req.params
    const {description} = req.body
    console.log('id', id);
    console.log('description', description);
    const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id])
    res.json(updateTodo)
  } catch (err) {
    console.log(err);
  }
})
//delete a todo
app.delete('/todos/:id', async(req,res) => {
  try {
    const {id} = req.params
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
    res.json('TODO WAS DELETED')
  } catch (err) {
    console.log(err);
  }
})

app.listen(5000,()=>{
  console.log('server running on 5000');
})