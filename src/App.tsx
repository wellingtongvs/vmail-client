import './App.css';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Login } from './pages/Login';
import { Inbox } from './pages/Inbox';
import { Signup } from './pages/Signup';
import { RequireAuth } from 'react-auth-kit';
import { LoadingOverlay } from './components/LoadingOverlay';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
`;

function App() {
    return (
        <AppContainer>
            <LoadingOverlay />
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth loginPath="/login">
                            <Inbox />
                        </RequireAuth>
                    }
                ></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </AppContainer>
    );
}

export default App;
