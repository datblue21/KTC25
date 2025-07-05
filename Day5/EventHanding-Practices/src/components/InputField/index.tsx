import React from 'react';


export default function InputField() {
  const [text, setText] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div  className="input-field-container">
        <div className="input-row">
          <p>Type Something :</p>
          <input
            value={text}
            onChange={handleChange}
            placeholder=""
          />
        </div>
      <p className="result-text">You typed: {text || 'nothing'}</p>
    </div>
  );
}   