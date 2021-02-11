import React from 'react';
import {
    XAxis, Tooltip, AreaChart, Area
} from 'recharts'

const Chart = (props) => {

    // Function to customize a Tooltip for our Chart
    const renderTooltip = (obj, key, unit) => {
        if(obj.active && obj.payload) {
            return (
                // TO-DO: Create css classes for customizations
                <div
                    className="ui icon button mini"
                    style={{
                        fontSize: ".8em",
                        letterSpacing: "0.04em",
                        textTransform: "capitalize",
                        textAlign: 'justify'
                    }}>
                    <div style={{marginBottom: "8px"}}><strong>Date:</strong> {obj.payload[0].payload.name}</div>
                    <div><strong>{obj.payload[0].name.toString()}:</strong> {obj.payload[0].payload[key]} {unit}</div>
                </div>
            )
        }

        return null;
    }

    // Removing first and last objects of our array of Dates
    // Give us more space on Axis X
    const xAxis = props.xAxis.slice(1, -1)

    return (
        <>
            {/* // TO-DO: Create css classes for customizations */}
            <AreaChart width={200} height={160} data={props.data} style={{margin: "0 auto"}}>
                <defs>
                    <linearGradient id={`colorFill_${props._key}`} x1="0" y1="0" x2="1" y2="2">
                        <stop offset="5%" stopColor={props.color} stopOpacity={0.8}/>
                        <stop offset="80%" stopColor={props.color} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    tick={{fontSize: "0.7em", paddingRight: "10px", wordWrap: 'break-word'}}
                    tickCount={props.data.length}
                    interval={0}
                    ticks={xAxis}
                    textAnchor="middle"
                    axisLine={false}
                    tickLine={false}
                    mirror={false}
                />
                <Tooltip content={(event) => renderTooltip(event, props._key, props.unit)}/>
                <Area
                    type="monotone"
                    dataKey={props._key}
                    stroke={props.color}
                    fillOpacity={1}
                    fill={`url(#colorFill_${props._key})`}
                    strokeWidth={2}
                    name={props._key}
                />
            </AreaChart>
            {/* <div style={{
                paddingBottom: '56.25%',
                position: 'relative',
                height: 0
            }} >
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%'
                }}>
                    <ResponsiveContainer minWidth={180} width="100%" height="100%">
                    </ResponsiveContainer>
                </div>
            </div> */}
        </>
    )
};

export default Chart;
