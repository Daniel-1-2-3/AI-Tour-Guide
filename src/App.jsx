import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CameraPg from './pages/cameraPg';
import InformationPg from './pages/informationPg';

function App() {
  const [photo, setPhoto] = useState(null);
  const [OPENAI_API_KEY, setOPENAI_API_KEY] = useState(null);
  useEffect(() => {
    const fetchKey = async () => {
      //get the openai key from pythonanywhere api
      const response = await fetch('https://daneel.pythonanywhere.com/api', {method: 'POST'});        
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }          
      const data = await response.json();
      setOPENAI_API_KEY(data.api_key)
    }
    fetchKey()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<CameraPg setPhoto={setPhoto} />} />
      {OPENAI_API_KEY && <Route path="/info" element={<InformationPg photo={photo} apiKey={OPENAI_API_KEY} />} />}
    </Routes>
  );
}

export default App;
