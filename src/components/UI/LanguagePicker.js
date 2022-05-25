import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { locale, sessionStorageConstants } from '../../constants/globals';
import withTranslations from '../../utils/HighOrderComponent';
import { fetchLocaleFromSessionStorage } from '../../utils';
import { Tooltip } from '@mui/material';
import styles from '../../styles/css/LanguagePicker.module.css';

const localeList = Object.keys(locale);
const ITEM_HEIGHT = 48;

const LanguagePicker = (props) => {
  const { gt, t } = props || {},
    { Tooltips } = t || {};
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocaleSwitch = (event) => {
    const appLocaleTranslation = event.target.textContent;
    const appLocale =
      Object.entries(gt.Lang)?.find(
        (lang) => lang[1] === appLocaleTranslation
      )?.[0] || locale.default;
    sessionStorage.setItem(sessionStorageConstants.LOCALE, appLocale);
    handleClose();
    window.location.reload();
  };

  const options = localeList
    ?.filter((loc) => loc !== 'default')
    ?.map((lang) => gt?.Lang[lang]);

  const menuItems =
    options?.map((option, index) => (
      <MenuItem
        key={option + '_' + index}
        selected={option === gt?.Lang[fetchLocaleFromSessionStorage()]}
        onClick={handleLocaleSwitch}
      >
        {option}
      </MenuItem>
    )) || [];

  return (
    <div className={styles['lang-wrapper-div']}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Tooltip title={Tooltips.languagePicker} placement="left" arrow={true}>
          <TranslateRoundedIcon />
        </Tooltip>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
        className={styles['lang-menu-item-visibility']}
      >
        {menuItems}
      </Menu>
    </div>
  );
};

export default withTranslations(LanguagePicker, 'LanguagePicker');
