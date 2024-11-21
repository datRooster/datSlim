// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, IconButton, Button, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Sidebar({ drawerCollapsed, setDrawerCollapsed, handleSectionSelect, handleLogout }) {
  const drawerWidth = drawerCollapsed ? 60 : 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
        },
      }}
      open
    >
      <Box display="flex" justifyContent="flex-end" p={1}>
        
        <IconButton onClick={() => setDrawerCollapsed(!drawerCollapsed)}>
          {drawerCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem onClick={() => handleSectionSelect('Section 1')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          {!drawerCollapsed && <ListItemText primary="Sezione 1" />}
        </ListItem>
        <ListItem onClick={() => handleSectionSelect('Section 2')}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          {!drawerCollapsed && <ListItemText primary="Sezione 2" />}
        </ListItem>
        <ListItem onClick={() => handleSectionSelect('Section 3')}>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          {!drawerCollapsed && <ListItemText primary="Sezione 3" />}
        </ListItem>
        <ListItem onClick={() => {handleLogout();}}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          {!drawerCollapsed && <ListItemText primary="Logout" />}
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  );
}

export default Sidebar;
