import { ConfigProvider } from 'antd';
import { Routes } from './routes/Routes';
import esEs from 'antd/locale/es_ES';
import { colorsPalette } from './utils';

function App() {
  const { primaryColor, lightColor, lightExtraColor, white } = colorsPalette;

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
          Layout: {
            lightSiderBg: lightExtraColor,
            lightTriggerBg: lightExtraColor
          },
          Menu: {
            itemBg: lightExtraColor
          }
        }
      }}
    >
      <div className='App'>
        <Routes />
      </div>
    </ConfigProvider>
  );
}

export default App;
