class Control {
  constructor(app) {
    this.app = app
    this.initContainer()
    this.init(app)
  }

  initContainer(){
    this.container = $('#control-container')[0]
  }

  createInput(name, value, step, callback){
    var group = $(`<div class="input-group mb-3 pr-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" style="font-size:30px;" id="basic-addon1">${name}</span>
                </div>
                <input type="number" style="font-size:30px;" value="${value}" step="${step}" class="form-control">
              </div>`)
    this.container.append(group[0])
    Control[name] = value
    var s = group.find('input')[0]
    s.onkeydown = s.onmousewheel=(e)=>{
      Control[name] = s.value
      callback()
    }
  }

  init(app){
    var callback = ()=>{app.findRole()}
    this.createInput('deep',35,1,callback)
    this.createInput('dir',60,1,callback)
    this.createInput('bgValue',50,1,callback)
    this.createInput('power0',1,0.01,callback)
    this.createInput('power1',1.37,0.01,callback)

    document.body.onkeydown = (e)=>{
      if(e.keyCode==32){ // space
        app.GET('/save')
        console.log('save capture.');
      }
      // console.log('keyCode:'+e.keyCode);
    }

    app.img.onload = ()=>{
      app.drawImage()
      app.findRole()
      if (app.DEBUG) return
      if (app.sendTime) {
        app.GET('/fire?'+app.sendTime)
      }
      setTimeout(()=>{
        app.img.src = '/capture?'+Math.random()
      },2500)
    }
  }
}
