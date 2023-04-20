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
            createdAt
            sentAt
            copyOwnerId
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
            createdAt
            sentAt
            copyOwnerId
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
            createdAt
            sentAt
            copyOwnerId
        }
    }
`;

export const EMAILS_UPDATE_DRAFT_MUTATION = gql`
    mutation UpdateDraft(
        $id: String
        $sender: String
        $recipient: String
        $subject: String
        $body: String
    ) {
        updateEmail(
            updateEmailInput: {
                id: $id
                sender: $sender
                recipient: $recipient
                subject: $subject
                body: $body
            }
        ) {
            id
            sender
            recipient
            subject
            body
            isDraft
            isSent
            isTrash
            createdAt
            sentAt
            copyOwnerId
        }
    }
`;
