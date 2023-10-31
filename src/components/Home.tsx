import React from 'react';

const Home = () => {
  return (

    <div className="container">
        <a href="am.tsx" className="btn disabled:animate-none lowercase">am entry</a>
        <a href="pm.html" className="group w-30 m-2 btn disabled:animate-none lowercase">pm entry</a>
        <a href="freewrite.html" className="group w-30 m-2 btn disabled:animate-none lowercase">freewrite</a>
        <a href="view_entries.html" className="group w-30 m-2 btn disabled:animate-none lowercase">view entries</a>
    </div>
    

  );
};

export default Home;
