import React, { useState } from 'react';
import { Button } from '@mui/material';
import './styles.css';
import Login from './login';
import Register from './register';

function LoginRegister({login}) {
	const [showRegister, setShowRegister] = useState(false);

	return (
		<>
		
			{showRegister ? <Register></Register> : <Login login={login} ></Login>}
			<Button className="registerButton" onClick={() => setShowRegister(!showRegister)}>{showRegister ? 'Go to Login' : 'Register Now'}</Button>
		</>
	);
}

export default LoginRegister;
