import React, { useContext } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { observer } from 'mobx-react'
import { TextField } from 'formik-material-ui'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import rootStore from 'stores/rootStore'
import { Idea } from 'interfaces/ideas'

//#region Form Validation Schema
const ValidationSchema = Yup.object().shape({
  title: Yup.string().required('This field is required'),
  tagline: Yup.string().required('This field is required'),
  description: Yup.string().required('This field is required'),
  url: Yup.string().url('Not a valid URL'),
})
//#endregion

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      marginTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    formActions: {
      paddingTop: theme.spacing(4),
    },
  }),
)
//#endregion

//#region Types
type FormValues = {
  title: string
  tagline: string
  description: string
  url: string
}

type Props = {
  idea: Idea
  onFinishEdit: () => void
}
//#endregion

const Edit: React.FC<Props> = observer(({ idea, onFinishEdit }) => {
  const classes = useStyles()
  const store = useContext(rootStore)

  function handleSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) {
    store.ideas.updateIdea(values).finally(() => {
      actions.setSubmitting(false)
      onFinishEdit()
    })
  }

  const { editError, hasEditError } = store.ideas

  return (
    <Container maxWidth="md">
      <Formik
        initialValues={{
          title: idea.title,
          tagline: idea.tagline,
          description: idea.description,
          url: idea.url,
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
        render={({ isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              name="title"
              label="Title"
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
            />

            <Field
              name="tagline"
              label="Tagline"
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
            />

            <Field
              name="description"
              label="Description"
              component={TextField}
              variant="outlined"
              margin="normal"
              rows={8}
              fullWidth
              multiline
            />

            <Field
              name="url"
              label="URL to demo"
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
            />

            {isSubmitting && <LinearProgress />}

            {hasEditError && (
              <Typography variant="subtitle1" component="p" color="error">
                {editError}
              </Typography>
            )}

            <Grid
              className={classes.formActions}
              container
              justify="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={onFinishEdit}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      />
    </Container>
  )
})

export default Edit
