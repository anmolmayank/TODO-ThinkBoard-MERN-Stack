import {
  Box,
  Paper,
  Typography,
  TextField,
  FormGroup,
  Button,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/storeHooks';
import { fetchRegisterUser } from '../store/thunks/fetchAuthOps';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useNavigate } from 'react-router';

export default function RegisterPage(): React.ReactElement {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const navigate = useNavigate();

  // Validation method
  const isValidInputs = (): boolean => {
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numRegex = /^\d+$/;

    // Validate name
    if (!name.trim() || numRegex.test(name)) {
      setNameError('Name cannot be empty or numeric only');
      isValid = false;
    } else {
      setNameError('');
    }

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
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  // For reseting the state to initial
  const resetLocalState = () => {
    setEmail('');
    setName('');
    setPassword('');
  };

  // Onclik Register Event Handler Method
  const handleRegister = () => {
    // Create payload for post method of Register
    const requestPayload = {
      name,
      email,
      password,
    };
    if (isValidInputs()) {
      dispatch(fetchRegisterUser(requestPayload)).unwrap();
      resetLocalState();
      navigate("/login");
    }
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
        elevation={5}
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
          Register yourself
        </Typography>

        <FormGroup>
          <TextField
            label="Name"
            id="outlined-size-small-name"
            variant="outlined"
            size="small"
            placeholder="Enter name"
            required
            margin="normal"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            error={nameError === '' ? false : true}
            helperText={nameError}
          />
          <TextField
            label="Email"
            id="outlined-size-small-email"
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
            id="outlined-size-small-password"
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
            onClick={(_event: React.FormEvent<HTMLButtonElement>) =>
              handleRegister()
            }
          >
            {loading ? <CircularProgress color="info"/> : 'Register'}
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
            Already registered ? <a href="/login">Login here</a>
          </Typography>
        </FormGroup>
      </Paper>
    </Box>
  );
}
