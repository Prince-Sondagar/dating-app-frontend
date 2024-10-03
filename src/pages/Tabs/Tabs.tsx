import React from "react";
import { Route } from "react-router-dom";
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonBadge } from "@ionic/react";
import { chatbubbles, colorFilter, personSharp, heart } from "ionicons/icons";
import Explore from "../Explore/Explore";
import Highlights from "../Highlights/Highlights";
import Discover from "../Discover/Discover";
import AuthPage from "../../hocs/AuthPage";
import Chats from "../Chat/Chats";
import Chat from "../Chat/chat/Chat";
import useAuth from "../../hooks/useAuth";
import LocationAlert from "../../components/LocationAlert/LocationAlert";
import UserProfile from "../UserProfile/UserProfile";
import tabStop from '../../assets/img/tab_stop.svg'
import tabStopInactive from '../../assets/img/tab_stop_inactive.svg'
import "./Tabs.scss";

const Tabs: React.FC<{}> = () => {
	const { unSeededMessages } = useAuth();

	return (
		<IonTabs className="tabs-top">
			<IonRouterOutlet>
				<LocationAlert>
					<Route path="/tabs/explore" component={Explore} exact />
				</LocationAlert>
				<Route path="/tabs/discover" component={Discover} exact />
				<Route path="/tabs/highlights" component={Highlights} exact />
				<Route path="/tabs/chat" component={Chats} exact />
				<Route path="/tabs/chats/:threadId" component={Chat} exact />
				<Route path="/tabs/userprofile" component={UserProfile} exact />
			</IonRouterOutlet>

			<IonTabBar slot="bottom" className="tabs-page tab-bar-no-border">
				<IonTabButton tab="me" href="/tabs/discover" className="color-gold">
					<IonIcon icon={colorFilter} />
				</IonTabButton>
				<IonTabButton tab="explore" href="/tabs/highlights" className="color-gold">
					<IonIcon icon={heart} />
				</IonTabButton>
				<IonTabButton tab="highlights" href="/tabs/explore" className="color-gold">
					<img src={tabStop} alt="tabStop" className="tab-icon-active" />
					<img src={tabStopInactive} alt="tabStopInactive" className="tab-icon-inactive" />
				</IonTabButton>
				<IonTabButton tab="matches" href="/tabs/chat" className="color-gold">
					<IonIcon icon={chatbubbles} />
					{unSeededMessages ? <IonBadge color="primary">{unSeededMessages}</IonBadge> : ""}
				</IonTabButton>
				<IonTabButton tab="profile" href="/tabs/userprofile" className="color-gold">
					<IonIcon icon={personSharp} />
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};

export default AuthPage(Tabs);
