import * as yup from "yup";
import { LookingFor, Passion } from "../types";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { APISuccessResponse } from "../utils/axios";
import API from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { saveUserOnboardingAction } from "../store/actions/user.action";
import { RootState } from "../store";
import { UserState } from "../store/reducers/user.reducer";
import { useIonToast } from "@ionic/react";

import WelcomeSignUp from "../pages/CongratsSignUp/CongratsSignUp";
import Step1 from "../pages/OnBoarding/Steps/Step1";
import Step2 from "../pages/OnBoarding/Steps/Step2";
import Step3 from "../pages/OnBoarding/Steps/Step3";

const validationSchemaStep1 = yup.object().shape({
	firstname: yup.string().required("Firstname is required"),
	lastname: yup.string().required("Lastname is required"),
	month: yup.number().required("Month is required").min(1).max(12),
	date: yup
		.number()
		.required("Date is required")
		.max(31)
		.min(1)
		.test("date-validation", (value, ctx) => {
			const { month, year } = ctx.parent;
			if (!year || !month) return true;
			const date = new Date(year, month - 1, value);
			return date.getDate() === +value;
		}),
	year: yup
		.number()
		.required("Year is required")
		.test("year-check", (value) => {
			const currentDate = new Date();
			const minYear = currentDate.getFullYear() - 150,
				maxYear = currentDate.getFullYear() - 18;
			return minYear < value && value < maxYear;
		}),
	gender: yup.string().required("Gender is required").is(["male", "female"], "Gender must be 'Male' or 'Female'"),
});

const validationSchemaStep2 = yup.object().shape({
	showMe: yup
		.string()
		.required()
		.is(["male", "female", "everyone"], "Show me must be 'Male', 'Female' either 'Everyone'"),
	passions: yup.array().optional().max(5),
	lookingFor: yup.string().nullable().optional().default(null),
});

const validationSchemaStep3 = yup.object().shape({
	profileImages: yup
		.array(
			yup.mixed().test("fileSize", "The file is too large", (values: any) => {
				return values?.size <= 5242880;
			}),
		)
		.min(2)
		.max(6),
});

const steps = [
	{ component: WelcomeSignUp, validationSchema:yup.object({})},
	{ component: Step1, validationSchema: validationSchemaStep1 },
	{ component: Step2, validationSchema: validationSchemaStep2 },
	{ component: Step3, validationSchema: validationSchemaStep3 },
];

export type PhoneModelTypes = {
	isOpen: boolean;
};

type SelectModelTypes = {
	isOpen: boolean;
	for: "passions" | "lookingFor" | "image-cropper" | null;
	file: any;
};

const initialValues: any = {
	firstname: null,
	lastname: null,
	month: null,
	date: null,
	year: null,
	avatar: null,
	gender: null,
	showMe: false,
	showMyGenderOnProfile: false,
	passions: [],
	profileImages: [],
	lookingFor: null,
};

const initSelectModel: SelectModelTypes = { isOpen: false, for: null, file: null };

const useOnboarding = () => {
	const dispatch = useDispatch();
	const [currentStep, setCurrentStep] = useState(0);
	const { error, message } = useSelector<RootState, UserState>((state) => state.user);
	const [present] = useIonToast();

	const handleNextStep = async (values: any, { setSubmitting }: any) => {
		const currentValidationSchema = steps[currentStep].validationSchema;
		try {
			await currentValidationSchema.validate(values, { abortEarly: false });
			setSubmitting(false);
			if (currentStep === steps.length - 1) {
				await dispatch<any>(saveUserOnboardingAction({ values, setSubmitting }));
			} else {
				setCurrentStep(currentStep + 1);
			}
		} catch (error) {
			setSubmitting(false);
		}
	};

	const { handleSubmit, errors, values, touched, isValid, handleChange, handleBlur, isSubmitting } = useFormik({
		initialValues: initialValues,
		validationSchema: steps[currentStep].validationSchema,
		onSubmit: handleNextStep,
	});

	const [{ passions, lookingFor }, setUserInterestData] = useState<{
		passions: Array<Passion>;
		lookingFor: Array<LookingFor>;
	}>({ passions: [], lookingFor: [] });
	const [selectModel, setSelectModel] = useState(initSelectModel);
	const imagesInputRef: any = useRef();

	useEffect(() => {
		let isMounted = true;
		const fetchPassions = async () => {
			const { data } = await API.get<APISuccessResponse<Passion[]>>("/passions");
			if (isMounted) {
				setUserInterestData((state) => ({ ...state, passions: data?.data }));
			}
		};
		const fetchLookingFor = async () => {
			const { data } = await API.get("/lookingfor");
			if (isMounted) {
				setUserInterestData((state) => ({ ...state, lookingFor: data?.data }));
			}
		};
		fetchPassions();
		fetchLookingFor();
		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		if (error) present({ message: message || "Something is wrong here!", duration: 3000 });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, present]);

	const onSelectModelClose = () => {
		setSelectModel({ ...initSelectModel, isOpen: false });
	};

	const onSelectValues = (id: string, name?: string) => {
		const inputName: any = selectModel.for || name;
		if (inputName === "lookingFor") {
			handleChange({ target: { name: inputName, value: id } });
		} else {
			const selectedValues = values[inputName];
			const value = selectedValues?.find((value: string) => value === id);
			handleChange({
				target: {
					name: inputName,
					value: value ? values[inputName].filter((value: string) => value !== id) : [...(selectedValues ?? []), id],
				},
			});
		}
	};

	const onSelectProfilePhoto = (blob: any) => {
		const file = new File([blob], selectModel?.file?.name ?? blob.name, { type: blob.type });
		if (!values.profileImages.length) handleChange({ target: { name: "avatar", value: file } });
		handleChange({ target: { name: "profileImages", value: [...values.profileImages, file] } });
	};

	const removeInterest = (key: string, id: string) => {
		handleChange({
			target: {
				name: key,
				value: values[key].filter((value: string) => value !== id),
			},
		});
	};

	const removeSelectedImage = (fileIndex: number) => {
		const currentArray: Array<any> = values.profileImages;
		delete currentArray[fileIndex];
		handleChange({ target: { name: "profileImages", value: currentArray.filter((file) => file) } });
	};

	return {
		formik: { values, errors, touched, isValid, isSubmitting, handleChange, handleBlur, handleSubmit },
		steps,
		passions,
		lookingFor,
		currentStep,
		setCurrentStep,
		imagesInputRef,
		selectModel,
		removeSelectedImage,
		removeInterest,
		setSelectModel,
		onSelectModelClose,
		onSelectProfilePhoto,
		onSelectValues,
	};
};

export default useOnboarding;
