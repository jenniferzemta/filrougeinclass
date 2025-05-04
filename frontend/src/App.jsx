import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
//import Etudiants from './pages/Etudash';
import Sidebar from './components/layouts/Sidebar';
import Dashboard from './pages/dashboardAdmin/Dashboard';
import Test from './pages/Test';
import Contact from './pages/public/Contact';
import About from './pages/public/About';
import Home from './pages/public/Home';
import HomePage from './pages/public/HomePage';
import Services from './pages/public/Services';
import Radash from './pages/Radash';
import EmploiDuTemps from './pages/RaDashboard';
import RSDash from './dashboard/responsable-stage/Rsdash';
import Etudash from './pages/Etudash';
import Enseignantdash from './pages/Enseignantdash';
import ForgotPassword from './pages/auth/forgot-password';
import ResetPassword from './pages/auth/ResetPassword';
// import RaDashboard from './pages/RaDashboard';


   

function App() {
  return (


    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element = {<ForgotPassword/>} />
          <Route path="/reset-password" element = {<ResetPassword/>} />
          {/* <Route path="/etudiants" element = {<Etudiants/>} /> */}
          <Route path="/dashboard" element = {<Dashboard/>} />
          <Route path="/rsdash" element={<RSDash/>} />
          <Route path="/test" element = {<Test/>} />
          <Route path="/contact" element = {<Contact/>} />
          <Route path="/about" element = {<About/>} />
          <Route path="/" element = {<Home/>} />
          <Route path="/home" element = {<Home/>} />
          <Route path="/services" element = {<Services/>} />
          <Route path='/radash' element={<Radash /> }/>
          <Route path='/etudash' element={<Etudash /> }/> 
          <Route path='/enseignant' element={<Enseignantdash/>}/>
        </Routes>
      
    </Router>
  
  );
}

export default App;