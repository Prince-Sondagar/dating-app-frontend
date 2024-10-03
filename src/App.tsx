import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Provider as StoreProvider } from "react-redux";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Tabs from "./pages/Tabs/Tabs";
import LogIn from "./pages/Auth/LogIn/LogIn";
import SignUp from "./pages/Auth/SignUp/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import Welcome from "./pages/Welcome/Welcome";
import OnBoarding from "./pages/OnBoarding/OnBoarding";

/* Theme variables */
import "./theme/variables.css";

// custom CSS
import "./sass/variables.override.scss";
import "./sass/helper.scss";
import "./sass/app.scss";
import "./sass/dark.scss";

import "react-phone-input-2/lib/style.css";
import store from "./store";

setupIonicReact({
	mode: "ios",
});

const App: React.FC = () => (
	<IonApp>
		<StoreProvider store={store}>
			<IonReactRouter>
				<IonRouterOutlet>
					{/* Auth Routes */}
					<Route path="/tabs" component={Tabs} />
					<Route path="/onboarding" component={OnBoarding} exact />
					{/* UnAuth Routes */}
					<Route path="/welcome" component={Welcome} exact />
					<Route path="/login" component={LogIn} exact />
					<Route path="/signup" component={SignUp} exact />
					<Route path="/forgot-password" component={ForgotPassword} exact />
					<Route path="/reset-password/:token" component={ResetPassword} exact />
					{/* Global Routes */}
					<Route path="/" render={() => <Redirect to="/welcome" />} exact />
				</IonRouterOutlet>
			</IonReactRouter>
		</StoreProvider>
	</IonApp>
);

export default App;
