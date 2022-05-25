import React from 'react';

const AuthContext = React.createContext({
  loggedUser: {},
  validToken: false,
  qrCode: '',
  allowedActions: [],
  error: undefined,
});

export default AuthContext;
