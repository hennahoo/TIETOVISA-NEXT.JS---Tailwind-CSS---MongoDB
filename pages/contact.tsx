import React, { useState } from 'react';

import Header from '../components/Header';

function Contact() {

const [name, setName] = useState('');

const [email, setEmail] = useState('');

const handleSubmit = (e) => {

e.preventDefault();

alert(`Lähetetty: Nimi - ${name}, Sähköposti - ${email}`);

};

return (

<div>

  <Header />

  <h2>Ota Yhteyttä</h2>

  <form onSubmit={handleSubmit}>

  <div>

    <label htmlFor="name">Nimi:</label>

    <input

    type="text"

    id="name"

    value={name}

    onChange={(e) => setName(e.target.value)}

    />

  </div>

  <div>

    <label htmlFor="email">Sähköposti:</label>

    <input

    type="email"

    id="email"

    value={email}

    onChange={(e) => setEmail(e.target.value)}

    />

  </div>

<button type="submit">Lähetä</button>

</form>

</div>

);

}

export default Contact;