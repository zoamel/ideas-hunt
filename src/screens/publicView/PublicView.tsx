import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

import rootStore from 'stores/rootStore'
import * as ROUTES from 'constants/routes'
import AdapterLink from 'components/common/AdapterLink'
import ProgressSpinner from 'components/ui/ProgressSpinner'
import PageError from 'components/ui/PageError'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      marginTop: theme.spacing(2),
    },
    root: {
      paddingTop: theme.spacing(3),
    },
    paperContainer: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(0, 3, 3),
    },
    paperActions: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(3),
    },
    votesInfoContainer: {
      paddingTop: theme.spacing(3),
    },
    errorContainer: {
      marginTop: theme.spacing(2),
    },
    upvoteIcon: {
      marginRight: theme.spacing(1),
    },
    votesNumber: {
      fontWeight: 700,
      color: theme.palette.primary.dark,
      fontSize: theme.typography.h4.fontSize,
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    fabProgress: {
      position: 'absolute',
      top: -5,
      left: -5,
      zIndex: 1,
    },
  }),
)
//#endregion

//#region Types
type MatchParams = {
  id: string
}

type Props = RouteComponentProps<MatchParams>
//#endregion

const PublicView: React.FC<Props> = observer(({ match }) => {
  const classes = useStyles()
  const store = useContext(rootStore)

  const {
    idea,
    isPending,
    isVoting,
    hasGeneralError,
    generalError,
  } = store.ideas

  const { isLoggedIn } = store.auth

  useEffect(() => {
    const ideaId = match.params.id as string

    store.ideas.getIdea(ideaId)
    //eslint-disable-next-line
  }, [])

  function handleUpvote() {
    store.ideas.voteIdea()
  }

  if (isPending) {
    return <ProgressSpinner />
  }

  if (hasGeneralError) {
    return <PageError message={generalError} />
  }

  if (!idea) {
    return null
  }

  return (
    <Container maxWidth="md">
      <Paper square className={classes.paperActions}>
        <Grid container spacing={3} justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h1">
              {idea.title}
            </Typography>
          </Grid>
          <Grid item>
            {isLoggedIn ? (
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpvote}
                        disabled={isVoting}
                      >
                        {isVoting ? 'Voting...' : 'Upvote'}
                        <ThumbUpIcon
                          fontSize="small"
                          className={classes.rightIcon}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Button
                component={AdapterLink}
                to={ROUTES.SIGN_IN}
                variant="outlined"
                color="primary"
              >
                Login to vote
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.votesInfoContainer}
      >
        <Typography variant="h5" color="textSecondary">
          Idea liked by{' '}
          <span className={classes.votesNumber}>{idea.voteCount}</span> people
        </Typography>
      </Grid>

      <Paper elevation={2} className={classes.paperContainer}>
        <Grid container spacing={3} direction="column" className={classes.root}>
          <Grid item>
            <Typography variant="h5" component="h2" color="textSecondary">
              {idea.tagline}
            </Typography>
          </Grid>

          <Grid item>
            <Typography style={{ whiteSpace: 'pre-line' }}>
              {idea.description}
            </Typography>
          </Grid>

          {idea.url && (
            <Grid item>
              <Link href={idea.url}>{idea.url}</Link>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  )
})

export default PublicView
