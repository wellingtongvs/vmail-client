import { gql } from '@apollo/client';

export const USERS_CREATE_USER_MUTATION = gql`
    mutation CreateUser($email: String!, $password: String!) {
        createUser(createUserInput: { email: $email, password: $password }) {
            id
            email
        }
    }
`;

export const USERS_CREATE_AUTH_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        createAuth(loginAuthInput: { email: $email, password: $password }) {
            user {
                id
                email
            }
            accessToken
        }
    }
`;
