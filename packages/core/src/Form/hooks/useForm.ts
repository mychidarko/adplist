import * as React from "react";
import {
	resetObject,
	objectHasProperty,
	isEqual,
	objectKeys,
} from "../utils";
import validators from "../utils/validations";
import { FormConfig, UseFormOutput } from "../@types/Form";

const useForm = (config: FormConfig): UseFormOutput => {
	const { optional, fields } = config;
	const [initialState, setInitialState] = React.useState(fields);
	const [inputState, setInputState] =
		React.useState<Record<keyof typeof fields, any>>(fields);
	const [errors, setErrors] = React.useState(resetObject({ ...fields }));
	const latestInputState = React.useRef(fields);
	const latestErrorState = React.useRef(resetObject({ ...fields }));
	const optionalRef = React.useRef(optional);

	const _setInputState = React.useCallback((name: string, value: any) => {
		setInputState((prevInputState: any) => {
			return {
				...prevInputState,
				[name]: value,
			};
		});

		latestInputState.current = {
			...latestInputState.current,
			[name]: value,
		};
	}, []);

	function _setErrors(name: string, error: any) {
		setErrors((prevErrors: any) => {
			return { ...prevErrors, [name]: error };
		});
		latestErrorState.current = {
			...latestErrorState.current,
			[name]: error,
		};
	}

	const validateField = React.useCallback(
		(e: any) => {
			const { name } = e.target;
			const optional = optionalRef.current;
			const validations = { ...config.validators, ...validators };

			if (optional?.includes(name)) {
				return;
			}

			const error = validations[(objectHasProperty(validations, name) ? name : 'any') as string](
				latestInputState.current[name],
				inputState,
				name,
			);

			_setErrors(name, error);
		},
		[config.validators, inputState],
	);

	// utitlity function to validate all fields before submitting a form.
	const validateFields = React.useCallback(() => {
		const fields = objectKeys(inputState);
		fields.forEach((field) => {
			if (optional?.includes(field as string)) {
				return;
			}
			validateField({ target: { name: field } });
		});
		return latestErrorState.current;
	}, [optional, inputState, validateField]);

	// onchange handler
	const onChange = React.useCallback(
		(e: any) => {
			const { name, value } = e.target;

			_setInputState(name, value);
		},
		[_setInputState]
	);

	const onBlur = React.useCallback(
		(e: any) => {
			validateField(e);
		},
		[validateField]
	);

	function resetForm() {
		setInputState(resetObject(inputState));
		latestInputState.current = resetObject(inputState);
		latestErrorState.current = resetObject(inputState);
	}

	const initializeForm = React.useCallback((form: any) => {
		setInputState(form);
		latestInputState.current = form;
	}, []);

	function resetFormToInitialState() {
		setInputState(initialState);
	}

	function hasFormStateChanged() {
		return !isEqual(initialState, inputState);
	}

	function updateInitialState(state: any) {
		setInitialState(state);
	}

	function setErrorState(errors: Record<string, string>) {
		const keys = Object.keys(errors);

		keys.forEach((key) => {
			_setErrors(key, errors[key]);
		});
	}

	return {
		resetFormToInitialState,
		updateInitialState,
		hasFormStateChanged,
		initializeForm,
		resetForm,
		validateField,
		errors,
		onBlur,
		onChange,
		inputState,
		setInputField: _setInputState,
		setInputState,
		validateFields,
		setErrors: setErrorState,
	};
};

export default useForm;
