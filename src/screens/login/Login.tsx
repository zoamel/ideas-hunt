import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Formik, Form, Field, FormikActions } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'

import rootStore from 'stores/rootStore'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(2, 0, 1),
    },
    errorsContainer: {
      paddingTop: theme.spacing(1),
    },
  }),
)
//#endregion

//#region Types
type FormValues = {
  email: string
  password: string
}
//#endregion

//#region Form Validation
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Field is required'),
  password: Yup.string()
    .min(6, 'Password is too short')
    .required('Field is required'),
})
//#endregion

const Login: React.FC = observer(() => {
  const classes = useStyles()
  const store = useContext(rootStore)

  const isSubmitting = store.auth.state === 'pending'
  const hasError = store.auth.state === 'error'

  function handleSubmit(
    values: FormValues,
    actions: FormikActions<FormValues>,
  ) {
    store.auth.login(values)
    actions.setSubmitting(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          validateOnBlur={true}
          onSubmit={handleSubmit}
          render={() => (
            <Form className={classes.form}>
              <Field
                name="email"
                type="email"
                label="Email"
                component={TextField}
                variant="outlined"
                margin="normal"
                autoFocus
                required
                fullWidth
              />

              <Field
                name="password"
                type="password"
                label="Password"
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
              />

              {hasError && (
                <div className={classes.errorsContainer}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    align="center"
                  >
                    {store.auth.error}
                  </Typography>
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
              {isSubmitting && <LinearProgress />}

              {/* <Grid container>
                <Grid item>
                  Don't have an account?{' '}
                  <Link
                    variant="body2"
                    component={AdapterLink}
                    to={ROUTES.SIGN_UP}
                  >
                    Sign Up
                  </Link>
                </Grid>
              </Grid> */}
            </Form>
          )}
        />
      </div>
    </Container>
  )
})

export default Login
