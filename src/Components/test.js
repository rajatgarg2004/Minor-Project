import React, { useState } from 'react';

function App() {
  const [rows, setRows] = useState([
    { id: 1, name: '', age: '' },
    { id: 2, name: '', age: '' },
    { id: 3, name: '', age: '' },
  ]);

  const handleInputChange = (id, key, value) => {
    // Find the row with the given ID and update the specified key
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [key]: value } : row
      )
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) =>
                    handleInputChange(row.id, 'name', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.age}
                  onChange={(e) =>
                    handleInputChange(row.id, 'age', e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(rows, null, 2)}</pre>
    </div>
  );
}

export default App;
