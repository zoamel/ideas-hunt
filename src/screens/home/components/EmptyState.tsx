import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import EmptyStateImage from 'assets/user_ideas_empty_state.png'
import AdapterLink from 'components/ui/AdapterLink'
import * as ROUTES from 'constants/routes'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
    },
    mainImage: {
      width: 300,
    },
    mainCTA: {
      fontWeight: theme.typography.fontWeightBold,
    },
  }),
)

const EmptyState: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h4" component="h3" className={classes.mainCTA}>
          Start by adding an idea
        </Typography>
      </Grid>
      <Grid item>
        <img
          src={EmptyStateImage}
          alt="Person standing in front of a whiteboard"
          className={classes.mainImage}
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" color="textSecondary">
          Create your first project idea, share it with people and get instant
          feedback
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={AdapterLink}
          variant="contained"
          color="primary"
          to={ROUTES.ADD_IDEA}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  )
}

export default EmptyState
