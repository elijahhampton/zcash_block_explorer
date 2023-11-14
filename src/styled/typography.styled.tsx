import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { Theme } from "@mui/material";
import mui_theme from "../mui_theme";
const StyledBodyTableTypography = styled(Typography)(
  ({ theme = mui_theme }: { theme?: Theme }) => ({
    fontWeight: 500, 
    fontSize: 13,
    color: "rgba(33, 33, 33, 0.85)",
  })
);

const ListItemDetailHeaderTypography = styled(Typography)(
  ({ theme }) => ({
    fontSize: 14,
    color: "#141414",
    fontWeight: 'medium', //theme.typography.fontWeightMedium,
  })
);

const ListItemDetailSecondaryTypography = styled(Typography)(
  ({ theme }) => ({
    fontSize: 14,
    color: "#000000",
  })
);

export { StyledBodyTableTypography, ListItemDetailHeaderTypography, ListItemDetailSecondaryTypography };
