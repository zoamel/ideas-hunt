import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import { observer } from 'mobx-react'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  }),
)
//#endregion

//#region Props
type Props = {
  visible: boolean
  message: string | null
  onClose: () => void
}
//#endregion

const GlobalMessage: React.FC<Props> = observer(
  ({ visible, message, onClose }) => {
    const classes = useStyles()

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={visible}
        autoHideDuration={6000}
        onClose={onClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={message}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    )
  },
)

export default GlobalMessage
