import React, { useState } from 'react';

const SubmissionAlert = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (inputValue.trim() === '') return;

    alert(`Bạn đã gửi: ${inputValue}`);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Nhập nội dung..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ padding: '8px', width: '200px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>
        Gửi
      </button>
    </form>
  );
};

export default SubmissionAlert;
