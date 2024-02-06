import { Box, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Area,
} from "recharts";

interface ITransactionMetrics {
  startTimestamp: string | Date;
  endTimestamp: string | Date;
  data: Array<{ [timestamp: string]: number }>;
}

interface CustomAxisLabelProps {
  axisType: string;
  x?: string;
  y?: string;
  width?: number;
  height?: number;
  stroke?: string;
  payload?: any;
}

const CustomAxisLabel = ({
  axisType,
  x,
  y,
  width,
  height,
  stroke,
  payload,
}: CustomAxisLabelProps) => {
  if (!payload || !payload.value) {
    return;
  }

  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      dy={axisType === "x" ? 15 : -10}
      fill="#FFF" 
      fontSize={14}
      textAnchor="middle"
      dominantBaseline={axisType === "x" ? "middle" : "ideographic"}
    >
      
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper variant='outlined' sx={{ bgcolor: '#FFF', p: 2 }}> 
        <Typography variant='caption' sx={{ color: 'rgb(33, 33, 33)'}}>
          On {payload[0].payload.timestamp} the zcash blockchain experienced {payload[0].payload.transaction_count} transactions.
        </Typography>
      </Paper>
    );
  }

  return null;
};


const TransactionHistoryGraph = (props: ITransactionMetrics) => {
  const { startTimestamp, endTimestamp, data } = props;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart
        height={200}
        data={data}
        margin={{
          left: -18,
          right: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgb(55, 131, 190)" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis
          tickLine={false}
          axisLine={false}
          dataKey="timestamp"
          fontSize={12}
          tickMargin={14}
          tickFormatter={(val, idx) => format(new Date(val), "MMM d, yyyy")}
        />
        <YAxis
          dataKey="transaction_count"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          label={<CustomAxisLabel axisType="y" />}
        />
        {/* @ts-ignore */}
        <Tooltip content={<CustomTooltip />} />

        <Line
          type="monotone"
          unit="M"
          strokeLinecap="round"
          strokeWidth={1}
          dataKey="transaction_count"
          stroke="rgb(55, 131, 190)"
          dot={false}
          legendType="none"
        />
        <Area
          type="monotone"
          dataKey="transaction_count"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TransactionHistoryGraph;
