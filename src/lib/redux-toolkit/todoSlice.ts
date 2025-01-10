import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToDo } from "../../models/ToDo";

const initial: ToDo[] = [];

export const todoSlice = createSlice({
    name: "todo",
    initialState: initial,
    reducers: {
        setTodo: (state: ToDo[], action: PayloadAction<ToDo[]>) => {
            state = action.payload;
            return state;
        },
        addTodo: (
            state,
            action: PayloadAction<{
                id: number;
                todo: string;
                completed: boolean;
                userId: number;
            }>
        ) => {
            state = [action.payload, ...state];
            return state;
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            return state.filter((todo) => todo.id !== action.payload);
        },
        updateTodo: (state, action: PayloadAction<ToDo>) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index] = action.payload;
        },
    },
});

export const todoActions = todoSlice.actions;
