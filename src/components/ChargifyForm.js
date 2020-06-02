import React, { useEffect, useRef } from 'react';

const ChargifyForm = ({ token, setToken, type }) => {
  const chargify = new window.Chargify();
  const chargifyForm = useRef(null);

  useEffect(() => {
    const baseConfig = {
      // (i.e. '1a2cdsdn3lkn54lnlkn')
      publicKey: 'chjs_tnsdj44n87rf7kkvdbm46q9w',
      // form type (possible values: 'card' or 'bank')
      type: type || 'card',
      // points to your Chargify site
      serverHost: 'https://cyberpolicy-sandbox.chargify.com'
    }

    if (type === 'bank') {
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
  }, [type]);

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

  return (
    <form onSubmit={handleSubmit} ref={chargifyForm}>
      <div id="chargify-form"></div>
      <div id="chargify-number"></div>
      <div id="chargify-month"></div>
      <div id="chargify-year"></div>
      <div id="chargify-cvv"></div>
      <label>
        Hidden Token: <input id="host-token" disabled value={token}/>
      </label>
      <p>
        <button type="submit">Submit Host Form</button>
      </p>
    </form>
  );
};

export default ChargifyForm;
