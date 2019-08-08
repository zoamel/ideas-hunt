import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const NotFound = () => {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <Typography variant="h3">404 - Page Not Found</Typography>
      </Grid>
    </Grid>
  )
}

export default NotFound
