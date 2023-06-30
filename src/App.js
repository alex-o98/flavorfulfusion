import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Meniu from './pages/Meniu';
import Contact from './pages/Contact';
const AuthApi = React.createContext();

function App() {

  const [auth, setAuth] = useState(false);

  return (
    <AuthApi.Provider value={{auth, setAuth}}>
      <Router>            
        <Routes>
            <Route path="/flavorfulfusion/" element={<Home/>}/>          
            <Route path="/flavorfulfusion/menu" element={<Meniu/>}/>
            <Route path="/flavorfulfusion/contact" element={<Contact/>}/>
        </Routes>
      </Router>
    </AuthApi.Provider>
  );
}

export default App;
