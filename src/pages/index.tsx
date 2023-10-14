import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import Table from '../components/Table'
import Footer from '../components/Footer'
import NavigationBar from '../components/NavigationBar'
import { Typography, Box, Avatar, Stack } from '@mui/joy'
import React from 'react'
import BlockTable from '../containers/BlockTable'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
      <Head>
        <title>Block Explorer</title>
        <meta name="description" content="A highly personalized block explorer." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <NavigationBar />
        <Stack spacing={2} width='100%' alignItems='flex-start'>
          <BlockTable />
          <BlockTable />
        </Stack>
        <Footer /> 
      </main>
    </>
  )
}