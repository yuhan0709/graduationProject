import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { formatMenuConfig, ConfigProps } from '../Router/interface';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const menuItemKeys: string[] = [];
const subMenuKeys: string[] = [];

function getMenuItem(config: formatMenuConfig) {
  return Object.keys(config).
    filter(key => !config[key].menuIgnore)
    .map(key => {
      const item = config[key];
      const { renderPath } = item;
      if (item.children) {
        subMenuKeys[renderPath] = item;
        return (
          <SubMenu
            key={renderPath}
            title={
              < span >
                {item.icon}
                {item.name}
              </span >
            }
          >
            {getMenuItem(item.children)}
          </SubMenu >
        );
      } else {
        menuItemKeys[renderPath] = item;
        return (
          <MenuItem key={renderPath}>
            <span>{item.icon}</span>
            <Link to={renderPath}>{item.name}</Link>
          </MenuItem>
        );
      }
    });
}

function getMenuStat(setOpenKeys, setSelectedKeys, openKeys: string[]) {
  const selectedKeys = [];
  const path = window.location.pathname.split('/');
  while (path.length > 0) {
    const nodeKey = path.join('/');
    if (menuItemKeys[nodeKey]) selectedKeys.push(nodeKey);
    if (subMenuKeys[nodeKey] && openKeys.indexOf(nodeKey) === -1) {
      openKeys.push(nodeKey);
    }
    path.pop();
  }
  setOpenKeys(openKeys);
  setSelectedKeys(selectedKeys);
}


export default function MenuComponent(props: ConfigProps) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["/"]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEffect(() => {
    getMenuStat(setOpenKeys, setSelectedKeys, [...openKeys]);
  }, [window.location.pathname]);

  const { config } = props;
  return (
    <Menu
      style={{ border: 'none' }}
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={setOpenKeys}
      onClick={({ key }) => { !selectedKeys.includes(key) && setSelectedKeys([key]) }}
    >
      {getMenuItem(config)}
    </Menu>
  );
}
