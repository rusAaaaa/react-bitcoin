import { Table, Input } from 'antd';
import { useState } from 'react';
import { useCrypto } from '../context/crypto-context';
import { SearchOutlined } from '@ant-design/icons';

const binanceStyle = {
    backgroundColor: '#1E2329',
    color: '#F0B90B',
    borderRadius: '8px',
    padding: '16px',
};

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        showSorterTooltip: {
            target: 'full-header',
        },
        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend', 'ascend'],
        render: (text) => <span style={{ color: '#F0B90B' }}>{text}</span>, // Цвет текста
    },
    {
        title: 'Price $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
        render: (text) => <span style={{ color: '#00C48C' }}>{text}</span>, // Зеленый цвет для цены
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
        render: (text) => <span style={{ color: '#F3BA2F' }}>{text}</span>, // Желтый цвет для количества
    },
];

export default function AssetsTable() {
    const { assets } = useCrypto();
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(assets);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        const filtered = assets.filter((a) => 
            a.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
    };

    const totalValue = filteredData.reduce((acc, asset) => acc + (asset.price * asset.amount), 0);

    return (
        <div style={binanceStyle}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', color: '#F0B90B' }}>
                <Input
                    placeholder="Search by Name"
                    value={searchText}
                    onChange={handleSearch}
                    style={{ width: 200, backgroundColor: '#2B3139', color: '#F0B90B', borderColor: '#2B3139' }}
                    prefix={<SearchOutlined style={{ color: '#F0B90B' }} />}
                />
                <div>
                    <strong>Total Portfolio Value: </strong>
                </div>
            </div>
            <Table
                pagination={{ pageSize: 10 }}  
                columns={columns}
                dataSource={filteredData.map(a => ({
                    key: a.id,
                    name: a.name,
                    price: a.price,
                    amount: a.amount,
                }))}
                onChange={onChange}
                rowSelection={{  
                    type: 'checkbox',
                }}
                style={{ backgroundColor: '#1E2329', color: '#F0B90B' }}
            />
        </div>
    );
}
