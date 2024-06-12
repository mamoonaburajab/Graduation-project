import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChildProvider } from '../src/assets/useRef/ChildContext'
import routes from './routes/routes';
import './App.css';

function App() {
  return (
    <ChildProvider>
      <Router>
        <div className="App">
          <React.Suspense fallback={<div>تحميل...</div>}>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </React.Suspense>
        </div>
      </Router>
    </ChildProvider>
  );
}

export default App;
