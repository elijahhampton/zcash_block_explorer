import { useState } from "react";
import BlockTable from "../containers/BlockTable";
import { BlockData } from "../types";
import { apiRoutes, baseUrl } from "../constants/api-routes";
import { Box } from '@mui/material'

interface IBlocksPage {
    initialBlocksData: Array<BlockData>;
}

const LIMIT = 50;
export default function BlocksPage({ initialBlocksData = [] }: IBlocksPage) {
    const [blockPage, setBlockPage] = useState<number>(1);
    const [blockData, setBlockData] = useState<Array<any>>(initialBlocksData);

    const loadMoreBlockRows = async ({ startIndex, stopIndex }) => {
        // Increment the page since we're fetching the next set of data
        const nextPage = blockPage + 1;
    
        try {
          const response = await fetch(
            `${baseUrl}${apiRoutes.blocksRoute}?page=${nextPage}&limit=${LIMIT}&reversedOrder=${true}`
          );
          const newData = await response.json();
    
          setBlockData((prevData) => [...prevData, ...newData]);
    
          setBlockPage(nextPage);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      const isRowBlockRowLoaded = ({ index }) => {
        return !!blockData[index];
      };
    
    return (
        <Box sx={{ paddingTop: '60px', display: 'flex', height: '100vh' }}>

        <BlockTable
        loadMoreRows={loadMoreBlockRows}
        isRowLoaded={isRowBlockRowLoaded}
        data={blockData}
        useQueryProps={{ isFetching: false }}
      />
      </Box>
    )
}

export async function getServerSideProps() {
  try {
    const initialDataResolved = await Promise.all<Response>([
      fetch(`${baseUrl}${apiRoutes.blocksRoute}?page=${1}&limit=${LIMIT}&reversedOrder=${true}`).then(
        (res) => res.json()
      )
    ]);
    
    return {
      props: {
        initialBlocksData: initialDataResolved[0],
      },
    };
  } catch (error) {
    console.log(error)
    return {
      props: {
        initialBlocksData: [],
      },
    };
  }
}

