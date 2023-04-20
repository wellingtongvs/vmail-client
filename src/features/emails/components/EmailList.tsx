import { useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { EMAILS_LIST_QUERY } from '../graphql/emailQueries';
import {
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    capitalize,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { TabValue } from '../types/TabValue';
import {
    EMAILS_EMAIL_SENT_SUBSCRIPTION,
    EMAILS_DRAFT_ADDED_SUBSCRIPTION,
    EMAILS_EMAIL_TRASHED_SUBSCRIPTION,
} from '../graphql/emailSubscriptions';
import { MailOutline } from '@mui/icons-material';

function EmailList() {
    const [emails, setEmails] = useState<any[]>([]);
    const activeTab = useSelector((state: any) => state.tab.activeTab);
    const email = useSelector((state: any) => state.user.userEmail);

    let params: any = {
        sender: email,
        isSent: activeTab === TabValue.SENT,
        isDraft: activeTab === TabValue.DRAFTS,
        isTrash: activeTab === TabValue.TRASH,
    };

    let subscription = [TabValue.INBOX, TabValue.SENT].includes(activeTab)
        ? EMAILS_EMAIL_SENT_SUBSCRIPTION
        : activeTab === TabValue.DRAFTS
        ? EMAILS_DRAFT_ADDED_SUBSCRIPTION
        : EMAILS_EMAIL_TRASHED_SUBSCRIPTION;

    /* Remove value since it's not necessary */
    if ([TabValue.TRASH, TabValue.INBOX].includes(activeTab)) {
        delete params.isSent;
    }
    if (activeTab === TabValue.INBOX) {
        delete params.sender;
        params.recipient = email;
    }

    const { loading, data } = useQuery(EMAILS_LIST_QUERY(params));
    const { data: subscriptionData } = useSubscription(subscription);

    useEffect(() => {
        if (subscriptionData) {
            const newEmailKey = Object.keys(subscriptionData)[0];
            const newEmail = subscriptionData[newEmailKey];
            if (newEmail) {
                setEmails([newEmail, ...emails]);
            }
        }
    }, [subscriptionData]);

    useEffect(() => {
        if (data) {
            setEmails([...data.emails.emails]);
        }
    }, [data]);

    return (
        <>
            {loading ? (
                ''
            ) : (
                <List sx={{ py: 0 }}>
                    {emails.map((email: any) => (
                        <ListItem key={`${email.id}`} sx={{ p: 0 }}>
                            <ListItemButton divider sx={{ py: 1 }}>
                                <ListItemIcon>
                                    <MailOutline />
                                </ListItemIcon>
                                <ListItemText
                                    primary={email.subject || 'No Subject'}
                                    secondary={`from: ${email.sender}`}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
            {!emails.length ? (
                <>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                    >
                        {!loading ? (
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ pb: 2 }}
                                align="center"
                            >
                                No conversations in{' '}
                                {capitalize(activeTab.toLowerCase())}.
                            </Typography>
                        ) : (
                            <CircularProgress />
                        )}
                    </Box>
                </>
            ) : (
                ''
            )}
        </>
    );
}

export { EmailList };
