const section = document.querySelector('#main_section');
const startBg = document.querySelector('#bg');
const startBtn = startBg.querySelector('.start');
const resetBtn = document.querySelector('#reset');
const explainBtn = document.querySelector('.explainBtn');
const explain = document.querySelector('.explain');
const h1 = document.querySelector('#main_h1');
const purpose = document.querySelector('#purpose');
const inGameHeader = document.querySelector('#inGame');
const skill1 = document.querySelector('.skill1');
const coolBg = document.querySelector('.coolBg');
const clearBg = document.querySelector('#clearBg');
const clearImg = clearBg.querySelector('img');
const clearP = clearBg.querySelector('p');
const boostBg = document.querySelector('.boostBg');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const makeSpan = () => {
  const span = document.createElement('span');
  skill1.appendChild(span);
};

canvas.width = 910;
canvas.height = 607;
section.appendChild(canvas);

let bgImg,
  batImg,
  wavesImg,
  wideAreaImg,
  hawkImg,
  sec_hawkImg,
  hawkAttImg,
  orangeImg,
  gameOverImg,
  resetImg,
  lifeImg,
  clearBatImg;
let batX = 0;
let batY = canvas.height / 2 - 24;
let score = 0;
let wavesToggle = true;
let wideNum = 2;
let boostToggle = false;
let coolToggle = false;
let lifeToggle = true;
let explainToggle = false;
let lifeNum = 2;
const lifeDown = () => {
  lifeToggle = false;
  lifeNum--;
  setTimeout(() => {
    lifeToggle = true;
  }, 2000);
};

const loadImg = () => {
  bgImg = new Image();
  bgImg.src = 'img/caveBg.jpg';
  batImg = new Image();
  batImg.src = 'img/bat.png';
  batDarkImg = new Image();
  batDarkImg.src = 'img/bat_dark.png';
  batOpacityImg = new Image();
  batOpacityImg.src = 'img/bat_opacity.png';
  wavesImg = new Image();
  wavesImg.src = 'img/waves.png';
  wideAreaImg = new Image();
  wideAreaImg.src = 'img/wideArea.png';
  hawkImg = new Image();
  hawkImg.src = 'img/hawk.png';
  sec_hawkImg = new Image();
  sec_hawkImg.src = 'img/hawk2.png';
  hawkAttImg = new Image();
  hawkAttImg.src = 'img/hawkAtt.png';
  gameOverImg = new Image();
  gameOverImg.src = 'img/gameOver.png';
  resetImg = new Image();
  resetImg.src = 'img/reset.png';
  orangeImg = new Image();
  orangeImg.src = 'img/orange.png';
  lifeImg = new Image();
  lifeImg.src = 'img/life.png';
  clearBatImg = new Image();
  clearBatImg.src = 'img/clear_bat.png';
};
let keysDown = [];
let wavesArry = [];
let wideArry = [];
let skill1Arry = [];
let hawkArry = [];
let secHawkArry = [];
let hawkAttArry = [];
let fruitsArry = [];
let lifeArry = [20, 60];
function waves() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = batX + 30;
    this.y = batY;
    this.reach = false;
    this.cancle = false;
    wavesArry.push(this);
  };
  this.init2 = function () {
    this.x = 0;
    this.y = batY;
    this.allReach = false;
    wideArry.push(this);
  };
  this.update = function () {
    this.x += 7;
  };
  this.kill = function () {
    for (i = 0; i < hawkArry.length; i++) {
      if (
        this.x + 40 > hawkArry[i].x &&
        this.x < hawkArry[i].x + 44 &&
        this.y + 20 > hawkArry[i].y &&
        this.y < hawkArry[i].y + 44
      ) {
        score += 10;
        this.reach = true;
        hawkArry.splice(i, 1);
      }
    }
    for (i = 0; i < secHawkArry.length; i++) {
      if (
        this.x + 40 > secHawkArry[i].x &&
        this.x < secHawkArry[i].x + 44 &&
        this.y + 20 > secHawkArry[i].y &&
        this.y < secHawkArry[i].y + 44
      ) {
        this.cancle = true;
      }
    }
  };
  this.allKill = function () {
    for (i = 0; i < hawkArry.length; i++) {
      if (
        this.x + 578 > hawkArry[i].x &&
        this.x < hawkArry[i].x + 44 &&
        this.y + 292 > hawkArry[i].y &&
        this.y - 100 < hawkArry[i].y + 44
      ) {
        score += 10;
        this.allReach = true;
        hawkArry.splice(i, 1);
      }
    }
    for (i = 0; i < secHawkArry.length; i++) {
      if (
        this.x + 578 > secHawkArry[i].x &&
        this.x < secHawkArry[i].x + 44 &&
        this.y + 292 > secHawkArry[i].y &&
        this.y - 100 < secHawkArry[i].y + 44
      ) {
        score += 10;
        this.allReach = true;
        secHawkArry.splice(i, 1);
      }
    }
    for (i = 0; i < hawkAttArry.length; i++) {
      if (
        this.x + 578 > hawkAttArry[i].x &&
        this.x < hawkAttArry[i].x + 45 &&
        this.y + 292 > hawkAttArry[i].y &&
        this.y - 100 < hawkAttArry[i].y + 45
      ) {
        score += 10;
        this.allReach = true;
        hawkAttArry.splice(i, 1);
      }
    }
  };
}
const randomValue = (min, max) => {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
};
const secRandomValue = (min, max) => {
  let secRandomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return secRandomNum;
};
const fruitsRandomValue = (min, max) => {
  let fruitRandomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return fruitRandomNum;
};
function hawks() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = canvas.width;
    this.y = randomValue(0, canvas.height - 64);
    hawkArry.push(this);
  };
  this.init2 = function () {
    this.x = canvas.width;
    this.y = secRandomValue(0, canvas.height - 64);
    secHawkArry.push(this);
  };
  this.update = function () {
    this.x -= 2;
    if (
      this.x + 44 > batX &&
      this.x < batX + 40 &&
      this.y + 44 > batY &&
      this.y < batY + 40 &&
      lifeToggle
    ) {
      lifeDown();
    }
  };
}
function hawkAtt() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    for (i = 0; i < secHawkArry.length; i++) {
      this.x = secHawkArry[i].x;
      this.y = secHawkArry[i].y + 32;
    }
    hawkAttArry.push(this);
  };
  this.update = function () {
    this.x -= 7;
    if (
      this.x + 40 > batX &&
      this.x < batX + 40 &&
      this.y + 40 > batY &&
      this.y < batY + 40 &&
      lifeToggle
    ) {
      lifeDown();
    }
  };
}
function fruits() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = canvas.width;
    this.y = fruitsRandomValue(0, canvas.height - 45);
    this.getToggle = false;
    fruitsArry.push(this);
  };
  this.update = function () {
    this.x -= 2;
  };
  this.getFruit = function () {
    for (i = 0; i < fruitsArry.length; i++) {
      if (
        fruitsArry[i].x + 45 > batX &&
        fruitsArry[i].x < batX + 40 &&
        fruitsArry[i].y + 45 > batY &&
        fruitsArry[i].y < batY + 40
      ) {
        if (wideNum < 3) {
          wideNum++;
          makeSpan();
        }
        if (!fruitsArry[i].getToggle) {
          fruitsArry[i].getToggle = true;
          fruitsArry.splice(i, 1);
        }
      }
    }
  };
}
const setKey = () => {
  window.addEventListener('keydown', (e) => {
    keysDown[e.key] = true;
    if (e.key == ' ') {
      if (wavesToggle == true) {
        createWaves();
        wavesToggle = false;
      }
    }
    if (e.key == 'z') {
      if (wideNum > 0) {
        skill1.removeChild(skill1.lastElementChild);
        wideNum--;
        createWide();
      }
      if (wideNum == 3) {
        wideNum = 2;
      }
    }
    if (e.key == 'x' && !boostToggle && !coolToggle) {
      boostToggle = true;
      coolToggle = true;
    }
  });
  window.addEventListener('keyup', (e) => {
    delete keysDown[e.key];
    if (e.key == ' ') {
      wavesToggle = true;
    }
    if (e.key == 'x' && boostToggle) {
      boostToggle = false;
      coolBg.style.display = 'block';
      setTimeout(() => {
        coolBg.style.display = 'none';
        coolToggle = false;
      }, 5000);
    }
  });
};
const createWaves = () => {
  const wave = new waves();
  wave.init();
};
const createWide = () => {
  const wide = new waves();
  wide.init2();
};
const createHawk = () => {
  const interval = setInterval(() => {
    const hawk = new hawks();
    hawk.init();
  }, 500);
};
const createSecHawk = () => {
  const interval = setInterval(() => {
    const secHawk = new hawks();
    secHawk.init2();
  }, 4000);
};
const createHawkAtt = () => {
  setTimeout(() => {
    const interval = setInterval(() => {
      const att = new hawkAtt();
      att.init();
    }, 800);
  }, 3200);
};
const createFruits = () => {
  const interval = setInterval(() => {
    const fruit = new fruits();
    fruit.init();
  }, 10000);
};
const move = (e) => {
  if ('ArrowRight' in keysDown) {
    if (boostToggle) {
      batX += 8;
    } else {
      batX += 5;
    }
  }
  if ('ArrowLeft' in keysDown) {
    if (boostToggle) {
      batX -= 8;
    } else {
      batX -= 5;
    }
  }
  if ('ArrowUp' in keysDown) {
    if (boostToggle) {
      batY -= 8;
    } else {
      batY -= 5;
    }
  }
  if ('ArrowDown' in keysDown) {
    if (boostToggle) {
      batY += 8;
    } else {
      batY += 5;
    }
  }
  if (batX <= 0) {
    batX = 0;
  }
  if (batX >= canvas.width - 60) {
    batX = canvas.width - 60;
  }
  if (batY <= 0) {
    batY = 0;
  }
  if (batY >= canvas.height - 60) {
    batY = canvas.height - 60;
  }
  for (let i = 0; i < wavesArry.length; i++) {
    if (!wavesArry[i].reach && !wavesArry[i].cancle && wavesArry[i].x < canvas.width - 40) {
      wavesArry[i].update();
      wavesArry[i].kill();
    }
  }
  for (let i = 0; i < wideArry.length; i++) {
    if (!wideArry[i].allReach || wideArry[i].x < canvas.width) {
      wideArry[i].update();
      wideArry[i].allKill();
    }
  }
  for (let i = 0; i < hawkArry.length; i++) {
    if (hawkArry[i].x > 0) {
      hawkArry[i].update();
    }
  }
  for (let i = 0; i < secHawkArry.length; i++) {
    if (secHawkArry[i].x > 0) {
      secHawkArry[i].update();
    }
  }
  for (let i = 0; i < hawkAttArry.length; i++) {
    if (hawkAttArry[i].x > 0) {
      hawkAttArry[i].update();
    } else hawkAttArry.splice(i, 1);
  }
  for (let i = 0; i < fruitsArry.length; i++) {
    if (!fruitsArry[i].getToggle && fruitsArry[i].x > 0) {
      fruitsArry[i].update();
      fruitsArry[i].getFruit();
    }
  }
};

const render = () => {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  if (boostToggle && lifeToggle) {
    ctx.drawImage(batDarkImg, batX, batY, 60, 60);
  } else if (!lifeToggle) {
    ctx.drawImage(batOpacityImg, batX, batY, 60, 60);
  } else {
    ctx.drawImage(batImg, batX, batY, 60, 60);
  }
  ctx.fillText(`SCORE : ${score} / 5,000`, 20, 40);
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  for (let i = 0; i < wavesArry.length; i++) {
    if (!wavesArry[i].reach && !wavesArry[i].cancle && wavesArry[i].x < canvas.width - 40) {
      ctx.drawImage(wavesImg, wavesArry[i].x, wavesArry[i].y);
    }
  }
  for (let i = 0; i < wideArry.length; i++) {
    if (wideArry[i].x < canvas.width) {
      ctx.drawImage(wideAreaImg, wideArry[i].x, wideArry[i].y);
    }
  }
  for (let i = 0; i < hawkArry.length; i++) {
    if (hawkArry[i].x > 0) {
      ctx.drawImage(hawkImg, hawkArry[i].x, hawkArry[i].y);
    }
  }
  for (let i = 0; i < secHawkArry.length; i++) {
    if (secHawkArry[i].x > 0) {
      ctx.drawImage(sec_hawkImg, secHawkArry[i].x, secHawkArry[i].y);
    }
  }
  for (let i = 0; i < hawkAttArry.length; i++) {
    if (hawkAttArry[i].x > 0) {
      ctx.drawImage(hawkAttImg, hawkAttArry[i].x, hawkAttArry[i].y);
    }
  }
  for (let i = 0; i < fruitsArry.length; i++) {
    if (!fruitsArry[i].getToggle && fruitsArry[i].x > 0) {
      ctx.drawImage(orangeImg, fruitsArry[i].x, fruitsArry[i].y);
    }
  }
  for (let i = 0; i < lifeArry.length; i++) {
    if (lifeNum > 1) {
      ctx.drawImage(lifeImg, lifeArry[i], 50);
    } else if (lifeNum > 0) {
      ctx.drawImage(lifeImg, lifeArry[0], 50);
    }
  }
};
let typing;
const main = () => {
  if (lifeNum > 0 && score < 5000) {
    move();
    render();
    requestAnimationFrame(main);
  } else {
    if (lifeNum <= 0) {
      ctx.drawImage(gameOverImg, canvas.width / 2 - 285, canvas.height / 2 - 81);
    }
    if (score >= 5000) {
      clearBg.style.display = 'block';
      clearImg.style.display = 'block';
      inGameHeader.style.opacity = '0.5';
      typing = setInterval(gameClear, 200);
    }
    resetBtn.style.display = 'block';
  }
};

const clearText = 'GAME CLEAR';
let newText = clearText.split('');
let index = 0;
const gameClear = () => {
  if (index < newText.length) {
    const letter = newText[index];
    const span = document.createElement('span');
    span.textContent = letter;
    clearP.append(span);
    index++;
  } else {
    clearInterval(typing);
  }
};
resetBtn.addEventListener('click', () => {
  window.location.reload();
});
startBtn.addEventListener('click', () => {
  startBg.style.display = 'none';
  canvas.style.display = 'block';
  h1.style.display = 'none';
  explainBtn.style.display = 'none';
  inGameHeader.style.display = 'flex';
  purpose.style.display = 'block';
  lifeNum = 2;
  loadImg();
  setKey();
  createHawk();
  createSecHawk();
  createHawkAtt();
  createFruits();
  main();
});
explainBtn.addEventListener('click', () => {
  explainToggle = !explainToggle;
  if (!explainToggle) {
    explain.style.display = 'none';
  } else {
    explain.style.display = 'block';
  }
});
