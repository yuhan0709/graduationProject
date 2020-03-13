// 路由设定
import React from 'react';
import { HomeOutlined, SmileOutlined } from '@ant-design/icons';
import { MenuConfig, formatMenuConfig } from './Router/interface';
import loadable from '@loadable/component';

const Home = loadable(() => import('./pages/Home'));
const Demo = loadable(() => import('./pages/Demo'));

function getRenderPath(config: MenuConfig, parentPath = "") {
    Object.keys(config).forEach((key) => {
        const item = config[key];
        const childPath = item.path || key;
        const renderPath = parentPath.replace(/\/$/g, '') + '/' + childPath.replace(/^\//g, '');
        item.renderPath = renderPath;
        if (item.children) {
            getRenderPath(item.children, renderPath)
        }
    })

}

const pageConfig: (MenuConfig | formatMenuConfig) = {
    home: {
        name: '主页',
        icon: <HomeOutlined style={{ fontSize: '14px', marginLeft: '2px' }} />,
        component: Home,
        path: '/'
    },
    demo: {
        name: 'Demo',
        icon: <SmileOutlined style={{ fontSize: '14px', marginLeft: '2px' }} />,
        children: {
            demo: {
                name: 'Demo1',
                component: Demo,
            }
        }
    }
}

getRenderPath(pageConfig);

export default pageConfig;