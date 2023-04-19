import './App.css';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Login } from './pages/Login';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
`;

function App() {
    return (
        <AppContainer>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </AppContainer>
    );
}

export default App;
