import { Card, Theme } from "@mui/material";
import { styled } from "@mui/styles";

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
    borderRadius: 5, // Converts 1.5 to the equivalent spacing from the theme
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    border: `1px solid #e1eaea`
  }));
  
export { StyledCard }