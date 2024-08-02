import React, { useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/saga-blue/theme.css';

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
      const res = await fetch('https://backend-q3l2mknnx-aluri-dev-ananths-projects.vercel.app/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput),
      });

      const data = await res.json();
      setResponse(data);
      setError('');
    } catch (err) {
      console.log(err)
      setError(`Invalid JSON input: ${err}`);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOptions(e.value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const displayData = {};
    if (selectedOptions.includes('Alphabets')) {
      displayData.Alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      displayData.Numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest alphabet')) {
      displayData['Highest alphabet'] = response.highest_alphabet;
    }

    return (
      <div>
        <h3>Response Data:</h3>
        <pre>{JSON.stringify(displayData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="container-fluid  h-100  h-100">
      <h1 className="  mb-4">Bajaj Finserv Test by AP21110010255, aluri dev ananth.</h1>
      <textarea className="form-control mb-3" rows="4" value={jsonInput} onChange={handleInputChange} placeholder='Enter JSON: { "data": ["A","C","z"] }' />
      <div>  <button className="btn btn-primary mb-3" onClick={handleSubmit}>     Submit   </button>   </div>
      {error && <p className="text-danger">{error}</p>}
      {response && (
        <>
          <label htmlFor="options" className="form-label">Select data to display:</label>
          <MultiSelect
            value={selectedOptions}
            options={[{ label: 'Alphabets', value: 'Alphabets' }, { label: 'Numbers', value: 'Numbers' }, { label: 'Highest alphabet', value: 'Highest alphabet' }]}
            onChange={handleOptionChange}
            placeholder="Select data"
            display="chip"
            className="w-100 mb-3"
          />
        </>
      )}
      {renderResponse()}
    </div>
  );
};

export default DataProcessor;
