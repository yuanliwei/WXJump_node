class App {
  constructor() {
    this.DEBUG = '/train_data/error_1515438340270.png'
    this.DEBUG = false
    this.sendTime = 0
    this.scale = 0.3
    var canvas = this.canvas = $('#canvas')[0]
    this.ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    this.img = new Image()
    if (this.DEBUG) {
      this.img.src = this.DEBUG
    } else {
      this.img.src = '/capture'
    }
    new Control(this)

  }

  GET(url) {
    var request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.send()
  }

  findRole(){
    var g = this.ctx
    var img = this.img
    var scale = this.scale
    var width = img.width * scale    // 324
    var height = img.height * scale  // 576

    if (width == 0) return

    var cvw = this.canvas.width

    var imgData = g.getImageData((cvw-2*width)/3,0,width,height)

    var x = width+(cvw-2*width)/3*2
    var y = 0

    g.putImageData(imgData,x,y)

    g.save()
    g.translate(x,y)

    var p1 = new Role(g,imgData).findPosition()
    var p2 = new Target(p1,imgData).findPosition()

    this.drawDirection(g,p1,p2)
    this.drawPoint(g,p1)
    this.drawPoint(g,p2)
    g.restore()

    if (p1.error) {
        this.GET('/save')
        // alert('error state')
    }

    var length = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y))
    var time = parseInt( length / 0.3 * Control.power1)
    // console.log('adb shell input swipe 320 410 320 410 '+time);
    console.log("foundPosition: time : " + time + " x0:" + p1.x + " y0:" + p1.y + " x1:" + p2.x + " y1:" + p2.y);
    this.sendTime = time
  }

  drawImage(){
    var g = this.ctx
    var img = this.img
    var scale = this.scale
    var width = img.width * scale    // 324
    var height = img.height * scale  // 576

    var cvw = this.canvas.width
    g.save()
    g.translate((cvw-2*width)/3,0)
    g.drawImage(img,0,0, width,height)
    g.restore()
  }

  drawPoint(g,point){
    g.beginPath()
    g.strokeStyle = 'yellow'
    g.fillStyle = 'blue'
    g.arc(point.x,point.y,3,0,Math.PI*2,true)
    g.stroke()
    g.fill()
    g.closePath()
  }

  drawDirection(g,position,found){
    g.beginPath()
    g.strokeStyle = 'red'
    g.moveTo(position.x,position.y)
    g.lineTo(found.x,found.y)
    g.stroke()
    g.closePath()
  }
}

new App()
