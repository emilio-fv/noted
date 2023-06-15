import React from 'react';
import img from '../../../assets/Demo_Album_Cover.png';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ArtistCard = (artist) => {
  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        bgcolor: '#303745',
        padding: { xs: .5, sm: 1, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: '',
        gap: { xs: .5, sm: 2}
      }}
    >
      <Box 
        component='img'
        src={artist.artist.images.length > 0 ? artist.artist.images[0].url : img}
        sx={{
          width: '100%',
          borderRadius: '50%'
        }}
      />
      <Typography align='center' sx={{ fontSize: { xs: '.5rem', sm: '.75rem', md: '1rem'}}}>{artist.artist.name}</Typography>
    </Paper>
  )
};

export default ArtistCard;