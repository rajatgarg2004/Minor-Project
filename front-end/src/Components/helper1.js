import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Helper1 = () => {
    const [total, setTotal] = useState(0);
    const [inputval, setInputval] = useState([]);
    const [load, setLoad] = useState(0);
    const [mainans, setMainans] = useState([]);
    const [istrue, setIstrue] = useState(true);
    const [answer, setAnswer] = useState(0);
    const solver = () => {
        const rows = total;
        const col = parseInt(load) + 1;
        // console.log(rows, col);
        const newGrid = Array.from({ length: rows }, () => Array(col).fill(0));
        const newGrid1 = new Array(rows);
        for (let i = 0; i < rows; i++) {
            newGrid1[i] = new Array(col);
            for (let j = 0; j < col; j++) {
                newGrid1[i][j] = new Array(3);
                for (let k = 0; k < 3; k++) {
                    newGrid1[i][j][k] = 0;
                }
            }
        }
        for (let i = 0; i < rows; i++) {
            for (let j = 1; j < col; j++) {
                newGrid[i][j] = (1 / 2) * parseFloat(inputval[i][2]) * Math.pow(j, 2) + parseFloat(inputval[i][3]) * (j) + parseFloat(inputval[i][4]);
            }
        }
        for (let i = 0; i < col; i++) {
            // newGrid1[0][i][0]=newGrid[0][i];
            newGrid1[0][i][0] = newGrid[0][i];
            newGrid1[0][i][1] = i;
            newGrid1[0][i][2] = -1;

        }
        let ans1 = Number.MAX_SAFE_INTEGER;
        for (let i = 1; i < rows; i++) {
            for (let j = 0; j < col; j++) {
                if (j === 0) {
                    // newGrid1[i][0][0]=newGrid[i][0];
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
        let arrayans = [];
        let j = col - 1;
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
    };
    useEffect(() => {
        console.log(mainans);
        setIstrue(false);
    }, [mainans]);

    const handleChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setTotal(selectedValue);

        // Adjust rowData to match the new number of rows
        if (selectedValue < total) {
            // Remove extra rows if reducing the number
            setInputval(inputval.slice(0, selectedValue));
        } else {
            // Add new rows with empty data if increasing the number
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
        <div>
            <select onChange={handleChange}>
                <option disabled selected value=" ">Select Total Generators</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>

            </select>
            {total !== 0 ?
                <div style={{ 'marginTop': '50px' }}>
                    <Table border='1' width='1000' align='center'>
                        <thead>
                            <tr id="definition">
                                <td>Generator</td>
                                <td>Minimum Capacity</td>
                                <td>Maximum Capacity</td>
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
                    <span style={{ 'display': 'inline-block' }}>
                        <p style={{ 'marginRight': '50px' }}>Enter the Load required</p>
                    </span>
                    <input type="text" defaultValue={parseInt(0)} onChange={(e) => { setLoad(e.target.value); }} />
                    <br />
                    {istrue === true ?

                        <button onClick={solver}>Solve for generators to use</button> :
                        <>
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
                            {
                                answer!==Number.MAX_SAFE_INTEGER?
                                <h1>Overall Cost = {answer}</h1>:
                                <h1>Overall Cost = 0</h1>
                            }

                        </>}

                </div>
                : <div>
                    <h1>Please select some value</h1>
                </div>}
        </div>

    );

};

export default Helper1;
