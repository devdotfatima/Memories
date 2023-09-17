import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";

import memoriesLogo from "../../Images/memories-Logo.png";
import memoriesText from "../../Images/memories-Text.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../reducers/auth";
import decode from "jwt-decode";

const Navbar = () => {
	const classes = useStyles();
	const { isAuthenticated } = useSelector((state) => state.auth);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logout = useCallback(() => {
		dispatch(authActions.LOGOUT());
		setUser(null);
		navigate("/auth");
	}, [dispatch, navigate]);
	const location = useLocation();

	useEffect(() => {
		const token = user?.token;
		//JWT
		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				logout();
			}
		}
	}, [location, logout, user]);
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [isAuthenticated]);

	return (
		<AppBar
			className={classes.appBar}
			position="static"
			color="inherit"
		>
			<Link
				to="/"
				className={classes.brandContainer}
			>
				<img
					src={memoriesText}
					alt="icon"
					height="45px"
				/>
				<img
					className={classes.image}
					src={memoriesLogo}
					alt="memories"
					height="40px"
				/>
			</Link>

			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.result.name}
							src={user.result.picture}
						>
							{" "}
							{user.result.name.charAt(0)}
						</Avatar>

						<Typography
							className={classes.userName}
							variant="h6"
						>
							{user.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to="/auth"
						variant="contained"
						color="primary"
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
