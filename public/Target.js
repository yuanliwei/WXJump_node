class Target {
  constructor(position,imgData) {
    this.position = position
    this.imgData = imgData
    var width = imgData.width
    var height = imgData.height
    var x = position.x
    var y = position.y
    var defDir = Control.dir / 100
    var k = this.k = (x>width/2)?defDir:-defDir
    this.equation = (x)=>{
      return parseInt(k*(x-position.x)+y)
    }
  }

  findPosition(){
    var width = this.imgData.width
    var height = this.imgData.height
    var startx = 0
    var endx = width / 2
    if (this.k < 0) {
      startx  = width / 2
      endx = width
    }

    var startY = height / 2.5
    startY = parseInt(startY)
    let index = startY * width
    var img = this.imgData.data
    var std = {r:img[index*4],g:img[index*4+1],b:img[index*4+2]}
    var findx = []
    for (var i = startY; i < height; i++) {
      for (var j = startx; j < endx; j++) {
        let index = i * width + j
        let cur = {r:img[index*4],g:img[index*4+1],b:img[index*4+2]}
        let diff = this.diffColor(std, cur)
        if (diff > Control.bgValue) {
          findx.push(j)
        }
      }
      if (findx.length>0) {
        break
      }
    }
    // console.log(findx);
    var centerX = (findx[0]+findx.pop())/2 * Control.power0
    return {
      x:centerX,
      y:this.equation(centerX)
    }

  }

  diffColor(c1, c2){
    return (c1.r - c2.r) * (c1.r - c2.r) +
    (c1.g - c2.g) * (c1.g - c2.g) +
    (c1.b - c2.b) * (c1.b - c2.b);
  }

}
