import React, { useState } from 'react';

const App = () => {
  const [values, setValues] = useState(Array.from({ length: 5 }, () => 0));
  const [ascending, setAscending] = useState(true);

  const handleAdd = (index) => {
    const newValues = [...values];
    newValues[index] += 1;
    setValues(newValues);
  };

  const handleSort = () => {
    const sortedValues = [...values].sort((a, b) => ascending ? a - b : b - a);
    setValues(sortedValues);
    setAscending(!ascending); // Toggling the sorting order
  };

  return (
    <div style={{ margin: '200px' }}>
      <button style={{ marginLeft: '80px', marginBottom: '10px' }} onClick={handleSort}>
        SORT {ascending ? 'Ascending' : 'Descending'}
      </button>
      {values.map((value, index) => (
        <div key={index} style={{ display: 'flex', marginBottom: '20px' }}>
          <p style={{ marginRight: '20px' }}>value: {value}</p>
          <p style={{ marginRight: '20px' }}>place: {index + 1}</p>
          <button onClick={() => handleAdd(index)}>ADD</button>
        </div>
      ))}
    </div>
  );
};

export default App;
