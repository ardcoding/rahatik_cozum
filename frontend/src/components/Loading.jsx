import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box className="justify-self-center h-screen content-center">
      <CircularProgress />
    </Box>
  );
}

export default Loading;