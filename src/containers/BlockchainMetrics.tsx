import { Stack, Card, CardContent, Box, Typography, styled } from "@mui/material"
import { test_SECONDARY_ACCENT_COLOR } from "../constants/color"

interface IBlockchainMetrics {
 orchardPoolValue: string;
 totalTransactions: string;
 totalBlocks: string;
 chainSize: string;
 totalChainValue: number;
}

const ChainInfoMetricTitle = styled(Typography)(({ theme }) => ({
    fontSize: "0.9rem",
    color: "text.secondary",
  }));

const BlockchainMetrics = (props: IBlockchainMetrics) => {
    const { orchardPoolValue, totalTransactions, totalBlocks, chainSize, totalChainValue } = props
    return (
        <Stack mt={4} spacing={2} direction="row" alignItems="center">
        <Card
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: "#FFF" }}
       
        >
          <CardContent>
            <Stack spacing={2} direction="row" alignItems="center">
              <Box>
                <ChainInfoMetricTitle variant="body2" color="text.secondary">
                  Orchard Pool
                </ChainInfoMetricTitle>

                <Typography
                  fontWeight="medium"
                  fontSize={13}
                  sx={{ color: test_SECONDARY_ACCENT_COLOR }}
                >
                  {orchardPoolValue}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: "#FFF" }}
        >
          <CardContent>
            <Stack spacing={2} direction="row" alignItems="center">
              <Box>
                <ChainInfoMetricTitle variant="body2" color="text.secondary">
                  Total Transactions
                </ChainInfoMetricTitle>

                <Typography
                  fontWeight="medium"
                  fontSize={13}
                  sx={{ color: test_SECONDARY_ACCENT_COLOR }}
                >
                  {totalTransactions}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: "#FFF" }}
        >
          <CardContent>
            <Stack spacing={2} direction="row" alignItems="center">
              <Box>
                <ChainInfoMetricTitle variant="body2" color="text.secondary">
                  Total Blocks
                </ChainInfoMetricTitle>

                <Typography
                  fontWeight="medium"
                  fontSize={13}
                  sx={{ color: test_SECONDARY_ACCENT_COLOR }}
                >
               {totalBlocks}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: "#FFF" }}
        >
          <CardContent>
            <Stack spacing={2} direction="row" alignItems="center">
              <Box>
                <ChainInfoMetricTitle variant="body2" color="text.secondary">
                  Total Value
                </ChainInfoMetricTitle>

                <Typography
                  fontWeight="medium"
                  fontSize={13}
                  sx={{ color: test_SECONDARY_ACCENT_COLOR }}
                >
                  {totalChainValue}{" "}
                  ZEC
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: "#FFF" }}
        >
          <CardContent>
            <Stack spacing={2} direction="row" alignItems="center">
              <Box>
                <ChainInfoMetricTitle variant="body2" color="text.secondary">
                  Blockchain Size (GB)
                </ChainInfoMetricTitle>

                <Typography
                  fontWeight="medium"
                  fontSize={13}
                  sx={{ color: test_SECONDARY_ACCENT_COLOR }}
                >
                  {chainSize}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    )
}

export default BlockchainMetrics