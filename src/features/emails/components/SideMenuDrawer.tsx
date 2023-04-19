import {
    Drawer,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    capitalize,
} from '@mui/material';
import {
    InboxOutlined,
    MailOutline,
    DeleteOutline,
    DraftsOutlined,
    CreateOutlined,
} from '@mui/icons-material';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../reducers/tabReducer';
import { toggleComposer } from '../reducers/composerReducer';
import { TabValue } from '../types/TabValue';

function SideMenuDrawer(props: any) {
    const activeTab = useSelector((state: any) => state.tab.activeTab);
    const dispatch = useDispatch();

    const setActiveTabInbox = useCallback(() => {
        dispatch(setActiveTab(TabValue.INBOX));
    }, [dispatch]);

    const setActiveTabSent = useCallback(() => {
        dispatch(setActiveTab(TabValue.SENT));
    }, [dispatch]);

    const setActiveTabDrafts = useCallback(() => {
        dispatch(setActiveTab(TabValue.DRAFTS));
    }, [dispatch]);

    const setActiveTabTrash = useCallback(() => {
        dispatch(setActiveTab(TabValue.TRASH));
    }, [dispatch]);

    const toggleComposerOpen = useCallback(() => {
        dispatch(toggleComposer(undefined));
    }, [dispatch]);

    const listItems = [
        {
            icon: <InboxOutlined />,
            action: setActiveTabInbox,
            value: TabValue.INBOX,
        },
        {
            icon: <MailOutline />,
            action: setActiveTabSent,
            value: TabValue.SENT,
        },
        {
            icon: <DraftsOutlined />,
            action: setActiveTabDrafts,
            value: TabValue.DRAFTS,
        },
        {
            icon: <DeleteOutline />,
            action: setActiveTabTrash,
            value: TabValue.TRASH,
        },
    ];

    const mainAction = {
        name: 'Compose',
        icon: <CreateOutlined />,
        action: toggleComposerOpen,
    };

    return (
        <>
            <Drawer
                variant="permanent"
                anchor={'left'}
                PaperProps={{
                    sx: { width: '17%' },
                }}
            >
                <div>
                    <ListItemButton
                        key={mainAction.name}
                        onClick={mainAction.action}
                    >
                        <ListItemIcon>{mainAction.icon}</ListItemIcon>
                        <ListItemText primary={mainAction.name}></ListItemText>
                    </ListItemButton>
                </div>
                <Divider />
                <div>
                    {listItems.map((item, index) => (
                        <ListItemButton
                            key={index}
                            onClick={item.action}
                            selected={activeTab == item.value}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText
                                primary={capitalize(item.value.toLowerCase())}
                            />
                        </ListItemButton>
                    ))}
                </div>
            </Drawer>
        </>
    );
}

export { SideMenuDrawer };
