import { fund } from "./js/fund.js";
import { FUNDS } from "./js/dbfund.js";
import { checkInput } from "./js/check.js";

//elementos del Dom
const $initialDeposit = document.getElementById('initial');
const $monthlyDeposist = document.getElementById('monthly');
const $buttonCal = document.getElementById('btn-cal');
const $yearsParagraph = document.querySelector('#years-ren');
const $yearsRange = document.querySelector('#years');
const $profile = document.getElementById('profile');
const $simulation = document.querySelector('.simulation-container');
const $alert = document.querySelector('#alert');

//se renderiza el input range de los años
$yearsRange.addEventListener('input', (e)=>{
    $yearsParagraph.textContent = `${e.target.value} años`;
});

//checkeando que los inputs sean numeros
$initialDeposit.addEventListener('keydown', function(e) {
    checkInput(e);
    
});
$monthlyDeposist.addEventListener('keydown', function(e) {
    checkInput(e);
});


//funcion para obtener el valor del select
function getSelectedOption(select) {    
    let selectedOption = select.options[select.selectedIndex];
    return parseInt(selectedOption.value);
}


let simulation;
let returns;
let myChart;

//funcion que limpia el formulario
const clearForm = () =>{
    $yearsRange.value = '1';
    $yearsParagraph.textContent = '1 año';
    $alert.textContent = '';
    $initialDeposit.value = '';
    $monthlyDeposist.value = '';

}
 
//funcion que renderiza la simulacion
const renderSimulation = () =>{
    document.querySelector('#result-years').textContent = `En ${simulation.years} años podrías tener ⬇️`;
    document.querySelector('#user-fund').textContent = `Fondo ${simulation.name}`;
    document.querySelector('#result-total').textContent = `$${formatNumber(simulation.totalDeposit)}`;
    document.querySelector('#result-realistic').textContent = `$${formatNumber(returns[0].at(-1))}`;
    document.querySelector('#result-optimistic').textContent = `$${formatNumber(returns[1].at(-1))}`;
    document.querySelector('#result-pessimistic').textContent = `$${formatNumber(returns[2].at(-1))}`;
}

//cuando se presiona el boton simular
$buttonCal.addEventListener('click', (e)=>{
    e.preventDefault();
    if($initialDeposit.value && $monthlyDeposist.value){
        let years = parseInt($yearsRange.value);
        let initialDeposit = parseInt($initialDeposit.value);
        let monthlyDeposit = parseInt($monthlyDeposist.value);
        //llamo a la funcion getSelectedOption para obtener el valor del select
        let index = getSelectedOption($profile);
        //se crea una nueva instancia de la clase fund
        simulation = new fund (FUNDS[index].name, FUNDS[index].realistic, FUNDS[index].optimistic, FUNDS[index].pessimistic, years, initialDeposit, monthlyDeposit);
        //se utiliza el metodo expectedReturns para obeneter el valor de los retornos
        returns = simulation.expectedReturns();
        $simulation.classList.remove('hiden-container');
        renderSimulation();
        //periodo de inversion
        let period = [];
        for(let i = 0; i < simulation.years * 12; i++){
            period.push(i);
        }
        //creación del gráfico con chart.js
        const ctx = document.getElementById('myChart').getContext('2d');

        if(myChart){ 
            myChart.destroy();
        }
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: period,
                datasets: [{
                    borderColor: '#28bdcd',
                    data: returns[0],
                    label: 'Realista',
                }, {
                    borderColor: '#716ded',
                    data: returns[1],
                    label: 'Optimista',
                },{
                    borderColor: '#9f9ded',
                    data: returns[2],
                    label: 'Pesimista',
                }]
            },
            options: {
                resoponsive: true,
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return '$' + formatNumber(value);
                            }
                        }
                    },
                    x: {
                       ticks: {
                           display: false
                       } 
                    }
                }
            }

        });
     
      clearForm();
    }else {
            

        $alert.textContent = 'Por favor ingrese los datos requeridos';
        }
    }

);

//funcion para formatear un numero entero con separador de miles
const formatNumber = (num) =>{
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


