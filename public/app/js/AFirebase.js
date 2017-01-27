var AFireBase = class AFireBase{

    constructor()
    {

    }

    static creerCompte(email,password)
    {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
            $("#error").html("Votre Compte a été crée avec succès ...");
            $("#password").val("").focus();
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            $("#error").html(errorMessage);
            // ...
        });
    }

    static connexion(email,password) {

        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){

            AFireBase.animationConnexion(user);
            AFireBase.lister();
            currentUser=user;

            return user;

        }).catch(function(error) {

            //S'il y a une erreur d'authentification

                let errorCode = error.code;
                let errorMessage = error.message;

                $("#error").html(errorMessage);
                $("#password").val("").focus();

        });




    }
    static animationConnexion(user)
    {
        $("#formulaire *").fadeOut(1000,function(){$("#logoMjMailer").slideUp("2000");});

        $("#myNavbar").html("");

        $("#myNavbar").append("<li><a href='#'>"+user.email+"</li></li>");
        $("#myNavbar").append("<li><a href='javascript:AFireBase.deconnexion()'>Déconnexion <span class='glyphicon glyphicon-log-out'></span></li></li>");
    }
    static deconnexion() {
        firebase.auth().signOut().then(function() {
           $("#formulaire * ").fadeIn("1000",function(){$("#logoMjMailer").slideDown(1000)})
            $("#myNavbar").html("<li><a href='#'>Bienvenue cher visiteur</a></li>");
            $("#error").html("Deconnexion Avec Succés vous pouvez vous connecter une Autre fois");
        }, function(error) {
            // An error happened.
        });
    }
    static estConnecte(){
        firebase.auth().onAuthStateChanged(function(user) {
            return user;
        });
    }

    /*
    * MESSAGE CRUD
    * */

    static lister() {
        return firebase.database().ref('/messages/').once('value').then(function(snapshot) {


            let data = Object.values(snapshot.val()) ;

            $("#messagesTable tbody").html("");
            data.map(function(element){

                element= Object.values(element) ;

                let message = new Message(element)


                let tr=(message.toTr());


                $("#messagesTable").append(tr)

            });

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