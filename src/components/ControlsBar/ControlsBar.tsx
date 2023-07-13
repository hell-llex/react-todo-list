import './ControlsBar.scss';
import CreateTodoItem from '../CreateTodoItem/CreateTodoItem';
import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { sortedTodoList } from '../../store/slice/todolist';

const ControlsBar = () => {
  const todosList = useAppSelector((state) => state.todoList.items);
  const dispatch = useAppDispatch();
  const sortTodos = (item: string) => dispatch(sortedTodoList(item));

  return (
    <div className="controls-bar">
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
          defaultValue="all"
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
    </div>
  );
};

export default ControlsBar;
