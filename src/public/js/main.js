window.onload = () => {
    app.init();
};

let app = {
  init: function(){
    this.cargarCalendario();
  },
  addZero: function(i){
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  },
  obtenerFecha: function(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();

    dd = addZero(dd);
    mm = addZero(mm);
    return `${yyyy}-${mm}-${dd}`;
  },
  obtenerEventos: function(){
    fetch();
  },
  cargarCalendario: function(){
    document.addEventListener('DOMContentLoaded', function() {
      var calendarEl = document.getElementById('calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
        selectable: true,
        defaultView: 'dayGridMonth',
        defaultDate: `${yyyy}-${mm}-${dd}`,
        dateClick: function(info) {
          alert('clicked ' + info.dateStr);
        },
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: this.obtenerEventos()
      });
      calendar.render();
     });
  }
}
    
    
    


       