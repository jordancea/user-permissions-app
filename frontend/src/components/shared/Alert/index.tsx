import { Snackbar, Alert as MuiAlert, Box } from '@mui/material';
import { useAlertStore } from './useAlertStore';

const createMultyLineErrorMessage = (errorMessages: string[]) => {
	return (
		<>
			{errorMessages.map((errMsg) => (
				<Box key={errMsg}>
					<Box>{errMsg}</Box>
				</Box>
			))}
		</>
	);
};

export const Alert = ({ onClose }: { onClose?: () => void }) => {
	const errorMessage = useAlertStore(state => state.alert.errorMessage);
	const successMessage = useAlertStore(state => state.alert.successMessage);
	const isSuccess = useAlertStore(state => state.alert.isSuccess);
	const isError = useAlertStore(state => state.alert.isError);
	const autoHideMs = useAlertStore(state => state.alert.autoHideMs);
	const dispatch = useAlertStore(state => state.dispatch);
	const anchorOrigin = useAlertStore(state => state.alert.anchorOrigin);
	return (
		<>
			{(isError || isSuccess) && (
				<Snackbar
					open={true}
					autoHideDuration={autoHideMs}
					anchorOrigin={anchorOrigin}
					onClose={() => {
						onClose?.();
						dispatch({ type: 'ALERT/CLEAR_ALERT' });
					}}
				>
					<MuiAlert
						elevation={6}
						variant='filled'
						severity={errorMessage?.length ? 'error' : 'success'}
					>
						{successMessage ||
							(Array.isArray(errorMessage)
								? createMultyLineErrorMessage(errorMessage)
								: errorMessage)}
					</MuiAlert>
				</Snackbar>
			)}
		</>
	);
};
