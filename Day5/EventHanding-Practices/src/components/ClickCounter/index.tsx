import { useState } from 'react';
import './ClickCounter.module.css';


const ClickCounter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
  };  

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button onClick={handleClick}>Click Me!</button>
      <p>Clicked : {count} times</p>
    </div>
  );
}

export default ClickCounter;