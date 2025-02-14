import React from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import Button from './components/Button.jsx';

function App() {
  const handleClick = () => {
    alert('Button Clicked!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Tailwind CSS + Catalyst</h1>
      <Button onClick={handleClick}>Click Me</Button>
    </div>
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
