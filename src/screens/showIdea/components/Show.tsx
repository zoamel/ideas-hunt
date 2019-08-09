import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
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
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import LaunchIcon from '@material-ui/icons/Launch'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'

import * as ROUTES from 'constants/routes'
import rootStore from 'stores/rootStore'
import { Idea } from 'interfaces/ideas'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
    },
    paperActions: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1, 3),
    },
    paperContainer: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(0, 3, 3),
    },
    votesInfoContainer: {
      paddingTop: theme.spacing(3),
    },
    votesNumber: {
      fontWeight: 700,
      color: theme.palette.primary.dark,
      fontSize: theme.typography.h4.fontSize,
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  function handleDeleteIdea() {
    store.ideas.deleteIdea()
  }

  function handleShowDeleteModal() {
    setShowDeleteModal(true)
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false)
  }

  function handleOpenMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleCloseMenu() {
    setAnchorEl(null)
  }

  function openPublicView() {
    // TODO: Move this to a modal with copy option
    window.open(`${ROUTES.PUBLIC_VIEW_BASE}/${idea.ideaId}`)
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
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Tooltip title="Open sharable view">
                  <IconButton
                    onClick={openPublicView}
                    aria-label="Open sharable view"
                  >
                    <LaunchIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="idea menu"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              </Grid>

              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={onStartEdit}>Edit</MenuItem>
                <MenuItem onClick={handleShowDeleteModal}>Delete</MenuItem>
              </Menu>

              <Dialog
                open={showDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
              >
                <DialogTitle id="dialog-title">Idea removal</DialogTitle>
                <DialogContent>
                  <DialogContentText id="dialog-description">
                    Are you sure you want to delete idea:{' '}
                    <strong>{idea.title}</strong>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDeleteModal} color="secondary">
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

export default Show
