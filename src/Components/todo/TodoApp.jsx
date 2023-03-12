import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import AuthProvider, { useAuth } from './security/AuthContext';
import './TodoApp.css';
import WelcomeComponent from './WelcomeComponent';


function AuthenticatedRoute({ children }) {
    const authContext = useAuth();
    if (authContext.isAuthenticated)
        return children
    return <Navigate to='/' />
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute >
                        } />
                        <Route path='todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent />
                            </AuthenticatedRoute>} />
                        <Route path='logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>} />
                        <Route path='*' element={<ErrorComponent />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}













