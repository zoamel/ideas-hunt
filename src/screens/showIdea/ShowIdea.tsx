import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import rootStore from 'stores/rootStore'
import Edit from './components/Edit'
import Show from './components/Show'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      marginTop: theme.spacing(2),
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

const ShowIdea: React.FC<Props> = observer(({ match }) => {
  const classes = useStyles()
  const store = useContext(rootStore)
  const [editMode, setEditMode] = useState(false)

  const { idea } = store.ideas

  useEffect(() => {
    const ideaId = match.params.id as string

    store.ideas.getIdea(ideaId)
    //eslint-disable-next-line
  }, [])

  function handleStartEditMode() {
    setEditMode(true)
  }

  function handleFinishEditMode() {
    setEditMode(false)
  }

  if (store.ideas.isPending) {
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <CircularProgress className={classes.loader} />
        </Grid>
      </Grid>
    )
  }

  if (store.ideas.hasError) {
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Typography color="error" variant="h5" component="p">
            {store.ideas.error}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  if (!idea) {
    return null
  }

  if (editMode) {
    return <Edit idea={idea} onFinishEdit={handleFinishEditMode} />
  }

  return <Show idea={idea} onStartEdit={handleStartEditMode} />
})

export default ShowIdea
