import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const { Content, Sider } = Layout;

export const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Layout className='MainLayout'>
      <Sider
        className='main-layout-sider'
        collapsible
        collapsed={isCollapsed}
        onCollapse={(value) => setIsCollapsed(value)}
        theme='light'
      >
        <Sidebar isCollapsed={isCollapsed} />
      </Sider>

      <Content className='main-layout-content'>
        <Outlet />
      </Content>
    </Layout>
  );
};
