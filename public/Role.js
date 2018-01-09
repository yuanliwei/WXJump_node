class Role {
  constructor(g, imgData) {
    this.g = g
    this.imgData = imgData
    this.position = false
  }

  include(x,y){
    var pos = this.position
    if(!pos) pos = this.position = { x1:x,y1:y,x2:x,y2:y }
    pos.x1 = x<pos.x1?x:pos.x1
    pos.x2 = x>pos.x2?x:pos.x2
    pos.y1 = y<pos.y1?y:pos.y1
    pos.y2 = y>pos.y2?y:pos.y2
    pos.width = Math.abs(pos.x1 - pos.x2)
    pos.height = Math.abs(pos.y1 - pos.y2)
  }

  draw(){
    var g = this.g
    var pos = this.position
    g.strokeStyle = 'red'
    g.strokeRect(pos.x1,pos.y1,pos.width,pos.height)
  }

  findPosition(){
    var imgData = this.imgData
    var width = imgData.width
    var height = imgData.height
    var startY = height / 2.5*width
    startY = parseInt(startY) * 4

    var std = {r:50, g:46, b:79}

    for(var i=startY, len=imgData.data.length; i<len; i+=4) {
      let r = imgData.data[i],
      g = imgData.data[i+1],
      b = imgData.data[i+2],
      a = imgData.data[i+3];
      let color = {r:r, g:g, b:b}
      let diff = this.diffColor(std, color)

      if (diff < Control.deep * 3) {
        let x = i/4%width
        let y = i/4/width
        this.include(x,y)
      }
    }
    this.draw()
    var pos = this.position
    var isError = (pos.width<24&&pos.width>20)?false:true
    return {
      x:(pos.x1+pos.x2)/2,
      y:pos.y1+pos.height*5/6,
      error: isError
    };
  }

  diffColor(c1, c2){
    return (c1.r - c2.r) * (c1.r - c2.r) +
    (c1.g - c2.g) * (c1.g - c2.g) +
    (c1.b - c2.b) * (c1.b - c2.b);
  }
}
