var Todo = require('./models/todo');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false,
			snooze: false,
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});

	// create todo and send back all todos after creation
	app.put('/api/update', function(req, res) {
		console.log(req.body);
		// update the todo a todo, information comes from AJAX request from Angular
		Todo.findByIdAndUpdate(
			req.body._id, {
				text : req.body.text,
				completed : req.body.completed,
				snooze : req.body.snooze
		}, function(err, todo) {
			if (err)
				res.send(err);
			else 
				res.json({"success":true});
		});
		
	});


	// delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });
    });
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
