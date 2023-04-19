import './App.css';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Login } from './pages/Login';
import { Inbox } from './pages/Inbox';
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/ApolloClient';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
`;

function App() {
    return (
        <AppContainer>
            <ApolloProvider client={client}>
                <Routes>
                    <Route path="/" element={<Inbox />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                </Routes>
            </ApolloProvider>
        </AppContainer>
    );
}

export default App;
