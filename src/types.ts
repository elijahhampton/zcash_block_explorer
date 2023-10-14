interface ITableColumn<T> {
  key: keyof T; // The key in the row object
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
  dateMined: string;
  numTxs: string;
  size: number;
  output: number;
};

export { BlockData, type ITableColumn, ITableProps };
