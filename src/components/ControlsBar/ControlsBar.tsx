import './ControlsBar.scss';
import CreateTodoItem from '../CreateTodoItem/CreateTodoItem';
import { Button, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { sortedTodoList } from '../../store/slice/todolist';
import { useState } from 'react';

const ControlsBar = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const todosList = useAppSelector((state) => state.todoList.items);
  const dispatch = useAppDispatch();
  const sortTodos = (item: string) => dispatch(sortedTodoList(item));
  const visibleItem = useAppSelector((state) => state.todoList.sorted.visible);

  return (
    <div className={`controls-bar ${visibleMenu ? '' : 'active'}`}>
      <CreateTodoItem />
      <div className="container-sort">
        <Select
          placeholder="None"
          style={{ width: 140 }}
          onChange={sortTodos}
          options={[
            {
              value: 'rating-highest',
              label: 'Rating↑',
            },
            {
              value: 'rating-lowest',
              label: 'Rating↓',
            },
            { value: 'date-highest', label: 'Date↑' },
            { value: 'date-lowest', label: 'Date↓' },
          ]}
        />
        <Select
          value={
            visibleItem.length !== 0 ? visibleItem : `All / ${todosList.length}`
          }
          style={{ width: 140 }}
          onChange={sortTodos}
          options={[
            { value: 'all', label: `All / ${todosList.length}` },
            {
              value: 'complete',
              label: `Complete / ${
                todosList.filter((elem) => elem.done).length
              }`,
            },
            {
              value: 'incomplete',
              label: `Incomplete / ${
                todosList.filter((elem) => !elem.done).length
              }`,
            },
          ]}
        />
      </div>
      <Button
        type="primary"
        block
        className="menu-btn"
        onClick={() => setVisibleMenu(!visibleMenu)}
      >
        {visibleMenu ? 'Close Menu' : 'Open Menu'}
      </Button>
    </div>
  );
};

export default ControlsBar;
