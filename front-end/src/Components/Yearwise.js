import {useEffect, useState} from 'react';
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
const options = {
    indexAxis: 'y',
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

      },
    },
  };

const Horizontalchart =() => {
    const [data, setData] = useState({
        labels:['2012-13','2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19','2019-20', '2020-21', '2021-22','2022-23','2023-24'],
        datasets: [
          {
            label: 'Dataset 1',
            data:[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(25, 90, 13, 0.5)',
          },
          {
            label: 'Dataset 2',
            data:[],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    useEffect(()=> {
       const fetchData= async()=> {
          const url = 'https://script.google.com/macros/s/AKfycbygurSv50sNgj5xQfUehrbbcTYItHZcH7SH2yzLi6qz9lXtqvn5zRenEid-Eg3OX1pLJQ/exec';
          console.log(url);
           const dataSet1 = [];
           const dataSet2 = [];
         await fetch(url).then((data)=> {
             console.log("Api data", data)
             const res = data.json();
             return res
         }).then((res) => {
             console.log("ressss", res)
             const datanew = res['data'];
            for (const val of datanew) {
                console.log(val);
                dataSet1.push(val.percentage_of_growth);
                dataSet2.push(val.Total_Generation);
            }
            setData({
                labels:['2012-13','2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19','2019-20', '2020-21', '2021-22','2022-23','2023-24'],
                datasets: [
                  {
                    label: 'Percentage Of Growth',
                    data:dataSet1,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: '#FFD700',
                  },
                  {
                    label: 'Total Generation (BU)',
                    data:dataSet2,
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
    },[])
   
    return(
        <div style={{"backgroundColor":"White"}}>
        <div style={{width:'87%', height:'50%'}}>
            <Bar data={data} options={options}/>
         </div>
         </div>
         )
}
export default Horizontalchart;