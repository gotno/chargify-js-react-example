import React, { forwardRef } from 'react';

const ChargifyForm = forwardRef(({ handleSubmit, token, type }, ref) => (
  <form onSubmit={handleSubmit} ref={ref}>
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
));

export default ChargifyForm;
