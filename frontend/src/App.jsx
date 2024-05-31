
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import Home  from './pages/Home';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

