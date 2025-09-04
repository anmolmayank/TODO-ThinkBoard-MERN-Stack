import {
  Box,
  Button,
  CircularProgress,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/storeHooks';
import { fetchLoginUser } from '../store/thunks/fetchAuthOps';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function LoginPage(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.auth.loading);

  // Validation method
  const isValidInputs = (): boolean => {
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async () => {
    // Handle Login
    if (isValidInputs()) {
      const requestPayload = {
        email,
        password,
      };
      try {
        //const resultAction =await dispatch(fetchLoginUser(requestPayload)).unwrap(); // Alternate
        const resultAction = await dispatch(fetchLoginUser(requestPayload));

        // ✅ Check if login was successful
        if (fetchLoginUser.fulfilled.match(resultAction)) {
          resetLocalState();
          navigate('/HomePage');
        } else {
          console.error(
            'Login failed:',
            resultAction.payload || resultAction.error
          );
        }
      } catch (err) {
        console.error('Unexpected login error:', err);
      }
    }
  };

  const resetLocalState = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <Box
      alignItems={'center'}
      justifyContent={'center'}
      width={'100vw'}
      height={'100vh'}
      sx={{
        display: 'flex',
      }}
    >
      <Paper
        elevation={1}
        square={false}
        sx={{
          width: '25%',
          padding: '36px',
        }}
      >
        <Typography
          alignSelf={'center'}
          justifyContent={'center'}
          sx={{
            display: 'flex',
          }}
          variant="h5"
        >
          Login Here!
        </Typography>
        <FormGroup>
          <TextField
            label="Email"
            id="outlined-size-small-login-email"
            variant="outlined"
            size="small"
            placeholder="Enter email"
            required
            margin="normal"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            error={emailError === '' ? false : true}
            helperText={emailError}
          />
          <TextField
            label="Password"
            id="outlined-size-small-login-password"
            variant="outlined"
            size="small"
            placeholder="Enter password"
            required
            margin="normal"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            error={passwordError === '' ? false : true}
            helperText={passwordError}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={() => handleLogin()}
          >
            {loading ? <CircularProgress color="info" /> : 'Login'}
          </Button>
          <Typography
            variant="subtitle2"
            alignSelf={'center'}
            justifyContent={'center'}
            sx={{
              display: 'flex',
              padding: 2,
            }}
          >
            Not registered ? <a href="/">Register here</a>
          </Typography>
        </FormGroup>
      </Paper>
    </Box>
  );
}
