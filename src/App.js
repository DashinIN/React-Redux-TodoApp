import React from 'react';
import "./app.scss"
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TotalCompleteItems from './components/TotalCompleteItems';
import { useSelector } from 'react-redux';

const App = () => {

	const {status, error} = useSelector(state => state.todos);

	React.useEffect(() => {
		if (status === "loading") {
			document.body.style.cursor="wait";
		}
		else document.body.style.cursor="auto";
	}, [status]

	);


	return (
		<div className="wrapper">
			<h1>My Todo List</h1>
			<AddTodoForm />
			{error && <h2>Ошибка {error}</h2>}
			
			<TodoList />
			<TotalCompleteItems />
		</div>
	);
};

export default App;
