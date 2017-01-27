var Message = class Message {
    constructor(id, email,objet,corps,date) {

        //CONSTRUCTEUR INITIALISATION
        if(arguments.length==5)
        {
            this.id = id;
            this.email=email;
            this.objet=objet;
            this.corps=corps;
            this.date=date;
        }
        //CONSTRUCTEUR DE RECOPIE
        else if(arguments.length==1)
        {
            //corps : (element[0])
            //date : (element[1])
            //email : (element[2])
            //id : (element[3])
            //objet : (element[4])

            this.id = id[3];
            this.email=id[2];
            this.objet=id[4];
            this.corps=id[0];
            this.date=id[1];
        }

    }
    toTr(){
        // this.id
        let tr= $("<tr>");
        tr.click(function (e) {
            let btn = e.target;
            if(btn.name=="btn-supprimer")
            {
                $("#modalSupprimer").modal("show");
                $(".supprimerDefinitivement").attr("id",btn.id);

            }
            else if(btn.name=="btn-modifier")
            {

                let id = btn.id;

                $("#modalModifier").modal("show");
                    btn = $(btn).parent().parent();
                let data = btn.children();

                let email = (data[1].innerText);let objet = (data[2].innerText);let corps = (data[3].innerText);let date = (data[4].innerText);


                $("#objetMessageModifier").val(objet);

                $("#corpsMessageModifier").val(corps);

                $(".modifierMessage").attr("id",id);


            }
        })

        let emailUser = $("#myNavbar li:nth-child(1) a").text();

        if(emailUser=="Bienvenue Cher Visiteur")
            tr.append(('<td align="center"><button class="btn btn-default glyphicon glyphicon-cog" disabled></button><button class="btn btn-danger glyphicon glyphicon-trash" disabled></button></td><td>'+this.email+'</td><td>'+this.objet+'</td><td>'+this.corps+'</td><td>'+this.date+'</td><td><a  class="btn btn-block btn-info "  style="cursor:help" title="Connectez Vous !" data-toggle="tooltip"  ><span class="glyphicon glyphicon-info-sign"></span></a></td>'))
        else if(emailUser!=this.email)
        {
            tr.append(('<td align="center"><button class="btn btn-default glyphicon glyphicon-cog" disabled></button><button class="btn btn-danger glyphicon glyphicon-trash" disabled></button></td><td>'+this.email+'</td><td>'+this.objet+'</td><td>'+this.corps+'</td><td>'+this.date+'</td><td><a  class="btn btn-block btn-info "  style="cursor:help" title="Vous N\'etes pas le proprietaire de ce message donc vous ne pouvez rien faire" data-toggle="tooltip"  ><span class="glyphicon glyphicon-info-sign"></span></a></td>'))

        }
         else
        {
            tr.append(('<td align="center"><button class="btn btn-default  glyphicon glyphicon-cog" name="btn-modifier" id="'+this.id+'"></button><button class="btn btn-danger glyphicon glyphicon-trash" name="btn-supprimer" id="'+this.id+'"></button></td><td>'+this.email+'</td><td>'+this.objet+'</td><td>'+this.corps+'</td><td>'+this.date+'</td>'))

        }

            //SI L'UTILISATEUR EST LE PUBLICATEUR





        return tr;
    }


};