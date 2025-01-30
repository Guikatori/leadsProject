import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import sunhub from "../assets/sunhubbr_logo.jpg";
import { removeLocalItens } from "../utils/localItens";
import { useNavigate } from 'react-router-dom';

const SidebarExample: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: expanded ? 200 : 70,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: expanded ? 200 : 70,
            transition: 'width 0.3s',
            overflow: 'hidden',
          },
        }}
        open
      >
        <Box
          component="div"
          sx={{ p: 2, textAlign: 'center' }}
        >
          <img
            alt="sunhub"
            src={sunhub}
            onClick={() => setExpanded(!expanded)}
            style={{
              width: '100%',
              maxWidth: '100px',
              cursor: 'pointer',
              borderRadius: '50%'
            }}
          />
        </Box>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            mt: 2
          }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={!expanded ? 'Lea..' : "Leads"} style={{ justifyItems: 'center', fontSize: '18px'}} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              mt: 'auto', 
              opacity: 0.5
            }}
          >
            <ListItemButton>
              <ListItemText primary="Sair" onClick={()=>{removeLocalItens(), navigate("/")}}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default SidebarExample;
