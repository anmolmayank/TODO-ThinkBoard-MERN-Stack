import {
  Box,
  Paper,
  Typography,
  TextField,
  FormGroup,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/storeHooks';
import { fetchRegisterUser } from '../store/thunks/fetchAuthOps';

export default function RegisterPage(): React.ReactElement {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleRegister = () => {
    // Create payload for post method of Register
    const requestPayload = {
      name,
      email,
      password,
    };
    dispatch(fetchRegisterUser(requestPayload));
    resetLocalState();
  };

  const resetLocalState = () => {
    setEmail('');
    setName('');
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
        backgroundColor: '#551224',
      }}
    >
      <Paper
        elevation={1}
        square={false}
        sx={{
          width: '45%',
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
          />
          <Button
            type="submit"
            variant="contained"
            onClick={(_event: React.FormEvent<HTMLButtonElement>) =>
              handleRegister()
            }
          >
            Register
          </Button>
          <Typography
            variant="subtitle2"
            alignSelf={'center'}
            justifyContent={'center'}
            sx={{
              display: 'flex',
            }}
          >
            Already registered ? <a href="/login">Login here</a>
          </Typography>
        </FormGroup>
      </Paper>
    </Box>
  );
}
