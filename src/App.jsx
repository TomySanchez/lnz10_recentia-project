import { ConfigProvider } from 'antd';
import { Routes } from './routes/Routes';
import esEs from 'antd/locale/es_ES';
import { colorsPalette } from './utils/colorsPalette';
import { ResponsiveProvider } from './contexts/ResponsiveContext';

function App() {
  const { darkMediumColor, primaryColor, lightColor, lightExtraColor, white } =
    colorsPalette;

  return (
    <ConfigProvider
      locale={esEs}
      theme={{
        token: {
          colorPrimary: primaryColor,
          colorPrimaryBg: lightColor,
          colorBgLayout: white
        },
        components: {
          Form: {
            labelColor: '#000000aa'
          },
          Layout: {
            lightSiderBg: lightExtraColor,
            lightTriggerBg: lightExtraColor
          },
          Menu: {
            itemBg: lightExtraColor
          },
          Segmented: {
            itemActiveBg: lightExtraColor,
            itemColor: darkMediumColor,
            itemHoverBg: lightColor,
            itemHoverColor: darkMediumColor,
            itemSelectedBg: lightColor,
            itemSelectedColor: darkMediumColor,
            trackBg: lightExtraColor
          }
        }
      }}
    >
      <ResponsiveProvider>
        <div className='App'>
          <Routes />
        </div>
      </ResponsiveProvider>
    </ConfigProvider>
  );
}

export default App;
