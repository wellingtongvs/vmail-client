import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

function LoadingOverlay() {
    const loading = useSelector((state: any) => state.loading.isLoading);
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export { LoadingOverlay };
