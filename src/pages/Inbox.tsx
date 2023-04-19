import { Grid } from '@mui/material';
import { SideMenuDrawer } from '../features/emails/components/SideMenuDrawer';

function Inbox(props: any) {
    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    <SideMenuDrawer />
                </Grid>
            </Grid>
        </>
    );
}

export { Inbox };
