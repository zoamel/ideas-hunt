import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'

import rootStore from 'stores/rootStore'
import AdapterLink from 'components/common/AdapterLink'
import * as ROUTES from 'constants/routes'

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
  email: Yup.string().email('Invalid email').required('Field is required'),
  password: Yup.string()
    .min(6, 'Password is too short')
    .required('Field is required'),
})
//#endregion

const Login: React.FC = observer(() => {
  const classes = useStyles()
  const store = useContext(rootStore)

  function handleSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) {
    store.auth.login(values).finally(() => {
      actions.setSubmitting(false)
    })
  }

  const { hasError, error } = store.auth

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
          onSubmit={handleSubmit}
          render={({ isSubmitting }) => (
            <Form className={classes.form}>
              <Field
                name="email"
                type="email"
                label="Email"
                component={TextField}
                variant="outlined"
                margin="normal"
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

              {isSubmitting && <LinearProgress />}

              {hasError && (
                <div className={classes.errorsContainer}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    align="center"
                  >
                    {error}
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

              <Grid container>
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
              </Grid>
            </Form>
          )}
        />
      </div>
    </Container>
  )
})

export default Login
