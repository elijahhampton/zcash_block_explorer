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

// bits: '1f07ffff',
// chainwork: '0000000000000000000000000000000000000000000000000000000000004000',
// difficulty: '1',
// hash: '0007bc227e1c57a4a70e237cad00e7b7ce565155ab49166bc57397a26d339283',
// height: '1',
// merkle_root: '851bf6fbf7a976327817c738c489d7fa657752445430922d94c983c0b9ed4609',
// nonce: '9057977ea6d4ae867decc96359fcf2db8cdebcbfb3bd549de4f21f16cfe83475',
// num_transactions: '1',
// output: '0.000625',
// size: '1617',
// timestamp: '1477671596',
// transaction_ids: '{851bf6fbf7a976327817c738c489d7fa657752445430922d94c983c0b9ed4609}',
// version: '4'

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
