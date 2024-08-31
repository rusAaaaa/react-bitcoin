import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '/src/components/CoinInfoModal.jsx';
import AddAssetForm from '/src/components/AddAssetForm.jsx';

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000', // черный фон
    color: '#F0B90B', // желтый текст
};

const selectStyle = {
    width: 250,
    backgroundColor: '#1E1E1E', // темно-серый фон
    color: '#F0B90B', // желтый текст
    borderRadius: '4px',
    border: '1px solid #F0B90B',
};

const buttonStyle = {
    backgroundColor: '#F0B90B',
    borderColor: '#F0B90B',
    color: '#000',
    borderRadius: '4px',
};

export default function AppHeader() {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const { crypto } = useCrypto();

    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setIsSelectOpen((prev) => !prev);
            }
        };
        document.addEventListener('keypress', keypress);
        return () => document.removeEventListener('keypress', keypress);
    }, []);

    function handleSelect(value) {
        const coin = crypto.find(c => c.id === value.value);
        setSelectedCoin(coin);
        setIsModalOpen(true);
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={selectStyle}
                open={isSelectOpen}
                onSelect={handleSelect}
                onClick={() => setIsSelectOpen((prev) => !prev)}
                value="press / to open"
                labelInValue
                options={crypto.map(coin => ({
                    label: (
                        <Space>
                            <img
                                style={{ width: 20, borderRadius: '50%' }}
                                src={coin.icon}
                                alt={coin.name}
                            />
                            {' '}
                            {coin.name}
                        </Space>
                    ),
                    value: coin.id,
                }))}
            />
            <Button 
                type="primary" 
                onClick={() => setIsDrawerOpen(true)} 
                style={buttonStyle}
            >
                Add Asset
            </Button>

            <Modal 
                open={isModalOpen} 
                onCancel={() => setIsModalOpen(false)} 
                footer={null} 
                bodyStyle={{ backgroundColor: '#1E1E1E', color: '#F0B90B' }} // стиль в модальном окне
                title={selectedCoin ? selectedCoin.name : 'Coin Info'}
            >
                {selectedCoin && <CoinInfoModal coin={selectedCoin} />}
            </Modal>

            <Drawer 
                width={580}
                title={<span style={{ color: '#F0B90B' }}>Add Asset</span>}
                onClose={() => setIsDrawerOpen(false)}
                open={isDrawerOpen}
                destroyOnClose
                bodyStyle={{ backgroundColor: '#1E1E1E', color: '#F0B90B' }} // фон и текст в Drawer
                headerStyle={{ backgroundColor: '#000', color: '#F0B90B' }} // заголовок Drawer
            >
                <AddAssetForm onClose={() => setIsDrawerOpen(false)} />
            </Drawer>
        </Layout.Header>
    );
}