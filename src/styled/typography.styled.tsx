import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { Theme } from "@mui/material";
import mui_theme from "../mui_theme";
const StyledBodyTableTypography = styled(Typography)(
  ({ theme = mui_theme }: { theme?: Theme }) => ({
    fontWeight: 400, 
    fontSize: '0.9rem',
    color: "#1E2B4D"
  })
);

const ListItemDetailHeaderTypography = styled(Typography)(
  ({ theme = mui_theme }: { theme?: Theme }) => ({
   // fontSize: 14,
   // color: "#141414",
//    fontWeight: '500', //theme.typography.fontWeightMedium,
  })
);

const ListItemDetailSecondaryTypography = styled(Typography)(
  ({ theme = mui_theme }: { theme?: Theme }) => ({
 //   fontSize: 14,
  //  color: "#000000",
  })
);

export { StyledBodyTableTypography, ListItemDetailHeaderTypography, ListItemDetailSecondaryTypography };
