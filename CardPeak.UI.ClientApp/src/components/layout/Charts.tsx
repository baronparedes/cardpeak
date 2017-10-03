import * as React from 'react'
import { Doughnut, HorizontalBar, Line } from 'react-chartjs-2'
import * as colorScale from '../../constants/colorScale'


interface ChartProps {
    metrics?: CardPeak.Entities.ApprovalMetric<string>[];
    label?: string;
    onClick?: (e: any) => void;
}

function getLineData(props: ChartProps) {
    const palette: number = props.metrics.length > 12 ? 12 : props.metrics.length;
    let labels: string[] = [];
    let dataSet: number[] = [];

    const legendOpts = {
        display: false,
    };

    props.metrics.forEach(_ => {
        labels.push(_.key + " (" + _.value + ")");
        dataSet.push(_.value);
    });

    const data = {
        labels: labels,
        datasets: [{
            data: dataSet,
            backgroundColor: colorScale.palette[palette],
            hoverBackgroundColor: colorScale.palette[palette],
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

function getData(props: ChartProps) {
    const palette: number = props.metrics.length > 12 ? 12 : props.metrics.length;
    let labels: string[] = [];
    let dataSet: number[] = [];

    const legendOpts = {
        display: true,
        fullWidth: true,
        reverse: false,
    };

    props.metrics.forEach(_ => {
        labels.push(_.key + " (" + _.value + ")");
        dataSet.push(_.value);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: props.label,
            data: dataSet,
            backgroundColor: colorScale.palette[palette],
            hoverBackgroundColor: colorScale.palette[palette],
        }],
        legendOpts: legendOpts
    };

    return data;
}

export const ApprovalMetricsLineChart = (props: ChartProps) => {
    if (!props.metrics) {
        return null;
    }

    const data = getLineData(props);

    return (
        <div>
            <Line data={data} legend={data.legendOpts} height={80}/>
        </div>
    )
}

export const ApprovalMetricsBarChart = (props: ChartProps) => {
    if (!props.metrics) {
        return null;
    }

    const data = getData(props);

    return (
        <div>
            <HorizontalBar data={data} legend={data.legendOpts} height={200} onElementsClick={props.onClick} />
        </div>
    )
}

export const ApprovalMetricsPieChart = (props: ChartProps) => {
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