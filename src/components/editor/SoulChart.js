import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  layouts,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getFormattedMatchTime } from '../../utils/dateUtils';

ChartJS.register(
    TimeScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default React.memo(function SoulChart(props) {
    const players = props?.matchResponse?.match_info?.players
    const netWorthMap = new Map([[0, 0]])
    players?.forEach(p => {
        p.stats?.forEach(s => {
            if (netWorthMap.has(s.time_stamp_s)) {
                netWorthMap.set(s.time_stamp_s, netWorthMap.get(s.time_stamp_s) + s.net_worth * (p.team === 1 ? 1 : -1))
            } else {
                netWorthMap.set(s.time_stamp_s, s.net_worth * (p.team === 1 ? 1 : -1))
            }
        })
    })

    const maxDiff = Math.max(...netWorthMap.values())
    const options = {
        responsive: true,
        aspectRatio: 4,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                position: 'top',
                text: 'Soul Lead',
                padding: 0,
            },
        },
        scales: {
            y: {
                display: false,
                suggestedMin: -maxDiff,
                suggestedMax: maxDiff,
            },
            x: {
                type: 'linear',
                min: 0,
                max: Math.max(...netWorthMap.keys()),
                border: {
                    display: false
                },
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                },
            }
        },
    };

    const labels = Array.from(netWorthMap.keys()).sort((a, b) => a - b)

    return(
        <Line id='1' options={options} data={{
            labels: labels,
            datasets: [
                {
                    label: 'lead',
                    data: labels.map(l => netWorthMap.get(l)),
                    segment: {
                        borderColor: function(context) {
                            const yval = context.p1.raw
                            return yval < 0 ? '#f59e0b' : '#0ea5e9'
                        },
                        backgroundColor: function(context) {
                            const yval = context.p1.raw
                            return yval < 0 ? '#f59e0b' : '#0ea5e9'
                        },
                    },
                    pointBackgroundColor: function(context) {
                        var index = context.dataIndex;
                        var value = context.dataset.data[index];
                        return value === 0 ? '#737373' : value < 0 ? '#f59e0b' : '#0ea5e9'
                    },
                    tension: 0.3,
                }
            ]
        }}/>
    )
})