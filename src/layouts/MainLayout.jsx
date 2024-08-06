import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const { Content, Sider } = Layout;

export const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        className='main-layout-sider'
        collapsible
        collapsed={isCollapsed}
        onCollapse={(value) => setIsCollapsed(value)}
        theme='light'
      >
        <Sidebar isCollapsed={isCollapsed} />
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};
