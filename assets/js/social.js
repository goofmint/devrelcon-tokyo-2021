document.addEventListener('DOMContentLoaded', async (e) => {
  const board = document.querySelector("#social");
  const ctx = board.getContext("2d");
  const bg = new Image();
  bg.src = "/assets/img/social/base.jpg";

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
  const size = 368;
  ctx.scale(1, 1);
  const circle = size/2;
  ctx.arc(322, 213, circle, 0, Math.PI*2, false);
  ctx.clip();
  ctx.drawImage(person, 0, 0, size, size, 139, 31, size, size);
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
  ctx.fillText(text, 322 - textWidth / 2, 490);

  ctx.font = "35px Arial";
  ctx.fillStyle = "rgb(255,255,255)";
  const companyText = url('?company');
  const companyTextWidth = ctx.measureText( companyText ).width;
  ctx.fillText(companyText, 322 - (companyTextWidth / 2), 560);

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
