import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todoListReducer } from './slice/todolist';

const rootReducer = combineReducers({
  todoList: todoListReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
