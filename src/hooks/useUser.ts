import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { UserState } from "../store/reducers/user.reducer";
import {
	fetchUserAction,
	getDiscoverySettingAction,
	getDiscoveryUserPassionsAction,
	getNearByUsersAction,
	getUserProfileMediaAction,
	removeUserProfileMediaAction,
	saveUserOnboardingAction,
	setUserInterestAction,
	updateDiscoverySettingAction,
	verifyUserAction,
} from "../store/actions/user.action";

const useUser = () => {
	const { user, isLoading } = useSelector<RootState, UserState>((state) => state.user);
	const dispatch = useDispatch();

	// User Info
	const updateUserInfo = async (body: any) => {
		await dispatch<any>(saveUserOnboardingAction({ values: body }));
	};

	const getCurrentUser = async () => {
		await dispatch<any>(fetchUserAction());
	};

	// User Discovery Setting
	const getDiscoverySetting = async () => {
		dispatch<any>(getDiscoverySettingAction());
	};

	const setUserInterest = async (arg: any, type: string) => {
		return dispatch<any>(setUserInterestAction({ arg, type }));
	};

	const getNearbyUsers = async (passion: string) => {
		dispatch<any>(getNearByUsersAction({ passion }));
	};

	const updateDiscoverySetting = async (body: {
		distancePref?: number;
		distancePrefShowOnlyThisRange?: boolean;
		agePref?: number[];
		latLong?: number[];
		agePrefShowOnlyThisRange?: boolean;
		global?: boolean;
		showMeOnApp?: boolean;
		zodiacSign?: string;
		educationLevel?: string;
		communicationStyle?: string;
		childrens?: string;
		personalityType?: string;
		receiveLove?: string;
		vaccinated?: string;
		relationShipType?: string[];
	}): Promise<void> => {
		await dispatch<any>(updateDiscoverySettingAction(body));
		await getDiscoverySetting();
	};

	// User Profile Media
	const getUserProfileMedia = async () => {
		dispatch<any>(getUserProfileMediaAction());
	};

	const removeUserProfileMedia = async (body: { profileMediaIds: string }) => {
		return dispatch<any>(removeUserProfileMediaAction(body));
	};

	const verifyUser = (body: { avatar: Blob }) => {
		return dispatch<any>(verifyUserAction(body));
	};

	const getUserSuperPassions = () => {
		return dispatch<any>(getDiscoveryUserPassionsAction());
	};

	return {
		isLoading,
		user,
		getNearbyUsers,
		setUserInterest,
		getDiscoverySetting,
		updateDiscoverySetting,
		updateUserInfo,
		getCurrentUser,
		getUserProfileMedia,
		removeUserProfileMedia,
		verifyUser,
		getUserSuperPassions,
	};
};

export default useUser;
