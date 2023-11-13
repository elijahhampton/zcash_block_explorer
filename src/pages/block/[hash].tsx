import React from "react";
import {
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { InfoRounded } from "@mui/icons-material";
import TransactionsTable from "../../containers/TransactionsTable";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
  bgcolor: "green",
}));

const ListItemDetailHeaderTypography = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    color: '#141414',
    fontWeight: theme.typography.fontWeightMedium
}))

const ListItemDetailSecondaryTypography = styled(Typography)(({ theme}) => ({
    fontSize: 14,
    color: '#000000'
}))

const primaryTypographyProps = {
    paddingBottom: 0.5,
}

export default () => {
  const onGetBlockDetails = () => {};
  const onGetTransactionsFromBlock = () => {};

  return (
    <Box display="flex" justifyContent='space-between'>
      <Drawer
        open={true}
        variant="permanent"
        elevation={0}
        sx={{
          height: 100,
          bgcolor: "red",
          zIndex: (theme) => theme.zIndex.appBar - 5,
          "& .MuiDrawer-paper": {
            border: "none",
            width: "30%",
            px: 2,
            py: 3,
          },
        }}
      >
        <DrawerHeader />
        <Typography variant="h6" sx={{ color: "black" }}>
          Block Details
        </Typography>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText
            primaryTypographyProps={primaryTypographyProps}
              primary={
                <Stack alignItems='center' direction='row' spacing={0.5}>
                    <ListItemDetailHeaderTypography>
                        Hash
                    </ListItemDetailHeaderTypography>
                    <InfoRounded fontSize="small" />
                </Stack>
              }
              secondary={<ListItemDetailSecondaryTypography>jdsf98h9p9w8sey98s7ryt87sy49ay40t9wu34ut0349ut0349ut</ListItemDetailSecondaryTypography>}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
                        primaryTypographyProps={primaryTypographyProps}
              primary={
                <Stack alignItems='center' direction='row' spacing={0.5}>
                    <ListItemDetailHeaderTypography>
                        Timestamp
                    </ListItemDetailHeaderTypography>
                    <InfoRounded fontSize="small" />
                </Stack>
              }
              secondary={<ListItemDetailSecondaryTypography>39482934</ListItemDetailSecondaryTypography>}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
                        primaryTypographyProps={primaryTypographyProps}
              primary={
                <Stack alignItems='center' direction='row' spacing={0.5}>
                    <ListItemDetailHeaderTypography>
                        Height
                    </ListItemDetailHeaderTypography>
                    <InfoRounded fontSize="small" />
                </Stack>
              }
              secondary={<ListItemDetailSecondaryTypography>56</ListItemDetailSecondaryTypography>}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
                        primaryTypographyProps={primaryTypographyProps}
              primary={
                <Stack alignItems='center' direction='row' spacing={0.5}>
                    <ListItemDetailHeaderTypography>
                        Miner
                    </ListItemDetailHeaderTypography>
                    <InfoRounded fontSize="small" />
                </Stack>
              }
              secondary={<ListItemDetailSecondaryTypography>tx9c89djn1h384nskdlffs</ListItemDetailSecondaryTypography>}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
                        primaryTypographyProps={primaryTypographyProps}
              primary={
                <Stack alignItems='center' direction='row' spacing={0.5}>
                    <ListItemDetailHeaderTypography>
                        Transaction Count
                    </ListItemDetailHeaderTypography>
                    <InfoRounded fontSize="small" />
                </Stack>
              }
              secondary={<ListItemDetailSecondaryTypography>2</ListItemDetailSecondaryTypography>}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
                        primaryTypographyProps={primaryTypographyProps}
             primary={
                <Stack alignItems='center' direction='row' spacing={0.5}>
                    <ListItemDetailHeaderTypography>
                        Output Count
                    </ListItemDetailHeaderTypography>
                    <InfoRounded fontSize="small" />
                </Stack>
              }
              secondary={<ListItemDetailSecondaryTypography>2</ListItemDetailSecondaryTypography>}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
                        primaryTypographyProps={primaryTypographyProps}
              primary={
                <Stack alignItems='center' direction='row' spacing={0.5}>
                    <ListItemDetailHeaderTypography>
                        Input Count
                    </ListItemDetailHeaderTypography>
                    <InfoRounded fontSize="small" />
                </Stack>
              }
              secondary={<ListItemDetailSecondaryTypography>1</ListItemDetailSecondaryTypography>}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
                        primaryTypographyProps={primaryTypographyProps}
              primary={
                <Stack alignItems='center' direction='row' spacing={0.5}>
                    <ListItemDetailHeaderTypography>
                        Output Total
                    </ListItemDetailHeaderTypography>
                    <InfoRounded fontSize="small" />
                </Stack>
              }
              secondary={<ListItemDetailSecondaryTypography sx={{ color: 'secondary.main', fontWeight: (theme) => theme.typography.fontWeightMedium }}>530.00 ZEC</ListItemDetailSecondaryTypography>}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
                        primaryTypographyProps={primaryTypographyProps}
              primary={
                <Stack alignItems='center' direction='row' spacing={0.5}>
                    <ListItemDetailHeaderTypography>
                        Input Total
                    </ListItemDetailHeaderTypography>
                    <InfoRounded fontSize='small' />
                </Stack>
              }
              secondary={<ListItemDetailSecondaryTypography sx={{ color: 'secondary.main', fontWeight: (theme) => theme.typography.fontWeightMedium }}>530.00 ZEC</ListItemDetailSecondaryTypography>}
            />
          </ListItem>
        </List>
      </Drawer>
      <Box sx={{ pt: 3, px: 4, height: '100%', width: '70%', float: 'right' }}>
        <DrawerHeader />

        <Stack spacing={4}>
        <div>
        <Typography variant="h6" sx={{ color: 'black', pb: 2, pt: 0.5 }}>
          Block Information
        </Typography>
        <Grid direction='row' container spacing={5}>
        <Grid item xs={4}>
                <ListItemDetailHeaderTypography>
                    Difficulty
                </ListItemDetailHeaderTypography>
                <ListItemDetailSecondaryTypography>
                    430958039458034.43534534
                </ListItemDetailSecondaryTypography>
            </Grid>

            <Grid item xs={4}>
                <ListItemDetailHeaderTypography>
                    Size
                </ListItemDetailHeaderTypography>
                <ListItemDetailSecondaryTypography>
                    4938554
                </ListItemDetailSecondaryTypography>
            </Grid>

            <Grid item xs={4}>
                <ListItemDetailHeaderTypography>
                    Version
                </ListItemDetailHeaderTypography>
                <ListItemDetailSecondaryTypography>
                    4
                </ListItemDetailSecondaryTypography>
            </Grid>

            <Grid item xs={4}>
                <ListItemDetailHeaderTypography>
                    Chainwork
                </ListItemDetailHeaderTypography>
                <ListItemDetailSecondaryTypography>
                    09384g4389h9dj20398h4tiwgrgre
                </ListItemDetailSecondaryTypography>
            </Grid>

            <Grid item xs={4}>
                <ListItemDetailHeaderTypography>
                    Bits
                </ListItemDetailHeaderTypography>
                <ListItemDetailSecondaryTypography>
                    4
                </ListItemDetailSecondaryTypography>
            </Grid>

            <Grid item xs={4}>
                <ListItemDetailHeaderTypography>
                    Confirmations
                </ListItemDetailHeaderTypography>
                <ListItemDetailSecondaryTypography>
                    121
                </ListItemDetailSecondaryTypography>
            </Grid>

            <Grid item xs={4}>
                <ListItemDetailHeaderTypography>
                   Merkle Root
                </ListItemDetailHeaderTypography>
                <ListItemDetailSecondaryTypography>
                    fjsd98fe2hf9h94h398htg934ht98ht4h8t
                </ListItemDetailSecondaryTypography>
            </Grid>
        </Grid>
        </div>

        <div>
        <Typography variant="h6" sx={{ color: 'black', pb: 2, pt: 0.5 }}>
          Transactions
        </Typography>
        <TransactionsTable minHeight="300px" data={[]} loadMoreRows={({ startIndex, stopIndex }) => new Promise()} useQueryProps={{ isFetching: false }} rowCount={0} isRowLoaded={({ index, }) => false}  />
        </div>
        </Stack>

  

      </Box>
    </Box>
  );
};
