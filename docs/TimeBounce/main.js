title = "Slide Under";

description = `
[Tap] or [Space] Slow Down
`;

characters = [
  `
  ll
 l  l
l ll l
  `
];

options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 1,
  theme: "pixel",
  isShowingScore: true 
};

let player;
let boxes;
let speedMultiplier;
let score;

function update() {
  if (!ticks) {
    player = {
      pos: vec(10, 90),
      width: 3,
      speed: 0.9,
    };
    boxes = [];
    speedMultiplier = 1;
    score = 0;
  }

  score++;
  addScore(score)

  player.pos.x += player.speed;


  // player hits the edge
  if (player.pos.x < 0 || player.pos.x > 100 - player.width) {
    player.speed *= -1;
  }

  // slow time when button pressed
  if (input.isPressed) {
    speedMultiplier = 0.2;
  } else {
    speedMultiplier = 1;
  }


  color("black");
  char("a", player.pos);

  if (ticks % 60 === 0) {
    const posX = rnd(0, 100);
    const size = rnd(5, 10);
    boxes.push({ pos: vec(posX, 0), width: size });
  }


  remove(boxes, (b) => {
    b.pos.y += speedMultiplier;
    color("red");
    const isColliding = box(b.pos, b.width, 5).isColliding.char.a;
    if (isColliding) {
      play("explosion");
      end();
    }
    return b.pos.y > 99;
  });

}
