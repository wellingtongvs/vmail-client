import { gql } from '@apollo/client';

export const EMAILS_DRAFT_ADDED_SUBSCRIPTION = gql`
    subscription OnEmailDraftAdded {
        emailDraftAdded {
            id
            sender
            recipient
            isDraft
            isSent
            isTrash
        }
    }
`;

export const EMAILS_EMAIL_SENT_SUBSCRIPTION = gql`
    subscription OnEmailSent {
        sentEmail {
            id
            sender
            recipient
            isDraft
            isSent
            isTrash
        }
    }
`;

export const EMAILS_EMAIL_TRASHED_SUBSCRIPTION = gql`
    subscription OnEmailTrashed {
        trashedEmail {
            id
            sender
            recipient
            isDraft
            isSent
            isTrash
        }
    }
`;
