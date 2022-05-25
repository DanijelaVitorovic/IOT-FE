import React from 'react';
import { tableNames } from '../../../constants/globals';
import Filter from '../../Reusable/Filter/Filter';
import { config } from './userFilterConfig';

const UserFilter = (props) => {
  const { translations, filterTranslations, setPostData, roles } = props || {};

  const rolesForCombo = roles?.map((role) => {
    return {
      id: role.id,
      text: role.roleName,
    };
  });

  return (
    <Filter
      tableName={tableNames.USER}
      savePostData={setPostData}
      config={config({ rolesForCombo })}
      packedTranslations={translations}
      translations={filterTranslations}
    />
  );
};

export default UserFilter;
