//粒子数据类型
class Particle {
  //属性
  PVector loc, targtLoc, pixLoc, speed;
  color col;
  float rad;
  float maxVel = 1.6;
  int index;

  //构造函数
  Particle(PVector _loc, PVector _speed, PVector _acc, 
    PVector _tLoc, PVector _pixLoc) {
    loc = _loc;
    speed = _speed;

    targtLoc = _tLoc;
    pixLoc = _pixLoc;
  }

  Particle() {
    loc = new PVector(random(width), random(height));

    speed = new PVector(cos(rad), sin(rad));//direction
    targtLoc = new PVector(0, 0);
    pixLoc = new PVector(0, 0);
  }
  void update() {
    move();
    checkEdges();
  }

  void toPix() {
    targtLoc.lerp(pixLoc, 0.01);
  }


  void move() {
    if (loc.dist(targtLoc)<1) {
      loc = targtLoc.copy();
    } else {
      loc.lerp(targtLoc, 0.1);
    }
  }

  void flow() {
    //时间和xy坐标为参数，生成噪声影响角度
    float deg = 360.0*noise(
      loc.x/666.0, 
      loc.y/666.0, 
      millis()/100000.0);

    float noiseStrength = 106.3;
    //角度转弧度，加持噪声强度
    rad=radians(deg*noiseStrength);
    //弧度的余弦值和正弦值用在速度上
    speed.set(sin(rad), cos(rad));

    //限制最大速度
    if (speed.magSq()>(maxVel)) {
      speed.normalize();
      speed.mult(maxVel);
    }

    //爱的魔力减速圈
    //在鼠标为圆心，半径100的圈圈内，就减速
    float d = dist(mouseX, mouseY, loc.x, loc.y);
    if (mousePressed&&d<100) {
      speed.mult(0.15);
    }

    //目标位置加上速度
    targtLoc.add(speed);
  }



  //超出窗口就随机一个窗口内位置
  void checkEdges() {
    if (loc.x<0 || loc.x>width || loc.y<0 || loc.y>height) {    
      loc.x = random(width);
      loc.y = random(height);
      targtLoc = loc.copy();
    }
  }
  //渲染
  void render() {
    fill(col, 100);
    ellipse(loc.x, loc.y, 6, 6);
  }
}
