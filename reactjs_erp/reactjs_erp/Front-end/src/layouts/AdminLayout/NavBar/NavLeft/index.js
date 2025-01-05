import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import Finfolan_logo  from './Finfolab-Logo.png'

import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';

const NavLeft = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <React.Fragment>
      <div className="navbar-brand header-logo">
        <Link to="#" className="b-brand">
          <div className="b-bg">
          <img 
 src=''
  style={{
    fontSize: '33px',
    width: '47px',
    borderRadius: '23px',
    marginLeft: '38px'
  }} 
  width={23} 
  alt="Algomojo Logo" 
/>


          </div>
        
        </Link>
        {location.pathname !== '/app/process/default' &&
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
        <i className="feather icon-align-justify" style={{ fontSize: '24px' }} />

        </Link>}
      </div>
    </React.Fragment>
  );
};

export default NavLeft;
