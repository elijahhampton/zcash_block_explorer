import React, { useEffect } from 'react'
import { Stack, Link, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const LinkGroup = () => {
    return (
        <Stack spacing={1} direction="row" alignItems="center">
            <Link href="/" style={{ color: "black", fontWeight: "500" }}>
              <Typography
                variant="subtitle2"
                sx={{
                    cursor: 'pointer',
                  textDecoration: "none", // Removes the underline from the link
                  color: "#000000", // Uses the primary color from the theme
                  fontWeight: "medium", // Medium weight for the text
                  borderRadius: "4px", // Slightly rounded corners for a soft look
                  padding: "6px 12px", // Some padding around the text
                  "&:hover": {
                    color: "#DAA520", // Darkens the text color slightly on hover
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)", // Adds a soft glow when the link is focused
                  },
                  "&:active": {
                    color: "primary.light", // Lightens the text color when clicked
                  },
                }}
              >
                Explore
              </Typography>
            </Link>

            <Link href="/blocks" style={{ color: "black", fontWeight: "500" }}>
              <Typography
                variant="subtitle2"
                sx={{
                    cursor: 'pointer',
                  textDecoration: "none", // Removes the underline from the link
                  color: "#000", // Uses the primary color from the theme
                  fontWeight: "medium", // Medium weight for the text
                  borderRadius: "4px", // Slightly rounded corners for a soft look
                  padding: "6px 12px", // Some padding around the text
                  "&:hover": {
                    color: "#DAA520", // Darkens the text color slightly on hover
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)", // Adds a soft glow when the link is focused
                  },
                  "&:active": {
                    color: "primary.light", // Lightens the text color when clicked
                  },
                }}
              >
                Blocks
              </Typography>
            </Link>
            <Link href="/transactions" style={{ fontWeight: "500" }}>
              <Typography
                variant="subtitle2"
                sx={{
                   cursor: 'pointer',
                  textDecoration: "none", // Removes the underline from the link
                  color: "#000", // Uses the primary color from the theme
                  fontWeight: "medium", // Medium weight for the text
                  borderRadius: "4px", // Slightly rounded corners for a soft look
                  padding: "6px 12px", // Some padding around the text
                  "&:hover": {
                    color: "#DAA520", // Darkens the text color slightly on hover
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)", // Adds a soft glow when the link is focused
                  },
                  "&:active": {
                    color: "primary.light", // Lightens the text color when clicked
                  },
                }}
              >
                Transactions
              </Typography>
            </Link>
          </Stack>
    )
}

export default LinkGroup