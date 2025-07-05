import  { useState } from 'react';

const items = ["Apple", "Banana", "Orange", "Grapes", "Pineapple"];

const FruitSelector = () => {
  const [selected, setSelected] = useState(items[0]);

  return (
    <div style={{ marginTop: '20px' }}>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        {items.map(fruit => (
          <option key={fruit} value={fruit}>{fruit}</option>
        ))}
      </select>
      <div style={{ marginTop: '10px' }}>
        Selected fruit: {selected}
      </div>
    </div>
  );
};

export default FruitSelector;
