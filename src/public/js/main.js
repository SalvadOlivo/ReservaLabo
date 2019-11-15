

function addZero(i){
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

function obtenerFecha(){
  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1;
  var yyyy = hoy.getFullYear();

  dd = addZero(dd);
  mm = addZero(mm);
  return `${yyyy}-${mm}-${dd}`;
}


function obtenerEventos(calendar){

  fetch('/obtenerP', {
    method: 'GET'
  })
  .then(res =>{
    return res.json();
  })
  .then(data => {
    console.log(data)
    calendar.addEventSource(data);
  })
}

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'dayGrid' ],
    defaultView: 'dayGridMonth',
    defaultDate: obtenerFecha(),
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



    
    
    


       