require 'json'
require 'date'
schedules = JSON.parse(open('./_data/schedule.json').read)

schedules.each {|date, tracks| 
  date = DateTime.parse(date)
  date = date + Rational(9, 24)
  if tracks['Fuji']
    # 普通のセッション
    puts "### #{date.strftime('%H:%M')}〜"
    puts ""
    puts "| 富士 | 桜 | 侍 |"
    puts "|--------|--------|--------|"
    row = ['Fuji', 'Sakura', 'Samurai'].map {|track|
      sessions = tracks[track]
      if sessions
        sessions.map {|number, session|
          speaker = session['speakers'][0]
          additional = session['speakers'][1]
          org = speaker['company_ja'] ? "@#{speaker['company_ja']}" : ""
          "[#{session['title_ja']}](https://tokyo-2021.devrel.net/speakers/#{speaker['id']}/) by #{speaker['name_ja']}#{org}#{additional ? " and more" : ""}"
        }.join("<br />")
      end
    }.join("|")
    puts "| #{row} |"
    puts ""
  else
    # キーノートなど
    speaker = tracks['speakers'][0]
    if speaker
      puts "### #{date.strftime('%H:%M')} [#{tracks['title_ja']}](https://tokyo-2021.devrel.net/speakers/#{speaker['id']}/) by #{speaker['name_ja']}@#{speaker['company_ja']}"
    else
      puts "### #{date.strftime('%H:%M')} #{tracks['title_ja']}"
    end
    puts ""
    puts tracks['description_ja']
    puts ""
  end
}
