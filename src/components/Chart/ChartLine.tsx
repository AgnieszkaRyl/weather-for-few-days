import {Line} from "react-chartjs-2";

interface chartLineProps {
    weatherObject: any
}

export default function ChartLine({weatherObject}){
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Temperature in city by hour',
            },
        },
    };
    let barData = {
        labels: [], datasets: [{
            label: "temperature", backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
        }]
    };
    const fillData = (): void => {
        weatherObject.list.forEach((element) => {
            barData.labels.push(element.dt_txt);
            barData.datasets[0].data.push(element.main.temp)
        })
    }
    fillData();
    return (
        <>
        <Line
            options={options} data={barData}/>
        </>
    )
}