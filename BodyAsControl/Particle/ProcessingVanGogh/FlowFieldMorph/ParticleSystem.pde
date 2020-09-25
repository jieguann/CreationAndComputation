class ParticleSystem {
  ArrayList<Particle> particles = new ArrayList<Particle>();
  ArrayList<Particle> caches = new ArrayList<Particle>();
  PImage cacheImg;
  ParticleSystem() {
  }

  //创建方法
  void morph(PImage img) {
    //如果目标图片和当前图片不符
    if (cacheImg!=img) {
      reSetCach(img);
      println("particles size "+particles.size()+ " caches size " +caches.size());

      if (particles.size()>caches.size()) {
        //println(particles.size()+ " > " +caches.size());
        while (particles.size()!=caches.size()) {
          for (int i  = caches.size(); i<particles.size(); i++) {
            particles.remove(i);
          }
        }
        println("particles size "+particles.size());
        for (int i  = 0; i<caches.size(); i++) {
          //PVector也有指针，切记要copy
          particles.get(i).targtLoc = caches.get(i).targtLoc.copy();
          particles.get(i).pixLoc = caches.get(i).pixLoc.copy();
          particles.get(i).col = caches.get(i).col;
        }
      } else {
        for (int i  = particles.size(); i<caches.size(); i++) {
          caches.get(i).loc = particles.get((int)random(particles.size())).loc.copy();
        }
        for (int i  = 0; i<particles.size(); i++) {
          caches.get(i).loc = particles.get(i).loc.copy();
        }
        particles.clear();
        particles = (ArrayList<Particle>)caches.clone();
      }
    }
  }

  void initial(PImage img) {
    reSetCach(img);
    particles.clear();
    particles = (ArrayList<Particle>)caches.clone();
    println("particle size "+particles.size());
  }

  void reSetCach(PImage img) {
    cacheImg = img;
    caches.clear();
    //println("caches Clear");
    //迭代生成所有粒子
    for (int i=0; i<img.width; i=i+3) {
      for (int j=0; j<img.height; j=j+3) {
        if (alpha(img.get(i, j))>0) {
          //PVector loc = new PVector(random(width), random(height));
          PVector loc = new PVector(i, j);
          PVector targetLoc = new PVector(i, j);
          PVector pixtLoc = new PVector(i, j);
          float rad = random(TWO_PI);
          PVector speed = new PVector(random(0, 50), random(0, 50));
          PVector acc = new PVector(cos(rad), sin(rad));

          Particle p = new Particle(loc, speed, acc, targetLoc, pixtLoc);
          p.col = img.get(i, j);
          //p.maxVel = random(15, 50);
          //p.maxVel = 50;
          caches.add(p);
        }
      }
    }
    for (int i = 0; i<caches.size(); i++) {
      caches.get(i).index = i;
    }
  }

  void render() {
    for (int i  = 0; i<particles.size(); i++) {
      particles.get(i).render();
    }
  }

  void update() {
    for (int i  = 0; i<particles.size(); i++) {
      particles.get(i).update();
    }
  }

  void toPix() {
    for (int i  = 0; i<particles.size(); i++) {
      particles.get(i).toPix();
    }
  }
  void flow() {
    for (int i  = 0; i<particles.size(); i++) {
      particles.get(i).flow();
    }
  }
}
