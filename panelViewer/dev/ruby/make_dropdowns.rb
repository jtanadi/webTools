def make_dropdowns(hash)
  ret_string = "<div id=\"nav_container\">"
  hash.each do |key, value|
    ret_string += "<div class=\"nav_item\">"
    ret_string += "<select id=\"#{key}\">"
    ret_string += "<option value=\"\">ALL</option>"

    value.each do |dropdown_key, dropdown_val|
      ret_string += "<option value=\"#{dropdown_key}\">#{dropdown_val}</option>"
    end

    ret_string += "</select></div>"
  end
  ret_string += "</div>"
  ret_string
end
