import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from '../context/crypto-context';

ChartJS.register(ArcElement, Tooltip, Legend);

// Цветовая палитра в стиле Binance
const binanceColors = [
    '#F0B90B', // Желтый акцент
    '#1E2329', // Темный фон
    '#00C48C', // Зеленый акцент
    '#F3BA2F', // Вторичный желтый
    '#20252C', // Дополнительный темный
    '#2B3139'  // Еще один оттенок темного
];

// Функция для генерации цветов в стиле Binance
function generateColors(numColors) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        colors.push(binanceColors[i % binanceColors.length]);
    }
    return colors;
}

export default function PortfolioChart() {
    const { assets } = useCrypto();

    // Если активов нет, возвращаем сообщение
    if (!assets.length) {
        return <div style={{ textAlign: 'center', margin: '2rem 0', color: '#F0B90B' }}>No assets available to display.</div>;
    }

    const data = {
        labels: assets.map(a => a.name),
        datasets: [
            {
                label: 'Portfolio Value $',
                data: assets.map(a => a.totalAmount),
                backgroundColor: generateColors(assets.length),
                borderColor: '#1E2329',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#F0B90B', // Цвет текста легенды
                },
            },
            title: {
                display: true,
                text: 'Your Crypto Portfolio Distribution',
                color: '#F0B90B', // Цвет текста заголовка
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
            tooltip: {
                backgroundColor: '#1E2329',
                titleColor: '#F0B90B',
                bodyColor: '#FFFFFF',
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: $${value.toLocaleString()}`;
                    },
                },
            },
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div style={{ display: 'flex', marginBottom: '1rem', justifyContent: 'center', backgroundColor: '#1E2329', padding: '20px', borderRadius: '8px', height: '700px' }}>
            <Pie data={data} options={options} />
        </div>
    );
}
