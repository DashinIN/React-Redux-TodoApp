import React from 'react';
import "./app.scss"
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TotalCompleteItems from './components/TotalCompleteItems';
import { useSelector } from 'react-redux';

const App = () => {

	const {status, error} = useSelector(state => state.todos);

	return (
		<div className="wrapper">
			<h1>My Todo List</h1>
			<AddTodoForm />
			{status === "loading" && <h2>load</h2>}
			{error && <h2>Ошибка {error}</h2>}
			
			<TodoList />
			<TotalCompleteItems />
		</div>
	);
};

export default App;
