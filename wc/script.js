// hide body to prevent FOUC
document.body.style.opacity = 0;

(function() {

    var tiempo= {
        createList: function (info) {
            var $this=this;
            var list=document.createElement('ul');
            list.setAttribute('class','beevaWeather');
            info.forEach(function(el){
                console.log(el);
                var item=document.createElement('li')
                $this.addCity(item,el.name)
                $this.addIcon(item,el.weather[0].icon);
                $this.addTemp(item,el.main.temp);
                list.appendChild(item);
            });
            return list;
        },
        addCity : function(item,city){
            var titulo=document.createElement('H4');
            titulo.textContent=city;
            item.appendChild(titulo);
        },
        addTemp : function(item,temp){
            var tmp=document.createElement('span');
            tmp.textContent=temp+'º';
            item.appendChild(tmp);
        },
        addIcon : function(item,icon){
            var img=document.createElement('img');
            img.setAttribute('src','http://openweathermap.org/img/w/'+icon+'.png')
            item.appendChild(img);
        },
        getInfo: function (cb) {
            $.getJSON('http://api.openweathermap.org/data/2.5/group?id=' + this.getAttribute('ciudades') + '&units=metric&lang=es', function (data) {
                cb(data.list);
            });
        },
        createdCallback: function () {
            var $this = this;
            this.getInfo(function (info) {
                var list = $this.createList(info);
                $this.appendChild(list);
            });
        },
        construct: function () {
            var obj = Object.create(HTMLElement.prototype);
            $.extend(obj, this);
            document.registerElement('tiempo-beeva', {
                prototype: obj
            });
        }
    };
    tiempo.construct();
})();





window.addEventListener('WebComponentsReady', function() {
    // show body now that everything is ready
    document.body.style.opacity = 1;
});

//http://api.openweathermap.org/data/2.5/group?id=3117735,524901,703448,2643743&units=metric&lang=es