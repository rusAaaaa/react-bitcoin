import { Typography } from 'antd';

export default function Coininfo({ coin, withSymbol }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
            <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 12 }} />
            <Typography.Title level={2} style={{ margin: 0, color: '#334' }}>
                {withSymbol && <span>({coin.symbol})</span>} {coin.name}
            </Typography.Title>
        </div>
    );
}
