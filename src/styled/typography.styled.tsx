import React from 'react';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { Theme as MuiTheme } from '@mui/material';
import mui_theme from '../mui_theme'
const StyledBodyTableTypography = styled(Typography)(({ theme = mui_theme }: { theme?: MuiTheme}) => ({
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: 13,
  color: 'black'
}));

export { StyledBodyTableTypography }