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
    maxWidth: 1000,
	// center overall content
	margin:"0 auto"
  },
});

const X_STEP = 0.01;
// since react-timeseries-charts scales up numbers into dates,
// we should scale up  these values to avoid rounding errors.
// In future, we should probably use a library 
// that isn't focused on time-series specifically
const TIME_SCALE = 100;
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

function Chart({xRange,f}) {
	const series = makeSeries(xRange,f);
	const timeRange = new TimeRange(xRange[0]*100,xRange[1]*100);
	return <ChartContainer timeRange={timeRange} width={800}>
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
	const classes = useStyles();
	const [xRange,setXRange] = useState([0,10]);
	const [xMin,xMax] = xRange;
	return <div className={classes.root}>
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
return <div style={{margin:"0 auto"}}>
		<ChartView f={f} />
	</div>
}

ReactDOM.render(<App />,document.getElementById("app"));
