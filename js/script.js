let thermometer = document.querySelector('#thermometer');
let door = document.querySelector('#door');
let temperature = document.querySelector('#temperature');
let doorstate = document.querySelector('#doorstate');
let graphContainer = document.querySelector('.graph-container');
let graphThermo = document.querySelector('#graph-thermo');
let generate = document.querySelector('#generate');
let option = document.querySelector('#option');
let myCh = document.querySelector('#myChart');

/* Generate the line chart when we click the generate chart button  */
generate.addEventListener('click', () => {
    let op = option.options[option.selectedIndex].text;
    let datefrom = document.querySelector('#date-from');
    let dateto = document.querySelector('#date-to');
    if (datefrom.value === '' || dateto.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must select a date range!',
            confirmButtonColor: 'rgb(0, 74, 136)'
        })
        return;
    } else {
        if (datefrom.value > dateto.value) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The date from must be less than the date to!',
                confirmButtonColor: 'rgb(0, 74, 136)'
            })
            return;
        }

    }
    datefrom = datefrom.value + ' 00:00:00';
    dateto = dateto.value + ' 23:59:59';
    /* Case if we want to generate the temperature values chart */
    if (op === 'Temperature') {
        fetch(`graph.php?thermometer=${thermometer.checked}&datefrom=${datefrom}&dateto=${dateto}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Ocurrio un error en la respuesta');
                }
                return res.json();
            })
            .then(data => {
                let labels = [];
                let dataTemp = [];
                console.log(data.length);
                for (let i = 0; i < data.length; i++) {
                    labels.push(data[i].changeDate);
                    dataTemp.push(data[i].temperature);
                }
                let dta = {
                    labels: labels,
                    datasets: [{
                        label: 'Thermometer values along the time',
                        data: dataTemp,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                };
                let config = {
                    type: 'line',
                    data: dta,
                    options: {}
                };
                /* Restart the canvas to draw a new chart */
                let oldChart = document.querySelector('#myChart');
                oldChart.remove();
                let graphData = document.querySelector('.graph-data');
                let newChart = document.createElement('canvas');
                newChart.id = 'myChart';
                graphData.appendChild(newChart);

                let myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                );

            })
            .catch(err => {
                console.log(err);
            });
    }
    /* Case if we want to generate the door values chart */
    if (op === 'Door state') {
        fetch(`graph.php?doorstate=${door.checked}&datefrom=${datefrom}&dateto=${dateto}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Ocurrio un error en la respuesta');
                }
                return res.json();
            })
            .then(data => {
                let labels = [];
                let dataTemp = [];
                for (let i = 0; i < data.length; i++) {
                    labels.push(data[i].changeDate);
                    dataTemp.push(data[i].state);
                }
                let dta = {
                    labels: labels,
                    datasets: [{
                        label: 'Door values along the time',
                        data: dataTemp,
                        fill: false,
                        borderColor: 'rgb(255, 100, 100)',
                        tension: 0.1
                    }]
                };
                let config = {
                    type: 'line',
                    data: dta,
                    options: {}
                };
                /* Restart the canvas to draw a new chart */
                let oldChart = document.querySelector('#myChart');
                oldChart.remove();
                let graphData = document.querySelector('.graph-data');
                let newChart = document.createElement('canvas');
                newChart.id = 'myChart';
                graphData.appendChild(newChart);

                let myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                );

            })
            .catch(err => {
                console.log(err);
            });
    }
});
/* When we click View Chart button shows the charts modal*/
graphThermo.addEventListener('click', () => {
    graphContainer.classList.remove('inactive');
    graphContainer.classList.add('active');
});
/* When we click outside the modal the modal closes */
graphContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('graph-container')) {
        graphContainer.classList.remove('active');
        graphContainer.classList.add('inactive');
    }
});
/* When we click the close button the modal closes */
document.querySelector('#close').addEventListener('click', () => {
    graphContainer.classList.remove('active');
    graphContainer.classList.add('inactive');
});
/* When we change the value we mark as checked if the input value is 1 or 0 in other case*/
temperature.addEventListener('input', (e) => {
    /* check if the value is empty or if it is null so as not to raise the alert*/
    if (e.target.value === '' || e.target.value == null)
        return;
    /* check if the value is between 0 and 1 if it is not we raise the alert*/
    if (e.target.value < 0 || e.target.value > 1) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Value must be 0 or 1',
            confirmButtonColor: 'rgb(0, 74, 136)'
        });
        e.target.value = '';
        return;
    } else {
        /* We change the checbox value and raise the event to handle all the 
        operations on onchange event */
        let event = new Event('change');
        if (e.target.value == 1) {
            thermometer.checked = true;
            thermometer.dispatchEvent(event);
        } else {
            thermometer.checked = false;
            thermometer.dispatchEvent(event);
        }
    }
});
/* It is analogous to the previous case. */
doorstate.addEventListener('input', (e) => {
    if (e.target.value === '' || e.target.value == null)
        return;
    if (e.target.value < 0 || e.target.value > 1) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Value must be 0 or 1',
            confirmButtonColor: 'rgb(0, 74, 136)'
        });
        e.target.value = '';
        return;
    } else {
        let event = new Event('change');
        if (e.target.value == 1) {
            door.checked = true;
            door.dispatchEvent(event);
        } else {
            door.checked = false;
            door.dispatchEvent(event);
        }
    }
});
/* When we change the value of the thermometer we send the value to the database */
thermometer.addEventListener('change', (e) => {
    let d = new Date();
    let fullDate = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    if (e.target.checked) {
        temperature.value = 1;
    } else {
        temperature.value = 0;
    }
    fetch(`thermometer.php?temperature=${e.target.checked ? 1 : 0}&changeDate=${fullDate}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Ocurrio un error en la respuesta');
            }
        })
        .catch(err => {
            console.log(err);
        });

});
/* When we change the value of the door we send the value to the database */
door.addEventListener('change', (e) => {
    let d = new Date();
    let fullDate = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    if (e.target.checked) {
        doorstate.value = 1;
    } else {
        doorstate.value = 0;
    }
    fetch(`door.php?state=${e.target.checked ? 1 : 0}&changeDate=${fullDate}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Ocurrio un error en la respuesta');
            }
        })
        .catch(err => {
            console.log(err);
        });

});