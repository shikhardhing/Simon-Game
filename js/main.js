var colors=["green","red","yellow","blue"];
var pattern=["","","","","",   "","","","","",    "","","","","",   "","","","",""];
var pattern_index=[0,0,0,0,0,   0,0,0,0,0,        0,0,0,0,0,        0,0,0,0,0,];
var on=0;
var start=0;
var strict=0;
var take_input=0;
var loops;
var j;
var tags=$('.btn');

$(document).ready(function(){    
    $(".colors").on("click",function(){
        setTimeout(clicked.bind(this),0);
    });
    
    clicked=function(){
        if($(this).hasClass(pattern[j])&&take_input==1){
            setTimeout(highlight.bind(tags.eq(pattern_index[j])),0);
            j++;
            if(j==loops){
                if(j==20){
                    $(".won").css("visibility","initial");
                    $(".off").trigger("click");
                }
                else{
                    take_input=0;j=0;
                    loops++;
                    $(".count").html(loops);
                    setTimeout(play.bind(this,loops),1000);   
                }
            }
        }            
        else if(!$(this).hasClass(pattern[j])&&take_input==1){
            if(strict==1){
                setTimeout(highlight.bind(this),0);
                loops=0;j=0;take_input=0;
                $(".count").html("!!");
                setTimeout(play.bind(this,1),1000);   
            }
            else{
                setTimeout(highlight.bind(this),0);
                j=0;take_input=0;
                $(".count").html("!!");
                setTimeout(play.bind(this,loops),1000);   
            }
        }
    }
    
    
    $(".on").on("click",function(){
       on=1;
       $(".on").css("background-color","#3193DE");
       $(".off").css("background-color","#333");
        $(".count").addClass("count-on");
        $(".count").html("--");
        
   });
    $(".off").on("click",function(){
       on=0;loops=0;j=0;
       $(".on").css("background-color","#333");
       $(".off").css("background-color","#3193DE");
        $(".count").removeClass("count-on");
        $(".count").html("");
   });
    
    
    $(".strict").on("click",function(){
       if(strict==0){
           strict=1;
           $(".strict-button").css("background-color","red");
       }
        else if(strict==1){
           strict=0;
           $(".strict-button").css("background-color","#222");
       }
   });    
    $(".start").on("click",function(){
        start=1;loops=0;j=0;
        for(var i=0;i<20;i++){ 
            pattern_index[i]=Math.floor(Math.random()*4)
            pattern[i]=colors[pattern_index[i]];
        }
        console.log(pattern);
        loops++;
        play(loops);
    });
    
    play=function(m){
        
        $(".count").html(loops);
        for(var i=0;i<m;i++){
                setTimeout(highlight.bind(tags.eq(pattern_index[i])),i*700);       
        }
        take_input=1;
    }
    highlight=function(){
        $(this).addClass("colors-highlight");
        setTimeout(play_audio.bind(this),0);
        setTimeout(dehighlight.bind(this),400);
    }    
    dehighlight=function(){
        $(this).removeClass("colors-highlight");
    }
    
    play_audio=function(){
        var audio=document.createElement('audio');
        if($(this).hasClass("green"))
            audio.src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
        else if($(this).hasClass("yellow"))
            audio.src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
        else if($(this).hasClass("red"))
            audio.src="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
        else if($(this).hasClass("blue"))
            audio.src="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
        audio.play();
    }    
});