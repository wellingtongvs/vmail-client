import { Grid } from '@mui/material';
import { EmailList } from '../features/emails/components/EmailList';
import { SideMenuDrawer } from '../features/emails/components/SideMenuDrawer';
import { EmailComposer } from '../features/emails/components/EmailComposer';

function Inbox() {
    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    <SideMenuDrawer />
                </Grid>
                <Grid item xs={10}>
                    <EmailList />
                    <EmailComposer />
                </Grid>
            </Grid>
        </>
    );
}

export { Inbox };
