// export const validateEmail = (email: string): boolean => {
// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 	return emailRegex.test(email);
// };

// export const validatePassword = (password: string): boolean => {
// 	return password.length >= 6 && password.length <= 12;
// };

// export const validateAge = (age: number): boolean => {
// 	return age >= 18 && age <= 99;
// };

// export const validateLoginForm = (data: LoginCredentials) => {
// 	const errors: Partial<LoginCredentials> = {};

// 	if (!validateEmail(data.email)) {
// 		errors.email = 'Invalid email address';
// 	}

// 	if (!validatePassword(data.password)) {
// 		errors.password = 'Password must be 6-12 characters long';
// 	}

// 	return errors;
// };

// export const validateRegisterForm = (data: RegisterCredentials) => {
// 	const errors: Partial<RegisterCredentials> = {};

// 	if (!validateEmail(data.email)) {
// 		errors.email = 'Invalid email address';
// 	}

// 	if (!validatePassword(data.password)) {
// 		errors.password = 'Password must be 6-12 characters long';
// 	}

// 	if (!validateAge(data.age)) {
// 		errors.age = 'Age must be between 18 and 99';
// 	}

// 	return errors;
// };
