import { notificationType } from '../constants/globals';
import { createNotification } from '../utils';

export const filterSuccessAction = (response, action, dispatch, messages) => {
  dispatch(
    action([
      response.data.content,
      response.data.totalPages,
      response.data.totalElements,
    ])
  );
  response.data.content?.length === 0 &&
    messages &&
    createNotification(notificationType.info, null, messages.notFoundMessage);
};

export const errorAction = (error, action, dispatch, messages) => {
  dispatch(action(error?.response?.data));
  createNotification(
    notificationType.error,
    messages?.errorTitle,
    error?.response?.data?.message
  );
};
