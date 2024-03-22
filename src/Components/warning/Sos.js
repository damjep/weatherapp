import React, { useState } from 'react'; // Import React and useState
import styles from './sos.css';

const Sos = () => { 
  const [searchQuery, setSearchQuery] = useState(''); 

  return (
    <>
      <div className="sos">
        <h1 className="get-help">Get Help</h1>
        <input
          type="text"
          id="sosInput"
          placeholder="Write your message here or send SOS"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>SOS</button>
        <button>Send Message</button>
      </div>
    </>
  );
};

export default Sos; 


