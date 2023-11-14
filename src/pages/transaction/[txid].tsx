import React from "react";
import { Box, Typography, Grid, styled, Stack, Divider } from "@mui/material";
import { ListItemDetailHeaderTypography, ListItemDetailSecondaryTypography } from "../../styled/typography.styled";

export default () => {
  return (
    <Box sx={{ paddingTop: "78px" }}>
      <Box px={8} py={3} sx={{ bgcolor: "#FFF" }}>
        <Box pb={2.5}>
          <Typography variant="h6" sx={{ py: 1, color: "#3e5a5b" }}>
            Transaction Details
          </Typography>
          <Divider />
        </Box>

        <Grid direction="row" container spacing={5}>
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
            <ListItemDetailHeaderTypography sx={{ color: "#679598" }}>
              Confirmations
            </ListItemDetailHeaderTypography>
            <ListItemDetailSecondaryTypography
              sx={{ fontSize: 22, fontWeight: "bold" }}
            >
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
      </Box>

      <Box px={8} py={5} sx={{ bgcolor: "#fafafa" }}>
        <Box pb={2.5}>
          <Typography variant="h6" sx={{ py: 1, color: "#3e5a5b" }}>
            Economic Details
          </Typography>
          <Divider />
        </Box>

        <Grid container>
          <Grid item xs={6}>
            <Typography pb={2} color="text.primary" fontWeight="medium">
              Public Inputs
            </Typography>
            {new Array(1).fill(-1).map((item) => {
              return (
                <Stack
                  sx={{ width: "100%" }}
                  direction="row"
                  alignItems="center"
                  spacing={25}
                >
                  <Typography color="text.primary">
                    tg0923fu098ewfh239f8hf
                  </Typography>
                  <Typography fontWeight="medium" color="secondary.main">
                    2.52000608 ZEC
                  </Typography>
                </Stack>
              );
            })}
          </Grid>

          <Grid item xs={6}>
            <Typography pb={2} color="text.primary" fontWeight="medium">
              Public Outputs
            </Typography>
            <Stack spacing={1}>
              {new Array(3).fill(-1).map((item) => {
                return (
                  <Stack
                    sx={{ width: "100%" }}
                    direction="row"
                    alignItems="center"
                    spacing={25}
                  >
                    <Typography color="text.primary">
                      tg0923fu098ewfh239f8hf
                    </Typography>
                    <Typography fontWeight="medium" color="secondary.main">
                      2.52000608 ZEC
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Box px={8} py={3} sx={{ bgcolor: "#FFF" }}>
        <Box pb={2.5}>
          <Typography variant="h6" sx={{ py: 1, color: "#3e5a5b" }}>
            Blockchain Features / Technical Data
          </Typography>
          <Divider />
        </Box>

        <Grid direction="row" container spacing={5}>
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
      </Box>
    </Box>
  );
};
