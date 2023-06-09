import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";

import StyledButton from '../Button';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RegisterForm = () => {
  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  
  // Confirm Password Visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();

  // Form Changes & Submit
  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })
  const onSubmit = data => console.log(data);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
      }}
    >
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{ 
          width: '20%',
          minWidth: '200px',
          display: 'flex', 
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant='h5' textAlign='center'>Register</Typography>
        <Controller 
          name={'firstName'}
          control={control}
          rules={{ required: 'First name required.'}}
          render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
            <TextField 
              label='First Name'
              variant='outlined'
              size='small'
              value={value} 
              onChange={onChange} 
              error={!!error}
              helperText={error ? error.message : null}
              FormHelperTextProps={{ 
                sx: { 
                  mb: -1.5,
                } 
              }}
            />
          )}
        />
        <Controller 
          name={'lastName'}
          control={control}
          rules={{ required: 'Last name required.'}}
          render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
            <TextField 
              label='Last Name'
              variant='outlined'
              size='small'
              value={value} 
              onChange={onChange} 
              error={!!error}
              helperText={error ? error.message : null}
              FormHelperTextProps={{ 
                sx: { 
                  mb: -1.5,
                } 
              }}
            />
          )}
        />
        <Controller 
          name={'username'}
          control={control}
          rules={{ required: 'Username required.'}}
          render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
            <TextField 
              label='Username'
              variant='outlined'
              size='small'
              value={value} 
              onChange={onChange} 
              error={!!error}
              helperText={error ? error.message : null}
              FormHelperTextProps={{ 
                sx: { 
                  mb: -1.5,
                } 
              }}
            />
          )}
        />
        <Controller 
          name={'email'}
          control={control}
          rules={{ required: 'Email required.'}}
          render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
            <TextField 
              label='Email'
              variant='outlined'
              size='small'
              value={value} 
              onChange={onChange} 
              error={!!error}
              helperText={error ? error.message : null}
              FormHelperTextProps={{ 
                sx: { 
                  mb: -1.5,
                } 
              }}
            />
          )}
        />
        <Controller 
          name={'password'}
          control={control}
          rules={{ required: 'Password required.'}}
          render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
            <FormControl sx={{ }} size='small'>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <OutlinedInput
                id='password'
                size='small'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                error={error}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {
                error ? <FormHelperText sx={{ color: 'red', mb: -1.5, }}>{error.message}</FormHelperText> : null
              }
            </FormControl>
          )}
        />
        <Controller 
          name={'confirmPassword'}
          control={control}
          rules={{ required: 'Confirm password required.'}}
          render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
            <FormControl sx={{ }} size='small'>
              <InputLabel htmlFor='confirm-password'>Confirm Password</InputLabel>
              <OutlinedInput
                id='confirm-password'
                label='Confirm Password'
                type={showConfirmPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                error={error}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {
                error ? <FormHelperText sx={{ color: 'red' }}>{error.message}</FormHelperText> : null
              }
            </FormControl>
          )}
        />
        <StyledButton type={'submit'} text={'Register'}/>
      </Box>
    </Box>
  )
};

export default RegisterForm;