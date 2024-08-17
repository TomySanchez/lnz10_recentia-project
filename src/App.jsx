import { ConfigProvider } from 'antd';
import { Routes } from './routes/Routes';
import esEs from 'antd/locale/es_ES';
import { colorsPalette } from './utils/colorsPalette';

function App() {
  const { primaryColor, lightColor, white } = colorsPalette;

  return (
    <ConfigProvider
      locale={esEs}
      theme={{
        token: {
          colorPrimary: primaryColor,
          colorPrimaryBg: lightColor,
          colorBgLayout: white
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
