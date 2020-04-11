import React from 'react';
import ReactDOM from 'react-dom';

function AboutPage() {
  const createUser = async () => {
  }

  return (
    <div>
      <p onClick={
        fetch('https://care37.herokuapp.com/', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }) }>About</p>
    </div >
  );

}

export default AboutPage;
