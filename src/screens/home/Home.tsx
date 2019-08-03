import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import HowToVoteIcon from '@material-ui/icons/HowToVote'

import * as ROUTES from 'constants/routes'
import rootStore from 'stores/rootStore'
import AdapterLink from 'components/ui/AdapterLink'
import EmptyState from './components/EmptyState'
import IdeaCard from './components/IdeaCard'
import { Container } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageTitle: {
      marginTop: theme.spacing(4),
    },
    headerContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
  }),
)

const Home: React.FC = observer(() => {
  const store = useContext(rootStore)
  const classes = useStyles()

  useEffect(() => {
    store.ideas.getOwnIdeas()

    // eslint-disable-next-line
  }, [])

  if (store.ideas.isPending) {
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  if (store.ideas.hasError) {
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Typography variant="h4" component="h2" color="error">
            {store.ideas.error}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  if (store.ideas.ideas.length === 0) {
    return <EmptyState />
  }

  return (
    <Container component="main" maxWidth="md">
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Grid
            container
            spacing={3}
            justify="space-between"
            alignItems="center"
            className={classes.headerContainer}
          >
            <Grid item>
              <Typography variant="h4">Your Ideas</Typography>
            </Grid>

            <Grid item>
              <Button
                component={AdapterLink}
                variant="contained"
                color="primary"
                to={ROUTES.ADD_IDEA}
              >
                Add New
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          {store.ideas.ideas.map(idea => (
            <IdeaCard key={idea.ideaId} idea={idea} icon={<HowToVoteIcon />} />
          ))}
        </Grid>
      </Grid>
    </Container>
  )
})

export default Home
