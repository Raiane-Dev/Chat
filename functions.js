    var from = null, start = 0, url = 'http://localhost/Curso/Projeto/Chat/chat.php';
    $(document).ready(function(){
        from = prompt("Please enter your name");
        load();
        alert("Hello " + from);

        $('form').submit(function(e){
            $.post(url, {
                message: $('#message').val(),
                from: from
            });
            $('#message').val('');
            return false;
        })
    });

    function load(){
        $.get(url + '?start=' + start, function(result){
            if(result.items){
                result.items.forEach(item =>{
                    start = item.id;
                    $('#messages').append(renderMessage(item));
                })
            };
            load();
        });
    }

    function renderMessage(item){
        let time = new Date(item.created);
        time = `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
        return `<div class="mensagem"><h6>${item.from}</h6><p>${item.message}</p><span>${time}</span></div>`
    }