
import type { SnackbarOrigin } from '@mui/material';
import { create } from 'zustand';
import { redux } from 'zustand/middleware';

export type AlertActionTypes = 'ALERT/SET_SUCCESS' | 'ALERT/SET_ERROR' | 'ALERT/CLEAR_ALERT';

export type AlertAction = {
  type: AlertActionTypes;
  payload?:
    | {
        errorMessage: string | string[];
        autoHideMs?: number;
        anchorOrigin?: SnackbarOrigin;
      }
    | {
        successMessage: string;
        autoHideMs?: number;
        anchorOrigin?: SnackbarOrigin;
      };
};

interface SelectedAlert {
  errorMessage?: string | string[];
  successMessage?: string;
  isSuccess?: boolean;
  isError?: boolean;
  isClosed?: boolean;
  autoHideMs?: number | null;
  anchorOrigin?: SnackbarOrigin;
}

export type AlertState = {
  alert: SelectedAlert;
};

export const initialAlertState: AlertState = {
  alert: {
    errorMessage: '',
    successMessage: '',
    isSuccess: false,
    isError: false,
    isClosed: false,
    autoHideMs: null,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    }
  }
};

export function AlertReducer(state: AlertState, action: AlertAction) {
  switch (action.type) {
    case 'ALERT/SET_SUCCESS': {
      const { successMessage, autoHideMs, anchorOrigin } = action.payload as {
        successMessage: string;
        autoHideMs?: number;
        anchorOrigin?: SnackbarOrigin;
      };
      return {
        ...state,
        alert: {
          ...state.alert,
          isSuccess: true,
          isError: false,
          isClosed: false,
          errorMessage: '',
          successMessage,
          autoHideMs: autoHideMs ?? null,
          anchorOrigin: anchorOrigin ?? initialAlertState.alert.anchorOrigin
        }
      };
    }
    case 'ALERT/SET_ERROR': {
      const { errorMessage, autoHideMs, anchorOrigin } = action.payload as {
        errorMessage: string;
        autoHideMs?: number;
        anchorOrigin?: SnackbarOrigin;
      };
      return {
        ...state,
        alert: {
          ...state.alert,
          isError: true,
          isSuccess: false,
          isClosed: false,
          successMessage: '',
          errorMessage,
          autoHideMs: autoHideMs ?? null,
          anchorOrigin: anchorOrigin ?? initialAlertState.alert.anchorOrigin
        }
      };
    }
    case 'ALERT/CLEAR_ALERT': {
      return {
        ...state,
        alert: {
          ...state.alert,
          isError: false,
          isSuccess: false,
          isClosed: true,
          errorMessage: '',
          successMessage: '',
          autoHideMs: null,
          anchorOrigin: initialAlertState.alert.anchorOrigin
        }
      };
    }
    default:
      return state;
  }
}

export const useAlertStore = create(redux(AlertReducer, initialAlertState));
