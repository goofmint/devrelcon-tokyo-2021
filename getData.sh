#!/bin/bash
curl -L "https://script.google.com/macros/s/AKfycbyp9nZL06tzl3rJ7rstfJR06uG25s_z36b5PlSSjoBauyc9ko7H/exec?name=organizers" -o _data/organizers.json
curl -L "https://script.google.com/macros/s/AKfycbyp9nZL06tzl3rJ7rstfJR06uG25s_z36b5PlSSjoBauyc9ko7H/exec?name=sessions" -o _data/sessions.json
curl -L "https://script.google.com/macros/s/AKfycbyp9nZL06tzl3rJ7rstfJR06uG25s_z36b5PlSSjoBauyc9ko7H/exec?name=speakers" -o _data/speakers.json
curl -L "https://script.google.com/macros/s/AKfycbyp9nZL06tzl3rJ7rstfJR06uG25s_z36b5PlSSjoBauyc9ko7H/exec?name=sponsors" -o _data/sponsors.json

sh image.sh
ruby speaker.rb
ruby organizer.rb
ruby session.rb
