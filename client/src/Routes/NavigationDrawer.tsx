import { FC, Fragment } from "react";
import { useNavigate } from 'react-router-dom';

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import {BasicRoute, isBasicRoute, routes} from './Routes';
import { styled, useTheme } from "@mui/material/styles";

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

interface ManagementSystemDrawerProps {
    open: boolean,
    onClose: () => void
}

export const ManagementSystemDrawer: FC<ManagementSystemDrawerProps> = ({open, onClose}) => {
    const theme = useTheme()
    const navigate = useNavigate()

    const navigateAndClose = (path?: string) => {
        if (path) {
            navigate(path);
        }

        onClose();
    };

    const renderNavSubItem = (item: BasicRoute, subItem: BasicRoute, index: number) => (
        <List key={index} component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => navigateAndClose(`${item.path}/${subItem.path}`)}>
                <ListItemIcon>{subItem.Icon}</ListItemIcon>
                <ListItemText primary={subItem.name} />
            </ListItem>
        </List>
    );

    const renderNavItem = (item: BasicRoute, index: number) => {
        const basicRoutes = item.subRoutes?.filter(isBasicRoute);

        return (
            <Fragment key={index}>
                <ListItem button key={index} onClick={() => navigateAndClose(item.path)}>
                    <ListItemIcon>{item.Icon}</ListItemIcon>
                    <ListItemText primary={item.name}/>
                </ListItem>
                {!basicRoutes?.length ? <></> : basicRoutes.map((subItem, subItemIndex) => renderNavSubItem(item, subItem, subItemIndex))}
            </Fragment>
        );
    };

    return (
        <Drawer open={open} onBackdropClick={onClose}>
            <DrawerHeader>
                <IconButton onClick={onClose}>
                    { theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/> }
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>{ routes.filter(x => isBasicRoute(x) && x.showInDrawer !== false).map(renderNavItem) }</List>
            <Divider/>
        </Drawer>
    )
};