import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileMenu } from './MobileMenu';
import { MdOutlineMenu } from 'react-icons/md';

const { Content, Sider } = Layout;

export const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
              className='pointer'
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
