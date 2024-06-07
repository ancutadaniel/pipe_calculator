import React, { useState, useEffect } from "react";
import { Layout, ConfigProvider, theme } from "antd";
import { BulbOutlined, BulbFilled, CopyrightOutlined } from "@ant-design/icons";
import FactoryPipeCalculator from "./components/FactoryPipeCalculator";
import "./App.css";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [appVersion, setAppVersion] = useState<string | undefined>("");

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    setAppVersion(process.env.REACT_APP_VERSION);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout className="layout">
        <Header
          className={`header ${darkTheme ? "header-dark" : "header-light"}`}
        >
          <div>Factory Pipe Calculator</div>
          <div onClick={toggleTheme} className="theme-button">
            {darkTheme ? <BulbFilled /> : <BulbOutlined />}
          </div>
        </Header>
        <Content className="content">
          <div className="content-inner">
            <FactoryPipeCalculator />
          </div>
        </Content>
        <Footer className="footer">
          Factory Pipe Calculator v{appVersion} <CopyrightOutlined />
          {new Date().getFullYear()}
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
