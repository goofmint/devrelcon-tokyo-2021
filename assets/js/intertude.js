document.addEventListener('DOMContentLoaded', async (e) => {
  const board = document.querySelector("#social");
  const ctx = board.getContext("2d");
  const bg = new Image();
  bg.src = "/assets/img/backgrounds/intertude.jpg";

  await loadImage(bg);
  ctx.drawImage(bg, 0, 0);
  
  const id = url('?id');
  const person = new Image();
  person.src = `/assets/img/speakers/${id}.jpg`;
  await loadImage(person);
  ctx.save();
  const width = 1200;
  const height = 630;
  ctx.beginPath();
  const size = 400;
  ctx.scale(1, 1);
  const circle = size/2;
  ctx.arc(960, 1080/2, 193, 0, Math.PI*2, false);
  ctx.clip();
  ctx.drawImage(person, 0, 0, size, size, 760, 340, size, size);
  ctx.closePath();
  /*
  ctx.restore();
  ctx.beginPath();
  ctx.fillStyle = "rgb(100,100,102)";
  ctx.fillRect(319, 460, 563, 77);
  ctx.closePath();
  */
 ctx.restore();
 ctx.font = "50px Arial";
  ctx.fillStyle = "rgb(255,255,255)";
  const text = url('?name');
  const textWidth = ctx.measureText( text ).width;
  ctx.fillText(text, 1920 / 2 - textWidth / 2, 800);

  ctx.font = "35px Arial";
  ctx.fillStyle = "rgb(255,255,255)";
  const companyText = url('?title');
  const companyTextWidth = ctx.measureText( companyText ).width;
  ctx.fillText(companyText, 1920/2 - (companyTextWidth / 2), 870);

  // UTC
  ctx.font = "50px Arial";
  ctx.fillStyle = "rgb(255,255,255)";
  const time = url('?time');
  for (const t of [{add: 0, pos: 330}, {add: 9, pos: 595}, {add: -7, pos: 875}, {add: -4, pos: 1170}, {add: 1, pos: 1460}, {add: 5.5, pos: 1720}]) {
    const d = new Date(`2021-06-05 ${time}`);
    if (t.add === 5.5) {
      d.setHours(d.getHours() + 5);
      d.setMinutes(d.getMinutes() + 30);
    } else {
      d.setHours(d.getHours() + t.add);
    }
    ctx.fillText(dayjs(d).format('HH:mm'), t.pos, 1037);
  }

  const t = url('?track');
  if (t) {
    const track = new Image();
    track.src = `/assets/img/backgrounds/${t}.png`;
    await loadImage(track);
    ctx.drawImage(track, 0, 0, 200, 200, 1660, 88, 200, 200);
  }

  const link = document.createElement("a");
  link.href = board.toDataURL("image/jpeg");
  link.download = `${id}.jpg`;
  link.click();
});

async function loadImage(image) {
  return new Promise((res, rej) => {
    image.onload = res;
  })
}
