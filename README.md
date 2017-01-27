##mjMailer
https://mjmailer-ea378.firebaseapp.com
    
Ce Projet Est un projet d'etudes , son objectif et d'envoyer des messages et les consultés en se basant sur la technologie Firebase et L'ajax , avec EcmaScript6

---------------------------------------------------------------------------------------------------------------------------------------------------------


##Prerequisites

Clone with HTTPS 
Use Git or checkout with SVN using the web URL.
https://github.com/jamaoui/mjMailer.git

    
---------------------------------------------------------------------------------------------------------------------------------------------------------


##arborescence
    
database.rules.json  - la configuration de la base de données JSON de FIREBASE
firebase.json        - HOSTING & DESTINATION & SOURCE FIREBASE ....
README.md            - Ce Fichier ;) (Informations)


Public (Dossier)     - Il Contient les elements accessible par les clients 
    - INDEX.HTML     - Master Page ou la page d'index
    - app(DOSSIER)   - Il Contient les elements de configuration du site web
            - css    - Il contient les elements css specialement (Bootstrap) car j'ai utilisé un Css Inline 
            - img    - Il contient les images utilisés
            - js     - Il contient les elements JS  (##LE CORPS DU SITE)
                     -FIREBASE (DOSSIER) Il contient les fichiers de API Firebase
                     -(...) /*LES AUTRES FICHIERS JE VAIS VOUS PARLER D'EUX ULTERIEUREMENT*/
                
Je vais vous parles du dossier Js qui contient le fonctionnement du site ce dossier contient des fichiers avec EcmaScript6 qui jouent un Rôle 
Important au developpement du site  je vais commençer avec : 

!!!!!!!!!!!! (TOUS SES FICHIERS SONT DES CLASSES Sauf Jquery ) !!!!!!!!!!

##MESSAGE   :
    ATTR (id,email,objet,corps)

    CONSTRUCTOR SI 5 PARAMETRES UTILISER LE CONSTRUCTEUR D'INITIALISATION SINON UTILISER UN CONSTRUCTEUR DE RECOPIE

    @toTr() RETURN un formatage de balise TR contenant tous les attributs du message Exemple : amine.chabib@gmail.com	Hello World !	GoodBye World !	27 Janvier 2017 # Temps 16 H : 9 Min

##MessageService

    @lister() IL IMPORTE TOUS LES MESSAGES DU FICHIER messages.json avec AFirebase ou avec Ajax
    @ajouter(email,objet,corps) IL AJOUTE un Message en fonction de AFirebase ou Ajax et Retourne un résultat Visuel
    @supprimer(id) IL SUPPRIMER un Message en fonction de AFirebase ou Ajax et Retourne un résultat Visuel
    @modifier(id)  IL Modifie un Message en fonction de AFirebase ou Ajax et Retourne un résultat Visuel
    @
  
##AFirebase :
    
    ces fonctions utilisent le fonctionnement de (API FIREBASE) 

    STATIC @creerCompte(email,password) RETURN ERROR IF EXISTS  (   CREER UN COMPTE UTILISATEUR )
    STATIC @connexion(email,password)   RETURN USER  OU NULL    (   CONNECTER   L'UTILISATEUR   )
    STATIC @deconnexion()               RETURN ERROR IF EXISTS  (   DECONNECTER L'UTILISATEUR   )
##Ajax      :

    ces fonctions utilisent le fonctionnement de (la classe Ajax que j'ai crée avec Ecmascript6)
 
    STATIC @creerXhr()                  RETURN XMLHTTPREQUEST (COMPATIBLE AVEC TOUT LES NAVIGATEURS)
    STATIC @creerRequete(type,url,data, callback) RETURN TEXTRESPONSE (TYPE ( GET OU POST ) URL (DESTINATION DE REQ) DATA (données a envoyer s'ils sont disponible ou null ou cas contraire) callback( FUNCTION aprés le retour de la requette Ajax)
    STATIC @creerCompte(email,password) RETURN ERROR IF EXISTS
    STATIC @connexion(email,password)   RETURN USER  OU NULL
    STATIC @deconnexion()               RETURN ERROR IF EXISTS
##Jquery
    Ils contient les fonctions jquery que j'ai utilisé de temps en temps ( des fois j'utilise EcmasCript5 et Ecmascript6 document.querySelector .....)
    Jquery.min.js : version minifié de Jquery
    Jquery        : Version développement
##Configuration
    Ces Fonctions Décident avec quelle Technologie Travailler (FIREBASE ou AJAX)
    
     STATIC @getMethod(method) RETURN AFirebase (class) || Ajax (Class) en se basant sur la valeur de method ( "AJAX" || "FIREBASE")
     STATIC @getDate()         RETURN new Date() (cette fonction m'aide a formater le retour avec un format  EXEMPLE (27 Janvier 2017 # Temps 4 H : 2 Min)
    

---------------------------------------------------------------------------------------------------------------------------------------------------------


##Temps Total pour le DEV

Environ 34 Heures
    

---------------------------------------------------------------------------------------------------------------------------------------------------------


##Built With

FIREBASE - Api used
Ecmascript6 - Dependency Management
HTML5/CSS3 - 
JQUERY
BOOTSTRAP
    

---------------------------------------------------------------------------------------------------------------------------------------------------------


##Versioning


comme j'ai déja dit ce Projet est juste pour les etudes je n'ai utilisé aucun Versionneur , si je changerai L'idée je vais utilisé SemVer for versioning..
    

---------------------------------------------------------------------------------------------------------------------------------------------------------


##Authors

JAMAOUI MOUAD  -  - MjMailer

LINKEDIN : https://www.linkedin.com/in/mouad-jamaoui-3940a0ba
YOUTUBE  : https://www.youtube.com/channel/UCUNnFmj-VIpbERooz_Znzfg
FACEBOOK : https://www.facebook.com/JamaouiMouad
TWITTER  : https://twitter.com/jamaouimouad

    

---------------------------------------------------------------------------------------------------------------------------------------------------------


##License

ce projet est développé avec des technologies OpenSource 
