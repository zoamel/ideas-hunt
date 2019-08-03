import React, { useContext } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'
import { Formik, Form, Field, FormikActions } from 'formik'
import * as Yup from 'yup'
import { observer } from 'mobx-react'

import * as ROUTES from 'constants/routes'
import AdapterLink from 'components/ui/AdapterLink'
import rootStore from 'stores/rootStore'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageTitle: {
      marginTop: theme.spacing(4),
    },
    headerContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
    editorContainer: {
      marginTop: 16,
      marginBottom: 50,
      height: 250,

      '& .ql-container': {
        fontSize: 16,
      },
    },
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

//#region Form Validation
const ValidationSchema = Yup.object().shape({
  title: Yup.string().required('This field is required'),
  tagline: Yup.string().required('This field is required'),
  description: Yup.string().required('This field is required'),
  url: Yup.string().url('Not a valid URL'),
})
//#endregion

//#region Types
type FormValues = {
  title: string
  tagline: string
  description: string
  url: string
}
//#endregion

const AddIdea: React.FC = observer(() => {
  const classes = useStyles()
  const store = useContext(rootStore)

  function handleSubmit(
    values: FormValues,
    actions: FormikActions<FormValues>,
  ) {
    store.ideas.addIdea(values).finally(() => {
      actions.setSubmitting(false)
    })
  }

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        justify="space-between"
        alignItems="center"
        className={classes.headerContainer}
      >
        <Grid item>
          <Typography variant="h4">Add your new idea</Typography>
        </Grid>
        <Grid item>
          <Button
            component={AdapterLink}
            variant="outlined"
            color="secondary"
            to={ROUTES.HOME}
            disabled={store.ideas.isPending}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
      <Container maxWidth="md">
        <div className={classes.formContainer}>
          <Formik
            initialValues={{
              title: '',
              tagline: '',
              description: '',
              url: '',
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
                  autoFocus
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

                {store.ideas.hasError && (
                  <Typography variant="subtitle1" component="p" color="error">
                    {store.ideas.error}
                  </Typography>
                )}

                <Grid
                  className={classes.formActions}
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Button type="submit" variant="contained" color="primary">
                      {isSubmitting ? 'Processing...' : 'Add'}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          />
        </div>
      </Container>
    </React.Fragment>
  )
})

export default AddIdea
