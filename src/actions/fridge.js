import apiService from '../utils/apiService';
import { fridgeActions } from '../reducers/fridge';
import {
  fridgePath,
  fridgeIdPath,
  fridgePageablePath,
  filterPageablePath,
} from '../constants/apiEndpoints';
import { createNotification } from '../utils';
import { notificationType } from '../constants/globals';
import { errorAction, filterSuccessAction } from '../utils/actions';

export const createFridge = (fridge, callback, messages, pageSize) => {
  return (dispatch) => {
    dispatch(fridgeActions.actionStart());
    return apiService
      .post(fridgePath(), fridge)
      .then((response) => {
        dispatch(fridgeActions.addFridge(response.data));
        callback();
        dispatch(fetchAllFridgesPageble(0, pageSize));
      })
      .then(() => {
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successCreation
        );
      })
      .catch((err) => {
        errorAction(err, fridgeActions.actionError, dispatch, messages);
      });
  };
};

export const updateFridge = (fridge, callback, messages) => {
  return (dispatch) => {
    dispatch(fridgeActions.actionStart());
    return apiService
      .put(fridgePath(), fridge)
      .then((response) => {
        dispatch(fridgeActions.updateFridge(response.data));
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successUpdate
        );
        callback();
      })
      .catch((err) => {
        errorAction(err, fridgeActions.actionError, dispatch, messages);
      });
  };
};

export const fetchFridgeById = (id) => {
  return (dispatch) => {
    dispatch(fridgeActions.actionStart());
    return apiService
      .get(fridgeIdPath(id))
      .then((response) => {
        dispatch(fridgeActions.fetchFridgeById(response.data));
      })
      .catch((err) => {
        dispatch(fridgeActions.actionError(err?.response?.data));
      });
  };
};

export const fetchAllFridges = () => {
  return (dispatch) => {
    dispatch(fridgeActions.actionStart());
    return apiService
      .get(fridgePath())
      .then((response) => {
        dispatch(fridgeActions.fetchAllFridges(response.data));
      })
      .catch((err) => {
        dispatch(fridgeActions.actionError(err?.response?.data));
      });
  };
};

export const fetchAllFridgesPageble = (pageNumber, pageSize) => {
  return (dispatch) => {
    dispatch(fridgeActions.actionStart());
    return apiService
      .get(fridgePageablePath(pageNumber, pageSize))
      .then((response) => {
        dispatch(
          fridgeActions.fetchAllFridgesPageble([
            response.data.content,
            response.data.totalPages,
            response.data.totalElements,
          ])
        );
      })
      .catch((err) => {
        dispatch(fridgeActions.actionError(err?.response?.data));
      });
  };
};

export const deleteFridge = (id, messages, activePage, pageSize) => {
  return (dispatch) => {
    dispatch(fridgeActions.actionStart());
    return apiService
      .delete(fridgeIdPath(id))
      .then(() => {
        dispatch(fridgeActions.deleteFridge(id));
        dispatch(fetchAllFridgesPageble(activePage, pageSize));
      })
      .then(() => {
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successDelete
        );
      })
      .catch((err) => {
        errorAction(err, fridgeActions.actionError, dispatch, messages);
      });
  };
};

export const deleteErrorFridge = () => {
  return (dispatch) => {
    dispatch(fridgeActions.clearError());
  };
};

export const filterAllFridgesPageable = (searchData, messages) => {
  return (dispatch) => {
    dispatch(fridgeActions.actionStart());
    return apiService
      .post(filterPageablePath(), searchData)
      .then((response) => {
        filterSuccessAction(
          response,
          fridgeActions.fetchAllFridgesPageble,
          dispatch,
          messages
        );
      })
      .catch((err) => {
        errorAction(err, fridgeActions.actionError, dispatch, messages);
      });
  };
};
