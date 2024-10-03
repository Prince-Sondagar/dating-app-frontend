import React, { useEffect, useState } from "react";
import { IonIcon, IonText, IonContent, IonToolbar, IonButtons, IonButton } from "@ionic/react";
import { close } from "ionicons/icons";
import "./BasicLifestyleModel.scss";
import useUser from "../../hooks/useUser";

type Props = {
	onClose: () => void;
	data: any;
	title: string;
	subTitle: string;
	type: string;
};

interface QuestionType {
	type: string;
	question: string;
	item: string;
}

const BasicLifestyleModel: React.FC<Props> = ({ onClose, data, title, subTitle, type }) => {
	const [selectQuestionType, setSelectQuestionType] = useState<any>([]);
	const { user, updateDiscoverySetting } = useUser();
	const [isObject, setObject] = useState({});

	const { discoverySetting }: any = user;

	useEffect(() => {
		const element = document.querySelector(`.${type}`);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}

		const selectTypes =
			title === "Basic"
				? [
						...(discoverySetting?.zodiacSign ? [{ type: "zodiacSign", item: discoverySetting.zodiacSign }] : []),
						...(discoverySetting?.educationLevel
							? [{ type: "educationLevel", item: discoverySetting.educationLevel }]
							: []),
						...(discoverySetting?.childrens ? [{ type: "childrens", item: discoverySetting.childrens }] : []),
						...(discoverySetting?.vaccinated ? [{ type: "vaccinated", item: discoverySetting.vaccinated }] : []),
						...(discoverySetting?.personalityType
							? [{ type: "personalityType", item: discoverySetting.personalityType }]
							: []),
						...(discoverySetting?.communicationStyle
							? [{ type: "communicationStyle", item: discoverySetting.communicationStyle }]
							: []),
						...(discoverySetting?.receiveLove ? [{ type: "receiveLove", item: discoverySetting.receiveLove }] : []),
				  ]
				: [
						...(discoverySetting?.pets ? [{ type: "pets", item: discoverySetting.pets }] : []),
						...(discoverySetting?.drinking ? [{ type: "drinking", item: discoverySetting.drinking }] : []),
						...(discoverySetting?.smoking ? [{ type: "smoking", item: discoverySetting.smoking }] : []),
						...(discoverySetting?.workout ? [{ type: "workout", item: discoverySetting.workout }] : []),
						...(discoverySetting?.dietaryPreference
							? [{ type: "dietaryPreference", item: discoverySetting.dietaryPreference }]
							: []),
						...(discoverySetting?.sleepingHabits
							? [{ type: "sleepingHabits", item: discoverySetting.sleepingHabits }]
							: []),
				  ];

		setSelectQuestionType([...selectQuestionType, ...selectTypes]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [discoverySetting]);

	const handleSelectQuestionTypes = ({ type, question, item }: QuestionType) => {
		const updatedSelectQuestionType = selectQuestionType.filter(
			(list: { type: string; item: string }) => list.type !== type,
		);
		if (!selectQuestionType.some((list: { type: string; item: string }) => list.type === type && list.item === item)) {
			setSelectQuestionType([...updatedSelectQuestionType, { type, question, item }]);
			setObject((prevObj) => ({ ...prevObj, [type]: item }));
		} else {
			setSelectQuestionType(updatedSelectQuestionType);
			setObject((prevObj) => ({ ...prevObj, [type]: "" }));
		}
	};
	const handleSubmitBasicTypes = () => {
		if (Object.keys(isObject)?.length) {
			updateDiscoverySetting(isObject);
		}
		onClose();
	};

	return (
		<>
			<IonToolbar className="toolbar-no-border">
				<div className="flex ion-justify-content-between ion-padding-horizontal">
					<IonButtons slot="start" onClick={onClose}>
						<IonIcon icon={close} slot="icon-only" />
					</IonButtons>
					<IonButtons slot="end" onClick={handleSubmitBasicTypes}>
						Done
					</IonButtons>
				</div>
				<div className="ion-padding-horizontal border-b">
					<IonText className="relationship-title">
						<h2 className="text-black">{title}</h2>
						<h6 className="text-gray">{subTitle}</h6>
					</IonText>
				</div>
			</IonToolbar>
			<IonContent>
				{data?.map(({ type, icon, question, data }: any) => (
					<div key={type} className={`basic-detail border-b ${type}`}>
						<div className="flex ion-padding-bottom">
							<IonIcon icon={icon} />
							<h3 className="text-black">{question}</h3>
						</div>
						{data?.map((item: string) => {
							const isSelected = selectQuestionType?.some((question: { item: string }) => question.item === item);
							return (
								<IonButton
									shape="round"
									fill="outline"
									className={isSelected ? "border-active text-black" : "text-gray"}
									onClick={() => handleSelectQuestionTypes({ type, question, item })}
								>
									{item}
								</IonButton>
							);
						})}
					</div>
				))}
			</IonContent>
		</>
	);
};

export default BasicLifestyleModel;
