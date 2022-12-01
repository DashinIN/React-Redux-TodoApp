import React from 'react';
import TodoItem from './TodoItem';

import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';


import {
	CSSTransition,
	TransitionGroup,
  } from 'react-transition-group';
import s from "./TodoList.module.scss"

const TodoList = () => {
	
	const dispatch = useDispatch();


	React.useEffect(() => {
		dispatch(getTodosAsync())
	}, [dispatch]);

	const todos = useSelector(state => state.todos.todos);


	return (
		<ul className={s.list__group}>
			<TransitionGroup className="todo-list">
			{todos.map((todo) => (
				<CSSTransition
				key={todo.id}
				timeout={200}
				classNames="item"> 
					<TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
				</CSSTransition>
			))}
			</TransitionGroup>
		</ul>
	);
};		

export default TodoList;
