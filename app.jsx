import React,{useState} from 'react';
import ReactDOM from 'react-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Container from '@material-ui/core/Container';

import { 
	Charts, ChartContainer, ChartRow, 
	YAxis, LineChart 
} from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";

const useStyles = makeStyles({
	root: {
		// center overall content
		margin:"0 auto",
		maxWidth:1000
	}
})

const X_STEP = 0.01;
// since react-timeseries-charts scales up numbers into dates,
// we should scale up  these values to avoid rounding errors.
// In future, we should probably use a library 
// that isn't focused on time-series specifically
const TIME_SCALE = 1000000;
function makeSeries(xRange,f) {
	const [xMin,xMax] = xRange;
	const points = [];
	for (let x=xMin;x<xMax;x+=X_STEP) {
		const y = f(x);
		points.push([x*TIME_SCALE,y]);
	}
	return new TimeSeries({
		columns:['time','y'],
		points
	});
}

const formatXAxis = x => x.getTime()/TIME_SCALE

function Chart({xRange,f}) {
	const series = makeSeries(xRange,f);
	const timeRange = new TimeRange(xRange[0]*TIME_SCALE,xRange[1]*TIME_SCALE);
	return <ChartContainer timeRange={timeRange} width={800} format={formatXAxis}>
		<ChartRow height="200">
			<YAxis 
				id="y" label="y" 
				min={-1} max={1} 
				type="linear" format=",.2f"/>
			<Charts>
				<LineChart 
					axis="y" series={series} columns={['y']}
					format=",.2f"
				/>
			</Charts>
		</ChartRow>
	</ChartContainer>
}

function ChartView() {
	const [xRange,setXRange] = useState([0,10]);
	const [xMin,xMax] = xRange;
	return <div>
		<Slider
			value={xRange}
			onChange={(ev,value)=>setXRange(value)}
		/>
		<Chart xRange={xRange} f={f} />
	</div>
}

function f(x) {
	return Math.sin(x);
}

function App() {
return <div className={useStyles().root}>
		<ChartView f={f} />
	</div>
}

ReactDOM.render(<App />,document.getElementById("app"));
