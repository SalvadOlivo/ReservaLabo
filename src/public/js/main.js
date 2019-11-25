var regex = new RegExp('[T]')


function addZero(i){
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

function obtenerFecha(fecha, minu, hora){
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
  return obtenerFecha((fecha.getTime() + 24*60*60*1000), minu, hora);
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
          fecha_tope = afterDay(fecha_inicio, 0, 0)
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
          jArray['startRecur'] = obtenerFecha(fecha_inicio,0,0)
          jArray['endRecur'] = obtenerFecha(fecha_tope, 0, 0)
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

var redireccionar = (info, tipo)=>{
  if((tipo === 'select' && regex.test(info.endStr)) || (tipo === 'select')){
    if(document.getElementById("idUser") != null || document.getElementById("idUser") != undefined){
      var id = document.getElementById("idUser").value;
      var end = info.endStr
      end = end.substring(0, 16)
      end = obtenerFecha(end, 0, 0)
      var inicio = obtenerFecha(info.startStr, 0 , 0)
      window.location.href = `/formulario/${id}&${inicio}&${end}`
    }else{
      console.log('casi')
      window.location.href = "/login"
    }
  }else{
    if(document.getElementById("idUser") != null || document.getElementById("idUser") != undefined){
      var id = document.getElementById("idUser").value;
      var start = obtenerFecha(info.dateStr, 0, 0)
      if(regex.test(info.dateStr)){
        var end = afterDay(new Date(info.dateStr), 0, 30)
      }
      else{
        var end = afterDay(new Date(info.dateStr), 1, 0)
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



    
    
    


       