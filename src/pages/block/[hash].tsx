import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Fade,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";
import {
  ContentCopyRounded,
  InfoOutlined,
  LaunchRounded,
} from "@mui/icons-material";
import TransactionsTable from "../../containers/TransactionsTable";
import { BlockData } from "../../types";
import {
  fetchBlockByHash,
  fetchInputsByTransactionHash,
  fetchOutputsByTransactionHash,
  fetchTransactionsDetailsFromIds,
} from "../../constants/api-routes";
import { GetServerSideProps } from "next";
import { parseTransactionIdsInBlockData } from "../../utility/parse";
import moment from "moment";
import { test_SECONDARY_ACCENT_COLOR } from "../../constants/color";
import { TOOLTIP_DESCRIPTIONS } from "../../constants/text";
import PageHead from "../../components/PageHead";
import { format, formatDistanceToNow } from "date-fns";

const listItemTextPrimaryProps = {
  fontWeight: "400",
  color: "#0C1425",
};

const listItemTextSecondaryProps = {
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "#808080"
};

const cardHeaderProps: TypographyProps = {
  color: test_SECONDARY_ACCENT_COLOR,
  fontWeight: "500",
};

interface IBlockPage {
  block: BlockData;
}

const StyledCopyContentIcon = styled(ContentCopyRounded)(({ theme }) => {
  return {
    width: 16,
    height: 16,
    color: "text.secondary",
    cursor: "pointer",
  };
});

const StyledInformationOutlinedIcon = styled(InfoOutlined)(({ theme }) => {
  return {
    width: 16,
    height: 16,
    color: "text.secondary",
    cursor: "pointer",
  };
});

export default function BlockPage({ block }: IBlockPage) {
  console.log(typeof block)
  return (
    <Container maxWidth="xl" sx={{ paddingTop: "78px", paddingBottom: "20px" }}>
      <PageHead
        title="Voyager Block Explorer - Blockchain Block"
        description="View block information."
        content="View block details and data."
      />

      <Box
        sx={{
          pt: 3,

          height: "100%",
        }}
      >
        <Stack spacing={4}>
          <div>
            <Typography
              variant="h6"
              sx={{ color: test_SECONDARY_ACCENT_COLOR, pb: 2, pt: 0.5 }}
            >
              Block #{block["height"]} mined ({formatDistanceToNow(block['timestamp'] * 1000, { addSuffix: true })}) on {format(block['timestamp'] * 1000, 'MMMM d, yyyy')}
            </Typography>
            <Divider />
            <Stack spacing={1} pt={1}>
              <Typography color='text.primary' variant="caption">
                * Timestamps are presented in Unix format, representing the
                number of seconds elapsed since January 1, 1970 (UTC).
              </Typography>

              <Typography color='text.primaryBlock' variant="caption">
                * This explorer provides a transparent view of all transactions,
                which are publicly recorded on the blockchain.
              </Typography>
            </Stack>

            <Stack
              py={2}
              spacing={3}
              direction="row"
              alignItems="flex-start"
              width="100%"
              sx={{ height: 'auto' }}
            >
              <Card
                sx={{
                  height: '350px',
                  bgcolor: "#FFF",
                  width: "100%",
                }}
                variant="outlined"
              >
                <CardContent>
                  <Typography variant="subtitle1" {...cardHeaderProps}>
                    Block Data
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Grid direction="column" container spacing={2}>
                    <Grid item>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography {...listItemTextPrimaryProps}>
                          Hash
                        </Typography>

                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                          title={TOOLTIP_DESCRIPTIONS.block_hash}
                        >
                          <StyledInformationOutlinedIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </Tooltip>

                        <IconButton size="small">
                          <StyledCopyContentIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </IconButton>
                      </Stack>

                      <Typography {...listItemTextSecondaryProps}>
                        {block["hash"] ?? "-"}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography {...listItemTextPrimaryProps}>
                          Mined on (UTC)
                        </Typography>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                          title={TOOLTIP_DESCRIPTIONS.block_timestamp}
                        >
                          <StyledInformationOutlinedIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </Tooltip>
                        <IconButton size="small">
                          <StyledCopyContentIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </IconButton>
                      </Stack>
                      <Typography {...listItemTextSecondaryProps}>
                        {moment
                          .utc(Number(block["timestamp"]) * 1000)
                          .format("YYYY-MM-DD | HH:mm:ss") ?? "-"}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography {...listItemTextPrimaryProps}>
                          Height
                        </Typography>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                          title={TOOLTIP_DESCRIPTIONS.block_height}
                        >
                          <StyledInformationOutlinedIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </Tooltip>

                        <IconButton size="small">
                          <StyledCopyContentIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </IconButton>
                      </Stack>
                      <Typography {...listItemTextSecondaryProps}>
                        {block["height"] ?? "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card
                sx={{
                  height: '350px',
                  bgcolor: "#FFF",
                  width: "100%",
                }}
                variant="outlined"
              >
                <CardContent>
                  <Typography {...cardHeaderProps}>Economic Details</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Grid direction="column" container spacing={2}>
                    <Grid item>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography {...listItemTextPrimaryProps}>
                          Transaction Count
                        </Typography>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                          title={TOOLTIP_DESCRIPTIONS.block_num_transactions}
                        >
                          <StyledInformationOutlinedIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </Tooltip>
                        <IconButton size="small">
                          <StyledCopyContentIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </IconButton>
                      </Stack>
                      <Typography {...listItemTextSecondaryProps}>
                        {block["num_transactions"] ?? "-"}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography {...listItemTextPrimaryProps}>
                          Total Block Output ({block["num_outputs"] ?? "-"}{" "}
                          Outputs)
                        </Typography>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                          title={TOOLTIP_DESCRIPTIONS.block_total_block_output}
                        >
                          <StyledInformationOutlinedIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </Tooltip>
                        <IconButton size="small">
                          <StyledCopyContentIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </IconButton>
                      </Stack>

                      <Typography
                        {...listItemTextSecondaryProps}
                        sx={{
                          color: "secondary.main",
                          fontWeight: (theme) =>
                            theme.typography.fontWeightMedium,
                        }}
                      >
                        {block["total_block_output"] ?? "-"} ZEC
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography {...listItemTextPrimaryProps}>
                          Total Block Input ({block["num_inputs"] ?? "-"}{" "}
                          Inputs)
                        </Typography>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                          title={TOOLTIP_DESCRIPTIONS.block_total_block_input}
                        >
                          <StyledInformationOutlinedIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </Tooltip>
                        <IconButton size="small">
                          <StyledCopyContentIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </IconButton>
                      </Stack>

                      <Typography color="text.primary">
                        <Typography
                          {...listItemTextSecondaryProps}
                          sx={{
                            color: "secondary.main",
                            fontWeight: (theme) =>
                              theme.typography.fontWeightMedium,
                          }}
                        >
                          {block["total_block_input"] ?? "-"} ZEC
                        </Typography>
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography {...listItemTextPrimaryProps}>
                          Fees
                        </Typography>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                          title={"Block fees"}
                        >
                          <StyledInformationOutlinedIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </Tooltip>
                        <IconButton size="small">
                          <StyledCopyContentIcon
                            fontSize="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: "text.secondary",
                            }}
                          />
                        </IconButton>
                      </Stack>
                      <Typography
                        {...listItemTextSecondaryProps}
                        sx={{
                          color: "secondary.main",
                          fontWeight: (theme) =>
                            theme.typography.fontWeightMedium,
                        }}
                      >
                        {"-"} ZEC
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Stack>

            <Card sx={{ bgcolor: "#FFF" }} variant="outlined">
              <CardContent>
                <Typography {...cardHeaderProps}>Technical Details</Typography>
                <Divider sx={{ my: 1 }} />
                <Grid direction="row" container spacing={5}>
                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography {...listItemTextPrimaryProps}>
                        Difficulty
                      </Typography>
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={TOOLTIP_DESCRIPTIONS.block_difficulty}
                      >
                        <StyledInformationOutlinedIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </Tooltip>
                      <IconButton size="small">
                        <StyledCopyContentIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </IconButton>
                    </Stack>
                    <Typography
                      color="text.primary"
                      {...listItemTextSecondaryProps}
                    >
                      {block["difficulty"] ?? "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography {...listItemTextPrimaryProps}>
                        Size
                      </Typography>
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={TOOLTIP_DESCRIPTIONS.block_size}
                      >
                        <StyledInformationOutlinedIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </Tooltip>
                      <IconButton size="small">
                        <StyledCopyContentIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </IconButton>
                    </Stack>
                    <Typography
                      color="text.primary"
                      {...listItemTextSecondaryProps}
                    >
                      {block["size"] ?? "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography {...listItemTextPrimaryProps}>
                        Version
                      </Typography>
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={TOOLTIP_DESCRIPTIONS.block_version}
                      >
                        <StyledInformationOutlinedIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </Tooltip>
                      <IconButton size="small">
                        <StyledCopyContentIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </IconButton>
                    </Stack>
                    <Typography
                      color="text.primary"
                      {...listItemTextSecondaryProps}
                    >
                      {block["version"] ?? "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography {...listItemTextPrimaryProps}>
                        Chainwork
                      </Typography>
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={TOOLTIP_DESCRIPTIONS.block_chainwork}
                      >
                        <StyledInformationOutlinedIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </Tooltip>
                      <IconButton size="small">
                        <StyledCopyContentIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </IconButton>
                    </Stack>
                    <Typography
                      color="text.primary"
                      {...listItemTextSecondaryProps}
                    >
                      {block["chainwork"] ?? "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography {...listItemTextPrimaryProps}>
                        Bits
                      </Typography>
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={TOOLTIP_DESCRIPTIONS.block_bits}
                      >
                        <StyledInformationOutlinedIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </Tooltip>
                      <IconButton size="small">
                        <StyledCopyContentIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </IconButton>
                    </Stack>
                    <Typography
                      color="text.primary"
                      {...listItemTextSecondaryProps}
                    >
                      {block["bits"] ?? "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography {...listItemTextPrimaryProps}>
                        Merkle Root
                      </Typography>
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={TOOLTIP_DESCRIPTIONS.block_merkle_root}
                      >
                        <StyledInformationOutlinedIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </Tooltip>
                      <IconButton size="small">
                        <StyledCopyContentIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </IconButton>
                    </Stack>
                    <Typography
                      color="text.primary"
                      {...listItemTextSecondaryProps}
                    >
                      {block["merkle_root"] ?? "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography {...listItemTextPrimaryProps}>
                        Raw Timestamp
                      </Typography>
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title={TOOLTIP_DESCRIPTIONS.block_timestamp}
                      >
                        <StyledInformationOutlinedIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </Tooltip>
                      <IconButton size="small">
                        <StyledCopyContentIcon
                          fontSize="small"
                          sx={{
                            width: 16,
                            height: 16,
                            color: "text.secondary",
                          }}
                        />
                      </IconButton>
                    </Stack>
                    <Typography
                      color="text.primary"
                      {...listItemTextSecondaryProps}
                    >
                      {block["timestamp"] ?? "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Button size='small' variant="outlined" endIcon={<LaunchRounded />}>
                      Export raw JSON
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>

          <div>
            <Typography variant="h6" {...cardHeaderProps}>
              Transactions
            </Typography>
            <Divider sx={{ my: 1 }} />
            <TransactionsTable
              minHeight="300px"
              data={block["transactions"] ?? []}
              loadMoreRows={async ({ startIndex, stopIndex }) => {}}
              useQueryProps={{ isFetching: false }}
              rowCount={block["transactions"]?.length ?? 0}
              isRowLoaded={({ index }) => false}
            />
          </div>
        </Stack>
      </Box>
    </Container>
  );
}

// TODO: For confirmations when the page load run a timer that counts the block process time
// and display a warning symbol nexy to the confirmations number for a user to refresh confirmation

export const getServerSideProps = (async (context) => {
  try {
    const { hash } = context.params;

    if (!hash) {
      throw new Error(`Invalid hash found while navigating`);
    }

    const block = JSON.parse(await fetchBlockByHash(String(hash)))

    const transaction_ids = parseTransactionIdsInBlockData(
      String(block["transaction_ids"])
    );
    const transactions = await fetchTransactionsDetailsFromIds(transaction_ids);

    let outputs = [];
    let inputs = [];

    for (const id of transaction_ids) {
      outputs = outputs.concat(await fetchOutputsByTransactionHash(id));
      inputs = inputs.concat(await fetchInputsByTransactionHash(id));
    }

    return {
      props: {
        block: {
          ...block,
          transactions,
          inputs,
          outputs,
          confirmations: 0,
        },
      },
    };
  } catch (error) {
    console.log(
      `Error emitted in block/[hash].tsx (getServerSideProps): `,
      error
    );
    return {
      props: {
        block: {},
      },
    };
  }
}) satisfies GetServerSideProps<{
  block: BlockData;
}>;
