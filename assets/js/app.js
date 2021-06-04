const applicationKey = 'b27f90a0af9b304cd7376c903599065afddeeaf57ff716e977495358c36db92d';
const clientKey = '25d74196e6468eb36d190f95423f939ad12e59ea0ab7c8e9259477bdeefb64cd'
const ncmb = new NCMB(applicationKey, clientKey);

$(window).scroll(function() {
  if (document.location.pathname === '/') {
    if ($(document).scrollTop() > 150) {
      $('.navbar').addClass('navbar-white');
    } else {
      $('.navbar').removeClass('navbar-white');
    }
  }
});

const strWidth = (str) => {
  const e = $("#ruler");
  if (!e.text(str).get(0)) {
    return 0;
  }
  const width = e.text(str).get(0).offsetWidth;
  e.empty();
  return width;
}

$(function () {
  $('a.scrollnav[href^="#"],.ticket').click(function(event) {
    var id = $(this).attr("href");
    var offset = 60;
    var target = $(id).offset().top - offset;
    $('html, body').animate({scrollTop:target}, 500);
    event.preventDefault();
  });

  $('.navbar-nav>li>a').on('click', function(){
    if ($('.navbar-collapse').collapse) {
      $('.navbar-collapse').collapse('hide');
    }
  });
  
  $('.lang.ja').hide();
  const lang = url('?lang') || navigator.language || navigator.userLanguage;
  if (lang.indexOf('ja') > -1) {
    $('.lang.en').hide();
    $('.lang.ja').show();
    changeTitle('ja');
  }
  
  const num = lang == 'ja' ? -0.05 : 0.1;
  changeStyle('.photo-credit', lang, num);
  changeStyle('.speaker-details h3', lang, 0.1);
  
  $('.change-lang').on('click', function(e) {
    changeLang($(e.target).data('lang'));
    changeTitle($(e.target).data('lang'));
    changeStyle('.photo-credit', lang, num);
    changeStyle('.speaker-details h3', lang, 0.1);
    return false;
  });


  $('.register-form').hide();

  $('#register').on('submit', async (e) => {
    e.preventDefault();
    $('.register-form').hide();
    const params = serializeForm(e.target);
    const participate = new (ncmb.DataStore('Participate'));
    for (const key in params) {
      participate.set(key, params[key]);
    }
    const acl = new ncmb.Acl;
    acl
      .setRoleReadAccess('admin', true)
      .setRoleWriteAccess('admin', true);
    participate
      .set('acl', acl)
      .set('imported', false);
    try {
      await participate.save();
      $('.register-success').show();
    } catch (e) {
      $('.register-danger').show();
    }
  });

  if (document.querySelector('#swag')) {
    ncmb.User.loginAsAnonymous();
    $('#swag').on('submit', async (e) => {
      e.preventDefault();
      $('.register-form').hide();
      const params = serializeForm(e.target);
      const Code = ncmb.DataStore('Code');
      const code = await Code
        .equalTo('microsoft', params.microsoft)
        .equalTo('hatena', params.hatena)
        .equalTo('orbit', params.orbit)
        .equalTo('zoom', params.zoom)
        .fetch();
      if (!code.objectId) {
        alert('Your code is wrong. Please check it and send again');
        return;
      }
      const swag = new (ncmb.DataStore('Swag'));
      for (const key in params) {
        swag.set(key, params[key]);
      }
      swag
        .set('prize', false);
      try {
        await swag.save();
        $('.register-success').show();
        e.target.reset();
      } catch (e) {
        console.log(e);
        $('.register-danger').show();
      }
    });
  }
  if (document.querySelector('#entry')) {
    (async () => {
      const objectId = url('?id');
      const sessionToken = url('?s');
      if (!objectId || !sessionToken) {
        alert("You can't access here without secret code");
        location.href = '/';
        return;
      }
      ncmb.sessionToken = sessionToken;
      const Register = ncmb.DataStore('Register');
      let register;
      try {
        register = await Register.equalTo('objectId', objectId).fetch();
        if (!register.objectId) {
          alert('Your code is invalid or expired!');
          return;
        }
      } catch (e) {
        alert('Your code is invalid or expired!');
        location.href = '/';
        return;
      }

      $('#entry').on('submit', async (e) => {
        e.preventDefault();
        $('.register-form').hide();
        const params = serializeForm(e.target);
        const entry = new (ncmb.DataStore('Entry'));
        for (const key in params) {
          entry.set(key, params[key]);
        }
        const acl = new ncmb.Acl;
        acl
          .setRoleReadAccess('admin', true)
          .setRoleWriteAccess('admin', true);
        entry
          .set('acl', acl)
          .set('imported', false);
        try {
          await entry.save();
          await register.delete();
          $('.register-success').show();
        } catch (e) {
          console.log(e);
          $('.register-danger').show();
        }
      });
    })();
  }
  dayjs.extend(dayjsPluginUTC.default)

  $.each($('.time'), (index, dom) => {
    const str = $(dom).data('time');
    const date = new Date(`${str} +00:00`);
    $(dom).html(dayjs(date).format('HH:mm'));
  });
  const tzInts = moment.tz.names();;
  const dropdown = $('#timezone');
  let changed = false;
  for (const timezone of tzInts) {
    if (!changed) {
      const selected = moment.tz.guess() === timezone;
      dropdown.append(`<option value="${timezone}"} ${selected ? 'selected' : ''}>${timezone}</option>`);
      if (selected) changed = true;
    } else {
      dropdown.append(`<option value="${timezone}"}>${timezone}</option>`);
    }
    $('.selectpicker').select2();;
  }
  dropdown.on('change', e => {
    const offset = e.target.value;
    $.each($('.time'), (index, dom) => {
      const str = $(dom).data('time');
      const date = new Date(`${str} +00:00`);
      $(dom).html(moment.tz(date, offset).format('HH:mm'));
    });
  });
});

const serializeForm = (form) => {
  const f = new URLSearchParams(new FormData(form));
  const params = {};
  for (const values of f) {
    params[values[0]] = values[1];
  }
  return params;
}

function changeLang(lang) {
  if (lang === 'ja') {
    $('.lang.en').hide();
    $('.lang.ja').show();
  } else {
    $('.lang.ja').hide();
    $('.lang.en').show();
    changeTitle(lang)
  }
  return false;
}
function changeTitle(lang) {
  if (lang === 'ja') {
    var title = 'DevRelCon Tokyo 2021 – DevRel、開発者マーケティング、DX、APIに関するマーケティング';
    var description = 'DevRelCon Tokyoはテクニカルエバンジェリスト、デベロッパーアドボケイトそしてDevRelとDXに関係する全ての方向けのワンデーカンファレンスです';
  } else {
    var title = 'DevRelCon Tokyo 2021 – conference for developer relations, developer marketing, developer experience, APIs';
    var description = 'DevRelCon Tokyo is a one day conference for technical evangelists, developer advocates and anyone interested in developer relations and developer experience';
  }
  if (document.location.pathname === '/') {
    $('title').text(title);
    $('meta[name="description"]').attr('content', description);
  }
}


const changeStyle = (ele, lang, num) => {
  if (document.location.pathname !== '/') {
    return;
  }
  const patterns = {};
  let fontSize = 0;
  document.querySelectorAll(ele).forEach(d => {
    if (!patterns[d.clientHeight]) patterns[d.clientHeight] = 0;
    patterns[d.clientHeight]++;
    fontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('font-size'));
  });
  let maxSize = 0;
  let cssHeight = 0;
  for (let key in patterns) {
    if (patterns[key] > maxSize) {
      cssHeight = parseInt(key);
      maxSize = patterns[key];
    }
  }
  document.querySelectorAll(ele).forEach(d => {
    return;
    if (!$(d).is(':visible')) return;
    const text = $(d).find(`.${lang}`).text().trim();
    if (d.clientHeight > cssHeight) {
      const rate =  d.clientWidth / strWidth(text) + num;
      d.style.fontSize = (fontSize * rate) + 'px';
      d.style.height = cssHeight + 'px';
    }
    if (d.clientHeight < cssHeight) {
      d.style.fontSize = fontSize + 'px';
      d.style.height = cssHeight + 'px';
    }
  });
}
