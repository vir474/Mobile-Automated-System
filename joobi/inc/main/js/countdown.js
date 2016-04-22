
function dateTimeDownWeb( countdown, id, translation ) {
   
        this.countdown = countdown;
        this.translation_obj = JSON.parse(translation);
   

        this.do_cd = function( count_show ) {
           
            if (this.countdown <= 0) {
                //finish
                document.getElementById(id).innerHTML = this.translation_obj.stop;

            } else {	
                    if(count_show < 0 || count_show >6) {count_show = 6;}
      
                    var result_time = this.convert_to_time( this.countdown, count_show ); 
         
                    document.getElementById(id).innerHTML = result_time;   
             
                    var that = this;
                    setTimeout(function () { that.do_cd(count_show);}, 1000);
            }//endif
            
            this.countdown = this.countdown - 1;             
           
        };
        
        this.convert_to_time = function( secs, count_show ) {
        	
            years = Math.floor(secs/31536000); //result years

            diff_s = secs -years*31536000;
            month = Math.floor(diff_s/2628000); //result month

            diff_s = diff_s - month*2628000;
            days = Math.floor(diff_s/86400); //result days

            diff_s = diff_s - days*86400;
            hours = Math.floor(diff_s/3600); //result hours
   
            diff_s = diff_s - hours*3600;
            minutes = Math.floor(diff_s/60); //result minutes

            diff_s = diff_s - minutes*60;
            seconds = diff_s;               //result seconds
      
            if (seconds < 10) { seconds_show = "0"+seconds; } else {seconds_show = seconds;}	
            if (minutes < 10 ) { minutes_show = "0"+minutes; }	else {minutes_show = minutes;}
            if (hours < 10) { hours_show = "0"+hours; }	else {hours_show = hours;}
  
            var result = "";
            var i = 0;
            if(years != 0) 
            {                
                result += years + " "+this.translation_obj.years+" ";
                i++;
            }
            
            if(count_show == i ) {return result;}
            
            if(i != 0) 
            {
                   i++;
                   if(month != 0)   result += month + " "+this.translation_obj.months+" "; 
            }
            else
            {
                if(month != 0)
                {
                    result += month + " "+this.translation_obj.months+" "; 
                    i++;
                }
            }
            
            if(count_show == i) {return result;}
            
            if(i != 0)
            {
                  i++;
                  if(days != 0)   result += days + " "+this.translation_obj.days+" "; 
            }
            else
            {
                if(days != 0)
                {
                       result += days + " "+this.translation_obj.days+" ";
                       i++;
                }    
            }
            
            if(count_show == i) {return result;}
            
            if(i != 0)
            {
                    i++;
                    if(hours_show != 00)    result += hours_show + " "+this.translation_obj.hours+" "; 
            }
            else
            {
                if(hours != 00)
                {
                       result += hours_show + " "+this.translation_obj.hours+" ";
                       i++;
                }    
            }
            if(count_show == i) {return result;}
            if(i != 0)
            {
                i++;
                if(minutes_show != 00)     result += minutes_show + " "+this.translation_obj.minutes+" ";            
            }
            else
            {
                if(minutes != 00)
                {
                      result += minutes_show + " "+this.translation_obj.minutes+" "; 
                      i++;
                }    
            }            
            if(count_show == i) {return result;}
            
            if(seconds_show != 00)
            {
            	result += seconds_show + " "+this.translation_obj.seconds+" ";  
            }  
               
            return result;
         
        }//endfct
        
    }//endfct