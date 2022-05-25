import React, { forwardRef, useCallback, useEffect } from 'react';

const OutsideClick = forwardRef((props, ref) => {
  const { onToggleNavigation, windowWidth, collapseMenu } = props || {};
  let wrapperRef = ref;

  /**
   * close menu if clicked on outside of element
   */
  const outsideClickHandler = useCallback(
    (event) => {
      if (wrapperRef && !wrapperRef.contains(event.target)) {
        if (windowWidth < 992 && collapseMenu) {
          onToggleNavigation();
        }
      }
    },
    [windowWidth, collapseMenu, wrapperRef, onToggleNavigation]
  );

  useEffect(() => {
    document.addEventListener('mousedown', outsideClickHandler);
    return () => {
      document.removeEventListener('mousedown', outsideClickHandler);
    };
  }, [outsideClickHandler]);

  function setWrapperRef(node) {
    wrapperRef = node;
  }

  return (
    <div className="nav-outside" ref={setWrapperRef}>
      {props.children}
    </div>
  );
});

export default OutsideClick;
