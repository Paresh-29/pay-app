import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white py-4 px-6 md:px-8 flex items-center justify-between">
        <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          Payment App
        </div>
        <nav className="flex space-x-4">
          <div className="flex">
            <div className="signin-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors cursor-pointer" onClick={() => navigate('/signin')}>
              Sign In
            </div>
            <div
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors cursor-pointer ml-2" // Added ml-2 class for margin-left
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-1 py-12 px-6 md:px-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Streamline Your Payments with Our App</h1>
        <p className="text-gray-600 mb-8">
          Our payment app makes it easy to manage your finances and securely process transactions. Get started today and
          take control of your money.
        </p>
        <div
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium cursor-pointer transition-colors"
          onClick={() => navigate('/getstarted')}
        >
          Get Started
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-4 px-6 md:px-8 text-center">
        <p>&copy; 2023 Payment App. All rights reserved.</p>
      </footer>
    </div>
  );
}
