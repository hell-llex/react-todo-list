import './CreateTodoItem.scss';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Input, Rate, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { addTodoItem } from '../../store/slice/todolist';
import { ITodoItem } from '../../types';

const CreateTodoItem = () => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const dispatch = useAppDispatch();
  const addTodo = (item: ITodoItem) => dispatch(addTodoItem(item));

  const resetForm = () => {
    setRating(0);
    setTitle('');
    setText('');
  };

  const onFinish = () => {
    const newTodoItem = {
      id: new Date().toISOString(),
      title: title.length > 0 ? title : 'Lorem ipsum dolor.',
      text:
        title.length > 0 || text.length > 0
          ? text
          : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quis, eveniet dolor iure exercitationem sed sunt repudiandae eius voluptas, natus vero aperiam id eum cumque laboriosam excepturi esse sapiente quo.',
      date: new Date().toISOString(),
      rating: rating,
      done: false,
      visible: true,
    };
    addTodo(newTodoItem);
    resetForm();
  };

  return (
    <div className="create-panel">
      <div className="container-input">
        <Input
          placeholder="Title"
          bordered={true}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={60}
        />
        <TextArea
          placeholder="Text"
          autoSize={{ minRows: 2, maxRows: 2 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={600}
        />
      </div>

      <div className="container-btn">
        <Rate
          value={rating}
          onChange={(e) => setRating(e)}
          character={<ExclamationCircleFilled style={{ fontSize: '2.2rem' }} />}
        />
        <Space direction="horizontal">
          <Button type="default" onClick={resetForm}>
            Reset
          </Button>
          <Button type="primary" onClick={onFinish}>
            Save
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default CreateTodoItem;
