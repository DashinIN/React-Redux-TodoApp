import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";


export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
            if (!response.ok) {
                throw new Error("server error");
            }
            const todos = await response.json();
            return todos;

        } catch(error) {
            return rejectWithValue(error.message);
        }
       
    }  
);


const setError = (state, action) => {
    state.status="rejected";
    state.error=action.payload;
}

export const deleteTodoAsync = createAsyncThunk(
    "todos/deleteTodoAsync",
    async (id, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            });
            console.log(response);
            if (!response.ok) {
                throw new Error("can't delete");
            }

            dispatch(deleteTodo({id}));

        } catch(error) {
            console.log(error.message);
            return rejectWithValue(error.message);
           
        }
    }
);

export const toggleCompleteAsync = createAsyncThunk(
    "todos/toggleCompleteAsync",
    async (id, {rejectWithValue, dispatch, getState}) => {

        const todo = getState().todos.todos.find(todo => todo.id === id);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error("can't toggle");
            }

            dispatch(toggleComplete({id}))

        } catch(error) {
            
            return rejectWithValue(error.message);
           
        }
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async function(text, {rejectWithValue, dispatch}) {
        try {
            const todo = {
                title: text,
                userID: 1,
                completed: false,
            };
            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            });

            if(!response.ok) {
                throw new Error('cant add');
            }
            const data = await response.json();
            dispatch(addTodo(data))
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        status: null,
        error: null,
},
    reducers: {
        addTodo(state, action)  {
            
            state.todos.push(action.payload);
        },
        toggleComplete(state, action)  {
            const toggledTodo = state.todos.find(
                (todo) => todo.id === action.payload.id
            );
            toggledTodo.completed = !toggledTodo.completed;
        },
        deleteTodo(state, action)  {
           state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        }
    },
    extraReducers: {
        [getTodosAsync.pending]: (state, action) => {
            state.status="loading";
            state.error=null;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.status="resolved";
            state.todos=action.payload;
            
        },
        [getTodosAsync.rejected]: setError,
        [deleteTodoAsync.rejected]: setError,
        [toggleCompleteAsync.rejected]: setError,
       
    },
});

export const {
    addTodo, 
    toggleComplete,
    deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;