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

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
	// center overall content
	margin:"0 auto"
  },
});

function App() {
	const classes = useStyles();
	const [xRange,setXRange] = useState([0,10]);
	const [xMin,xMax] = xRange;
	return <div class={classes.root}>
		<Slider
			value={xRange}
			onChange={(ev,value)=>setXRange(value)}
		/>

	</div>
}

ReactDOM.render(<App />,document.getElementById("app"));
