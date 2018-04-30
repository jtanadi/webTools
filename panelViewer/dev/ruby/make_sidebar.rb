def make_sidebar(panels_arr)
  ret_string = "<div id=\"sidebar\">"

  panels_arr.each do |panel|
    ret_string += "<div class=\"panel_info\" id=\"#{panel[:code]}\">"
    ret_string += "<h1>#{panel[:code]}</h1><p class=\"rule\"></p>"

    panel[:selectors].each do |selector_num, selector_data|
      selector_data.each do |key, value|
        ret_string += "<p>#{value}</p>"
      end
      ret_string += "<p class=\"rule\"></p>"
    end

    panel[:extras].each do |item|
      ret_string += "<p>#{item}</p>"
    end
    ret_string += "<p class=\"rule\"></p></div>"
  end
  ret_string += "<div id=\"sidebar_footnote\"><span>Everyone ❤️ panels</span></div></div>"
  ret_string
end