
// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import { SignIn } from "./pages/SignIn";
// // import { SignUp } from "./pages/SignUp";
// // import { Dashboard } from './pages/Dashboard';
// // import { SendMoney } from './pages/SendMoney';
// // import useGetUser from './components/hooks/useGetUser';

// // function App() {
// //   const { verify, user } = useGetUser();

// //   console.log("Verify:", verify);
// //   console.log("User:", user);

// //   if (verify === undefined) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         {/* Redirect to Dashboard if user is logged in, else redirect to Sign In */}
// //         {verify && user ? <Route path='/' element={<Navigate to="/dashboard" />} /> : <Route path='/' element={<Navigate to="/signin" />} />}
// //         <Route path="/signin" element={<SignIn />} />
// //         <Route path="/signup" element={<SignUp />} />
// //         <Route path='/dashboard' element={<Dashboard />} />
// //         <Route path='/send' element={<SendMoney />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;


// import {
//   BrowserRouter,
//   Route,
//   Routes,
// } from "react-router-dom";
// import { SignUp } from "./pages/Signup";
// import { SignIn } from "./pages/Signin";
// import { Dashboard } from "./pages/Dashboard";
// import { SendMoney } from "./pages/SendMoney";

// function App() {
//   return (
//     <>
//        <BrowserRouter>
//         <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/send" element={<SendMoney />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
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

