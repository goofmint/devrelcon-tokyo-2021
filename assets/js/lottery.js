$(function() {
  let people;
  $('#start-lottery').on('click', async e => {
    const Attendee = ncmb.DataStore('Swag');
    people = await Attendee.equalTo('prize', false).limit(1000).fetchAll();
    console.log(people);
    try {
      $('.lot').slick('unslick');
    } catch (e) {
    }
    $('.lot').html(people.map(a => `<h2 class="person" data-object-id="${a.get('objectId')}">${a.get('objectId')}</h2>`).join(''));
    $('.lot').slick({
      arrows: false,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      autoplaySpeed: 0,
      speed: 5,
      pauseOnFocus: false,
      pauseOnHover: false,
      useTransform: true,
      vertical: true
    });
  });

  function wait(m) {
    return new Promise(res => {
      setTimeout(res, m);
    });
  }
  $('#select-person').on('click', async e => {
    $('#select-person').attr('disabled', true);
    e.preventDefault();
    $('.prize').html('');
    let lottery = [...people];
    for (const i of [1, 2, 3, 4, 5]) {
      await wait(2000);
      const person = lottery[Math.floor(Math.random() * lottery.length)];
      if (!person) break;
      lottery = lottery.filter(f => f.get('objectId') !== person.get('objectId'));
      $(`.person-${i}`).html(person.get('name'));
      await person.set('prize', true).update();
    }
    $('.lot').slick('slickPause');
  })
});
