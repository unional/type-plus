export type SystemErrors = {
	EACCES: Error & { code: 'EACCES' },
	EADDRINUSE: Error & { code: 'EADDRINUSE' },
	ECONNREFUSED: Error,
	ECONNRESET: Error,
	EEXIST: Error,
	EISDIR: Error,
	EMFILE: Error,
	ENOENT: Error & { code: 'ENOENT', path: string },
	ENOTDIR: Error,
	ENOTEMPTY: Error,
	ENOTFOUND: Error,
	EPERM: Error,
	EPIPE: Error,
	ETIMEDOUT: Error
}

export type SystemErrorCodes = keyof SystemErrors

/**
 * Type guard NodeJS SystemErrors.
 * The list is not complete. Will add as needed.
 * Feel free to contribute.
 */
export function isSystemError<C extends SystemErrorCodes>(code: C, err: unknown): err is SystemErrors[C] {
	return !!err && (err as any).code === code
}
