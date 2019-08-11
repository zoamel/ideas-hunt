import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import HowToVoteIcon from '@material-ui/icons/HowToVote'

import * as ROUTES from 'constants/routes'
import rootStore from 'stores/rootStore'
import AdapterLink from 'components/common/AdapterLink'
import ProgressSpinner from 'components/ui/ProgressSpinner'
import PageError from 'components/ui/PageError'
import EmptyState from './components/EmptyState'
import IdeaCard from './components/IdeaCard'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
  }),
)
//#endregion

const Home: React.FC = observer(() => {
  const store = useContext(rootStore)
  const classes = useStyles()

  useEffect(() => {
    store.ideas.getOwnIdeas()
    store.ideas.clearSelectedIdea()
    // eslint-disable-next-line
  }, [])

  const { isPending, hasGeneralError, generalError, ideas } = store.ideas

  if (isPending) {
    return <ProgressSpinner />
  }

  if (hasGeneralError) {
    return <PageError message={generalError} />
  }

  if (ideas.length === 0) {
    return <EmptyState />
  }

  return (
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
        {ideas.map(idea => (
          <IdeaCard key={idea.ideaId} idea={idea} icon={<HowToVoteIcon />} />
        ))}
      </Grid>
    </Grid>
  )
})

export default Home
