import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getAllLikes, getAllSentLikes } from "../store/actions/like.action";
import { UserState } from "../store/reducers/like.reducer";

const UserLikes = () => {
	const { like, sentLike } = useSelector<RootState, UserState>((state: any) => state);
	const dispatch = useDispatch();

	const getUserSendedLikes = ({ passions }: any) => {
		return dispatch<any>(getAllSentLikes({ passions }));
	};
	const getUserLikes = (searchQuery: any) => {
		return dispatch<any>(getAllLikes(searchQuery));
	};

	return {
		like,
		sentLike,
		getUserSendedLikes,
		getUserLikes,
	};
};

export default UserLikes;
