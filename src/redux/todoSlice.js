import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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


const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        status: null,
        error: null,
},
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            };
            state.todos.push(newTodo);
        },
        toggleComplete: (state, action) => {
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
       
    },
});

export const {
    addTodo, 
    toggleComplete,
    deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;