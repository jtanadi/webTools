def find_config(directory)
  files = Dir.entries(directory)

  files.each do |file|
    return file if File.basename(file).include? "config.txt"
  end
end