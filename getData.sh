#!/bin/bash
curl -L "https://script.google.com/macros/s/AKfycbzlVQe_lE49nDvlt-_0WEqvjuKhIH_Q3WflKC0mpnHEsBYzig8m6cOt/exec?name=organizers" -o _data/organizers.json
curl -L "https://script.google.com/macros/s/AKfycbzlVQe_lE49nDvlt-_0WEqvjuKhIH_Q3WflKC0mpnHEsBYzig8m6cOt/exec?name=sessions" -o _data/sessions.json
curl -L "https://script.google.com/macros/s/AKfycbzlVQe_lE49nDvlt-_0WEqvjuKhIH_Q3WflKC0mpnHEsBYzig8m6cOt/exec?name=speakers" -o _data/speakers.json
curl -L "https://script.google.com/macros/s/AKfycbzlVQe_lE49nDvlt-_0WEqvjuKhIH_Q3WflKC0mpnHEsBYzig8m6cOt/exec?name=sponsors" -o _data/sponsors.json

# sh image.sh
ruby speaker.rb
ruby organizer.rb
ruby session.rb
