window.onload = () => {
    btn_inicio = document.getElementById("inicio");
    btn_sesion = document.getElementById("initSesion");
    btn_reserva = document.getElementById("reservar");
    btn_r = document.getElementById("registro");
    
    let horarios = document.getElementsByClassName("horarios");
    let inicioSesion = document.getElementsByClassName("login");
    let registro = document.getElementsByClassName("crearUser");
    let reserva = document.getElementsByClassName("reserva");
    
    function clickbtn(unnumero) {
        if (unnumero == 0) {
            horarios[0].setAttribute("style", "display:block");
            inicioSesion[0].setAttribute("style", "display:none");
            registro[0].setAttribute("style", "display:none");
            reservar[0].setAttribute("style", "display: none");
    
        }
        if(unnumero == 1){
            horarios[0].setAttribute("style", "display:none");
            inicioSesion[0].setAttribute("style", "display:block");
            registro[0].setAttribute("style", "display:none");
            reservar[0].setAttribute("style", "display: none")
        }
    
        if(unnumero == 2){
          horarios[0].setAttribute("style", "display:none");
          inicioSesion[0].setAttribute("style", "display:none");
          registro[0].setAttribute("style", "display:none");
          reservar[0].setAttribute("style", "display:block");
    
      }
    
        if(unnumero == 3){
            horarios[0].setAttribute("style", "display:none");
            inicioSesion[0].setAttribute("style", "display:none");
            registro[0].setAttribute("style", "display:block");
            reservar[0].setAttribute("style", "display: none")
    
        }
        console.log(unnumero);
    }
    
    
    
    
    btn_inicio.addEventListener("click", function () {
        clickbtn(0);
    });
    
    btn_sesion.addEventListener("click", function () {
        clickbtn(1);
    });
    
    btn_reserva.addEventListener("click", function(){
      clickbtn(2);
    
    });
    
    btn_r.addEventListener("click", function(){
        clickbtn(3);
    
    });
    
    
    };
    
    document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');
      
        var calendar = new FullCalendar.Calendar(calendarEl, {
          plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
          selectable: true,
          defaultView: 'dayGridMonth',
          defaultDate: '2019-08-07',
          dateClick: function(info) {
            alert('clicked ' + info.dateStr);
          },
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          events: [
            {
              title: 'All Day Event',
              start: '2019-08-01'
            },
            {
              title: 'Long Event',
              start: '2019-08-07',
              end: '2019-08-10'
            },
            {
              groupId: '999',
              title: 'Repeating Event',
              start: '2019-08-09T16:00:00'
            },
            {
              groupId: '999',
              title: 'Repeating Event',
              start: '2019-08-16T16:00:00'
            },
            {
              title: 'Conference',
              start: '2019-08-11',
              end: '2019-08-13'
            },
            {
              title: 'Meeting',
              start: '2019-08-12T10:30:00',
              end: '2019-08-12T12:30:00'
            },
            {
              title: 'Lunch',
              start: '2019-08-12T12:00:00'
            },
            {
              title: 'Meeting',
              start: '2019-08-12T14:30:00'
            },
            {
              title: 'Birthday Party',
              start: '2019-08-13T07:00:00'
            },
            {
              title: 'Click for Google',
              url: 'http://google.com/',
              start: '2019-08-28'
            }
          ]
        });
      
        calendar.render();
       });