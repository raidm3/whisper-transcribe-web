import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

interface Props {
  onAuthentication: any;
}

const LoginForm = ({ onAuthentication }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [credentials] = useState({
    'foo': '$2a$10$X8allpgKEVTcIs5EW5JCROOcRDDwxT1WJRmZ1P4rEAHIvAVBGHyNa',
  });

  const handleSubmit =  async (event: any) => {
    event.preventDefault();

    try {
      if (!Object.keys(credentials).includes(username)) {
        throw new Error('Invalid username or password');
      }

      // Hash the user's password and compare it to the stored hash
      const isMatch = await bcrypt.compare(password, credentials[username]);

      if (!isMatch) {
        throw new Error('Invalid username or password');
      }

      // Successfull authentication
      onAuthentication();
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1 className='text-3xl text-center'>
        Sign in with your credentials
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='mt-8 max-w-lg'>
          <div className='grid grid-cols-1 gap-6'>
            <label className="block">
              <span className='text-gray-700'>
                Username
              </span>
              <input
                type="text"
                className='mt-1 block w-full'
                name="user"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label className="block">
              <span className='text-gray-700'>
                Password
              </span>
              <input
                type="password"
                className='mt-1 block w-full'
                name="pw"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button
              type="submit"
              className='btn btn-blue'
            >
              Login
            </button>
            <span className='text-center text-sm text-red-500'>
              {error}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;