import './App.css';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Login } from './pages/Login';
import { Inbox } from './pages/Inbox';
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/ApolloClient';
import { Provider } from 'react-redux';
import store from './lib/store';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
`;

function App() {
    return (
        <AppContainer>
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Routes>
                        <Route path="/" element={<Inbox />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </Provider>
            </ApolloProvider>
        </AppContainer>
    );
}

export default App;
