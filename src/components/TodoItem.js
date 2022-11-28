import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoAsync, toggleCompleteAsync } from '../redux/todoSlice';
import s from "./TodoItem.module.scss"



const TodoItem = ({ id, title, completed }) => {
	
	const dispatch = useDispatch();

	return (
		<li className={s.item}>
			
				<div className={`${s.item__content} ${completed && s.done}`} >
					<input type='checkbox' className={s.check} checked={completed}
					onChange={() => dispatch(toggleCompleteAsync(id))}></input>
					<div className={s.title}>{title}</div>

					
				</div>
				<button className={s.btn}  onClick={ () => dispatch(deleteTodoAsync(id)) } >Delete</button>
			
		</li>
	);
};

export default TodoItem;
