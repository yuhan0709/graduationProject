import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Menu from './menu';
import { Layout } from 'antd';
import { ConfigProps, formatMenuConfig, formatMenuTypes } from '../Router/interface';

const { Header, Sider, Content } = Layout;

function formatConfig(obj: formatMenuConfig) {
    let queen: formatMenuTypes[] = [];
    const out = [];
    queen = queen.concat(Object.values(obj));
    while (queen.length) {
        const first = queen.shift() as formatMenuTypes;
        if (first.children) {
            queen = queen.concat(Object.values(first.children));
        }

        out.push(first);
    }
    return out;
}


const LayoutComponent = (props: ConfigProps) => {
    const { config } = props;
    const allRoutes = formatConfig(config).filter((item) => item.component)
    return (
        <Layout className="data-layout">
            <BrowserRouter>
                <Sider trigger={null} theme="light" className="data-layout-sider">
                    <div className="data-logo">
                        EC Data Analysis
                    </div>
                    <Menu config={config} />
                </Sider>
                <Layout>
                    <Header className="data-layout-header" style={{ padding: 0 }}>
                    </Header>
                    <Content
                        className="data-layout-content"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >

                        {allRoutes.map((item, index) => (
                            <Route path={item.renderPath} component={item.component} exact key={index} />
                        ))}
                    </Content>
                </Layout>
            </BrowserRouter>
        </Layout>

    )
}

export default LayoutComponent;