
var regex = new RegExp('[T]')



function addZero(i){
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

function obtenerFecha(fecha, hora, minu){
  var hoy = new Date(fecha);
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1;
  var yyyy = hoy.getFullYear();

  dd = addZero(dd);
  mm = addZero(mm);

  var hh = hoy.getHours()+ hora;
  var min = hoy.getMinutes() + minu;
  hh = addZero(hh)
  min = addZero(min)

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

function afterDay(fecha, hora, minu){
  return obtenerFecha((fecha.getTime() + 24*60*60*1000), hora, minu);
}
function beforeDay(fecha, hora, minu){
  return obtenerFecha((fecha.getTime() - 24*60*60*1000), hora, minu);
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
          fecha_inicio = element.fecha_inicio
          var eventos = {}
          console.log(fecha_inicio)
          eventos['title'] = element.laboratorio.nombre;
          eventos['start'] = fecha_inicio
          eventos['url'] = `/reserva/${element._id}`;
          eventos['color'] = '#007c91';
        }else{
          bandera = false;
          fecha_inicio = element.fecha_inicio
          fecha_tope = afterDay(new Date(element.repeticion.fecha_tope),0,0)
          let jArray = {}
          if(element.repeticion.tipo_rep === 'Diaria'){
            jArray['daysOfWeek'] = ['1', '2', '3', '4', '5']
          }
          else{
            jArray['daysOfWeek'] = [element.repeticion.dia]
          }
          jArray['startTime'] = fecha_inicio.substring(11,16)
          jArray['endTime'] = fecha_tope.substring(11,16)
          jArray['startRecur'] = fecha_inicio.substring(0,10)
          jArray['endRecur'] = fecha_tope.substring(0,10)
          jArray['title'] = element.laboratorio.nombre
          jArray['url'] = `/reserva/${element._id}`;
          jArray['color'] = 'green'
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

var redireccionar = (info, tipo)=>{
  if(tipo === 'select'){
    if(document.getElementById("idUser") != null || document.getElementById("idUser") != undefined){
      var id = document.getElementById("idUser").value;
      var end = info.endStr
      end = end.substring(0, 16)
      end = obtenerFecha(end, 1, 0)
      var inicio = afterDay(new Date(info.startStr), 0 , 0)
      window.location.href = `/formulario/${id}&${inicio}&${end}`
    }else{
      window.location.href = "/login"
    }
  }else{
    if(document.getElementById("idUser") != null || document.getElementById("idUser") != undefined){
      var id = document.getElementById("idUser").value;
      var start = afterDay(info.dateStr, 0, 0)
      if(regex.test(info.dateStr)){
        var end = afterDay(info.dateStr, 0, 30)
      }
      else{
        var end = afterDay(info.dateStr, 1, 0)
      }
      window.location.href = `/formulario/${id}&${start}&${end}`
    }else{
      window.location.href = "/login"
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
    defaultView: 'dayGridMonth',
    defaultDate: obtenerFecha(new Date(), 0, 0),
    header: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    eventClick: function(info) {
    },
    dateClick: function(info) {
      redireccionar(info, "click")
    },
    select: function(info) {
      redireccionar(info, "select")
    },
    eventSource: [],
    events: [],
    selectable: true
  });
  obtenerEventos(calendar);
  calendar.render();
 });



    
    
    


       