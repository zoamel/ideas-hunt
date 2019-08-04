import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

import * as ROUTES from 'constants/routes'
import rootStore from 'stores/rootStore'
import { Idea } from 'interfaces/ideas'
import AdapterLink from 'components/ui/AdapterLink'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
    },
  }),
)
//#endregion

//#region Types
type Props = {
  idea: Idea
  onStartEdit: () => void
}
//#endregion

const Show: React.FC<Props> = observer(({ idea, onStartEdit }) => {
  const classes = useStyles()
  const store = useContext(rootStore)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { user } = store.user
  const { isLoggedIn } = store.auth
  const isOwner = user && user.username === idea.username
  const isNotOwner = user && user.username !== idea.username

  function handleDeleteIdea() {
    store.ideas.deleteIdea()
  }

  function handleShowDeleteModal() {
    setShowDeleteModal(true)
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false)
  }

  function handleUpvote() {
    store.ideas.voteIdea()
  }

  return (
    <Container maxWidth="md">
      {isLoggedIn && (
        <Grid container spacing={3} justify="space-between" alignItems="center">
          <Grid item>
            <Button
              component={AdapterLink}
              variant="outlined"
              color="secondary"
              to={ROUTES.HOME}
            >
              Go Back
            </Button>
          </Grid>

          {isOwner && (
            <Grid item>
              <Grid container spacing={3}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onStartEdit}
                  >
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleShowDeleteModal}
                  >
                    Delete
                  </Button>
                  <Dialog
                    open={showDeleteModal}
                    onClose={handleCloseDeleteModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Idea removal
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete idea:{' '}
                        <strong>{idea.title}</strong>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleCloseDeleteModal}
                        color="secondary"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleDeleteIdea} color="primary">
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
          )}

          {isNotOwner && (
            <Grid item>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Fab
                    onClick={handleUpvote}
                    variant="extended"
                    size="medium"
                    color="primary"
                  >
                    <ArrowDropUpIcon />
                    Upvote
                  </Fab>
                </Grid>
                <Grid item>
                  <Typography variant="h5" color="textSecondary">
                    {idea.voteCount}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}

      <Grid container spacing={3} direction="column" className={classes.root}>
        <Grid item>
          <Typography variant="h4" component="h1">
            {idea.title}
          </Typography>
        </Grid>

        {idea.url && (
          <Grid item>
            <Link href={idea.url}>{idea.url}</Link>
          </Grid>
        )}

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
      </Grid>
    </Container>
  )
})

export default Show
