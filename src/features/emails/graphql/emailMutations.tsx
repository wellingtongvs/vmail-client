import { gql } from '@apollo/client';

export const EMAILS_SEND_EMAIL_MUTATION = gql`
    mutation SendEmail($id: String!) {
        sendEmail(id: $id) {
            id
            sender
            recipient
            subject
            body
            isDraft
            isSent
            isTrash
        }
    }
`;

export const EMAILS_TRASH_EMAIL_MUTATION = gql`
    mutation TrashEmail($id: String!) {
        trashEmail(id: $id) {
            id
            sender
            recipient
            subject
            body
            isDraft
            isSent
            isTrash
        }
    }
`;

export const EMAILS_DELETE_EMAIL_MUTATION = gql`
    mutation DeleteEmail($id: String!) {
        deleteEmail(id: $id) {
            id
            sender
            recipient
            subject
            body
            isDraft
            isSent
            isTrash
        }
    }
`;

export const EMAILS_CREATE_DRAFT_MUTATION = gql`
    mutation CreateDraft($sender: String!, ) {
        saveEmail(input: { sender: $sender } }) {
            id
            sender
            recipient
            isDraft
            isSent
            isTrash
        }
    }
`;

export const EMAILS_UPDATE_DRAFT_MUTATION = gql`
    mutation UpdateDraft {
        updateEmail(
            input: { recipient: String, subject: String, body: String }
        ) {
            id
            sender
            recipient
            subject
            body
            isDraft
            isSent
            isTrash
        }
    }
`;
