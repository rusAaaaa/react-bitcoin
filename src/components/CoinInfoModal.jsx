import { Tag, Typography, Divider, Button, Tooltip } from 'antd';
import { CopyOutlined, LinkOutlined } from '@ant-design/icons';
import Coininfo from '/src/components/Coininfo';

export default function CoinInfoModal({ coin }) {
    const containerStyle = {
        padding: '1.5rem',
        backgroundColor: '#121212', // Darker background for a richer feel
        borderRadius: '12px',
        color: '#F0B90B', // Binance gold accent color
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', // Deeper shadow for a more prominent effect
        border: '1px solid #333', // Subtle border to outline the modal
    };

    const textStyle = {
        color: '#EAEAEA', // Lighter grey for text
        fontSize: '1rem',
    };

    const strongTextStyle = {
        color: '#FFFFFF', // White for headings and strong text
        fontWeight: '700', // Bolder text weight
        fontSize: '1.1rem', // Slightly larger text
    };

    const tagStyle = {
        borderRadius: '12px', // More rounded tags
        padding: '0 8px',
        fontSize: '0.9rem', // Slightly larger text in tags
        fontWeight: '500', // Semi-bold text in tags
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(coin.contractAddress);
    };

    return (
        <div style={containerStyle}>
            <Coininfo coin={coin} withSymbol />
            <Divider style={{ borderColor: '#F0B90B' }} />

            {/* Current Price */}
            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>Current Price: </Typography.Text>
                ${coin.currentPrice}
            </Typography.Paragraph>

            {/* Market Cap */}
            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>Market Cap: </Typography.Text>
                ${coin.marketCap}
            </Typography.Paragraph>

            {/* 24-hour Volume */}
            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>24h Volume: </Typography.Text>
                ${coin.volume24h}
            </Typography.Paragraph>

            {/* Price Changes */}
            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>1 hour: </Typography.Text>
                <Tag color={coin.priceChangeh1h > 0 ? '#00C853' : '#D50000'} style={tagStyle}>
                    {coin.priceChangeh1h}%
                </Tag>
            </Typography.Paragraph>

            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>1 day: </Typography.Text>
                <Tag color={coin.priceChangeh1d > 0 ? '#00C853' : '#D50000'} style={tagStyle}>
                    {coin.priceChangeh1d}%
                </Tag>
            </Typography.Paragraph>

            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>1 week: </Typography.Text>
                <Tag color={coin.priceChangeh1w > 0 ? '#00C853' : '#D50000'} style={tagStyle}>
                    {coin.priceChangeh1w}%
                </Tag>
            </Typography.Paragraph>

            {/* High/Low Prices */}
            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>24h High: </Typography.Text>
                ${coin.high24h}
            </Typography.Paragraph>

            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>24h Low: </Typography.Text>
                ${coin.low24h}
            </Typography.Paragraph>

            {/* Price BTC */}
            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>Price BTC: </Typography.Text>
                {coin.priceBtc}
            </Typography.Paragraph>

            {/* Total Supply */}
            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>Total Supply: </Typography.Text>
                {coin.totalSupply}
            </Typography.Paragraph>

            {/* Contract Address with Copy Button */}
            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>Contract Address: </Typography.Text>
                {coin.contractAddress}{' '}
                <Tooltip title="Copy to clipboard">
                    <Button
                        shape="circle"
                        icon={<CopyOutlined />}
                        size="small"
                        onClick={handleCopy}
                        style={{ marginLeft: '8px', color: '#F0B90B', borderColor: '#F0B90B' }}
                    />
                </Tooltip>
            </Typography.Paragraph>

            {/* External Links */}
            <Typography.Paragraph style={textStyle}>
                <Typography.Text style={strongTextStyle}>Links: </Typography.Text>
                <a href={coin.website} target="_blank" rel="noopener noreferrer" style={{ color: '#F0B90B' }}>
                    <LinkOutlined /> Official Website
                </a>
                <br />
                <a href={`https://etherscan.io/address/${coin.contractAddress}`} target="_blank" rel="noopener noreferrer" style={{ color: '#F0B90B' }}>
                    <LinkOutlined /> Etherscan
                </a>
            </Typography.Paragraph>
        </div>
    );
}
