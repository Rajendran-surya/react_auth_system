import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';

const MenuItems = ({ menuItems, navbarWidth }) => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const handleItemClick = (itemId) => {

    const updatedOpenSubmenus = {};
  
 
    updatedOpenSubmenus[itemId] = !openSubmenus[itemId];
  
 
    setOpenSubmenus(updatedOpenSubmenus);
  };
  
  
  
  const renderSubMenuItems = (item) => {
    if (!item.children || item.children.length === 0 || navbarWidth === 45) {
      return null;
    }

  
    const isOpen = openSubmenus[item.id];
    const subMenuStyle = {
      maxHeight: isOpen ? '200px' : '0', 
      overflow: 'hidden',
      transition: 'max-height 0.5s ease-in-out',
      marginLeft: '15px',
      lineHeight: '12px',
      width: isOpen ? '249px' : '0',
    };
    return (
      <ul className='submenu_icon' style={subMenuStyle}>
        {item.children.map((child) => (
          <li key={child.id}>
            <NavLink to={child.url} >
              {child.icon && <i className={child.icon}></i>}
              {child.title && <span>{child.title}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="navbar-content datta-scroll">
      <PerfectScrollbar>
        <ListGroup variant="flush" as="ul" bsPrefix=" " className="nav pcoded-inner-navbar" id="nav-ps-next">
     
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              {item.id === 'favorites' && item.title && (
                <li className={openSubmenus[item.id] ? 'submenu-open' : ''} onClick={() => handleItemClick(item.id)}>
                  <NavLink to={item.url} >
                    <span className='pcoded-micon'>
                      {item.icon && <i className={item.icon}></i>}
                    </span>
                    <span>{item.title}</span>
                    {item.children && item.children.length > 0 && (
                      <span className="submenu-toggle">
                       {openSubmenus[item.id] ? <i className="feather icon-chevron-up"></i> : <i className="feather icon-chevron-down"></i>}
                      </span>
                    )}
                  </NavLink>
                  {renderSubMenuItems(item)}
                </li>
              )}
            </React.Fragment>
          ))}
   
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              {item.id === 'recently_visited' && item.title && (
                <li  className={openSubmenus[item.id] ? 'submenu-open' : ''} onClick={() => handleItemClick(item.id)}>
                  <NavLink to={item.url}>
                    <span className='pcoded-micon'>
                      {item.icon && <i className={item.icon}></i>}
                    </span>
                    <span>{item.title}</span>
                    {item.children && item.children.length > 0 && (
                      <span className="submenu-toggle">
                         {openSubmenus[item.id] ? <i className="feather icon-chevron-up"></i> : <i className="feather icon-chevron-down"></i>}
                      </span>
                    )}
                  </NavLink>
                  {renderSubMenuItems(item)}
                </li>
              )}
            </React.Fragment>
          ))}

          <li style={{ borderTop: '1px solid #ccc' }}></li>
          <li className='process_menu'><a><i className="feather icon-award"></i>Authentication System</a> </li>
       
  
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              {(item.id !== 'favorites' && item.id !== 'recently_visited') && item.title && (
                <li className={openSubmenus[item.id] ? 'submenu-open' : ''} onClick={() => handleItemClick(item.id)}>
                  <NavLink to={item.url} >
                    <span className='pcoded-micon'>
                      {item.icon && <i className={item.icon}></i>}
                    </span>
                    <span>{item.title}</span>
                    {item.children && item.children.length > 0 && (
                      <span className="submenu-toggle">
                         {openSubmenus[item.id] ? <i className="feather icon-chevron-up"></i> : <i className="feather icon-chevron-down"></i>}
                      </span>
                    )}
                  </NavLink>
                  {renderSubMenuItems(item)}
                </li>
              )}
            </React.Fragment>
          ))}
        </ListGroup>
      </PerfectScrollbar>
    </div>
  );
};

export default MenuItems;
