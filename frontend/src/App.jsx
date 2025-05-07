import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboardAdmin/Dashboard';
import Contact from './pages/public/Contact';
import About from './pages/public/About';
import Home from './pages/public/Home';
import Services from './pages/public/Services';
import Radash from './pages/Radash';
import RSDash from './dashboard/responsable-stage/Rsdash';
import Etudash from './pages/Etudash';
import Enseignantdash from './pages/Enseignantdash';
import ForgotPassword from './pages/auth/forgot-password';
import ResetPassword from './pages/auth/ResetPassword';
import EtudiantAdmin from './components/admin/EtudiantAdmin';
import ProfesseurAdmin from './components/admin/ProfesseurAdmin';
import RaAdmin from './components/admin/RaAdmin';
import RsAdmin from './components/admin/RsAdmin';

     
function App() {
  return (
     <Router>
        <Routes>
          {/* //connexion */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element = {<ForgotPassword/>} />
          <Route path="/reset-password" element = {<ResetPassword/>} />
          {/* dashboard */}
          {/* admin */}
          <Route path="/dashboard" element = {<Dashboard/>} />
          {/* rs */}
          <Route path="/rsdash" element={<RSDash/>} />
          {/* ra */}
          <Route path='/radash' element={<Radash /> }/>
          {/* etudiant */}
          <Route path='/etudash' element={<Etudash /> }/>
           {/*enseignant  */}
          <Route path='/enseignant' element={<Enseignantdash/>}/>
         {/* public */}
          <Route path="/contact" element = {<Contact/>} />
          <Route path="/about" element = {<About/>} />
          <Route path="/" element = {<Home/>} />
          <Route path="/home" element = {<Home/>} />
          <Route path="/services" element = {<Services/>} />
         
         {/* partie admin */}
         <Route path='/rsadmin' element={<RsAdmin /> }/>
         <Route path='/raadmin' element={<RaAdmin /> }/>
          <Route path='/etudiantadmin' element={<EtudiantAdmin /> }/> 
          <Route path='/professeuradmin' element={<ProfesseurAdmin/>}/>
        </Routes>
        


    
    </Router>
    
  
  );
}

export default App;