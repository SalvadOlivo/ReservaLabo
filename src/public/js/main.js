

function addZero(i){
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

function obtenerFecha(fecha, days){
  var hoy = new Date(fecha);
  var dd = hoy.getDate() + days;
  var mm = hoy.getMonth()+1;
  var yyyy = hoy.getFullYear();

  dd = addZero(dd);
  mm = addZero(mm);
  return `${yyyy}-${mm}-${dd}`;
}
function afterDay(fecha){
  return new Date(fecha.getTime() + 24*60*60*1000);
}

function beforeDay(fecha){
  return new Date(fecha.getTime() - 24*60*60*1000);
}



function obtenerEventos(calendar){
  var eventos = [] 
  fetch('/obtener', {
    method: 'GET'
  })
  .then(res =>{
    return res.json();
  })
  .then(data => {
    data.forEach(element => {
      let fecha_inicio = new Date(element.fecha_inicio)
      let fecha_tope = new Date(element.repeticion.fecha_tope)
      console.log("FECHA-TOPE: ", fecha_tope)
      console.log("FECHA-INICIO: ", fecha_inicio)

      fecha_tope = afterDay(fecha_tope)
      let jArray = {}
      if(element.repeticion.tipo === 'diaria'){
        jArray['daysOfWeek'] = ['1', '2', '3', '4', '5']
      }
      else if(element.repeticion.tipo === 'semanal'){
        jArray['daysOfWeek'] = [(fecha_inicio.getDay() >= 0 && fecha_inicio.getDay() < 6) ? fecha_inicio.getDay()+1 : 0]
      }

      jArray['startTime'] = fecha_inicio.toLocaleTimeString();
      jArray['endTime'] = '10:30'
      jArray['startRecur'] = obtenerFecha(fecha_inicio,1)
      jArray['endRecur'] = obtenerFecha(fecha_tope,0)
      console.log('DAY: ', element.descripcion)
      console.log(jArray['endRecur'])
      jArray['title'] = element.descripcion
      eventos.push(jArray)
    });
    calendar.addEventSource(eventos);
  })
}

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
    defaultView: 'dayGridMonth',
    defaultDate: obtenerFecha(new Date(), 0),
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    eventSource: []
  });
  obtenerEventos(calendar);
  calendar.render();
 });



    
    
    


       