import {
	CircularProgress,
	Divider,
	Paper,
	Typography,
} from "@material-ui/core";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./commentSection";
import useStyles from "./styles";

const PostDetails = () => {
	const posts = useSelector((state) => state.posts.posts);
	const isLoading = useSelector((state) => state.posts.isLoading);
	const post = useSelector((state) => state.posts.post);
	const dispatch = useDispatch();
	const naviagte = useNavigate();
	const classes = useStyles();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getPost(id));
	}, [id, dispatch]);
	useEffect(() => {
		if (post)
			dispatch(
				getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
			);
	}, [post, dispatch]);

	const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

	const openPost = (id) => {
		naviagte(`/posts/${id}`);
	};

	if (!post) {
		return null;
	}
	if (isLoading) {
		return (
			<Paper
				elevation={6}
				className={classes.loadingPaper}
			>
				<CircularProgress size="7em" />
			</Paper>
		);
	}
	return (
		<Paper
			style={{ padding: "20px", borderRadius: "15px" }}
			elevation={6}
		>
			<div className={classes.card}>
				<div className={classes.section}>
					<Typography
						variant="h3"
						component="h2"
					>
						{post.title}
					</Typography>
					<Typography
						gutterBottom
						variant="h6"
						color="textSecondary"
						component="h2"
					>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
					<Typography
						gutterBottom
						variant="body1"
						component="p"
					>
						{post.message}
					</Typography>
					<Typography variant="h6">Created by: {post.name}</Typography>
					<Typography variant="body1">
						{moment(post.createdAt).fromNow()}
					</Typography>
					<Divider style={{ margin: "20px 0" }} />
					<Divider style={{ margin: "20px 0" }} />
					<CommentSection post={post} />
					<Divider style={{ margin: "20px 0" }} />
				</div>
				<div className={classes.imageSection}>
					<img
						className={classes.media}
						src={
							post.selectedFile ||
							"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
						}
						alt={post.title}
					/>
				</div>
			</div>
			{recommendedPosts.length > 0 && (
				<div className={classes.section}>
					<Typography
						gutterBottom
						variant="h5"
					>
						You might also like this:
					</Typography>
					<Divider />
					<div className={classes.recommendedPosts}>
						{recommendedPosts.map((post) => (
							<div
								style={{ margin: "20px", cursor: "pointer" }}
								onClick={() => openPost(post._id)}
								key={post._id}
							>
								<Typography
									gutterBottom
									variant="h6"
								>
									{post.title}
								</Typography>
								<Typography
									gutterBottom
									variant="subtitle2"
								>
									{post.name}
								</Typography>
								<Typography
									gutterBottom
									variant="subtitle2"
								>
									{post.message}
								</Typography>
								<Typography
									gutterBottom
									variant="subtitle1"
								>
									Likes: {post.likes.length}
								</Typography>
								<img
									src={post.selectedFile}
									alt={post.name}
									width="200px"
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</Paper>
	);
};

export default PostDetails;
