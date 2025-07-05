import { useState } from 'react';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false); // false = OFF

  const toggleState = () => {
    setIsOn(prev => !prev);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button onClick={toggleState}>
        {isOn ? 'Turn OFF' : 'Turn ON'}
      </button>
      <p>State: {isOn ? 'ON' : 'OFF'}</p>
    </div>
  );
};

export default ToggleButton;
