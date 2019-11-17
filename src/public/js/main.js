function addZero(i){
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

function obtenerFecha(fecha){
  var hoy = new Date(fecha);
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1;
  var yyyy = hoy.getFullYear();

  dd = addZero(dd);
  mm = addZero(mm);
  return `${yyyy}-${mm}-${dd}`;
}
function afterDay(fecha){
  return new Date(fecha.getTime() + 24*60*60*1000);
}

function obtenerEventos(calendar){
  var eventosS = []
  var bandera = false
  fetch('/obtener', {
    method: 'GET'
  })
  .then(res =>{
    return res.json();
  })
  .then(data => {
    data.forEach(element => {
      if(element.estado == "Aprobada"){
        
        let fecha_inicio;
        let fecha_tope;
        if(element.repeticion.tipo_rep == "Ninguna"){
          bandera = true;
          fecha_inicio = new Date(element.fecha_inicio)
          fecha_tope = afterDay(fecha_inicio)
          var eventos = {}
          eventos['title'] = element.descripcion;
          eventos['start'] = fecha_inicio;
        }else{
          bandera = false;
          fecha_inicio = new Date(element.fecha_inicio)
          fecha_tope = new Date(element.fecha_tope)
          let jArray = {}
          if(element.repeticion.tipo === 'diaria'){
            jArray['daysOfWeek'] = ['1', '2', '3', '4', '5']
          }
          else if(element.repeticion.tipo === 'semanal'){
            jArray['daysOfWeek'] = [element.repeticion.dia]
          }
          jArray['startTime'] = fecha_inicio.toLocaleTimeString();
          jArray['endTime'] = fecha_tope.toLocaleTimeString();
          jArray['startRecur'] = obtenerFecha(fecha_inicio,1)
          jArray['endRecur'] = obtenerFecha(fecha_tope)
          jArray['title'] = element.descripcion
          eventosS.push(jArray)
        }
        if(bandera == false)
        calendar.addEventSource(eventosS);
        else{
          calendar.addEvent(eventos)
        }
      }
    });
    
  })
}

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
    defaultView: 'dayGridMonth',
    defaultDate: obtenerFecha(new Date(), 0),
    header: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    select: function(info) {
      if(document.getElementById("idUser") != null || document.getElementById("idUser") != undefined){
        id = document.getElementById("idUser").value;
        console.log(id)
        window.location.href = `/formulario/${id}/${info.startStr}/${info.endStr}`
      }else{
        window.location.href = "/login"
      }
    },
    eventSource: [],
    events: [],
    selectable: true
  });
  obtenerEventos(calendar);
  calendar.render();
 });



    
    
    


       