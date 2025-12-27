export const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') return error;

    if (
        error &&
        typeof error === 'object' &&
        'data' in error
    ) {
        const errData = (error as { data: unknown }).data;
        if (
            errData &&
            typeof errData === 'object' &&
            'message' in errData
        ) {
            return (errData as { message: string }).message;
        }
    }

    if (error instanceof Error) return error.message;

    return 'An unexpected error occurred';
};
