import React, { useEffect, useCallback, Fragment } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { formTranslation } from '../utils';
import { isEmpty } from 'lodash';
import { setUserTranslations } from '../actions/user';
import { useDispatch, useSelector } from 'react-redux';
/**
 * A public higher-order component to access translations
 */
let initStart = true;
const withTranslations = (SourceComponent, ComponentName = 'Component') => {
  function TranslatableComponent(props) {
    const dispatch = useDispatch();
    const { translations } = useSelector((state) => state.translationsReducer);
    const translationImportHandler = useCallback(async () => {
      const fileName = formTranslation();
      await import(`../constants/Translations/${fileName}`).then(
        ({ translation }) => {
          dispatch(setUserTranslations(translation));
        }
      );
    }, [dispatch]);

    useEffect(() => {
      if (initStart) {
        initStart = false;
        isEmpty(translations) && translationImportHandler();
        return;
      }
    }, [translationImportHandler, translations]);

    if (!translations?.Global) return <Fragment></Fragment>;

    return (
      <SourceComponent
        {...props}
        t={translations[ComponentName]}
        gt={translations.Global}
        enums={translations.Enums}
      />
    );
  }

  TranslatableComponent.displayName = `withTranslations(${ComponentName})`;

  return hoistStatics(TranslatableComponent, SourceComponent);
};

export default withTranslations;
