export class ApiError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

export const createApiError = (message, statusCode) => {
	return new ApiError(message, statusCode);
};
