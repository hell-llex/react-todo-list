import { createSlice } from '@reduxjs/toolkit';
import { ITodoItem } from '../../types';

const initialState: {
  items: ITodoItem[];
  sorted: {
    sorting: string;
    visible: string;
  };
} = {
  items: [
    {
      id: '1',
      title: 'Add',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sed laborum voluptas aspernatur optio aliquid ullam ut commodi repellendus nostrum natus recusandae hic, sapiente omnis! Voluptatum corrupti labore molestiae voluptate.',
      done: false,
      rating: 2,
      date: new Date().toISOString(),
      visible: true,
    },
    {
      id: '2',
      title: 'Add',
      text: 'Add Components Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sed laborum voluptas aspernatur optio aliquid ullam ut commodi repellendus nostrum natus recusandae hic, sapiente omnis! Voluptatum corrupti labore molestiae voluptate.',
      done: false,
      rating: 4,
      date: new Date().toISOString(),
      visible: true,
    },
    {
      id: '3',
      title: 'Add',
      text: 'Add Redux Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sed laborum voluptas aspernatur optio aliquid ullam ut commodi repellendus nostrum natus recusandae hic, sapiente omnis! Voluptatum corrupti labore molestiae voluptate.',
      done: true,
      rating: 3,
      date: new Date().toISOString(),
      visible: true,
    },
  ],
  sorted: {
    sorting: '',
    visible: '',
  },
};
const mySort = (array: ITodoItem[], payload: string) => {
  const sortTodolist = array.slice();
  if (payload === 'rating-highest')
    sortTodolist.sort((a, b) => b.rating - a.rating);
  if (payload === 'rating-lowest')
    sortTodolist.sort((a, b) => a.rating - b.rating);
  if (payload === 'date-highest')
    sortTodolist.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  if (payload === 'date-lowest')
    sortTodolist.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  if (payload === 'all') sortTodolist.forEach((elem) => (elem.visible = true));
  if (payload === 'complete')
    sortTodolist.forEach((elem) => {
      if (elem.done) elem.visible = true;
      else elem.visible = false;
    });
  if (payload === 'incomplete')
    sortTodolist.forEach((elem) => {
      if (!elem.done) elem.visible = true;
      else elem.visible = false;
    });
  return sortTodolist;
};

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    sortedTodoList(state, action: { payload: string; type: string }) {
      action.payload === 'all' ||
      action.payload === 'complete' ||
      action.payload === 'incomplete'
        ? (state.sorted.visible = action.payload)
        : (state.sorted.sorting = action.payload);
      state.items = mySort(state.items, action.payload);
    },
    doneTodoItem(state, action: { payload: ITodoItem; type: string }) {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.items = mySort(state.items, state.sorted.visible);
    },
    addTodoItem(state, action: { payload: ITodoItem; type: string }) {
      state.items.unshift(action.payload);
      state.items = mySort(state.items, state.sorted.sorting);
      state.items = mySort(state.items, state.sorted.visible);
    },
    editTodoItem(state, action: { payload: ITodoItem; type: string }) {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.items = mySort(state.items, state.sorted.sorting);
      state.items = mySort(state.items, state.sorted.visible);
    },
    removeTodoItem(state, action: { payload: ITodoItem; type: string }) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.items = mySort(state.items, state.sorted.sorting);
    },
  },
});

export const todoListReducer = todoListSlice.reducer;
export const {
  addTodoItem,
  removeTodoItem,
  editTodoItem,
  doneTodoItem,
  sortedTodoList,
} = todoListSlice.actions;
