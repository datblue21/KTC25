import { useState } from 'react';

const HoverBox = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: isHovered ? 'yellow' : 'white',
        padding: '20px',
        border: '1px solid #ccc',
        width: '200px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
         marginTop: '20px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Hover me!
    </div>
  );
};

export default HoverBox;
