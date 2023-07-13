import './TodoList.scss';
import { useAppSelector } from '../../hooks/redux';
import TodoItem from '../TodoItem/TodoItem';
import Paragraph from 'antd/es/typography/Paragraph';

function TodoList() {
  const todosList = useAppSelector((state) => state.todoList.items);
  return (
    <>
      {todosList.length !== 0 &&
      todosList.filter((elem) => elem.visible).length !== 0 ? (
        <ul className="todo-list">
          {todosList.map((item) => {
            if (item.visible) return <TodoItem key={item.id} itemInfo={item} />;
            else '-';
          })}
        </ul>
      ) : (
        <div className="todo-list">
          <Paragraph className="blank-slate">
            There are no tasks <br /> (ಥ﹏ಥ)
          </Paragraph>
        </div>
      )}
    </>
  );
}

export default TodoList;
