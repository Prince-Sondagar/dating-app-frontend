import { useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonRow, IonText } from "@ionic/react";
import { Passion } from "../../types";
import { close } from "ionicons/icons";

type Props = {
	selectedValues: any;
	onClose: () => void;
	data: Array<Passion>;
	onSelectValues: any;
	type: string;
};

const AddPassions: React.FC<Props> = ({ onClose, onSelectValues, data, type, selectedValues }) => {
	const [searchedData] = useState<Array<Passion>>(data);

	return (
		<IonContent>
			<div className="ion-text-center passion-modal-wrap">
				<div className="ion-text-right close-passion">
					<IonIcon icon={close} onClick={onClose} />
				</div>
				<div className="optional-header ion-text-center">
					<IonGrid className="ion-no-padding">
						<IonRow className="ion-align-items-center">
							<IonCol size="3.5">
								<div></div>
							</IonCol>
							<IonCol size="5">
								<IonText>
									<h4 className="font-dosis">Passions</h4>
								</IonText>
							</IonCol>
							<IonCol size="3.5">
								<div></div>
							</IonCol>
						</IonRow>
					</IonGrid>
				</div>
				<IonLabel>ryone know what you're passionate about by adding it to your profile</IonLabel>
				<div className="passion-list ion-padding-bottom">
					{searchedData.map((passion, key) => {
						let isSelected = false;
						if (Array.isArray(selectedValues))
							isSelected = !!selectedValues?.find(
								(selectedPassionId) => selectedPassionId && selectedPassionId === passion.id,
							);
						return (
							<IonButton
								fill="outline"
								shape="round"
								key={passion.id}
								onClick={() =>
									(selectedValues === undefined || selectedValues?.length < 5) &&
									onSelectValues(type === "group" ? [...selectedValues, passion.id] : passion?.id)
								}
								className={isSelected ? "selected-passion" : ""}
							>
								{passion.passion}
							</IonButton>
						);
					})}
				</div>
				<div className="ion-margin-vertical">
					<IonButton className="btnThemePrimary font-dosis" shape="round" expand="block" onClick={onClose}>
						Continue ({selectedValues?.length ?? 0}/5)
					</IonButton>
				</div>
			</div>
		</IonContent>
	);
};

export default AddPassions;
