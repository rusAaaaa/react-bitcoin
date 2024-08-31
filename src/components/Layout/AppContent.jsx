import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#F0B90B',  // Основной текстовый цвет в стиле Binance
    backgroundColor: '#0B0E11',  // Фон, характерный для темной темы Binance
    padding: '2rem',
};

const titleStyle = {
    textAlign: 'left',
    color: '#F0B90B',
    fontSize: '24px',
    fontWeight: 'bold',
};

export default function AppContent() {
    const { assets, crypto } = useCrypto();

    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price;
        return acc;
    }, {});

    const totalPortfolioValue = assets
        .map(asset => asset.amount * cryptoPriceMap[asset.id])
        .reduce((acc, v) => acc + v, 0)
        .toFixed(2);

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={titleStyle}>
                Portfolio: {totalPortfolioValue} $
            </Typography.Title>
            <div style={{ marginBottom: '2rem' }}>
                <PortfolioChart />
            </div>
            <AssetsTable />
        </Layout.Content>
    );
}
