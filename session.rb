require 'json'
require 'date'
sessions = JSON.parse(open('./_data/sessions.json').read)
speakers = JSON.parse(open('./_data/speakers.json').read)

results = {}
sessions.each {|s|
  start_time = DateTime.parse(s['start_time_jst'])
  start_time = start_time - Rational(9, 24)
  start_time = start_time.strftime('%Y-%m-%d %H:%M')
  s['start_time_utc'] = start_time
  end_time = DateTime.parse(s['end_time_jst'])
  end_time = end_time - Rational(9, 24)
  end_time = end_time.strftime('%Y-%m-%d %H:%M')
  s['end_time_utc'] = end_time
  speaker1 = speakers.select{|sp| sp['id'] == s['first_speaker'] }.first
  s['speakers'] = [speaker1]
  if s['second_speaker'] != ''
    speaker2 = speakers.select{|sp| sp['id'] == s['second_speaker'] }.first
    s['speakers'] << speaker2
  end
  s['speaker_count'] = s['speakers'].size
  results[start_time] = {} unless results[start_time]
  results[start_time][s['track']] = {} unless results[start_time][s['track']]

  if s['number'] != ''
    results[start_time][s['track']][s['number'].to_i] = s
    results[start_time][s['track']] = results[start_time][s['track']].sort.to_h
  else
    results[start_time] = s
  end
}

f = File.open('./_data/schedule.json', 'w')
f.write results.to_json
f.close
