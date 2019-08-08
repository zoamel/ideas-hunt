import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import format from 'date-fns/format'
import { observer } from 'mobx-react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { Idea } from 'interfaces/ideas'
import * as ROUTES from 'constants/routes'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 75,
      padding: theme.spacing(2, 3),
      marginBottom: theme.spacing(2),
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: theme.palette.grey['100'],
      },
    },
  }),
)
//#endregion

//#region Types
type Props = RouteComponentProps & {
  idea: Idea
  icon: React.ReactNode
}
//#endregion

const IdeaCard: React.FC<Props> = observer(({ idea, icon, history }) => {
  const classes = useStyles()
  const updateAtDate = format(idea.updatedAt, 'YYYY-MM-DD HH:mm')

  function handleClick() {
    history.push(`${ROUTES.SHOW_IDEA_BASE}/${idea.ideaId}`)
  }

  return (
    <Paper className={classes.root} onClick={handleClick} elevation={3}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={1}>
          <Avatar>{icon}</Avatar>
        </Grid>

        <Grid item xs>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6" component="h5">
                {idea.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom>
                {idea.tagline}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" color="textSecondary">
                Last modified at: {updateAtDate}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={1}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="caption" color="textSecondary">
                Votes
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="span">
                {idea.voteCount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
})

export default withRouter(IdeaCard)
