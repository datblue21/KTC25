import React from 'react';

type Props = {
  stars?: number;
};

const ratingLabels = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Rất tốt'];

export default function StarRating({ stars = 0 }: Props) {
  const [rating, setRating] = React.useState<number>(stars);

  const handleClick = (value: number) => {
    // Nếu nhấn lại Sao đang chọn => bỏ chọn
    setRating(prev => (prev === value ? 0 : value));
  };

  return (
    <div className="rating-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div className="stars" style={{ display: 'flex' }}>
        {[1, 2, 3, 4, 5].map((item) => (
          <span
            key={item}
            style={{ cursor: 'pointer', color: rating >= item ? 'orange' : 'gray', fontSize: '20px' }}
            onClick={() => handleClick(item)}
          >
            ★
          </span>
        ))}
      </div>
      {rating > 0 && (
        <span className="label" style={{ backgroundColor: '#4caf50', padding: '2px 8px', color: 'white', borderRadius: '5px' }}>
          {ratingLabels[rating - 1]}
        </span>
      )}
    </div>
  );
}
