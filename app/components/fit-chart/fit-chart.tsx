import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface IDataSets {
  label: string
  data: Array<any>
  backgroundColor: Array<string>
  borderColor: Array<string>
  borderWidth: number
}

export interface IDataFitChart {
  labels: Array<string>
  datasets: Array<IDataSets>
}

interface Props {
  data: IDataFitChart
}

export const FitChart = ({data}: Props) => {
  return <Doughnut data={data} />
}
