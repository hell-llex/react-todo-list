import './TodoItem.scss';
import { useState } from 'react';
import { ITodoItem } from '../../types';
import {
  doneTodoItem,
  editTodoItem,
  removeTodoItem,
} from '../../store/slice/todolist';
import { useAppDispatch } from '../../hooks/redux';
import {
  Button,
  Checkbox,
  Input,
  Rate,
  Space,
  Tooltip,
  Typography,
} from 'antd';
const { Text } = Typography;
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';

const TodoItem = ({ itemInfo }: { itemInfo: ITodoItem }) => {
  const [todoItem] = useState(itemInfo);
  const [checked, setChecked] = useState(todoItem.done);
  const [onEditingTodo, setOnEditingTodo] = useState(false);
  const [title, setTitle] = useState(todoItem.title);
  const [text, setText] = useState(todoItem.text);
  const [rating, setRating] = useState(todoItem.rating);
  const [ellipsis, setEllipsis] = useState(true);

  const dispatch = useAppDispatch();
  const doneTodo = (item: ITodoItem) => dispatch(doneTodoItem(item));
  const editTodo = (item: ITodoItem) => dispatch(editTodoItem(item));
  const removeTodo = (item: ITodoItem) => dispatch(removeTodoItem(item));

  const onChangeDone = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    const doneItem = Object.assign({}, todoItem);
    doneItem.done = e.target.checked;
    doneTodo(doneItem);
  };

  const editingTodo = (save: boolean) => {
    if (save) {
      editTodo({
        title: title,
        text: text,
        rating: rating,
        id: itemInfo.id,
        done: checked,
        date: new Date().toISOString(),
        visible: true,
      });
    } else {
      setTitle(itemInfo.title);
      setText(itemInfo.text);
      setRating(itemInfo.rating);
    }
    setOnEditingTodo(!onEditingTodo);
  };

  const removeItem = () => {
    removeTodo(itemInfo);
  };

  return (
    <>
      <li className="container-todo">
        <div
          className={`todo-item ${checked ? 'active' : ''} ${
            onEditingTodo ? 'editing' : ''
          }`}
        >
          <Checkbox
            style={{ transform: 'scale(1.3)' }}
            checked={checked}
            onChange={onChangeDone}
          />
          <div className="container-text">
            {onEditingTodo ? (
              <>
                <Input
                  className="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  bordered={false}
                  maxLength={60}
                />
                <TextArea
                  className="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  bordered={false}
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  maxLength={600}
                />
              </>
            ) : (
              <>
                <Title
                  className="title"
                  delete={checked ? true : false}
                  level={3}
                >
                  {title}
                </Title>
                <Paragraph
                  copyable
                  className="text"
                  delete={checked ? true : false}
                  ellipsis={ellipsis ? { rows: 2 } : undefined}
                  onClick={() => setEllipsis(!ellipsis)}
                >
                  {text}
                </Paragraph>
              </>
            )}
          </div>
          <div className="container-btn">
            {onEditingTodo ? (
              <Space wrap>
                <Button onClick={() => editingTodo(false)}>Cancel</Button>
                <Button type="primary" onClick={() => editingTodo(true)}>
                  Save
                </Button>
              </Space>
            ) : (
              <Space wrap>
                <Tooltip title="Edit">
                  <Button
                    type={onEditingTodo ? 'primary' : 'dashed'}
                    icon={<EditFilled />}
                    onClick={() => setOnEditingTodo(true)}
                  />
                </Tooltip>
                <Tooltip title="Remove">
                  <Button
                    icon={<DeleteFilled />}
                    onClick={removeItem}
                  />
                </Tooltip>
              </Space>
            )}
            <Rate
              disabled={onEditingTodo ? false : true}
              value={rating}
              onChange={(e) => setRating(e)}
              character={
                <ExclamationCircleFilled style={{ fontSize: '2.2rem' }} />
              }
            />
            <Text className="time">
              {new Date(itemInfo.date).toLocaleDateString('ru-RU', {
                hour: 'numeric',
                minute: 'numeric',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                weekday: 'short',
              })}
            </Text>
          </div>
        </div>
        <div
          className={`modal-wrap ${onEditingTodo ? 'active' : ''}`}
          onClick={() => editingTodo(false)}
        ></div>
      </li>
    </>
  );
};

export default TodoItem;
