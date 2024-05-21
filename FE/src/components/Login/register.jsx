import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import './styles.css';
import axios from 'axios';

/**
 * Component Register: Hiển thị form đăng ký người dùng.
 * @returns JSX.Element
 */
function Register() {
  // Các state để lưu trữ thông tin của người dùng và thông báo
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [retypePassword, setRetypePassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [occupation, setOccupation] = useState('');
	const [error, setError] = useState(undefined); // Thông báo lỗi
	const [success, setSuccess] = useState(undefined); // Thông báo thành công

	// Hàm xử lý sự kiện đăng ký người dùng
	const handleRegistration = async (e) => {
		e.preventDefault(); // Ngăn chặn hành động mặc định của form

		try {
			setError(undefined); // Xóa thông báo lỗi trước khi thực hiện đăng ký

			// Kiểm tra các trường thông tin đăng ký
			if (!username) {
				setError('Trường tên đăng nhập là bắt buộc.');
			} else if (!password) {
				setError('Trường mật khẩu là bắt buộc.');
			} else if (!retypePassword) {
				setError('Trường nhập lại mật khẩu là bắt buộc.');
			} else if (!firstName) {
				setError('Trường tên là bắt buộc.');
			} else if (!lastName) {
				setError('Trường họ là bắt buộc.');
			} else if (password !== retypePassword) {
				setError('Mật khẩu không giống nhau.');
			} else {
				// Gửi yêu cầu POST đến API để đăng ký người dùng
				await axios.post('http://localhost:8080/api/user/register', {
					login_name: username,
					password: password,
					first_name: firstName,
					last_name: lastName,
					location: location,
					description: description,
					occupation: occupation,
				});

				// Reset các trường thông tin sau khi đăng ký thành công
				setUsername('');
				setPassword('');
				setRetypePassword('');
				setFirstName('');
				setLastName('');
				setLocation('');
				setDescription('');
				setOccupation('');

				// Xóa thông báo lỗi và hiển thị thông báo đăng ký thành công
				setError('');
				setSuccess('Đăng ký thành công!!!');
			}
		} catch (err) {
			// Xử lý lỗi nếu có
			setSuccess('');
			setError(err.response.data);
		}
	};

	return (
		// Render form đăng ký người dùng
		<form className='login-form' onSubmit={handleRegistration}>
			{/* Input fields */}
			<TextField label='Tên đăng nhập' variant='outlined' value={username} onChange={(e) => setUsername(e.target.value)} />
			<TextField label='Mật khẩu' variant='outlined' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
			<TextField label='Nhập lại Mật khẩu' variant='outlined' value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} type='password' />
			<TextField label='Tên' variant='outlined' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
			<TextField label='Họ' variant='outlined' value={lastName} onChange={(e) => setLastName(e.target.value)} />
			<TextField label='Địa chỉ' variant='outlined' value={location} onChange={(e) => setLocation(e.target.value)} />
			<TextField label='Mô tả' variant='outlined' value={description} onChange={(e) => setDescription(e.target.value)} />
			<TextField label='Nghề nghiệp' variant='outlined' value={occupation} onChange={(e) => setOccupation(e.target.value)} />
			{/* Submit button */}
			<Button variant='contained' type='submit'>
				Đăng ký
			</Button>
			{/* Hiển thị thông báo lỗi (nếu có) */}
			{error && (
				<Typography variant='body1' style={{ color: 'red' }}>
					{error}
				</Typography>
			)}
			{/* Hiển thị thông báo đăng ký thành công (nếu có) */}
			{success && (
				<Typography variant='body1' style={{ color: 'green' }}>
					{success}
				</Typography>
			)}
		</form>
	);
}

export default Register;
