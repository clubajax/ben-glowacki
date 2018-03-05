function handleSmileys(elements,mode){
  if(!mode){mode="replace"};
  var smiley={faces:[
      {name:"ban",text:"[ban]",emoticons:["\\[ban\\]"]},
      {name:"censored",text:"[censored]",emoticons:["\\[censored\\]"]},
      {name:"happybirthday",text:"[happybirthday]",emoticons:["\\[happybirthday\\]"]},
      {name:"innocent",text:"[innocent]",emoticons:["\\[innocent\\]"]},
      {name:"offtopic",text:"[offtopic]",emoticons:["\\[offtopic\\]"]},
      {name:"rolleyes",text:"[rolleyes]",emoticons:["\\[rolleyes\\]"]},
      {name:"sleeping",text:"[sleeping]",emoticons:["\\[sleeping\\]"]},
      {name:"whistling",text:"[whistling]",emoticons:["\\[whistling\\]"]},
      {name:"yawn",text:"[yawn]",emoticons:["\\[yawn\\]"]},
      {name:"huh",text:"[huh]",emoticons:["\\[huh\\]"]},
      {name:"tongue",text:"[tongue]",emoticons:["\\[tongue\\]"]},
      {name:"unsure",text:"[unsure]",emoticons:["\\[unsure\\]"]},
      {name:"angry",text:"[angry]",emoticons:["\\[angry\\]"]},
      {name:"blink",text:"[blink]",emoticons:["\\[blink\\]"]},
      {name:"cool",text:"[cool]",emoticons:["\\[cool\\]"]},
      {name:"crying",text:"[crying]",emoticons:["\\[crying\\]"]},
      {name:"lol",text:"[lol]",emoticons:["\\[lol\\]"]},
      {name:"ohmy",text:"[ohmy]",emoticons:["\\[ohmy\\]"]},
      {name:"scared",text:"[scared]",emoticons:["\\[scared\\]"]},
      {name:"sleep",text:"[sleep]",emoticons:["\\[sleep\\]"]},
      {name:"sneaky",text:"[sneaky]",emoticons:["\\[sneaky\\]"]},
      {name:"thumbdown",text:"[thumbdown]",emoticons:["\\[thumbdown\\]"]},
      {name:"thumbup",text:"[thumbup]",emoticons:["\\[thumbup\\]"]},
      {name:"tongue_smile",text:"[tongue_smile]",emoticons:["\\[tongue_smile\\]"]},
      {name:"spam",text:"[spam]",emoticons:["\\[spam\\]"]},
      {name:"love",text:"[love]",emoticons:["\\[love\\]"]},
      {name:"batman",text:"[batman]",emoticons:["\\[batman\\]"]},
      {name:"ninja",text:"[ninja]",emoticons:["\\[ninja\\]"]},
      {name:"pirate",text:"[pirate]",emoticons:["\\[pirate\\]"]},
      {name:"alien",text:"[alien]",emoticons:["\\[alien\\]"]}
  ]};

  if(mode=="replace"){
    smiley.faces.push(
      {name:"wink",text:"[wink]",emoticons:["\\[wink\\]","\\;\\)","\\;\\)","\\;\\-\\)","\\;\\-\\)"]},
      {name:"beam",text:"[beam]",emoticons:["\\[beam\\]","\\:\D","\\:\D","\\:\\-\D","\\:\\-\D"]},
      {name:"sad",text:"[sad]",emoticons:["\\[sad\\]","\\:\\(","\\:\\(","\\:\\-\\(","\\:\\-\\("]},
      {name:"smile",text:"[smile]",emoticons:["\\[smile\\]","\\:\\)","\\:\\)","\\:\\-\\)","\\:\\-\\)"]}
    );
  }else{
    smiley.faces.push(
      {name:"wink",text:"[wink]",emoticons:["\\[wink\\]"]},
      {name:"beam",text:"[beam]",emoticons:["\\[beam\\]"]},
      {name:"sad",text:"[sad]",emoticons:["\\[sad\\]"]},
      {name:"smile",text:"[smile]",emoticons:["\\[smile\\]"]}
    );
  }

  elements.each(function(){
    var element=jQuery(this);
    var text=jQuery(element).html();

    jQuery(smiley.faces).each(function(a){
      var emoticons=smiley.faces[a].emoticons;
      jQuery(emoticons).each(function(b){
        var sm = smiley.faces[a];
        var rx = new RegExp(sm.emoticons[b],"g");
        var el = " <span title=\""+sm.name+"\" class=\" blox-transparency blox_emoticons sprite-"+sm.name+"\"></span> ";
        text=text.replace(rx,el);
      });
    });
    jQuery(element).html(text);
  });
}