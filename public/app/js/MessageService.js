class MessageService{

    static lister() {
        return firebase.database().ref('/messages/').once('value').then(function(snapshot) {


            let data = Object.values(snapshot.val()) ;

            $("#messagesTable tbody").html("");
            data.map(function(element){

                element= Object.values(element) ;

                let message = new Message(element)


                let tr=(message.toTr());


                $("#messagesTable").append(tr)

            })
            ;

            $("#messagesTable tbody tr td").slideUp(0,function () {

                $("#messagesTable tbody tr td").fadeIn('1500');
            });

        });

    }


    static ajouter(email,objet,corps) {

        objet=((objet=='')?'sans objet':objet);

        let ref= firebase.database().ref('/').push();

        let id= ref.key

        let date=(Configuration.getDate());

        let message  = new Message(id, email,objet,corps,date);

        firebase.database().ref('/messages/'+id).set({

            id    : message.id,
            email : message.email,
            objet : message.objet,
            corps : message.corps,
            date  : message.date


        });

        let tr = message.toTr();

        tr.hide()

        $("#messagesTable").append((tr));

        tr.fadeIn(1000)

    }
    static supprimer(btn) {

        let id = btn.attr('id');

        $("#modalSupprimer").modal("hide");
        firebase.database().ref("/messages/"+id).remove(function(error){

            $("#modalSupprimer").modal("hide");
            $("#"+id).parent().parent().fadeOut(1000);
        })

    }
    static modifier(btn) {
        let id = btn.attr('id');

        let objetMessageModifier = $("#objetMessageModifier").val();

        let corpsMessageModifier = $("#corpsMessageModifier").val();

        let date = Configuration.getDate();

        let email = $("#myNavbar li:nth-child(1) a").text();

        firebase.database().ref().child('/messages/' + id)
            .update({
                id:id,
                email:email,
                objet : objetMessageModifier,
                corps : corpsMessageModifier,
                date  : date
            });

        $("#modalModifier").modal("hide");
        $("#"+id).parent().parent().slideUp(1000,function(){

            btn = $("#"+id).parent().parent();
            let data = btn.children();


            (data[2].innerText=objetMessageModifier);
            (data[3].innerText=corpsMessageModifier);
            (data[4].innerText=date);

            $("#"+id).parent().parent().fadeIn(1000)

        });



    }


};