// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </div>
  );
};

export default App;
