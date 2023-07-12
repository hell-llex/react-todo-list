import { createSlice } from '@reduxjs/toolkit';
import { ITodoItem, ITodoList } from '../../types';

const initialState: ITodoList = {
  items: [
    { id: 1, title: 'Add', text: 'Add UI/UX', done: false, rating: 1 },
    { id: 2, title: 'Add', text: 'Add Components', done: false, rating: 1 },
    { id: 3, title: 'Add', text: 'Add Redux', done: true, rating: 1 },
  ],
};

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodoItem(state, action: { payload: ITodoItem; type: string }) {
      console.log('item :>> ', action.payload);
      state.items.unshift(action.payload);
    },
    removeTodoItem(state, action: { payload: ITodoItem; type: string }) {
      console.log('item :>> ', action.payload);
    },
  },
});

export const todoListReducer = todoListSlice.reducer;
export const { addTodoItem, removeTodoItem } = todoListSlice.actions;
