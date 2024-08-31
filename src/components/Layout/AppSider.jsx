import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';

const siderStyle = {
    padding: '1rem',
    backgroundColor: '#000', // Черный фон для боковой панели
    color: '#F0B90B', // Желтый текст
};

const cardStyle = {
    marginBottom: '1rem',
    backgroundColor: '#1E1E1E', // Темно-серый фон для карт
    borderRadius: '8px',
    border: '1px solid #F0B90B', // Желтая граница для карт
    color: '#F0B90B',
};

const statisticValueStyle = (isGrowing) => ({
    color: isGrowing ? '#F0B90B' : '#CF1322', // Желтый для роста, красный для падения
});

const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#F0B90B', // Желтый текст для списка
};

export default function AppSider() {
    const { assets, loading } = useContext(CryptoContext);

    if (loading) {
        return (
            <Layout.Sider width="25%" style={siderStyle}>
                <p style={{ color: '#F0B90B' }}>Loading...</p>
            </Layout.Sider>
        );
    }
    
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map((asset) => (
                <Card key={asset.id} title={asset.name} style={cardStyle}>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={statisticValueStyle(asset.grow)}
                        prefix={asset.grow ? <ArrowUpOutlined style={{ color: '#F0B90B' }} /> : <ArrowDownOutlined style={{ color: '#CF1322' }} />}
                        suffix="$"
                    />
                    <List
                        size="small"
                        dataSource={[
                            { title: 'Total Profit', value: asset.totalProfit, withTag: true },
                            { title: 'Asset Amount', value: asset.amount, isPlain: true },
                            { title: 'Difference', value: asset.growPercent }
                        ]}
                        renderItem={(item) => (
                            <List.Item style={listItemStyle}>
                                <span>
                                    {item.withTag && (
                                        <Tag color={asset.grow ? 'green' : 'red'}>
                                            {asset.growPercent}%
                                        </Tag>
                                    )}
                                    {item.title}
                                </span>
                                <span>
                                    {item.isPlain ? (
                                        <Typography.Text style={{ color: '#F0B90B' }}>
                                            {item.value}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                            {item.value.toFixed(2)}$
                                        </Typography.Text>
                                    )}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    );
}
