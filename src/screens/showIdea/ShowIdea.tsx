import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'

import ProgressSpinner from 'components/ui/ProgressSpinner'
import PageError from 'components/ui/PageError'
import rootStore from 'stores/rootStore'
import Edit from './components/Edit'
import Show from './components/Show'

//#region Types
type MatchParams = {
  id: string
}

type Props = RouteComponentProps<MatchParams>
//#endregion

const ShowIdea: React.FC<Props> = observer(({ match }) => {
  const store = useContext(rootStore)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const ideaId = match.params.id as string

    store.ideas.getIdea(ideaId)
    //eslint-disable-next-line
  }, [])

  const { idea, isPending, hasGeneralError, generalError } = store.ideas

  function handleStartEditMode() {
    setEditMode(true)
  }

  function handleFinishEditMode() {
    setEditMode(false)
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

  if (editMode) {
    return <Edit idea={idea} onFinishEdit={handleFinishEditMode} />
  }

  return <Show idea={idea} onStartEdit={handleStartEditMode} />
})

export default ShowIdea
