import { camelCaseToReadable } from ".";

const validators: Record<string, any> = {
	password: function (value: string, fields: any) {
		if (value.length < 8) {
			return "Password should be min 8 characters";
		}
		if (!/\d/.test(value)) {
			return "Password should contain at least one digit";
		}
		// if (!/[A-Z]/.test(value)) {
		// 	return "Password should contain at least one Capital Letter";
		// }
		// if (!/[a-z]/.test(value)) {
		// 	return "Password should contain at least one small Letter";
		// }
		// if (!/\W/.test(value)) {
		// 	return "Password should contain at least one special character";
		// }
	},

	confirmPassword: function (value: string, fields: any) {
		if (value !== fields.password) {
			return "passwords do not match";
		}
	},

	email: function (value: string) {
		const validEmailSignature =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!value || !validEmailSignature.test(value)) {
			return "Please enter a valid email address";
		}
	},

	any: function (value: string, fields?: any, name?: string) {
		if (value === "" || value === undefined || value === null) {
			return `${
				camelCaseToReadable(name as string) || "this field"
			} cannot be empty`;
		}
	},

	// phoneNumber: function (value: string) {
	// 	if (!value || value.length < 10) {
	// 		return "please enter a valid phone number";
	// 	}
	// },
};

export default validators;
