import Link from 'next/link';
import Navbar from './components/navbar';
import Footer from './components/footer';

function Homepage() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navbar */}
      <Navbar />

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to University Management System!👋</h1>
          <p className="text-lg text-gray-700 mb-8">Embrace the journey of learning, resilience, and growth, where every challenge conquered ignites the spark of greatness within you.</p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Homepage;
