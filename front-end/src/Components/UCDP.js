import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import './tableDesign.css';
import './btn&select.css';
const UCDP = () => {
    const [total, setTotal] = useState(0);
    const [inputval, setInputval] = useState([]);
    const [load, setLoad] = useState(0);
    const [mainans, setMainans] = useState([]);
    const [istrue, setIstrue] = useState(true);
    const [answer, setAnswer] = useState(0);
    const solver = async () => {
        const rows = total;
        const col = parseInt(load) + 1;
        const newGrid = new Array(rows);
        for (let i = 0; i < rows; i++) {
            newGrid[i] = Array(inputval[i][1]).fill(0);
        }
        const newGrid1 = new Array(rows);
        const newGrid2 = new Array(rows);
        for (let i = 0; i < rows; i++) {
            newGrid1[i] = new Array(inputval[i][1]);
            newGrid2[i] = new Array(inputval[i][1]);
            for (let j = 0; j <= inputval[i][1]; j++) {
                newGrid1[i][j] = new Array(3);
                newGrid2[i][j] = new Array(3);
                for (let k = 0; k < 3; k++) {
                    newGrid1[i][j][k] = 0;
                    newGrid2[i][j][k] = 0;
                }
            }
        }
        var totalsum =0 ;
        for(let  i=0 ;i<rows;i++)
        {
            totalsum+=inputval[i][1];
        }
        if(totalsum<parseInt(load))
        {
            alert("Please enter load within limit of combination of generator output");
            return ;
        }
        for (let i = 0; i < rows; i++) {
            for (let j = 1; j <= inputval[i][1]; j++) {
                newGrid[i][j] = (1 / 2) * parseFloat(inputval[i][2]) * Math.pow(j, 2) + parseFloat(inputval[i][3]) * (j) + parseFloat(inputval[i][4]);
            }
        }
        let numrows = inputval[0][1] + 1;
        for (let i = 1; i < rows; i++) {
            numrows += inputval[i][1];
            newGrid2[i] = Array(numrows).fill([(Number.MAX_SAFE_INTEGER) / 10000000, 0, 0]);
        }
        for (let i = 0; i < newGrid[0].length; i++) {
            newGrid1[0][i][0] = newGrid[0][i];
            newGrid1[0][i][1] = i;
            newGrid1[0][i][2] = -1;
            newGrid2[0][i][0] = newGrid[0][i];
            newGrid2[0][i][1] = i;
            newGrid2[0][i][2] = -1;
        }

        let flag = true;
        for (let i = 0; i < rows; i++) {
            if (inputval[i][1] < load) {
                flag = false;
            }
        }
        let ans1 = Number.MAX_SAFE_INTEGER;
        const arraytesting = newGrid2.map(row =>
            row.map(col =>
                col.map(value =>
                    value
                )
            )
        );
        if (flag) {
            for (let i = 1; i < rows; i++) {
                for (let j = 0; j <= inputval[i][1]; j++) {
                    if (j === 0) {
                        newGrid1[i][0][0] = newGrid[i][0];
                        continue;
                    }
                    let curr = Number.MAX_VALUE;
                    let index1 = 0;
                    let index2 = 0;
                    for (let k = 0; k <= j; k++) {

                        if (curr > newGrid1[i - 1][j - k][0] + newGrid[i][k]) {
                            index1 = k;
                            index2 = j - k;
                        }
                        curr = Math.min(curr, newGrid1[i - 1][j - k][0] + newGrid[i][k]);
                        if (j === col - 1) {
                            ans1 = Math.min(ans1, curr).toFixed(4);
                        }
                    }
                    newGrid1[i][j][0] = curr;
                    newGrid1[i][j][1] = index1;
                    newGrid1[i][j][2] = index2;
                }
            }
        }
        else {

            let prevcols = newGrid2[0].length;
            for (let i = 1; i < rows; i++) {
                let currcols = newGrid[i].length - 1;

                for (let j = 0; j <= currcols; j++) {
                    for (let k = 0; k < prevcols; k++) {
                        if (arraytesting[i][j + k][0] > newGrid[i][j] + arraytesting[i - 1][k][0]) {
                            arraytesting[i][j + k][0] = newGrid[i][j] + arraytesting[i - 1][k][0];
                            arraytesting[i][j + k][1] = j;
                            arraytesting[i][j + k][2] = k;
                        }
                    }
                }
                prevcols = newGrid2[i].length;
            }
        }
            if (!flag) {
                let arrayans = [];
                let j = parseInt(load);
                let i = rows - 1;
                while (i > 0 && j > 0) {
                    if (arraytesting[i][j][1] === 0) {
                        i--;
                    }
                    else {

                        arrayans.push([i + 1, arraytesting[i][j][1], ((1 / 2) * parseFloat(inputval[i][2]) * Math.pow(arraytesting[i][j][1], 2) + parseFloat(inputval[i][3]) * (arraytesting[i][j][1]) + parseFloat(inputval[i][4])).toFixed(4)]);
                        j = arraytesting[i][j][2];
                        i--;
                    }
                }
                if (i === 0 && j !== 0) {
                    arrayans.push([i + 1, arraytesting[i][j][1], ((1 / 2) * parseFloat(inputval[i][2]) * Math.pow(arraytesting[i][j][1], 2) + parseFloat(inputval[i][3]) * (arraytesting[i][j][1]) + parseFloat(inputval[i][4])).toFixed(4)]);
                }
                arrayans.sort((a, b) => a[0] - b[0]);
                setMainans(arrayans);
                var answer1 = 0;
                for(let i = 0;i<arrayans.length;i++)
                {
                    var v1 = parseFloat(arrayans[i][2]); 

                    answer1 += v1;

                }
                setAnswer(answer1.toFixed(4));
            }
            else {
                let arrayans = [];
                let j = parseInt(load);
                let i = rows - 1;
                while (i > 0 && j > 0) {
                    if (newGrid1[i][j][1] === 0) {
                        i--;
                    }
                    else {

                        arrayans.push([i + 1, newGrid1[i][j][1], ((1 / 2) * parseFloat(inputval[i][2]) * Math.pow(newGrid1[i][j][1], 2) + parseFloat(inputval[i][3]) * (newGrid1[i][j][1]) + parseFloat(inputval[i][4])).toFixed(4)]);
                        j = newGrid1[i][j][2];
                        i--;
                    }
                }
                if (i === 0 && j !== 0) {
                    arrayans.push([i + 1, newGrid1[i][j][1], ((1 / 2) * parseFloat(inputval[i][2]) * Math.pow(newGrid1[i][j][1], 2) + parseFloat(inputval[i][3]) * (newGrid1[i][j][1]) + parseFloat(inputval[i][4])).toFixed(4)]);
                }
                arrayans.sort((a, b) => a[0] - b[0]);
                setMainans(arrayans);
                setAnswer(ans1);
            }
        };
    

    useEffect(() => {
        setIstrue(false);
    }, [mainans]);

    const handleChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setTotal(selectedValue);

        if (selectedValue < total) {
            setInputval(inputval.slice(0, selectedValue));
        } else {
            setInputval(inputval.concat(Array(selectedValue - total).fill([0, 0, 0, 0, 0])));
        }
    };
    const updateCellValue = (rowIndex, columnIndex, newValue) => {
        setInputval((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[rowIndex] = [...prevGrid[rowIndex]];
            newGrid[rowIndex][columnIndex] = newValue;
            return newGrid;
        });
    };
    useEffect(() => {
        setIstrue(true);
    }, [inputval, load]);
    return (
        <div >

            {/* <span style={{"backgroundColor":"white"}}> */}
            <select className="custom-select" onChange={handleChange}>
                <option disabled selected value=" ">Select Total Generators</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>

            </select>
            {/* </span> */}
            {total !== 0 ?
                <div style={{ 'marginTop': '50px' }}>
                    <div className="table-container">
                    <Table border='1' width='1000' align='center'>
                        <thead>
                            <tr id="definition">
                                <td>Generator</td>
                                <td>Minimum Capacity (MW)</td>
                                <td>Maximum Capacity (MW)</td>
                                <td>a</td>
                                <td>b</td>
                                <td>d</td>
                            </tr>

                        </thead>
                        <tbody>
                            {inputval.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>
                                        {rowIndex + 1}
                                    </td>
                                    {row.map((cell, columnIndex) => (
                                        columnIndex < 2 ?
                                            <td key={columnIndex}>
                                                <input
                                                    type="number"
                                                    value={cell}
                                                    onChange={(e) => {
                                                        const newValue = parseInt(e.target.value, 10);
                                                        updateCellValue(rowIndex, columnIndex, newValue);
                                                    }} />
                                            </td> :
                                            <td key={columnIndex}>
                                                <input
                                                    type="number"
                                                    step="any"
                                                    defaultValue="0"
                                                    onChange={(e) => {
                                                        let newValue = parseFloat(e.target.value);
                                                        newValue = newValue.toFixed(6);
                                                        updateCellValue(rowIndex, columnIndex, newValue);
                                                    }} />
                                            </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                    <div className="button-container">
                    <span style={{ 'display': 'inline-block' }}>
                        <p style={{ 'marginRight': '50px' ,"backgroundColor":"White","padding":"10px","border-radius":"10px"}}>Enter the Load required</p>
                    </span>
                    <input className='custom-input' type="text" defaultValue={parseInt(0)} onChange={(e) => { setLoad(e.target.value); }} />
                    <br />
                    {istrue === true ?

                        <button className='table-button' onClick={solver}>Solve for generators to use</button> :
                        <>
                            <div className="table-container">
                            <Table border='1' width='1000' align='center'>
                                <thead>
                                    <tr id="definition">
                                        <td>Generator</td>
                                        <td>Output</td>
                                        <td>Cost</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mainans.map((row, index) => (
                                        <tr key={index}>
                                            {row.map((cell, columnIndex) => (
                                                <td key={columnIndex}>
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            </div>
                            {
                                <>
                                {
                                    answer !== Number.MAX_SAFE_INTEGER ?
                                        <h1 style={{"backgroundColor":"White"}}>Overall Cost = {answer}</h1> :
                                        <h1 style={{"backgroundColor":"White"}}>Overall Cost = 0</h1>
                                }
                                </>
                            }   

                        </>}
                        </div>

                </div>
                : <div>
                    <h1 style={{"backgroundColor":"white"}}>Please select some value</h1>
                </div>}
        </div>

    );

};

export default UCDP;