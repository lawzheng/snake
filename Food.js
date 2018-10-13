//自调用函数，食物
(function () {
  var elements = [];//用来保存每个食物
  //食物有宽高，颜色，横纵坐标
  function Food (x, y, color, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.color = color || "green";
    this.width = width || 20;
    this.height = height || 20;
  }

  //食物初始化，要用到map
  Food.prototype.init = function (map) {
    //删除前面所有的食物
    this.remove();
    //创建div
    var div = document.createElement("div");
    //加到map中
    map.appendChild(div);
    //设置div样式
    div.style.backgroundColor = this.color;
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    //设置横纵坐标
    //脱离文档流
    div.style.position = "absolute";
    //产生随机横纵坐标
    this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
    this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
    div.style.left = this.x + "px";
    div.style.top = this.y + "px";
    //把div加到elements中
    elements.push(div);
  };
  //私有函数，删除食物
  Food.prototype.remove=function() {
    for (var i = 0; i < elements.length; i++) {
      var ele = elements[i];
      //把地图中的食物删除
      ele.parentNode.removeChild(ele);
      //把数组中的食物删除
      elements.splice(i, 1);
    }
  };

  window.Food = Food;
}());