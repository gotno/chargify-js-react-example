import React, { useState, useEffect } from 'react';

const initialize = (paymentType) => {
  const chargify = new window.Chargify();

  chargify.load({
    // selector where the iframe will be included in the host's HTML (i.e. '#chargify-form')
    // optional if you have a `selector` on each and every field
    selector: '#chargify-form',

    // (i.e. '1a2cdsdn3lkn54lnlkn')
    publicKey: 'chjs_ts98csq6t5c5s9mywfcsytkb',

    // form type (possible values: 'card' or 'bank')
    type: paymentType || 'card',

    // points to your Chargify site
    serverHost: 'https://billing-portal.chargify.test'
  });

  return chargify;
}

const ChargifyForm = ({ paymentType }) => {
  const chargifyForm = React.createRef();
  const [token, setToken] = useState('');
  let chargify = null;

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
  }

  // https://stackoverflow.com/questions/58140009/how-to-use-variable-declared-in-useeffect-in-another-function
  useEffect(
    () => {
      chargify = initialize(paymentType);
      return undefined;
    }, []);

  // https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks
  useEffect(
    () => {
      chargify.load({type: paymentType});
      setToken('');

      return () => {
        chargify.unload();
      };
    }, [chargify, paymentType]);

  return (
    <form onSubmit={handleSubmit} ref={chargifyForm}>
      <div id="chargify-form"></div>

      <label>
        Hidden Token: <input id="host-token" disabled value={token}/>
      </label>
      <p>
        <button type="submit">Submit Host Form</button>
      </p>
    </form>
  );
}

export default ChargifyForm;
