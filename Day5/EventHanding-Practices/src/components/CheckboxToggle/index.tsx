import { useState } from 'react';

const CheckboxToggle = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
        Toggle me
      </label>
      <p style={{marginTop : '10px'}}>Checkbox is: {checked ? 'Checked' : 'Unchecked'}</p>
    </div>
  );
};

export default CheckboxToggle;
