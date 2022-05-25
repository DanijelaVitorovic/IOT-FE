import apiService from '../utils/apiService';
import { roleActions } from '../reducers/role';
import { createNotification } from '../utils';
import { notificationType } from '../constants/globals';
import {
  rolePath,
  roleIdPath,
  rolePageablePath,
  actionsFetchAllPath,
  roleFetchAllDTOPath,
  roleAddAndReturnRoleDTOPath,
  roleFetchAllHashMapListPath,
} from '../constants/apiEndpoints';
import { errorAction } from '../utils/actions';

export const createRoleAndReturnRoleDTO = (
  role,
  callback,
  messages,
  pageSize
) => {
  return (dispatch) => {
    dispatch(roleActions.actionStart());
    return apiService
      .post(roleAddAndReturnRoleDTOPath(), role)
      .then((response) => {
        dispatch(roleActions.addRoleAndReturnRoleDTO(response.data));
        callback();
        dispatch(fetchAllRolesPageable(0, pageSize));
      })
      .then(() => {
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successCreation
        );
      })
      .catch((err) => {
        errorAction(err, roleActions.actionError, dispatch, messages);
      });
  };
};

export const updateRole = (role, callback, messages) => {
  return (dispatch) => {
    dispatch(roleActions.actionStart());
    return apiService
      .put(rolePath(), role)
      .then((response) => {
        dispatch(roleActions.updateRole(response.data));
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successUpdate
        );
        callback();
      })
      .catch((err) => {
        errorAction(err, roleActions.actionError, dispatch, messages);
      });
  };
};

export const fetchAllRolesPageable = (pageNumber, pageSize) => {
  return (dispatch) => {
    dispatch(roleActions.actionStart());
    return apiService
      .get(rolePageablePath(pageNumber, pageSize))
      .then((response) => {
        dispatch(
          roleActions.fetchAllRolesPageable([
            response.data.content,
            response.data.totalPages,
            response.data.totalElements,
          ])
        );
      })
      .catch((err) => {
        dispatch(roleActions.actionError(err?.response?.data));
      });
  };
};

export const deleteRole = (id, messages, activePage, pageSize) => {
  return (dispatch) => {
    dispatch(roleActions.actionStart());
    return apiService
      .delete(roleIdPath(id))
      .then(() => {
        dispatch(roleActions.deleteRole(id));
        dispatch(fetchAllRolesPageable(activePage, pageSize));
      })
      .then(() => {
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successDelete
        );
      })
      .catch((err) => {
        errorAction(err, roleActions.actionError, dispatch, messages);
      });
  };
};

export const fetchAllRolesDTO = () => {
  return (dispatch) => {
    dispatch(roleActions.actionStart());
    return apiService
      .get(roleFetchAllDTOPath())
      .then((response) => {
        dispatch(roleActions.fetchAllRolesDTO(response.data));
      })
      .catch((err) => {
        dispatch(roleActions.actionError(err?.response?.data));
      });
  };
};

export const fetchAllActions = () => {
  return (dispatch) => {
    dispatch(roleActions.actionStart());
    return apiService
      .get(actionsFetchAllPath())
      .then((response) => {
        dispatch(roleActions.fetchAllActions(response.data));
      })
      .catch((err) => {
        dispatch(roleActions.actionError(err?.response?.data));
      });
  };
};

export const fetchAllRolesHashMapList = (messages) => {
  return (dispatch) => {
    dispatch(roleActions.actionStart());
    return apiService
      .get(roleFetchAllHashMapListPath())
      .then((response) => {
        const data = response?.data;
        if (data?.statusCode === 204) {
          createNotification(
            notificationType.info,
            messages.roleTitle,
            data?.message
          );
        } else dispatch(roleActions.fetchAllRolesHashMapList(data));
      })
      .catch((err) => {
        dispatch(roleActions.actionError(err?.response?.data));
      });
  };
};

export const deleteErrorRole = () => {
  return (dispatch) => {
    dispatch(roleActions.clearError());
  };
};
