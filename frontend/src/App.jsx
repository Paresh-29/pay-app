import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import useGetUser from './components/hooks/useGetUser';

function App() {
  const { verify, user } = useGetUser();

  if (verify === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to Dashboard if user is logged in, else redirect to Sign In */}
        {verify && user ? <Route path='/' element={<Navigate to="/dashboard" />} /> : <Route path='/' element={<Navigate to="/signin" />} />}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/send' element = {<SendMoney />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
