import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import ChargifyForm from './components/ChargifyForm';

const App = () => {
  const [paymentType, setPaymentType] = useState('card');
  const [extraInput, setExtraInput] = useState('');
  const [token, setToken] = useState('');

  const chargify = new window.Chargify();
  const chargifyForm = useRef(null);

  useEffect(() => {
    const baseConfig = {
      // (i.e. '1a2cdsdn3lkn54lnlkn')
      publicKey: 'chjs_tnsdj44n87rf7kkvdbm46q9w',
      // form type (possible values: 'card' or 'bank')
      type: paymentType || 'card',
      // points to your Chargify site
      serverHost: 'https://cyberpolicy-sandbox.chargify.com'
    }

    if (paymentType === 'bank') {
      chargify.load({
        ...baseConfig,
        // selector where the iframe will be included in the host's HTML (i.e. '#chargify-form')
        // optional if you have a `selector` on each and every field
        selector: "#chargify-form",
      })
    } else {
      chargify.load({
        ...baseConfig,
        fields: {
          number: { selector: '#chargify-number' },
          month: { selector: '#chargify-month' },
          year: { selector: '#chargify-year' },
          cvv: { selector: '#chargify-cvv' },
        },
      })
    }

    return () => chargify.unload();
  }, [paymentType]);

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleInputChange = ({ target }) => {
    setExtraInput(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    chargify.token(
      chargifyForm.current,

      (token) => {
        console.log('{host} token SUCCESS - token: ', token);
        setToken(token);
      },

      (error) => {
        console.log('{host} token ERROR - err: ', error);
      }
    );
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
      <ChargifyForm type={paymentType} handleSubmit={handleSubmit} ref={chargifyForm} token={token} />
    </div>
  );
}

export default App;
