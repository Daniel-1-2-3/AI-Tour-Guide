import { Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import InformationPg from './pages/informationPg';
import CameraPg from './pages/cameraPg';

function App() {
  const [photo, setPhoto] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<CameraPg setPhoto={setPhoto}/>} />
      <Route path="/info" element={<InformationPg photo={photo}/>} />
    </Routes>
  );
}

export default App;
