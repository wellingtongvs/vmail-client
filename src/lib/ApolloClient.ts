import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_API_BASE_URL}/graphql`,
});

const wsLink = new WebSocketLink(
    new SubscriptionClient(`${process.env.REACT_APP_WS_URL}/graphql`, {
        reconnect: true,
    })
);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export { client };
