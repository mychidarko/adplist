import axios, { AxiosPromise, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { HermesData, HookResponse } from "./@types/hermes";

export class HermesConfig {
	static baseUrl: string = "";
	static token: string;
	static parseErr: boolean = true;
	static blockOffline: boolean = true;
	static onAuthError: Function;
	static onServerError: Function;
	static withCredentials: boolean = false;
};

export function hermes({
	data,
	url,
	method = "GET",
	token = null,
  authorization = null,
	cache = null,
	withCredentials,
	useBase = true,
	options = {
		parseErr: HermesConfig.parseErr,
		blockOffline: HermesConfig.blockOffline,
	},
}: HermesData): AxiosPromise {
	const headers: any = {};
	const requestURL = useBase ? `${HermesConfig.baseUrl}${url}` : url;

	if (authorization) {
    headers.Authorization = authorization;
  } else {
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else if (HermesConfig.token) {
      headers.Authorization = `Bearer ${HermesConfig.token}`;
    }
  }

	return new Promise(async (resolve, reject) => {
		if (!window.navigator.onLine && options.blockOffline) {
			return reject(
				"No network detected! This feature requires an internet connection!"
			);
		}

		try {
			const response = await axios({
				data,
				url: requestURL,
				method,
				headers,
				withCredentials: withCredentials || HermesConfig.withCredentials,
			});

			if (!response.data) {
				response.data = {
					data: cache,
					mode: "CACHE",
				};
			}

			return resolve(response);
      // @ts-ignore
		} catch (err: any) {
			if (!options.parseErr) {
				return reject(err);
			}

			if (err.response) {
				const onAuthError =
					options.onAuthError || HermesConfig.onAuthError;

				if (err.response.status === 401 && onAuthError) {
					onAuthError(err);
				}

				const onServerError =
					options.onServerError || HermesConfig.onServerError;

				if (err.response.status === 500 && onServerError) {
					onServerError(err);
				}

				return reject(err.response);
			}

			if (err.message) {
				return reject(err.message);
			}

			const errors = err.split(" ");
			let errorString = "";

			for (let index = 0; index < errors.length; index + 1) {
				const error = errors[index];

				if (index > 0) {
					errorString = `${errorString} ${error} `;
				}
			}

			return reject(errorString);
		}
	});
}

export function useHermes(
	url: string,
	options: Partial<HermesData> = {
		method: "GET",
		refresh: 0,
	}
): HookResponse {
	const [loading, setLoading] = useState<boolean>(
		options.cache !== null || true
	);
	const [response, setResponse] = useState<Partial<AxiosResponse<any>>>({});
	const [error, setError] = useState(null);

	const makeRequest = () => {
		hermes({ url, ...options })
			.then((res) => {
				if (!res && options.cache) {
					const response: any = res;

					response.data = {
						data: options,
						mode: "CACHE",
					};

					setResponse(response);
				}

				setResponse(res);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const runQuery = () => {
		makeRequest();

		if (options.refresh) {
			const refresh = setInterval(() => {
				makeRequest();
			}, options.refresh);

			return () => {
				clearInterval(refresh);
			};
		}

    return () => {};
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(runQuery, [url]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(runQuery, []);

  // @ts-ignore
	return [response, loading, error];
}

export function useGet(url: string, options: Partial<HermesData> = {}) {
	return useHermes(url, {
		method: "GET",
		...options,
	});
}

export function withGet() {
	return useGet;
}

export function usePost(url: string, options: Partial<HermesData> = {}) {
	return useHermes(url, {
		method: "POST",
		...options,
	});
}

export function usePut(url: string, options: Partial<HermesData> = {}) {
	return useHermes(url, {
		method: "PUT",
		...options,
	});
}
