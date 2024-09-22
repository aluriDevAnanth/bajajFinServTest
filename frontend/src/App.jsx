import React, { useState } from 'react';
import Select from 'react-select';

const DataProcessor = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch('https://bajajfinservtest-i3wv.onrender.com/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput),
      });

      const data = await res.json();
      setResponse(data);
      setError('');
    } catch (err) {
      console.log(err);
      setError(`Invalid JSON input: ${err}`);
    }
  };

  const handleOptionChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    const displayData = {};
    selectedOptions.forEach(option => {
      displayData[option.label] = response[option.value.toLowerCase()];
    });

    return (
      <div>
        <h3>Response Data:</h3>
        <pre>{JSON.stringify(displayData, null, 2)}</pre>
      </div>
    );
  };

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest alphabet' },
  ];

  return (
    <div className="container-fluid h-100">
      <h1 className="mb-4">Bajaj Finserv Test by AP21110010255, Aluri Dev Ananth.</h1>
      <textarea
        className="  mb-3"
        rows="6"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON: { "data": ["A","C","z"] }'
      />
      <div>
        <button className="btn btn-primary mb-3" onClick={handleSubmit}>Submit</button>
      </div>
      {error && <p className="text-danger">{error}</p>}
      {response && (
        <>
          <label htmlFor="options" className="form-label">Select data to display:</label>
          <Select
            isMulti
            options={options}
            onChange={handleOptionChange}
            placeholder="Select data"
            className="w-100 mb-3"
          />
        </>
      )}
      {renderResponse()}
    </div>
  );
};

export default DataProcessor;
