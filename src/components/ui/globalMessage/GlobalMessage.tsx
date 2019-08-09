import React from 'react'
import { observer } from 'mobx-react'
import Snackbar from '@material-ui/core/Snackbar'

import { NotificationType } from 'interfaces/app'
import ContentWrapper from './components/ContentWrapper'

//#region Props
type Props = {
  visible: boolean
  type: NotificationType
  message: string | null
  onClose: () => void
}
//#endregion

const GlobalMessage: React.FC<Props> = observer(
  ({ visible, type, message = '', onClose }) => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={visible}
        autoHideDuration={6000}
        onClose={onClose}
      >
        <ContentWrapper variant={type} onClose={onClose} message={message!} />
      </Snackbar>
    )
  },
)

export default GlobalMessage
