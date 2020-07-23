import React from "react";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { Widget } from '../Widget/Widget';
const Plot = createPlotlyComponent(Plotly);

export const ProvinceChart = props => {
    const observationsDates = props.data.map(item => item.observationDate);
    const confirmed = props.data.map(item => item.confirmed);
    const deaths = props.data.map(item => item.deaths);
    const recovered = props.data.map(item => item.recovered);
    const active = props.data.map(item => item.confirmed - item.recovered - item.deaths)

    return (
        <Widget title='Covid-19'>
            <Plot
                data={[
                    series(observationsDates, confirmed, 'Confirmed', 'red'),
                    series(observationsDates, deaths, 'Deaths', 'black'),
                    series(observationsDates, recovered, 'Recoverd', 'green'),
                    series(observationsDates, active, 'Active', 'orange'),
                ]}
                layout={{
                    width: 640,
                    height: 480,
                    title: `Covid-19 in ${props.province}`,
                    xaxis: {
                        title: 'Observation date'
                    },
                    yaxis: {
                        title: 'Count'
                    }
                }}
            />
        </Widget>
    )
}

const series = (x, y, name, color) => ({
    x,
    y,
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color },
    name
})
