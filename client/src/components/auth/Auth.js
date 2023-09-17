import {
	Avatar,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@material-ui/core";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../reducers/auth";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
const Alert = React.forwardRef(function Alert(props, ref) {
	return (
		<MuiAlert
			elevation={6}
			ref={ref}
			variant="filled"
			{...props}
		/>
	);
});

const Auth = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [isSignup, setIsSignup] = useState(true);
	const [openSnack, setOpenSnack] = React.useState(false);
	const error = useSelector((state) => state.auth.error);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const handleInputValidation = () => {
		if (isSignup && formData.firstName === "") {
			return true;
		}
		if (isSignup && formData.lastName === "") {
			return true;
		}
		if (formData.email === "") {
			return true;
		}
		if (formData.password === "") {
			return true;
		}
		if (isSignup && formData.password !== formData.confirmPassword) {
			return true;
		}
		return false;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignup) {
			dispatch(signup(formData, navigate));
		} else {
			dispatch(signin(formData, navigate));
		}
	};
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const switchMode = () => {
		setIsSignup((prevIsSignup) => !prevIsSignup);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnack(false);
		dispatch(authActions.UNSET_ERROR());
	};
	React.useEffect(() => {
		if (error) {
			setOpenSnack(true);
		}
	}, [error]);
	// const googleSuccess = async (res) => {
	// 	const decoded = jwt_decode(res?.credential);
	// 	dispatch(authActions.AUTH({ result: decoded, token: res?.credential }));
	// 	navigate("/");
	// };
	// const googleFailure = () => {
	// 	console.log("failure");
	// };
	return (
		<Container
			component="main"
			maxWidth="xs"
		>
			<Paper
				className={classes.paper}
				elevation={3}
			>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>

				<form
					className={classes.form}
					onSubmit={handleSubmit}
				>
					<Grid
						container
						spacing={2}
					>
						{isSignup && (
							<>
								<Grid
									item
									xs={6}
									sm={6}
								>
									<TextField
										name="firstName"
										variant="outlined"
										required
										label="First Name"
										onChange={handleChange}
										autoFocus
										xs={6}
									/>
								</Grid>

								<Grid
									// stretch
									item
									xs={6}
									sm={6}
								>
									<TextField
										name="lastName"
										variant="outlined"
										required
										label="Last Name"
										onChange={handleChange}
										sm={12}
										xs={6}
									/>
								</Grid>
							</>
						)}

						<Grid
							item
							xs={12}
							sm={12}
						>
							<TextField
								name="email"
								variant="outlined"
								required
								label="Email Address"
								fullWidth
								onChange={handleChange}
								type="email"
							/>
						</Grid>

						<Grid
							item
							xs={6}
							sm={12}
						>
							<TextField
								name="password"
								variant="outlined"
								required
								label="Password"
								fullWidth
								onChange={handleChange}
								type="password"
							/>
						</Grid>

						{isSignup && (
							<Grid
								item
								xs={6}
								sm={12}
							>
								<TextField
									name="confirmPassword"
									variant="outlined"
									required
									fullWidth
									label="Repeat Password"
									onChange={handleChange}
									type="password"
								/>
							</Grid>
						)}
					</Grid>

					<Button
						type="submit"
						fullWidth
						disabled={handleInputValidation()}
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{isSignup ? "Sign Up" : "Sign In"}
					</Button>

					{/* <GoogleLogin
						onSuccess={googleSuccess}
						onError={googleFailure}
					/> */}

					<Grid
						container
						justifyContent="flex-end"
					>
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? "Already have an account?Sign In"
									: "Dont't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
			<Snackbar
				open={openSnack}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity="error"
					sx={{ width: "100%" }}
				>
					{error}
				</Alert>
			</Snackbar>
			;
		</Container>
	);
};

export default Auth;
