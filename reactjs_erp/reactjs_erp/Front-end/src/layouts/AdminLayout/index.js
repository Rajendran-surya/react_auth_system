import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

import Navigation from './Navigation';
import NavBar from './NavBar';
// import Breadcrumb from './Breadcrumb';

import useWindowSize from '../../hooks/useWindowSize';
import useOutsideClick from '../../hooks/useOutsideClick';
import { ConfigContext } from '../../contexts/ConfigContext';
import * as actionType from '../../store/actions';

const AdminLayout = ({ children }) => {
  const windowSize = useWindowSize();
  const ref = useRef();
  const configContext = useContext(ConfigContext);
  const location = useLocation(); // Use useLocation hook to get current location

  const { collapseMenu, headerFixedLayout } = configContext.state;
  const { dispatch } = configContext;

  useEffect(() => {
    if (windowSize.width > 992 && windowSize.width <= 1024) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }

    if (windowSize.width < 992) {
      dispatch({ type: actionType.CHANGE_LAYOUT, layout: 'vertical' });
    }
  }, [dispatch, windowSize]);

  useOutsideClick(ref, () => {
    if (collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  });

  const mobileOutClickHandler = () => {
    if (windowSize.width < 992 && collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  };

  let common = (
    <React.Fragment>
      
      {location.pathname !== '/app/process/default' && <Navigation />}
      <NavBar />
    </React.Fragment>
  );

  let mainContainer = (
    <React.Fragment>
      <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              {/* <Breadcrumb /> */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  if (windowSize.width < 992) {
    let outSideClass = ['nav-outside'];
    if (collapseMenu) {
      outSideClass = [...outSideClass, 'mob-backdrop'];
    }
    if (headerFixedLayout) {
      outSideClass = [...outSideClass, 'mob-fixed'];
    }

    common = (
      <div className={outSideClass.join(' ')} ref={ref}>
        {common}
      </div>
    );

    mainContainer = (
      <div
        role="button"
        tabIndex="0"
        className="pcoded-outside"
        onClick={mobileOutClickHandler} // Corrected onClick handler
        onKeyDown={mobileOutClickHandler} // Corrected onKeyDown handler
      >
        {mainContainer}
      </div>
    );
  }

  return (
    <React.Fragment>
      {common}
      {mainContainer}
    </React.Fragment>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node
};
export default AdminLayout;
