import React from 'react';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { Theme as MuiTheme } from '@mui/material';
import mui_theme from '../mui_theme'
const StyledBodyTableTypography = styled(Typography)(({ theme = mui_theme }: { theme?: MuiTheme}) => ({
  fontWeight: 500, // theme.typography.fontWeightRegular,
  fontSize: 13,
  color: 'rgba(33, 33, 33, 0.85)'
}));

export { StyledBodyTableTypography }