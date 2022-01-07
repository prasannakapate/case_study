import { AppBar, Link, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';

import { UserContext } from '../../config/userContext';

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Globex Network | Workflow Management | {user}
        </Typography>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Support
          </Link>
        </nav>
        <Link href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Help
        </Link>
      </Toolbar>
    </AppBar>
  );
}
