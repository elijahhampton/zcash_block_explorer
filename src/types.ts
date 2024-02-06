interface ITableColumn<T> {
  dataKey: keyof T; // The key in the row object
  label: string; // The column label/header
  width: string;
  style: any;
  render: (item: T) => React.ReactNode; // A function to render the cell content
}

interface ITableProps<T> {
  data: T[]; // The array of row objects
  columns: Array<ITableColumn<T>>; // The configuration for each column
}

type BlockData = {
  height: string;
  hash: string;
  timestamp: string;
  num_transactions: string;
  size: number;
  output: number;
  confirmations?: number;
  transactions?: Array<TransactionData>;
  outputs: Array<any>;
  inputs: Array<any>;
};

type TransactionData = {
  txid: string;
  sender: number;
  public_output: number;
  fees: number;
  hash: number;
  timestamp: string;
  height: number;
}

export { type TransactionData, type BlockData, type ITableColumn, type ITableProps };
