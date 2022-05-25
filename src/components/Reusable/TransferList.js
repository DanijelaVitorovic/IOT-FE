import React, { useState } from 'react';
import {
  Grid,
  List,
  Card,
  CardHeader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  Divider,
} from '@mui/material';
import withTranslations from '../../utils/HighOrderComponent';
import ErrorLabel from './ErrorLabel';
import { isUndefined } from 'lodash';
import SearchFilter from './SearchFilter';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function TransferList(props) {
  const {
    t,
    name,
    error,
    itemsSelected,
    itemsToChoose,
    onChangeHandler,
    targetPropToSelect,
    targetPropToChoose,
    width,
    height,
    translations,
    errorsHandler,
  } = props || {};

  const itemListToChoose = getNamesFormItemsToChoose(
    itemsToChoose,
    itemsSelected,
    targetPropToChoose,
    targetPropToSelect
  );
  const itemListSelected = getNamesFormItemsHandler(
    itemsSelected,
    targetPropToSelect
  );

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([...itemListToChoose]);
  const [right, setRight] = useState([...itemListSelected]);

  const errorMessage = error?.[name];
  const hasError = !isUndefined(errorMessage);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const listWidth = width || 250;
  const listHeight = height || 230;
  const choicesLabelText = translations?.Choices || t.Choices;
  const chosenLabelText = translations?.Chosen || t.Chosen;
  const selectedLabelText = translations?.selected || t.selected;

  const onToggleHandler = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    hasError && errorRemovalHandler();
  };

  const errorRemovalHandler = () => {
    errorsHandler((prevError) => {
      delete prevError[name];
      return prevError;
    });
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const onToggleAllHandler = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
    hasError && errorRemovalHandler();
  };

  const onCheckedRightHandler = () => {
    const rightList = right.concat(leftChecked);
    setRight(rightList);
    setLeft(not(left, leftChecked));
    setRights(rightList);
    setLefts(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    onChangeHandler(rightList);
  };

  const onCheckedLeftHandler = () => {
    const leftList = not(right, rightChecked);
    setLeft(left.concat(rightChecked));
    setRight(leftList);
    setLefts(left.concat(rightChecked));
    setRights(leftList);
    setChecked(not(checked, rightChecked));
    onChangeHandler(leftList);
  };

  const customList = (title, items, isLeft) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={onToggleAllHandler(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${
          items.length
        } ${selectedLabelText}`}
      />
      <SearchFilter
        tableId={isLeft ? `${name}_left` : `${name}_right`}
        list={isLeft ? left : right}
        setList={isLeft ? (list) => setLefts(list) : (list) => setRights(list)}
        isFilterBasicList
      />
      <List
        sx={{
          width: listWidth,
          height: listHeight,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={onToggleHandler(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const [rights, setRights] = useState(right);
  const [lefts, setLefts] = useState(left);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <Divider />
        {customList(choicesLabelText, lefts, true)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={onCheckedRightHandler}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={onCheckedLeftHandler}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
        {customList(chosenLabelText, rights, false)}
      </Grid>
      <ErrorLabel className="mt-2" error={errorMessage} />
    </Grid>
  );
}

const getNamesFormItemsToChoose = (
  itemsToChoose,
  itemsSelected,
  targetPropToChoose,
  targetPropToSelect
) => {
  const selectedItems = itemsSelected?.slice() || [];
  const allItemList = itemsToChoose?.slice() || [];

  const listOfNamesToChoose =
    allItemList?.filter(
      (item) =>
        !selectedItems.find((selectedItem) =>
          conditionHandler(item, selectedItem, targetPropToChoose)
        )
    ) || [];
  return getNamesFormItemsHandler(listOfNamesToChoose, targetPropToSelect);
};

const getNamesFormItemsHandler = (itemList, targetProp) => {
  return itemList?.map((item) => item[targetProp]) || [];
};

const conditionHandler = (item, selectedItem, targetProp) => {
  return targetProp === 'id'
    ? +selectedItem[targetProp] === +item[targetProp]
    : selectedItem[targetProp] === item[targetProp];
};

export default withTranslations(TransferList, 'TransferList');
