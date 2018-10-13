//自调用函数，游戏对象
(function () {
  var that = null;
  //构造游戏函数
  function Game (map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
  }

  //游戏函数初始化
  Game.prototype.init = function () {
    //食物初始化
    this.food.init(this.map);
    //蛇初始化
    this.snake.init(this.map);
    //移动初始化
    this.runSnake(this.food, this.map);
    //按键初始化
    this.bindKey();
    //分数初始化
    document.getElementById("q").innerHTML = "分数：" + this.snake.score;
  };
  //自动移动蛇
  Game.prototype.runSnake = function (food, map) {
    //把前面的定时器清掉，不然会出现多个提示框
    clearInterval(Game.timeId);
    var lastDirection = "";
    //自动移动
    Game.timeId = setInterval(function () {
      var flag = true;

      //移动蛇位置
      this.snake.move(food, map);
      //判断是否撞墙
      //最大移动距离
      var maxX = map.offsetWidth / this.snake.width;
      var maxY = map.offsetHeight / this.snake.height;
      //当前位置
      var headX = this.snake.body[0].x;
      var headY = this.snake.body[0].y;
      //判断是否到达
      if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
        clearInterval(Game.timeId);
        alert("事儿总有个头");
        flag = false;
      }
      //判断是否吃到了自己
      for (var j = 4; j < this.snake.body.length; j++) {
        if (this.snake.body[0].x == this.snake.body[j].x && this.snake.body[0].y == this.snake.body[j].y) {
          clearInterval(Game.timeId);
          if(confirm("你想吃掉自己吗,幸好我阻止了你,还开一把吗？")){
            var gm = new Game(document.querySelector(".map"));
            gm.init();
          }else{

          }
          flag = false;
          break;
        }
      }
      if ((lastDirection == "left" && this.snake.direction == "right") || (lastDirection == "right" && this.snake.direction == "left") || (lastDirection == "top" && this.snake.direction == "bottom") || (lastDirection == "bottom" && this.snake.direction == "top")) {
        alert("没有这种骚操作");
        clearInterval(this.timeId);
        var gm = new Game(document.querySelector(".map"));
        gm.init();
        flag = false;
      }
      lastDirection = this.snake.direction;
      if (flag == true) {
        this.snake.init(map);
      }

    }.bind(that), this.snake.speed);//使this能读到snake//可自由控制速度

  };
  //按键控制
  Game.prototype.bindKey = function () {
    document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        //方向键
        //左
        case 37://左
        case 65://A
          this.snake.direction = "left";
          break;
        //上
        case 38://上
        case 87://W
          this.snake.direction = "top";
          break;
        //右
        case 39://右
        case 68://D
          this.snake.direction = "right";
          break;
        //下
        case 40://下
        case 83://S
          this.snake.direction = "bottom";
          break;

        //加减速键
        //加速键
        case 107://右边+
        case 187://左边+
          this.snake.speed -= 20;
          this.runSnake(this.food, this.map);
          break;
        //减速键
        case 109://右边-
        case 189://左边-
          this.snake.speed += 20;
          this.runSnake(this.food, this.map);
          break;
      }
    }.bind(that), false);
  };

  window.Game = Game;
}());