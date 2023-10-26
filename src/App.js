import React from 'react';
import './App.css';
import Main from "./components/Main/Main";

function App() {
  useEffect(() => {
    document.title = 'Whatsapp Broadcaster';
  }, []);

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
