import { Grid } from '@mui/material';
import { EmailList } from '../features/emails/components/EmailList';
import { SideMenuDrawer } from '../features/emails/components/SideMenuDrawer';

function Inbox(props: any) {
    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    <SideMenuDrawer />
                </Grid>
                <Grid item xs={10}>
                    <EmailList />
                </Grid>
            </Grid>
        </>
    );
}

export { Inbox };
