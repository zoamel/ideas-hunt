import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { observer } from 'mobx-react'

import * as ROUTES from 'constants/routes'
import rootStore from 'stores/rootStore'
import AdapterLink from 'components/common/AdapterLink'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    errorsContainer: {
      paddingTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
)
//#endregion

//#region Types
type FormValues = {
  email: string
  username: string
  password: string
  confirmPassword: string
}
//#endregion

//#region Form Validation
const ValidationSchema = Yup.object().shape({
  username: Yup.string().required('Field is required'),
  email: Yup.string().email('Invalid email').required('Field is required'),
  password: Yup.string()
    .min(6, 'Password is too short')
    .required('Field is required'),
  confirmPassword: Yup.string()
    .required('Field is required')
    .nullable()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})
//#endregion

const Signup = observer(() => {
  const classes = useStyles()
  const store = useContext(rootStore)

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    store.auth.signup(values).finally(() => {
      actions.setSubmitting(false)
    })
  }

  const { hasError, error } = store.auth

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}
          render={({ isSubmitting }) => (
            <Form className={classes.form}>
              <Field
                name="username"
                type="text"
                label="Username"
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
              />

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

              <Field
                name="confirmPassword"
                type="password"
                label="Confirm Password"
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
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </Button>

              <Grid container>
                <Grid item>
                  Already have an account?{' '}
                  <Link
                    variant="body2"
                    component={AdapterLink}
                    to={ROUTES.SIGN_IN}
                  >
                    Sign in
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

export default Signup
