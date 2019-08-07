import * as React from 'react'
import { Doughnut, HorizontalBar, Line, Bar } from 'react-chartjs-2'
import * as colorScale from '../../constants/colorScale'
import { roundOff } from '../../helpers/currencyHelper'


interface ChartProps {
    metrics?: CardPeak.Entities.ApprovalMetric<any>[];
    label?: string;
    onClick?: (e: any) => void;
    height?: number;
    displayLegend?: boolean;
}

function getData(props: ChartProps) {
    const colorPalette = props.metrics.length > 12 ? colorScale.paletteV2 : colorScale.palette[props.metrics.length];
    let labels: string[] = [];
    let dataSet: number[] = [];

    const legendOpts = {
        display: props.displayLegend,
    };

    props.metrics.forEach(_ => {
        labels.push(_.key.toString() + " (" + roundOff(_.value) + ")");
        dataSet.push(roundOff(_.value));
    });

    const data = {
        labels: labels,
        datasets: [{
            data: dataSet,
            backgroundColor: colorPalette,
            hoverBackgroundColor: colorPalette,
            fill: false,
            borderColor: colorScale.palette[3][0],
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: colorScale.palette[3][1],
            pointBackgroundColor: colorScale.palette[3][1],
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: colorScale.palette[3][2],
            pointHoverBorderColor: colorScale.palette[3][2],
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        }],
        legendOpts: legendOpts
    };

    return data;
}

export const MetricsLineChart = (props: ChartProps) => {
    if (!props.metrics) {
        return null;
    }

    const data = getData(props);

    return (
        <div>
            <Line data={data} legend={data.legendOpts} height={70}/>
        </div>
    )
}

export const MetricsHorizontalBarChart = (props: ChartProps) => {
    if (!props.metrics) {
        return null;
    }

    const data = getData(props);

    return (
        <div>
            <HorizontalBar data={data} legend={data.legendOpts} onElementsClick={props.onClick} height={props.height ? props.height : 180} />
        </div>
    )
}

export const MetricsBarChart = (props: ChartProps) => {
    if (!props.metrics) {
        return null;
    }

    const data = getData(props);

    return (
        <div>
            <Bar data={data}
                legend={data.legendOpts}
                onElementsClick={props.onClick}
                height={props.height ? props.height : 180}
                options={{ maintainAspectRatio: false }} />
        </div>
    )
}

export const MetricsPieChart = (props: ChartProps) => {
    if (!props.metrics) {
        return null;
    }

    const data = getData(props);

    return (
        <div>
            <Doughnut data={data} legend={data.legendOpts} />
        </div>
    )
}