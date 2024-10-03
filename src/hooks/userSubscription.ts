import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
	getAllMembershipSubscriptionsDetails,
	getUserPurchasedSubscriptionDetails,
	getUserPaymentMethodsDetails,
	setDefaultPaymentCard,
	deleteSavedCard,
	getBoostSubscriptionDetail,
	getSuperLikeSubscriptionDetail,
} from "../store/actions/subscription.action";
import { SubscriptionState } from "../store/reducers/subscription.reducer";

const UserSubscription = () => {
	const { subscription, subscriptionDetail, paymentMethods, boostSubscription,superLikeSubscription } = useSelector<
		RootState,
		SubscriptionState
	>((state: any) => state);
	const dispatch = useDispatch();

	const getAllMemberShipSubscriptions = () => {
		return dispatch<any>(getAllMembershipSubscriptionsDetails());
	};

	const getBoostSubscriptions = () => {
		return dispatch<any>(getBoostSubscriptionDetail());
	};

	const getSuperLikeSubscriptions = () => {
		return dispatch<any>(getSuperLikeSubscriptionDetail())
	}

	const getUserPerchasedSubscription = () => {
		return dispatch<any>(getUserPurchasedSubscriptionDetails());
	};

	const getUserPaymentMethods = () => {
		return dispatch<any>(getUserPaymentMethodsDetails());
	};

	const setDefaultCard = (paymentId: any) => {
		return dispatch<any>(setDefaultPaymentCard(paymentId));
	};

	const deleteUserSavedCard = (paymentId: any) => {
		return dispatch<any>(deleteSavedCard(paymentId));
	};

	return {
		subscription,
		subscriptionDetail,
		paymentMethods,
		boostSubscription,
		superLikeSubscription,
		getSuperLikeSubscriptions,
		getBoostSubscriptions,
		getAllMemberShipSubscriptions,
		getUserPerchasedSubscription,
		getUserPaymentMethods,
		setDefaultCard,
		deleteUserSavedCard,
	};
};

export default UserSubscription;
