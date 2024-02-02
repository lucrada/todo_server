const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());

todo = [
    { id: 1, category_id: 1, title: 'todo 1', finished: false },
    { id: 2, category_id: 1, title: 'todo 2', finished: false },
    { id: 3, category_id: 2, title: 'todo 3', finished: false },
    { id: 4, category_id: 3, title: 'todo 4', finished: false },
    { id: 5, category_id: 3, title: 'todo 5', finished: false },
];

categories = [
    { id: 1, title: 'cat 1' },
    { id: 2, title: 'cat 2' },
    { id: 3, title: 'cat 3' },
];

app.get('/api/todo/:categoryId', (req, res) => { // List all the todo items in a given category
    let categoryId = parseInt(req.params.categoryId);
    let todos = todo.filter(item => item.category_id === categoryId);
    if (todos.length == 0) {
        res.status(404).send({ message: 'The given id does not exists' });
        return;
    }
    res.status(200).send({ todos });
});

app.get('/api/categories', (_, res) => { // List all the categories
    res.status(200).send({categories});
});

app.post('/api/category/add', (req, res) => { // Add new category item
    let newItem = req.body;
    newItem = { id: categories.length + 1, ...newItem };
    categories.push(newItem);
    res.status(200).send({ message: 'New category added successfully' });
});

app.post('/api/todo/add', (req, res) => { // Add new todo item
    let newItem = req.body;
    newItem = { id: todo.length + 1, ...newItem };
    todo.push(newItem);
    res.status(200).send({ message: 'New todo added successfully' });
});

app.delete('/api/todo/delete/:id', (req, res) => { // Delete todo item with given id
    let todoId = parseInt(req.params.id), len = todo.length;
    todo = todo.filter(item => item.id != todoId);
    if (len === todo.length) {
        res.status(404).send({ message: 'Invalid Id!' })
        return;
    }
    res.status(200).send({ message: `Todo with id: ${todoId} is deleted successfully` });
});

app.put('/api/todo/toggle_status/:id', (req, res) => { // Toggle finished status of a todo item with given id
    let todoId = parseInt(req.params.id);
    todo.map(item => {
        if (item.id == todoId) {
            item.finished = !item.finished;
            res.status(200).send({ message: `Status of todo with id: ${todoId} is toggled` });
            return;
        }
    });
    res.status(404).send({ message: 'Invalid Id!' });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});