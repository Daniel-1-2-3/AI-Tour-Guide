import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'
import InformationPg from './pages/informationPg';
import CameraPg from './pages/cameraPg';
import NavBar from './components/NavBar';

function App() {
  const [photo, setPhoto] = useState(null);
  let OPENAI_API_KEY = useRef(null);
  useEffect(() => {
    const fetchKey = async () => {
      //get the openai key
      const response = await fetch('https://daneel.pythonanywhere.com/api', {method: 'POST'});        
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }          
      const data = await response.json();
      OPENAI_API_KEY.current = data.api_key;
    }
    fetchKey()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<CameraPg setPhoto={setPhoto} />} />
      <Route path="/info" element={<InformationPg photo={photo} apiKey={OPENAI_API_KEY.current} />} />
    </Routes>
  );
}

export default App;
