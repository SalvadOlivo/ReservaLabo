
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
  function retornarDatos(data){

  }
  function obtenerEventos(){
    var data1 = {}
    var eventos = []
    fetch('/obtener', {
      method: 'GET'
    })
    .then(res =>{
      return res.json();
    })
    .then(data => {
      console.log(data)
    })
    return eventos;
  }

  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var variable = obtenerEventos()
    console.log(variable)
    console.log("HOLA?")
    console.log(typeof variable)
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
      selectable: true,
      defaultView: 'dayGridMonth',
      defaultDate: obtenerFecha(),
      dateClick: function(info) {
        alert('clicked ' + info.dateStr);
      },
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true,
      events: variable
    });
    calendar.render();
   });


    
    
    


       