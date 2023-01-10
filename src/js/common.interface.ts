export interface ParselyAPIError {
	error: ParselyAPIErrorInfo;
}

export interface ParselyAPIErrorInfo {
		code: number;
		message: string;
		html: string;
}
