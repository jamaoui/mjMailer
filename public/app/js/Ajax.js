class Ajax{
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
            MessageService.lister();
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
    static creerXhr()
    {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        let versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        let xhr,i;
        for (i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
            }
        }
        return xhr;
    }
    static creerRequete(type,url,data, callback){
        let xmlhttp;

        xmlhttp = Ajax.creerXhr();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                callback(xmlhttp.responseText);

            }
        };


        xmlhttp.open(type, url);

        if(type==="GET")
            if(data===null)
                xmlhttp.send();
            else
                xmlhttp.send(data)
        else
            xmlhttp.send(data);
    }
    /*
     * MESSAGE CRUD
     * */

    static lister() {
        Ajax.creerRequete("GET","https://mjmailer-ea378.firebaseio.com/messages.json",null,function(resultat){
            let data = Object.values(JSON.parse(resultat)) ;

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

        let data=JSON.stringify({
            id    : id,
            email : email,
            objet : objet,
            corps : corps,
            date  : date
        });
        Ajax.creerRequete("POST","https://mjmailer-ea378.firebaseio.com/messages.json",data,function(resultat) {

        })


        let tr = message.toTr();

        tr.hide()

        $("#messagesTable").append((tr));

        tr.fadeIn(1000)

    }
    static supprimer(btn) {

        let id = btn.attr('id');

        $("#modalSupprimer").modal("hide");
        Ajax.creerRequete("POST","app/js/MessageService.js",null,function(resultat) {


            (MessageService.supprimer(btn));

        })

        /*Ajax.creerRequete("POST","https://mjmailer-ea378.firebaseio.com/messages.json",data,function(resultat) {

            $("#modalSupprimer").modal("hide");
            $("#"+id).parent().parent().fadeOut(1000);

        })*/


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


}