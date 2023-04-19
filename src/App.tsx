import React from 'react';
import './app.css';

const items = [
  { name: 'Learn Angular', category: 'wip', bgcolor: 'yellow' },
  { name: 'React', category: 'wip', bgcolor: 'pink' },
  { name: 'Vue', category: 'complete', bgcolor: 'skyblue' },
];

const App = () => {
  const [tasks, setTasks] = React.useState(items);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, id: string) => {
    event.dataTransfer.setData('id', id);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, cat: string) => {
    let id = event.dataTransfer.getData('id');
    let newTasks = tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });

    setTasks((prev) => Array.from(new Set([...prev, ...newTasks])));
  };

  const DragElement = ({ task }: { task: typeof items[number] }) => {
    return (
      <div
        key={task.name}
        onDragStart={(e) => onDragStart(e, task.name)}
        draggable
        className='draggable'
        style={{ backgroundColor: task.bgcolor }}
      >
        {task.name}
      </div>
    );
  };

  return (
    <div className='app'>
      <div
        className='droppable'
        onDragOver={onDragOver}
        onDrop={(e) => {
          onDrop(e, 'wip');
        }}
      >
        <span className='task-header'>In Progress</span>
        <br />
        {tasks
          .filter((t) => t.category === 'wip')
          .map((item) => (
            <DragElement task={item} key={item.name} />
          ))}
      </div>

      <div
        className='droppable'
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, 'complete')}
      >
        <span className='task-header'>Completed</span>
        <br />
        {tasks
          .filter((t) => t.category === 'complete')
          .map((item) => (
            <DragElement task={item} key={item.name} />
          ))}
      </div>
    </div>
  );
};

export default App;
