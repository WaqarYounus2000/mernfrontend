import './App.css';
import Register from './components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login"
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import MyHome from "./components/MyHome"
import Forgotpass from "./components/Forgotpassword"
import Resetpass from "./components/Resetpassword"
import EmailVerifcationCom from "./components/EmailVerifcation"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="/forgetpassword" element={<Forgotpass />} />
          <Route exact path="/resetpassword/:id/:token" element={<Resetpass />} />   /*sending params in this method when reset password url is open*/
          <Route exact path="/emailverification/:id/:token" element={<EmailVerifcationCom />} />


          <Route element={<ProtectedRoutes />} >
            <Route path="/home" element={<MyHome />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
