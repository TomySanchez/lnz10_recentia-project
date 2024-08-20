import { useContext, useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileMenu } from './MobileMenu';
import { MdOutlineMenu } from 'react-icons/md';
import { ResponsiveContext } from '../contexts/ResponsiveContext';

const { Content, Sider } = Layout;

export const MainLayout = () => {
  const windowWidth = useContext(ResponsiveContext);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  function handleMobileMenuClick() {
    setOpenMobileMenu(true);
  }

  return (
    <Layout className='MainLayout'>
      {windowWidth > 700 ? (
        <Sider
          className='main-layout-sider'
          collapsible
          collapsed={isCollapsed}
          onCollapse={(value) => setIsCollapsed(value)}
          theme='light'
        >
          <Sidebar isCollapsed={isCollapsed} />
        </Sider>
      ) : (
        <>
          <span>
            <MdOutlineMenu
              className='mobile-menu-icon pointer'
              size={40}
              onClick={handleMobileMenuClick}
            />
          </span>

          <MobileMenu open={openMobileMenu} setOpen={setOpenMobileMenu} />
        </>
      )}
      <Content className='main-layout-content'>
        <Outlet />
      </Content>
    </Layout>
  );
};
