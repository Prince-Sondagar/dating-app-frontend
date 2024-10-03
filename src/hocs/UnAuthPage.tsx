import { Redirect } from "react-router";
import useAuth from "../hooks/useAuth";

function UnAuthPage(Compo: any) {
	return function HOC(props: any) {
		const { isLogin, user } = useAuth();

		if (!isLogin) return <Compo {...props} />;

		if (!user?.isCompOnboarding) return <Redirect to={"/onboarding"} />;
		return <Redirect to={"/tabs/explore"} />;
	};
}

export default UnAuthPage;
