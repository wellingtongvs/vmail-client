import { useState, useCallback, useEffect } from 'react';
import { Drawer, TextField, IconButton, Button, Box } from '@mui/material';
import { useMutation } from '@apollo/client';
import { CloseOutlined, SendOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setComposerStatus, toggleComposer } from '../reducers/composerReducer';
import { setEmailId } from '../reducers/emailIdReducer';
import {
    EMAILS_SEND_EMAIL_MUTATION,
    EMAILS_UPDATE_DRAFT_MUTATION,
} from '../graphql/emailMutations';
import { useForm } from 'react-hook-form';

function EmailComposer() {
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();

    const userEmail = useSelector((state: any) => state.user.userEmail);
    const authToken = useSelector((state: any) => state.user.token);
    const composerOpen = useSelector(
        (state: any) => state.composer.composerOpen
    );
    const emailId = useSelector((state: any) => state.emailId.id);

    const toggleComposerOpen = useCallback(() => {
        dispatch(toggleComposer());
        dispatch(setEmailId(undefined));
    }, [dispatch]);

    const [updateEmail] = useMutation(EMAILS_UPDATE_DRAFT_MUTATION, {
        context: {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        },
    });
    const [sendEmail] = useMutation(EMAILS_SEND_EMAIL_MUTATION, {
        context: {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        },
    });

    const { register, handleSubmit, getValues } = useForm();

    const handleChange = async () => {
        setSubmitting(true);
    };

    const updateDraft = async () => {
        const values = getValues();
        const response = await updateEmail({
            variables: {
                id: emailId,
                sender: userEmail,
                recipient: values.recipient,
                subject: values.subject,
                body: values.body,
            },
        });
        setAllowSubmit(values.recipient !== undefined);
        const id = response.data.updateEmail.id;
        dispatch(setEmailId(id));
    };

    const onSubmit = async (values: any) => {
        await sendEmail({
            variables: {
                id: emailId,
                sender: userEmail,
                recipient: values.recipient,
                subject: values.subject,
                body: values.body,
            },
        });
        dispatch(setComposerStatus(false));
    };

    useEffect(() => {
        let debouncedSave: any;
        if (submitting) {
            debouncedSave = setTimeout(() => {
                updateDraft();
                setSubmitting(false);
            }, 500);
        }
        return () => {
            if (debouncedSave) clearTimeout(debouncedSave);
        };
    }, [submitting, updateDraft]);

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="To"
                            fullWidth
                            {...register('recipient', {
                                required: true,
                                onChange: (e) => handleChange(),
                            })}
                            style={{ marginBottom: '20px' }}
                        />
                        <TextField
                            label="Subject"
                            fullWidth
                            {...(register('subject'),
                            {
                                onChange: (e) => handleChange(),
                            })}
                            style={{ marginBottom: '20px' }}
                        />
                        <TextField
                            label="Message"
                            multiline
                            rows={10}
                            fullWidth
                            variant="outlined"
                            {...(register('body'),
                            {
                                onChange: (e) => handleChange(),
                            })}
                            style={{ marginBottom: '20px' }}
                        />
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                            disabled={!allowSubmit}
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
