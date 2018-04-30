all_panels = []

def snake_case(str)
  str.split(" ").join("_")
end

def create_hash(info_arr)
  return_hash = {}
  selector_index = 0

  return_hash[:code] = info_arr.shift
  return_hash[:selectors] = {}

  info_arr.each do |selector|
    selector_key = ("selector" + selector_index.to_s).to_sym
    return_hash[:selectors][selector_key] = {}

    selector = selector.split(", ") if selector.include? ", "

    if selector.kind_of?(Array)
      selector.map do |item|
        val = (snake_case(item.downcase)).to_sym
        return_hash[:selectors][selector_key][val] = item
      end
    
    else
      val = (snake_case(selector.downcase)).to_sym
      return_hash[:selectors][selector_key][val] = selector
    end

    selector_index += 1
  end
  return_hash
end

def get_selectors(arr)
  ret_selectors = {}
  selectors_arr = []

  arr.each do |panel|
    selectors_arr << panel[:selectors]
  end

  selectors_arr.each do |selector|
    selector.each_key do |key|

      ret_selectors[key] = {} unless ret_selectors.has_key?(key)

      selector[key].each do |selector_key, selector_val|
        ret_selectors[key][selector_key] = selector[key][selector_key]
      end

    end
  end

  ret_selectors
end

def make_dropdowns(hash)
  ret_string = "<div id=\"nav_container\">"
  hash.each do |key, value|
    ret_string += "<div class=\"nav_item\">"
    ret_string += "<select id=\"#{key.to_s}\">"
    ret_string += "<option value=\"\">ALL</option>"

    value.each do |dropdown_key, dropdown_val|
      ret_string += "<option value=\"#{dropdown_key}\">#{dropdown_val}</option>"
    end

    ret_string += "</select></div>"
  end
  ret_string += "</div>"
  ret_string
end

File.open("test-config.txt", "r") do |file|
  config = file.read
  panel_info = []

  config.split("\n\n").each do |panel|
    info_array = panel.split("\n###\n")
    
    panel_description = info_array[1].split("\n")
      .map { |item| item.chomp }
    
    panel_info = info_array[0].split("\n")
      .map { |item| item.chomp }
    
    all_panels << create_hash(panel_info)
  end
end

puts make_dropdowns(get_selectors(all_panels))

