import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

// Validation schema using yup, to check is text field entries are valid.
const validationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		.min(3, 'Password should be a minimum 3 characters')
		.required('Password is required'),
	confirmPassword: yup
		.string('Confirm password')
		// This is how you look at 'password' and make sure it is the same:
		.oneOf([yup.ref('password'), null], 'Passwords should match'),
	firstName: yup.string('Enter your first name'),
	lastName: yup.string('Enter your last name'),
});

function CreateAccountForm() {
	// Redux and React stuff
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const navigate = useNavigate();

	const formik = useFormik({
		// Initializes our formik.values object to have these key-value pairs.
		initialValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
		},
		// Give it our yup validationSchema
		validationSchema: validationSchema,
		onSubmit: async values => {
			console.log(values);
			// Update Backend: axios post req to User
			//const createdUser = await axios.post('api/user', values);
			// Update Slice?
			//dispatch(setUser());
			alert('Account created!');
			navigate('/'); // Redirect user to homepage
		},
	});

	return (
		<div>
			<Box
				component="form"
				onSubmit={formik.handleSubmit}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box margin={1}>
					<TextField
						name="username"
						type="username"
						label="Username*"
						variant="outlined"
						fullWidth
						value={formik.values.username || ''}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						error={formik.touched.username && Boolean(formik.errors.username)}
						helperText={formik.touched.username && formik.errors.username}
					/>
				</Box>

				<Box margin={1}>
					<TextField
						name="email"
						type="email"
						label="Email*"
						fullWidth
						variant="outlined"
						value={formik.values.email || ''}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
				</Box>

				<Box margin={1}>
					<TextField
						name="password"
						type="password"
						label="Password*"
						variant="outlined"
						fullWidth
						value={formik.values.password || ''}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
				</Box>

				<Box margin={1}>
					<TextField
						name="confirmPassword"
						type="password"
						label="Confirm Password*"
						variant="outlined"
						fullWidth
						value={formik.values.confirmPassword || ''}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.confirmPassword &&
							Boolean(formik.errors.confirmPassword)
						}
						helperText={
							formik.touched.confirmPassword && formik.errors.confirmPassword
						}
					/>
				</Box>

				<Box margin={1}>
					<TextField
						name="firstName"
						type="firstName"
						label="First Name"
						variant="outlined"
						fullWidth
						value={formik.values.firstName || ''}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.firstName && Boolean(formik.errors.firstName)}
						helperText={formik.touched.firstName && formik.errors.firstName}
					/>
				</Box>

				<Box margin={1}>
					<TextField
						name="lastName"
						type="lastName"
						label="Last Name"
						variant="outlined"
						fullWidth
						value={formik.values.lastName || ''}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.lastName && Boolean(formik.errors.lastName)}
						helperText={formik.touched.lastName && formik.errors.lastName}
					/>
				</Box>

				<Button type="submit" sx={{ width: 200 }} variant="contained">
					Submit
				</Button>
			</Box>
		</div>
	);
}

export default CreateAccountForm;
