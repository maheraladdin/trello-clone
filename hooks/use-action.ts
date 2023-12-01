import {useCallback, useState} from "react";
import {ActionState, FieldErrors} from "@/lib/create-safe-action";
import {toast} from "sonner";

type Action<TInput,TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>;

type UseActionOptions<TOutput> = {
    onSuccess?: (data: TOutput) => void;
    onError?: (error: string) => void;
    onCompleted?: () => void;
    enableToast?: boolean;
    toastSuccessMessage?: string;
    toastErrorMessage?: string;
    toastLoadingMessage?: string;
}

export default function useAction<TInput,TOutput>(
    action: Action<TInput, TOutput>,
    options: UseActionOptions<TOutput> = {}
) {
    const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(undefined);    const [error, setError] = useState<string | undefined>(undefined);
    const [data, setData] = useState<TOutput | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const execute = useCallback(async (input: TInput) => {
        setIsLoading(true);
        try {
            if(options.enableToast)
                toast.promise(action(input), {
                    loading: options.toastLoadingMessage || 'Loading...',
                    success: (result) => {
                        // set the state if it exists
                        setFieldErrors(result.fieldErrors || undefined);
                        setError(result.error || undefined);
                        setData(result.data || undefined);

                        // execute callback functions if they exist and pass the data/error
                        result.data && options.onSuccess?.(result.data);
                        result.error && options.onError?.(result.error);

                        if(result.error) return options.toastErrorMessage + result.error || result.error;
                        return options.toastSuccessMessage || 'Success';
                    },
                    error: 'Promise rejected',
                })
            else {

                const result = await action(input);
                // set the state if it exists
                setFieldErrors(result.fieldErrors || undefined);
                setError(result.error || undefined);
                setData(result.data || undefined);

                // execute callback functions if they exist and pass the data/error
                result.data && options.onSuccess?.(result.data);
                result.error && options.onError?.(result.error);
            }
        }
        catch (error: any) {
            setError(error.message);
        }
        finally {
            setIsLoading(false);
            if (options.onCompleted) {
                options.onCompleted();
            }
        }
    }, [action, options]);

    return {
        execute,
        fieldErrors,
        error,
        data,
        isLoading,
    }
}