
'use client';
import '@ant-design/v5-patch-for-react-19';
import { FC, PropsWithChildren } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import { App, ConfigProvider } from 'antd';


const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <StyleProvider hashPriority="high">
            <ConfigProvider>
                <App>{children}</App>
            </ConfigProvider>
        </StyleProvider>
    )
};
export default AntdProvider;
