import { LoadingButton } from '@mui/lab';
import {
    Alert,
    Box,
    CircularProgress,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
    USERS_CREATE_USER_MUTATION,
    USERS_CREATE_AUTH_MUTATION,
} from '../features/authentication/graphql/userMutations';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../features/authentication/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../reducers/loadingReducer';

function Signup() {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useIsAuthenticated();

    const loading = useSelector((state: any) => state.loading.isLoading);

    useEffect(() => {
        if (!loading) {
            if (isAuthenticated()) {
                dispatch(setLoading(true));
                navigate('/');
                setTimeout(() => {
                    dispatch(setLoading(false));
                }, 250);
            }
        }
    }, [loading]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [serverError, setServerError] = useState('');

    const [createUser] = useMutation(USERS_CREATE_USER_MUTATION);
    const [login] = useMutation(USERS_CREATE_AUTH_MUTATION);

    const onSubmit = async (data: any) => {
        try {
            await createUser({
                variables: {
                    email: data.email,
                    password: data.password,
                },
            });
            const result = await login({
                variables: {
                    email: data.email,
                    password: data.password,
                },
            });
            const jwtToken = result.data.createAuth.accessToken;
            const { id, email } = result.data.createAuth.user;
            dispatch(
                setUserInfo({ userId: id, userEmail: email, token: jwtToken })
            );
            signIn({
                token: jwtToken,
                expiresIn: 2590000,
                tokenType: 'Bearer',
                authState: { email: email },
            });
            navigate('/');
        } catch (e: any) {
            if (e.message) {
                setServerError(`Error: ${e.message}`);
            }
        }
    };
    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Paper sx={{ p: 4 }}>
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{ pb: 2 }}
                            align="center"
                        >
                            Signup
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        type="email"
                                        color="primary"
                                        placeholder="Email"
                                        fullWidth
                                        sx={{ pb: 3 }}
                                        {...register('email', {
                                            required: true,
                                        })}
                                    />
                                    {errors.emailRequired && (
                                        <Alert severity="error">
                                            This field is required.
                                        </Alert>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="password"
                                        color="primary"
                                        placeholder="Password"
                                        fullWidth
                                        sx={{ pb: 4 }}
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />
                                    {errors.passwordRequired && (
                                        <Alert severity="error">
                                            This field is required.
                                        </Alert>
                                    )}
                                </Grid>
                                {serverError ? (
                                    <Grid item xs={12} sx={{ pb: 3 }}>
                                        <Alert severity="error">
                                            {serverError}
                                        </Alert>
                                    </Grid>
                                ) : (
                                    ''
                                )}
                                <Grid item xs={12}>
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                    >
                                        <LoadingButton
                                            color="primary"
                                            type="submit"
                                            variant="outlined"
                                            style={{ padding: '14px 50px' }}
                                        >
                                            Signup
                                        </LoadingButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Box>
            )}
        </>
    );
}

export { Signup };
