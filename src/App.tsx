import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { LoginPage, SignupPage, SubjectivePage, ObjectivePage, EvaluationPage, HomePage, HistoryPage } from './pages'
import { Header } from './components';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const currentUser = sessionStorage.getItem('currentUser');

  // if (!currentUser) {
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter basename="/image-quality-assessment">
      <Header />
      <Routes>
        {/* <Route index element={<WelcomePage />} /> */}
        <Route
        index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/subjective-assessment" element={<SubjectivePage />} />       
        <Route path="/objective-assessment" element={<ObjectivePage />} />       
        <Route path="/evaluation" element={<EvaluationPage />} />     
        <Route path="/history" element={<HistoryPage />} />      

      </Routes>
    </BrowserRouter>
  );
}

export default App
