import React, { useEffect, useState } from "react";
import { IonIcon, IonText, IonContent, IonToolbar, IonButtons, IonSearchbar, IonButton } from "@ionic/react";
import { close } from "ionicons/icons";
import useUser from "../../hooks/useUser";
import "./RelationshipModel.scss";

type Props = {
	onClose: () => void;
};

const relationShipTYpe = ["Monogamy", "Ethical non-monogamy", "Polyamory", "Open to exploring"];

const RelationshipModel: React.FC<Props> = ({ onClose }) => {
	const [isSelectRelation, setSelectRelation] = useState<any>([]);
	const { user, updateDiscoverySetting } = useUser();
	const { discoverySetting }: any = user;
	const [searchValue, setSearchValue] = useState<string>("");
	const [relationType, setRelationType] = useState(relationShipTYpe);

	useEffect(() => {
		setSelectRelation(discoverySetting?.relationShipType);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSelectRelation = (type: string) => {
		const alreadySelected = isSelectRelation?.find((item: any) => item === type);
		setSelectRelation(
			alreadySelected
				? isSelectRelation?.filter((item: any) => item !== type)
				: isSelectRelation?.length < 3
				? [...isSelectRelation, type]
				: isSelectRelation,
		);
	};

	const handleSubmitRelationShipType = () => {
		updateDiscoverySetting({ relationShipType: isSelectRelation });
		onClose();
	};

	const handleSearchMessages = (value: string) => {
		setSearchValue(value);
		setRelationType((prevRelationType: any) => {
			if (value === "") {
				return relationShipTYpe;
			}
			return prevRelationType.filter((item: any) => `${item}`.toLowerCase().includes(value.toLowerCase()));
		});
	};

	return (
		<>
			<IonToolbar className="toolbar-no-border">
				<div className="flex ion-justify-content-between ion-padding-horizontal">
					<IonButtons slot="start" onClick={onClose}>
						<IonIcon icon={close} slot="icon-only" />
					</IonButtons>
					<IonButtons slot="end" onClick={handleSubmitRelationShipType}>
						Done
					</IonButtons>
				</div>
				<div className="ion-padding-horizontal">
					<IonText className="relationship-title flex ion-justify-content-between">
						<div>
							<h2 className="text-black">Relationship Type</h2>
							<h6 className="text-gray">What type of relationship are you open to?</h6>
						</div>
						<h6 className="text-gray">/3</h6>
					</IonText>
					<IonSearchbar
						placeholder="Search Matches"
						className="search-bar"
						value={searchValue}
						onIonClear={(e) => handleSearchMessages("")}
						onInput={(e: any) => handleSearchMessages(e.target.value)}
					></IonSearchbar>
				</div>
			</IonToolbar>
			<IonContent>
				<div className="ion-padding">
					{relationType?.map((item: string, index: number) => (
						<IonButton
							shape="round"
							fill="outline"
							key={index}
							className={isSelectRelation?.includes(item) ? "border-active text-black" : `text-gray`}
							onClick={() => handleSelectRelation(item)}
						>
							{item}
						</IonButton>
					))}
				</div>
			</IonContent>
		</>
	);
};

export default RelationshipModel;
