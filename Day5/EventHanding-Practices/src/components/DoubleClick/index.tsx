import { useState } from 'react';

const DoubleClick = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleDoubleClick = () => {
    setShowMessage(true);

    // Ẩn thông báo sau 2 giây
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button onDoubleClick={handleDoubleClick} style={{ padding: '10px 20px' }}>
        Double Click Me
      </button>
      {showMessage && (
        <p style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>
          Double-clicked!
        </p>
      )}
    </div>
  );
};

export default DoubleClick;
