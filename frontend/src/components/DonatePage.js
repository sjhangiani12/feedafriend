import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CreditCardInput from 'react-credit-card-input';

function DonatePage () {

  const [cardNumber, setCardNumber]  = useState(undefined);
  const [expiry, setExpiry] = useState(undefined);
  const [cvc, setCardCVC]  = useState(undefined);

  const root = {
    position: "absolute",
    top: "25%",
    left: "20%",
    width: "60%"
  }

  return (
    <div style={root}>
      <form>
        <label>Name</label> &nbsp; &nbsp; &nbsp;<input type="text" />
        <p />
        <label>Email</label> &nbsp; &nbsp; &nbsp;<input type="email" />
        <p />
        <CreditCardInput
          cardNumberInputProps={{ value: cardNumber, onChange: (event) => setCardNumber(event.target.value) }}
          cardExpiryInputProps={{ value: expiry, onChange: (event) => setExpiry(event.target.value) }}
          cardCVCInputProps={{ value: cvc, onChange: (event) => setCardCVC(event.target.value) }}
          fieldClassName="input"
        />
        <p />
        <label>Zip Code</label>  &nbsp; &nbsp; &nbsp; <input type="text" />
        <p />
        <button type='Submit'>Make a donation!</button>
      </form>
    </div>
  );

}

export default DonatePage;
