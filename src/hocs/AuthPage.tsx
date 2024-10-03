import { Redirect, useHistory } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import ThemeService from "../services/theme.service";
import SocketContextProvider from "../contexts/socketContext";
import UserSubscription from "../hooks/userSubscription";
import UserSpotify from "../hooks/userSpotify";

function AuthPage(Compo: any) {
	return function HOC(props: any) {
		const { user, isLogin } = useAuth();
		const [isUserLogin, setIsUserLogin] = useState(isLogin);
		const { getConnectedUser } = UserSpotify();
		const {
			subscription,
			getAllMemberShipSubscriptions,
			getBoostSubscriptions,
			getSuperLikeSubscriptions,
			getUserPerchasedSubscription,
		} = UserSubscription();

		const {
			subscriptionDetail: { subscriptionDetail },
			boostSubscription,
			superLikeSubscription,
		} = subscription;
		const memberShipData = subscription?.subscription;

		useEffect(() => {
			ThemeService.toggleDarkMode(user?.darkMode);
		}, [user]);

		useEffect(() => {
			setIsUserLogin(isLogin);
		}, [isLogin]);

		const {
			location: { pathname },
		} = useHistory();

		useEffect(() => {
			if (isLogin && pathname !== "/onboarding") {
				if (!!!memberShipData?.length) {
					getAllMemberShipSubscriptions();
				}
				if (!subscriptionDetail?.id) {
					getUserPerchasedSubscription();
				}
				if (!boostSubscription?.type) {
					getBoostSubscriptions();
				}
				if (!superLikeSubscription?.type) {
					getSuperLikeSubscriptions();
				}
				if (pathname === "/tabs/userprofile") getConnectedUser();
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [isLogin]);
		if (isUserLogin)
			if (!user?.isCompOnboarding && pathname !== "/onboarding") return <Redirect to={"/onboarding"} />;
			else if (user?.isCompOnboarding && pathname === "/onboarding") return <Redirect to={"/tabs/explore"} />;
			else
				return (
					<SocketContextProvider>
						<Compo {...props} />
					</SocketContextProvider>
				);
		if (!isLogin) return <Redirect to={"/welcome"} />;

		return null;
	};
}

export default AuthPage;
