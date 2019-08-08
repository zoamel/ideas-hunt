import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      marginTop: theme.spacing(2),
    },
  }),
)
//#endregion

const ProgressSpinner = () => {
  const classes = useStyles()

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <CircularProgress className={classes.loader} />
      </Grid>
    </Grid>
  )
}

export default ProgressSpinner
