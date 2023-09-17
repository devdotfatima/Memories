import { Button, TextField, Typography } from "@material-ui/core";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"));
	const [comments, setComments] = useState(post?.comments);
	const [comment, setComment] = useState("");
	const commentsRef = useRef();

	const handleClick = async () => {
		const finalComment = `${user?.result?.name}: ${comment}`;

		const newComments = await dispatch(commentPost(finalComment, post._id));
		setComments(newComments);
		setComment("");

		//    commentsRef.current.scrollIntoView({behavior:'smooth'});
		commentsRef.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography
						gutterBottom
						variant="h6"
					>
						CommentSection
					</Typography>
					{comments.map((comment, index) => (
						<Typography
							gutterBottom
							variant="subtitle1"
							key={index}
						>
							<strong>{comment.split(": ")[0]}</strong>
							{comment.split(":")[1]}
						</Typography>
					))}
					<div ref={commentsRef} />
				</div>
				{user?.result?.name && (
					<div style={{ width: "70%" }}>
						<Typography
							gutterBottom
							variant="h6"
						>
							Write a comment
						</Typography>

						<TextField
							fullWidth
							rows={4}
							variant="outlined"
							label="Comment"
							multiline
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<Button
							color="primary"
							style={{ marginTop: "10px" }}
							fullWidth
							disabled={!comment}
							variant="contained"
							onClick={handleClick}
						>
							Comment
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentSection;
