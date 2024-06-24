
import { redirect, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';


import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Signature from './Signature';
import SignaturePage from './SignaturePage';


function App() {


  return (

    <div className='w-screen h-screen font-mono '>




      <Routes>
        <Route path='/login' element={< Login />} />
        <Route path='/signup' element={< Register />} />
        <Route path='/sig' element={<Signature />} />
        {/* <Route path='/add-signature' element={<SignaturePage />} /> */}
      </Routes>


      <Home />




    </div>




  )
}

export default App
