const controller = {}

controller.doLog = false;

controller.initEditor = function(){
    controller.initLogging()
    model.getData()
    view.addHandler()
}

controller.initLogging = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.has('debug')){
        controller.doLog = true;
    }
}