require('json')
json = JSON.parse(open('./_data/sessions.json').read)
speakers = JSON.parse(open('./_data/speakers.json').read)

sessions = json.select {|s| s['date'] == '2901'}
results = []
last = nil
sessions.each {|s|
  s['speaker'] = speakers.select{|speaker| speaker['name_en'] == s['speakerName']}.first
  if last && last['block'] == s['block']
    results.last[s['time']] = [] unless results.last[s['time']]
    results.last[s['time']] << s
  else
    options = {}
    options[s['time']] = [s]
    results << options
  end
  last = s
}

f = File.open('./_data/session29.json', 'w')
f.write results.to_json
f.close

json = JSON.parse(open('./_data/sessions.json').read)
sessions = json.select {|s| s['date'] == '2801'}
results = []
sessions.each {|s|
  s['speaker'] = speakers.select{|speaker| speaker['name_en'] == s['speakerName']}.first
  s['speaker2'] = speakers.select{|speaker| speaker['name_en'] == s['Second speaker=speakers:name_en']}.first
  unless s['show'] == 'true'
    s['title_en'] = 'Will be announced soon!'
    s['title_ja'] = '間もなく発表されます'
  end
  if results.last && results.last.first['room'] == s['room']
    results.last << s
  else
    results << [s]
  end
}

f = File.open('./_data/session28.json', 'w')
f.write results.to_json
f.close

