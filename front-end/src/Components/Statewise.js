import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
var options = {
  indexAxis: 'y',
  scales: {
    x:{
      min:0,
      max:450000
    },
  },
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'State Wise Display',
    },
  },
};

const SWG = () => {
  const [data, setData] = useState({
    labels: ['Chandigarh', 'Delhi', 'Haryana', 'Himachal Pradesh', 'J&K', 'Punjab', 'Rajasthan', 'Uttar Pradesh', 'Uttrakhand', 'Northern Region', 'Chattisgarh', 'Gujarat', 'Madhya Pradesh', 'Maharashtra', 'Daman & Diu', 'Goa', 'Western Region', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Puducherry', 'Lakshwadeep', 'Southern Region', 'Bihar', 'DVC', 'Jharkhand', 'Odisha', 'West Bengal', 'Sikkim', 'Andaman & Nicobar', 'Eastern Region', 'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Tripura', 'Nort Eastern Region'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(25, 90, 13, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://script.google.com/macros/s/AKfycbzIn-T8v0E9F0Tzeu1tgNB992LhaWskEucxLb01bGiggiZoO--GLFQai3Q9B_jdZ3Dt5g/exec';
      const dataSet1 = [];
      const dataSet2 = [];
      await fetch(url).then((data) => {
        console.log("Api data", data)
        const res = data.json();
        return res
      }).then((res) => {
        let datanew = res['data'];
        datanew = datanew.slice(0,datanew.length-1);
        console.log(datanew);
        for (const val of datanew) {
          console.log(val);
          dataSet1.push(val.Energy_Required);
          dataSet2.push(val.Energy_Supplied);
        }
        setData({
          labels: ['Chandigarh', 'Delhi', 'Haryana', 'Himachal Pradesh', 'J&K', 'Punjab', 'Rajasthan', 'Uttar Pradesh', 'Uttrakhand', 'Northern Region', 'Chattisgarh', 'Gujarat', 'Madhya Pradesh', 'Maharashtra', 'Daman & Diu', 'Goa', 'Western Region', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Puducherry', 'Lakshwadeep', 'Southern Region', 'Bihar', 'DVC', 'Jharkhand', 'Odisha', 'West Bengal', 'Sikkim', 'Andaman & Nicobar', 'Eastern Region', 'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Tripura', 'Nort Eastern Region'],
          datasets: [
            {
              label: 'Energy Required State-Wise (MU)',
              data: dataSet1,
              borderColor: 'blue',
              backgroundColor: '#1E90FF',
            },
            {
              label: 'Energy Supplied State-Wise (MU)',
              data: dataSet2,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 235, 0.5)',
            },
          ],
        })
        console.log("arrData", dataSet1, dataSet2)
      }).catch(e => {
        console.log("error", e)
      })
    }

    fetchData();
  }, [])

  return (
    <div style={{ "backgroundColor": "White" }}>
      <div style={{ width: '100%', height: '100%' }}>
        <Bar data={data} options={options} />
      </div>
    </div>)

}
export default SWG;