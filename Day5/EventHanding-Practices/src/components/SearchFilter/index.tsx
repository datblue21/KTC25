import { useState } from 'react';

const items = ["Apple", "Banana", "Orange", "Grapes", "Pineapple", "Strawberry", "Blueberry", "Mango", "Peach", "Watermelon"];

const SearchFilter = () => {
  const [search, setSearch] = useState("");
  const filtered = items.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input
        placeholder="Search fruits..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc'}}
      />
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px', display: 'grid',gridTemplateColumns: '1fr 1fr',gap: '10px',}}>
        {filtered.length > 0 ? (
          filtered.map(item => <li key={item}>{item}</li>)
        ) : (
          <li>No results found.</li>
        )}
      </ul>
    </div>
  );
};

export default SearchFilter;
