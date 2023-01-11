<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://kit.fontawesome.com/7e82edf099.js" crossorigin="anonymous"></script>
    <title>Document</title>
</head>

<body>
    <div class="graph-container inactive">
        <div class="graph">
            <div class="graph-header">
                <div class="inputs">
                    <select name="option" id="option">
                        <option value="">Temperature</option>
                        <option value="">Door state</option>
                    </select>
                    <div>From: </div>
                    <input type="date" name="date-from" id="date-from">
                    <div>to: </div>
                    <input type="date" name="date-to" id="date-to">
                    <button id="generate">Generate</button>
                </div>
                <i id="close" class="fa-regular fa-rectangle-xmark"></i>
            </div>
            <div class="graph-data">
                <canvas id="myChart"></canvas>
            </div>
        </div>
    </div>
    <header>
        <nav>
            <a href="https://softel.mx/#/" class="logo">
                SOF<span class="blue">T</span>EL
            </a>
            <a href="https://www.linkedin.com/in/fernandondin/" class="nombre">
                Fernando <span class="blue">Flores</span>
            </a>
        </nav>
    </header>
    <main>
        <div class="container">
            <div class="check">
                <div class="top-check">
                    <div class="input">
                        <input type="number" id="temperature" name="temperature" placeholder="Temperature" min="0" max="1">
                    </div>
                </div>
                <div class="icon">
                    <input type="checkbox" id="thermometer" name="thermometer">
                    <label id="labelthermo" for="thermometer">
                        <div class="thermoicon-container">
                            <div class="thermoicon">

                            </div>
                        </div>
                    </label>
                </div>
            </div>
            <div class="check">
                <div class="top-check">
                    <div class="input">
                        <input type="number" id="doorstate" name="doorstate" placeholder="Door state" min="0" max="1">
                    </div>
                </div>
                <div class="icon">
                    <input type="checkbox" id="door" name="door" />
                    <label for="door">
                        <p class="pfirst">All connected,</p>
                        <p class="psecond">all the time</p>
                        <img src="img/door.png" alt="">
                    </label>
                </div>
            </div>
        </div>
        <div class="button">
            <button id="graph-thermo">View Chart<i class="fa-solid fa-chart-line"></i></button>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="js/script.js"></script>
</body>

</html>