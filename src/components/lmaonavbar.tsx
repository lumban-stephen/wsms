import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import UCLOGO from './uclogo.png';

const lmaonavbar = () => {
    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    <Typography>
                    {/* <img src={UCLOGO} alt="" className='uclogo'/> */}
                    <UCLOGO></UCLOGO>
                    
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default lmaonavbar

