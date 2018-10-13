//自调用函数，蛇
(function () {
  var elements = [];
  //蛇的构造函数
  function Snake (width, height, direction, speed, score) {
    //蛇每个部分的宽高
    this.width = width || 20;
    this.height = height || 20;
    //蛇的身体
    this.body = [
      { x: 3, y: 2, color: "red" ,zIndex:1000, borderRadius:"50%"},
      { x: 2, y: 2, color: "orange" ,zIndex:0},
      { x: 1, y: 2, color: "orange" ,zIndex:0}
    ];
    //方向
    this.direction = direction || "right";
    //移动速度
    this.speed = speed || 100;
    this.score = score || 0;
  }

  //蛇初始化
  Snake.prototype.init = function (map) {
    this.remove();
    //循环遍历创建div
    for (var i = 0; i < this.body.length; i++) {
      //每个数组都是一个对象
      var obj = this.body[i];
      //创建div
      var div = document.createElement("div");
      //添加到map中
      map.appendChild(div);
      //设置div样式
      div.style.position = "absolute";
      div.style.width = this.width + "px";
      div.style.height = this.height + "px";
      div.style.left = obj.x * this.width + "px";
      div.style.top = obj.y * this.height + "px";
      div.style.backgroundColor = obj.color;
      div.style.zIndex = obj.zIndex;
      div.style.borderRadius = obj.borderRadius;
      //方向

      //放到数组中，目的为了删除
      elements.push(div);
    }
  };
  //移动蛇
  Snake.prototype.move = function (food, map) {
    //改变身体的坐标位置
    var i = this.body.length - 1;
    for (; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    //判断方向，改变蛇头的位置
    switch (this.direction) {
      case "right":
        this.body[0].x += 1;
        break;
      case "left":
        this.body[0].x -= 1;
        break;
      case "top":
        this.body[0].y -= 1;
        break;
      case "bottom":
        this.body[0].y += 1;
        break;
    }
    //判断吃没吃食物
    //蛇头和食物的坐标应该一致
    var headX = this.body[0].x * this.width;
    var headY = this.body[0].y * this.height;
    //判断是否相同
    if (headX == food.x && headY == food.y) {
      var last = this.body[this.body.length - 1];
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      });
      //重新加载食物
      food.init(map);
      //分数
      score = parseInt(this.body.length - 3);
      document.getElementById("q").innerHTML = "分数：" + score;
    }

  };
  //删除
  Snake.prototype.remove = function () {
    var i = elements.length - 1;
    for (; i >= 0; i--) {
      var ele = elements[i];
      ele.parentNode.removeChild(ele);
      elements.splice(i, 1);
    }
  };

  window.Snake = Snake;
}());