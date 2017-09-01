var image, closeButton, video, source, gif, animation, map, iframeMap, videoSource, mapButton;
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        devicePush.register({
            idUser: 'Your User ID',
            idApplication: 'Your App ID'
        });
    },
    receivedEvent: function(id) {
        image = document.getElementById('image');
        closeButton = document.getElementById('closeButton');
        video = document.getElementById('video');
        videoSource = document.getElementById('videoSource');
        source = document.getElementById('source');
        gif = document.getElementById('gif');
        animation = document.getElementById('animation');
        map = document.getElementById('map');
        iframeMap = document.getElementById('iframeMap');
        mapButton = document.getElementById('mapButton');
        closeButton.onclick = function(){
            hideAnimation();
        }
    }
};

document.addEventListener('notificationReceived', successNotificationReceived, false);
function successNotificationReceived(evt){
    // evt.data.message,
    // evt.data.title,
    // evt.data.count,
    // evt.data.sound,
    // evt.data.additionalData
    showContent(evt.data.additionalData);
}

function showContent(additionalData){
    image.style.visibility = 'hidden';
    video.style.visibility = 'hidden';
    gif.style.visibility = 'hidden';
    map.style.visibility = 'hidden';
    if(additionalData.action == 'OPEN_IMAGE'){
        image.style.visibility = 'visible';
        closeButton.style.bottom = '160px';
        closeButton.style.top = "";
        image.style.backgroundImage = 'url('+ additionalData.url + ')';
        image.onclick = function(){
            hideAnimation();
            cordova.InAppBrowser.open(additionalData.open, '_blank', 'location=yes');
        }
    }else if (additionalData.action == 'OPEN_VIDEO') {
        video.style.visibility = 'visible';
        closeButton.style.bottom = '160px';
        closeButton.style.top = "";
        source.src = additionalData.url;
        videoSource.load();
        videoSource.play();
    }else if (additionalData.action == 'OPEN_GIF') {
        gif.style.visibility = 'visible';
        closeButton.style.bottom = "";
        closeButton.style.top = "10px";
        gif.style.width = window.innerWidth - 40 + 'px';
        gif.style.height = window.innerHeight - 40 + 'px';
        gif.style.backgroundImage = 'url('+ additionalData.url + ')';
        gif.onclick = function(){
            hideAnimation();
            cordova.InAppBrowser.open(additionalData.open, '_blank', 'location=yes');
        }
    }else if (additionalData.action == 'OPEN_MAP') {
        map.style.visibility = 'visible';
        closeButton.style.bottom = "";
        closeButton.style.top = "10px";
        map.style.width = window.innerWidth - 40 + 'px';
        map.style.height = window.innerHeight - 40 + 'px';
        iframeMap.style.height = window.innerHeight - 90 + 'px';
        iframeMap.src = additionalData.url + additionalData.address;
        mapButton.href = 'geo:0,0?q=' + additionalData.address;
    }
    animation.classList.add("containerCenter") ;
    animation.classList.remove("containerBottom");
}

function hideAnimation(){
    animation.classList.add("containerBottom") ;
    animation.classList.remove("containerCenter");
}
