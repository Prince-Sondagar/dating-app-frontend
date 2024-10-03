import { useIonToast } from "@ionic/react";
import * as faceapi from "face-api.js";
import { FC, useRef, useState, useEffect } from "react";

type Props = {
	onContinue: (file?: Blob) => void;
};
const initSnapWaitingTime = 4;
const imageSize = { width: 240, height: 180, x: -40, y: 0 };

const CaptureImage: FC<Props> = ({ onContinue }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [hasValidFace, setHasValidFace] = useState<boolean>(false);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [snapWaitingTime] = useState<number>(initSnapWaitingTime);
	const [present] = useIonToast();

	useEffect(() => {
		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((stream) => {
					setStream(stream);
					if (videoRef.current) videoRef.current.srcObject = stream;
				})
				.catch((error: any) => {
					present({ message: error.message || "Something is wrong here!" });
					onContinue();
				});
		}
		// const interval = setInterval(handleVideoLoad, 1000);
		// return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		return () => {
			if (stream) stream.getTracks().forEach((track) => track.stop());
		};
	}, [stream]);

	useEffect(() => {
		// let interval: NodeJS.Timeout | null = null;
		if (hasValidFace) onSnap();
		// 	interval = setInterval(() => {
		// 		setSnapWaitingTime((time: number): number => {
		// 			if (time > 0) return time - 1;
		// 			else {
		// 				if (interval) clearInterval(interval);
		// 				onSnap();
		// 				return 3;
		// 			}
		// 		});
		// 	}, 1000);
		// else setSnapWaitingTime(initSnapWaitingTime);
		// return () => {
		// 	if (interval) clearInterval(interval);
		// };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasValidFace]);

	const detectFaces = async (videoElement: HTMLVideoElement | null) => {
		if (!videoElement) return false;
		await faceapi.nets.ssdMobilenetv1.load("/models");
		const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.7 });
		const detections = await faceapi.detectAllFaces(videoElement, optionsSSDMobileNet);

		return !!detections.length;
	};

	const handleVideoLoad = async () => {
		setHasValidFace(await detectFaces(videoRef.current));
	};

	const onSnap = () => {
		let canvas: HTMLCanvasElement = document.createElement("canvas");
		canvas.width = imageSize.width;
		canvas.height = imageSize.height;
		(canvas as any)
			.getContext("2d")
			.drawImage(videoRef.current as any, -40, -30, imageSize.width + 40, imageSize.height + 30);
		canvas.toBlob((blob) => onContinue(blob || undefined));
	};

	if (!stream) return <div />;

	return (
		<div className={`verified-page captureImg ${hasValidFace ? "with-fase" : ""}`}>
			<div className="video-capture">
				<video ref={videoRef} width={"100%"} autoPlay muted playsInline onLoadedMetadata={handleVideoLoad} />
			</div>
			<h4>Let's get you verified</h4>
			{initSnapWaitingTime === snapWaitingTime ? "" : `wait for ${snapWaitingTime} second for take picker`}
			<h5>make sure to frame your face in the oval!</h5>
		</div>
	);
};

export default CaptureImage;
