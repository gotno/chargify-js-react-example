import React, { useState } from 'react';
import './App.css';
import ChargifyForm from './components/ChargifyForm';

const App = () => {
  const [paymentType, setPaymentType] = useState('card');
  const [extraInput, setExtraInput] = useState('');
  const [token, setToken] = useState('');

  const handlePaymentTypeChange = ({ target }) => {
    setPaymentType(target.value);
  };

  const handleInputChange = ({ target }) => {
    setExtraInput(target.value);
  };

  console.log('APP RENDER');

  return (
    <div className="App">
      <p>
        <select onChange={handlePaymentTypeChange}>
          <option value="card">Credit Card</option>
          <option value="bank">Bank Account</option>
        </select>
      </p>
      <label htmlFor="extra">
        extra input: <input name="extra" id="extra" value={extraInput} onChange={handleInputChange}/>
      </label>
      <ChargifyForm type={paymentType} token={token} setToken={setToken} />
    </div>
  );
}

export default App;
