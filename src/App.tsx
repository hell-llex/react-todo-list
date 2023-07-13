import './App.scss';
import ControlsBar from './components/ControlsBar/ControlsBar';
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <div className="wrapper">
      <ControlsBar />
      <TodoList />
    </div>
  );
}

export default App;
