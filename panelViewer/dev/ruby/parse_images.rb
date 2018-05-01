ACCEPTEDFORMAT = [".jpg", ".jpeg", ".gif", ".png", ".tif", ".tiff", ".tga", ".bmp"]

def parse_images(directory, panels_arr)
  ret_string = "<div class=\"panel_row\">"

  files = Dir.entries(directory)
  images = files.select { |file| ACCEPTEDFORMAT.include? File.extname(file) }

  images.each.with_index do |image, index|
    if (index % 5).zero? && !index.zero?
      ret_string += "</div><div class=\"panel_row\">"
    end

    alt_name = File.basename(image, ".*")
    ret_string += "<div class=\"panel_cell\">"
    ret_string += "<img src=\"./#{image}\" class=\"panel\" alt=\"#{alt_name}\" "

    panels_arr.each do |panel|
      next unless panel[:code] == alt_name
      panel[:selectors].each do |selector_num, selector_data|
        data_name = "data-" + selector_num.to_s
        data_values = []
        selector_data.each do |key, _val|
          data_values << key.to_s
        end
        ret_string += "#{data_name}=\"#{data_values.join(", ")}\" "
      end
    end

    ret_string += "></div>"
  end
  ret_string += "</div></div>"
  ret_string
end