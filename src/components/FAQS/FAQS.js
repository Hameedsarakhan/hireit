import React, { useState } from 'react';

import Divs from '../Divs/Divs';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
function faqs() {
 
  return (
    <div className="faqs">
        <Navbar/>
        <div className="text-center">
  <h1 className="animate-heading mt-5 mb-5">
    FREQUENTLY ASKED<span className="text-danger"> QUESTIONS !!</span>
  </h1>
</div>


        <h1></h1>

<Divs/>
<Footer/>
    </div>
  );
}

export default faqs;
