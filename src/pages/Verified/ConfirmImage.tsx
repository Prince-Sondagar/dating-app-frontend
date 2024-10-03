import { FC } from "react";
import { IonButton } from "@ionic/react";

type Props = {
	file: string;
	onContinue: (file?: string) => void;
};

const ConfirmImage: FC<Props> = ({ file, onContinue }) => {
	return (
		<div className="verified-page confirmImg">
			<div>
				<h4>Want to Confirm picture?</h4>
				<img src={file} alt="userimage" />
			</div>
			<div>
				<IonButton shape="round" fill="solid" expand="block" className="btnContinue" onClick={() => onContinue(file)}>
					Confirm
				</IonButton>
				<IonButton shape="round" fill="solid" expand="block" className="btnContinue" onClick={() => onContinue()}>
					Retry
				</IonButton>
			</div>
		</div>
	);
};

export default ConfirmImage;
