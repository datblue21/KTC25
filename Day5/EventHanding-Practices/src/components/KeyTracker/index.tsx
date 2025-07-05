import React, { useState } from 'react';

const KeyTracker = () => {
  const [lastKey, setLastKey] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKey(event.key);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Nhấn một phím bất kỳ..."
        onKeyDown={handleKeyDown}
        style={{ padding: '8px', width: '250px' }}
      />
      <p style={{ marginTop: '10px' }}>
        Phím cuối cùng: <strong>{lastKey || 'Chưa có'}</strong>
      </p>
    </div>
  );
};

export default KeyTracker;
