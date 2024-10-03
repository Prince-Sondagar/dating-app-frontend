import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import localStorage from "../services/localStorage.service";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export type APISuccessResponse<T = undefined> = {
	error: boolean;
	message: string;
	data: T;
	response: AxiosResponse<T>;
};

const createAxiosInstance = (): AxiosInstance => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_BASE_API_URL,
	});

	const refreshAuthLogic = (failedRequest: any) => {
		const refreshToken = localStorage.getItem("tokens")?.refresh_token;
		return axios
			.post(`${process.env.REACT_APP_BASE_API_URL}/auth/renew-token`, { refreshToken })
			.then((tokenRefreshResponse) => {
				localStorage.setItem("tokens", {
					access_token: tokenRefreshResponse?.data?.data?.access_token,
					refresh_token: tokenRefreshResponse?.data?.data?.refresh_token,
				});
				failedRequest.response.config.headers[
					"authorization"
				] = `Bearer ${tokenRefreshResponse?.data?.data?.access_token}`;
				return Promise.resolve();
			})
			.catch((error) => {
				localStorage.clear();
				window.location.href = "/welcome";
				return Promise.reject(error);
			});
	};

	createAuthRefreshInterceptor(instance, refreshAuthLogic, { statusCodes: [401] });

	instance.interceptors.request.use(
		(config: AxiosRequestConfig) => {
			const tokens = localStorage.getItem("tokens");
			// @ts-ignore
			config.headers.authorization = `Bearer ${tokens?.access_token}`;
			return config;
		},
		(error) => {
			console.log("error adding authorization header to request", error);
			return Promise.reject(error);
		},
	);

	instance.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error) => {
			return Promise.reject(error.response ?? error);
		},
	);

	return instance;
};

const axiosClient = createAxiosInstance();

export default axiosClient;
