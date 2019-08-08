import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//#region Types
type Props = {
  message: string | null
}
//#endregion

const PageError: React.FC<Props> = ({ message = 'Error' }) => {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <Typography color="error" variant="h5" component="p">
          {message}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PageError
