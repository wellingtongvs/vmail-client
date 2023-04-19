import { useFormik } from 'formik';
import { useSignIn } from 'react-auth-kit';
import { LoadingButton } from '@mui/lab';
import {
    Alert,
    Box,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

function Login(props: any) {
    const signIn = useSignIn();
    const [error, setError] = useState('');

    const onSubmit = async (data: any) => {};

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit,
    });

    return (
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
                    Login
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                type="email"
                                color="primary"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                required
                                fullWidth
                                sx={{ pb: 4 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                type="password"
                                color="primary"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                required
                                fullWidth
                                sx={{ pb: 4 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="center">
                                <LoadingButton
                                    color="primary"
                                    type="submit"
                                    variant="outlined"
                                    loading={formik.isSubmitting}
                                    style={{ padding: '14px 50px' }}
                                >
                                    Login
                                </LoadingButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
                {error ? <Alert severity="error">{error}</Alert> : ''}
            </Paper>
        </Box>
    );
}

export { Login };
