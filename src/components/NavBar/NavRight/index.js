import React, { Fragment, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/security';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import Tooltip from '@mui/material/Tooltip';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../../store/auth_context';

const NavRight = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(logout(history));
  };

  const ctx = useContext(AuthContext);
  const { loggedUser, validToken } = ctx || {};
  const { gt } = props || {},
    { Tooltips } = gt || {};

  return (
    <Fragment>
      {validToken && (
        <ul
          className="navbar-nav"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexFlow: 'row',
          }}
        >
          <li>
            <b>{loggedUser.username}</b>
          </li>
          <li>
            <Link to="#" onClick={logoutHandler}>
              <Tooltip title={Tooltips.logout} placement="bottom" arrow={true}>
                <PowerSettingsNewRoundedIcon className="logout-icon" />
              </Tooltip>
            </Link>
          </li>
        </ul>
      )}
    </Fragment>
  );
};

export default NavRight;
