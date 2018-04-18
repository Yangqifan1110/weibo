;
(function(win){
   var doc = win.document;
   var docEl = doc.documentElement;
   var tid;

   function refreshRem() {
     var width = docEl.getBoundingClientRect().width;
     var rem = width/32;//6.4
     // if(rem>50){
     //   rem=50;
     // }
     docEl.style.fontSize = rem +'px'
   }

   win.addEventListener('resizi',function(){
     clearTimeout(tid);
     tid = setTimeout(refreshRem,10);
   },false);
   win.addEventListener('pageshow',function(e){
     if(e.persisted){
       clearTimeout(tid);
       tid=setTimeout(refreshRem,10);
     }
   },false);

   refreshRem();
})(window);
