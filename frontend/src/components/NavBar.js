import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="inherit" color="inherit">
                        <Link href="/" color="inherit" variant="inherit">
                            Hava - Simple Weather Reporter
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;