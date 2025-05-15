import { HashRouter , Routes, Route, Navigate } from 'react-router-dom'

import { LoginPage, MainApp, SignupPage, WelcomePage } from './pages'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = sessionStorage.getItem('currentUser');

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/main-app"
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App
