import { gql } from '@apollo/client';

export const EMAILS_LIST_QUERY = (filters: any) => {
    const queryFilters = Object.entries(filters)
        .map(
            ([key, value]) =>
                `${key}: ${
                    typeof value == 'string' ? `"${value}"` : `${value}`
                }`
        )
        .join(', ');
    return gql`
  query {
    emails (filters: {${queryFilters}} ) {
      id,
      sender,
      subject
      recipient,
      isDraft,
      isSent,
      isTrash,
      sentAt,
      createdAt,
      copyOwnerId
    }
  }
  `;
};
