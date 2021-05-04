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
  console.log('here')
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

  const tzInts = [
    {"label":"(GMT-12:00) International Date Line West","value":"-12"},
    {"label":"(GMT-11:00) Midway Island, Samoa","value":"-11"},
    {"label":"(GMT-10:00) Hawaii","value":"-10"},
    {"label":"(GMT-09:00) Alaska","value":"-9"},
    {"label":"(GMT-08:00) Pacific Time (US & Canada)","value":"-8"},
    {"label":"(GMT-08:00) Tijuana, Baja California","value":"-8"},
    {"label":"(GMT-07:00) Arizona","value":"-7"},
    {"label":"(GMT-07:00) Chihuahua, La Paz, Mazatlan","value":"-7"},
    {"label":"(GMT-07:00) Mountain Time (US & Canada)","value":"-7"},
    {"label":"(GMT-06:00) Central America","value":"-6"},
    {"label":"(GMT-06:00) Central Time (US & Canada)","value":"-6"},
    {"label":"(GMT-05:00) Bogota, Lima, Quito, Rio Branco","value":"-5"},
    {"label":"(GMT-05:00) Eastern Time (US & Canada)","value":"-5"},
    {"label":"(GMT-05:00) Indiana (East)","value":"-5"},
    {"label":"(GMT-04:00) Atlantic Time (Canada)","value":"-4"},
    {"label":"(GMT-04:00) Caracas, La Paz","value":"-4"},
    {"label":"(GMT-04:00) Manaus","value":"-4"},
    {"label":"(GMT-04:00) Santiago","value":"-4"},
    {"label":"(GMT-03:30) Newfoundland","value":"-3.5"},
    {"label":"(GMT-03:00) Brasilia","value":"-3"},
    {"label":"(GMT-03:00) Buenos Aires, Georgetown","value":"-3"},
    {"label":"(GMT-03:00) Greenland","value":"-3"},
    {"label":"(GMT-03:00) Montevideo","value":"-3"},
    {"label":"(GMT-02:00) Mid-Atlantic","value":"-2"},
    {"label":"(GMT-01:00) Cape Verde Is.","value":"-1"},
    {"label":"(GMT-01:00) Azores","value":"-1"},
    {"label":"(GMT+00:00) Casablanca, Monrovia, Reykjavik","value":"0"},
    {"label":"(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London","value":"0"},
    {"label":"(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna","value":"1"},
    {"label":"(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague","value":"1"},
    {"label":"(GMT+01:00) Brussels, Copenhagen, Madrid, Paris","value":"1"},
    {"label":"(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb","value":"1"},
    {"label":"(GMT+01:00) West Central Africa","value":"1"},
    {"label":"(GMT+02:00) Amman","value":"2"},
    {"label":"(GMT+02:00) Athens, Bucharest, Istanbul","value":"2"},
    {"label":"(GMT+02:00) Beirut","value":"2"},
    {"label":"(GMT+02:00) Cairo","value":"2"},
    {"label":"(GMT+02:00) Harare, Pretoria","value":"2"},
    {"label":"(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius","value":"2"},
    {"label":"(GMT+02:00) Jerusalem","value":"2"},
    {"label":"(GMT+02:00) Minsk","value":"2"},
    {"label":"(GMT+02:00) Windhoek","value":"2"},
    {"label":"(GMT+03:00) Kuwait, Riyadh, Baghdad","value":"3"},
    {"label":"(GMT+03:00) Moscow, St. Petersburg, Volgograd","value":"3"},
    {"label":"(GMT+03:00) Nairobi","value":"3"},
    {"label":"(GMT+03:00) Tbilisi","value":"3"},
    {"label":"(GMT+03:30) Tehran","value":"3.5"},
    {"label":"(GMT+04:00) Abu Dhabi, Muscat","value":"4"},
    {"label":"(GMT+04:00) Baku","value":"4"},
    {"label":"(GMT+04:00) Yerevan","value":"4"},
    {"label":"(GMT+04:30) Kabul","value":"4.5"},
    {"label":"(GMT+05:00) Yekaterinburg","value":"5"},
    {"label":"(GMT+05:00) Islamabad, Karachi, Tashkent","value":"5"},
    {"label":"(GMT+05:30) Sri Jayawardenapura","value":"5.5"},
    {"label":"(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi","value":"5.5"},
    {"label":"(GMT+05:45) Kathmandu","value":"5.75"},
    {"label":"(GMT+06:00) Almaty, Novosibirsk","value":"6"},{"label":"(GMT+06:00) Astana, Dhaka","value":"6"},
    {"label":"(GMT+06:30) Yangon (Rangoon)","value":"6.5"},
    {"label":"(GMT+07:00) Bangkok, Hanoi, Jakarta","value":"7"},
    {"label":"(GMT+07:00) Krasnoyarsk","value":"7"},
    {"label":"(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi","value":"8"},
    {"label":"(GMT+08:00) Kuala Lumpur, Singapore","value":"8"},
    {"label":"(GMT+08:00) Irkutsk, Ulaan Bataar","value":"8"},
    {"label":"(GMT+08:00) Perth","value":"8"},
    {"label":"(GMT+08:00) Taipei","value":"8"},
    {"label":"(GMT+09:00) Osaka, Sapporo, Tokyo","value":"9"},
    {"label":"(GMT+09:00) Seoul","value":"9"},
    {"label":"(GMT+09:00) Yakutsk","value":"9"},
    {"label":"(GMT+09:30) Adelaide","value":"9.5"},
    {"label":"(GMT+09:30) Darwin","value":"9.5"},
    {"label":"(GMT+10:00) Brisbane","value":"10"},
    {"label":"(GMT+10:00) Canberra, Melbourne, Sydney","value":"10"},
    {"label":"(GMT+10:00) Hobart","value":"10"},
    {"label":"(GMT+10:00) Guam, Port Moresby","value":"10"},
    {"label":"(GMT+10:00) Vladivostok","value":"10"},
    {"label":"(GMT+11:00) Magadan, Solomon Is., New Caledonia","value":"11"},
    {"label":"(GMT+12:00) Auckland, Wellington","value":"12"},
    {"label":"(GMT+12:00) Fiji, Kamchatka, Marshall Is.","value":"12"},
    {"label":"(GMT+13:00) Nuku'alofa","value":"13"}
  ];

  const dropdown = $('#timezone');
  let changed = false;
  for (const timezone of tzInts) {
    if (!changed) {
      const selected = dayjs().utcOffset() / 60 == parseFloat(timezone.value);
      dropdown.append(`<option value="${timezone.value}"} ${selected ? 'selected' : ''}>${timezone.label}</option>`);
      if (selected) changed = true;
    } else {
      dropdown.append(`<option value="${timezone.value}"}>${timezone.label}</option>`);
    }
  }
  dropdown.on('change', e => {
    const offset = parseInt(e.target.value);
    $.each($('.time'), (index, dom) => {
      const str = $(dom).data('time');
      const date = new Date(`${str} +00:00`);
      $(dom).html(dayjs(date).utcOffset(offset).format('HH:mm'));
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
