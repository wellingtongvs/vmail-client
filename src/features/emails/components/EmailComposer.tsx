import { useState, useCallback, useEffect } from 'react';
import { Drawer, TextField, IconButton, Button, Box } from '@mui/material';
import { useMutation } from '@apollo/client';
import { CloseOutlined, SendOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleComposer } from '../reducers/composerReducer';
import { setEmailId } from '../reducers/emailIdReducer';
import {
    EMAILS_CREATE_DRAFT_MUTATION,
    EMAILS_SEND_EMAIL_MUTATION,
} from '../graphql/emailMutations';

function EmailComposer() {
    const [sender, setSender] = useState('');
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const composerOpen = useSelector(
        (state: any) => state.composer.composerOpen
    );
    const emailId = useSelector((state: any) => state.emailId.id);

    const toggleComposerOpen = useCallback(() => {
        dispatch(toggleComposer());
    }, [dispatch]);

    // const [sendEmail] = useMutation(EMAILS_SEND_EMAIL_MUTATION);
    // const [saveEmail] = useMutation(EMAILS_CREATE_DRAFT_MUTATION);

    // const newDraft = async () => {
    //     const response = await saveEmail({
    //         variables: { sender },
    //     });
    //     const id = response.data.saveEmail.id;
    //     dispatch(setEmailId(id));
    // };

    const handleSubmit = async (event: any) => {
        //     event.preventDefault();
        //     await sendEmail({
        //         variables: { emailId },
        //     });
        //     toggleComposerOpen();
        //     setTo('');
        //     setSubject('');
        //     setMessage('');
    };

    // useEffect(() => {
    //     if (composerOpen && !emailId) {
    //         newDraft();
    //     }
    // }, [composerOpen, emailId]);

    return (
        <>
            <Drawer variant="persistent" anchor="right" open={composerOpen}>
                <Box
                    display="flex"
                    justifyContent="right"
                    alignItems="right"
                    style={{ backgroundColor: '#eeeeee' }}
                >
                    <IconButton onClick={toggleComposerOpen}>
                        <CloseOutlined />
                    </IconButton>
                </Box>
                <Box sx={{ p: 4 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="To"
                            fullWidth
                            value={to}
                            style={{ marginBottom: '20px' }}
                            onChange={(event) => setTo(event.target.value)}
                        />
                        <TextField
                            label="Subject"
                            fullWidth
                            value={subject}
                            style={{ marginBottom: '20px' }}
                            onChange={(event) => setSubject(event.target.value)}
                        />
                        <TextField
                            label="Message"
                            multiline
                            rows={10}
                            fullWidth
                            variant="outlined"
                            value={message}
                            style={{ marginBottom: '20px' }}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                            disabled={!to}
                            style={{ marginTop: '20px' }}
                            startIcon={<SendOutlined />}
                        >
                            Send
                        </Button>
                    </form>
                </Box>
            </Drawer>
        </>
    );
}

export { EmailComposer };
