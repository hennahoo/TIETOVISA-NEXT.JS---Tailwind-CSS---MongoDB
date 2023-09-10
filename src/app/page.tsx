import React from 'react';
import Link from 'next/link'; // Import the Link component

import Header from '../components/Header';

function Home() {
  return (
    <div>
      <Header />
      <p>Tervetuloa Next.js 13 -seikkailuun! Tämä on ensimmäinen sivumme.</p>
      <p>Siirry seuraavaksi <Link href="/about">tietoa</Link>-sivulle.</p>
    </div>
  );
}

export default Home;
