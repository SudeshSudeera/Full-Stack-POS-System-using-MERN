import { Line } from 'react-chartjs-2';
import { defaults } from "chart.js/auto"

defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const DefaultChart = ()=> {

    const data = {
      labels: ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label:"data",
          data:[20, 40, 50, 10, 70, 20, 30, 80, 90, 10, 70, 80 ],
          fill: false
        }
      ]
    }

    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }

    return(
      <>
        <div>
          <Line
            options={options}
            data={data}
          />
        </div>
      </>
    )
}

export default DefaultChart;