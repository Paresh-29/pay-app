import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { SendMoney } from './pages/SendMoney';
import { Dashboard } from './pages/Dashboard';
import useGetUser from './components/hooks/useGetUser';

function App() {
const {user, verify} = useGetUser();


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {verify === true ? (
          <>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/send' element={<SendMoney />}/>
          </>
        ): (<Navigate to= "/signin"/>)
      }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
