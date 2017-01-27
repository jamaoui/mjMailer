class Configuration{
    static getMethod(method)
    {
        if(method==="FIREBASE")
        {
            return(AFireBase);
        }
        else if(method==="AJAX")
        {

            return(Ajax);
        }

    }
    static getDate()
    {
        let monthNames = [
            "Janvier", "Fevrier", "Mars",
            "Avril", "Mai", "Juin", "Juiller",
            "Aout", "Septembre", "Octobre",
            "Novembere", "Decembere"
        ];

        let date = new Date();
        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if(hours.length==1)
            hours="0"+hours;

        if(minutes.length<2)
            minutes="0"+minutes.toString();


        return (day + ' ' + monthNames[monthIndex] + ' ' + year+" # Temps  "+hours+" H : "+minutes+" Min");
    }

}