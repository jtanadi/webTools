ACCEPTEDFORMAT = [".jpg", ".jpeg", ".gif", ".png", ".tif", ".tiff", ".tga", ".bmp"]
WORKINGDIR = Dir.getwd

def find_config(directory)
  files = Dir.entries(directory)

  files.each do |file|
    return file if File.basename(file).include? "config.txt"
  end
end

def snake_case(str)
  str.split(" ").join("_")
end

def create_panel_hash(info_arr, extras_arr)
  return_hash = {}
  selector_index = 0

  return_hash[:code] = info_arr.shift
  return_hash[:selectors] = {}
  return_hash[:extras] = extras_arr

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

      selector[key].each do |selector_key, _selector_val|
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

def parse_images(directory, panels_arr)
  ret_string = "<div class=\"panel_row\">"

  files = Dir.entries(directory)
  images = files.select { |file| ACCEPTEDFORMAT.include? File.extname(file) }

  images.each.with_index do |image, index|
    if (index % 5).zero? && !index.zero?
      ret_string += "</div><div class=\"panel_row\">"
    end

    puts "Adding #{image}. . ."
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

def make_sidebar(panels_arr)
  ret_string = "<div id=\"sidebar\">"

  panels_arr.each do |panel|
    ret_string += "<div class=\"panel_info\" id=\"#{panel[:code]}\">"
    ret_string += "<h1>#{panel[:code]}</h1><p class=\"rule\"></p>"

    panel[:selectors].each do |_selector_num, selector_data|
      selector_data.each do |_key, value|
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

def read_config()
  ret_array = []
  config_file = find_config(WORKINGDIR) 
  File.open("#{WORKINGDIR}/#{config_file}", "r") do |file|
    config = file.read

    config.split("\n\n").each do |panel|
      panel_info = []
      panel_extras = []

      if panel.include? "\n###\n"
        info_array = panel.split("\n###\n")

        panel_extras = info_array[1].split("\n").map(&:chomp)
        panel_info = info_array[0].split("\n").map(&:chomp)
      else
        panel_info = panel.split("\n").map(&:chomp)
      end

      ret_array << create_panel_hash(panel_info, panel_extras)
    end
  end
  ret_array
end

def create_index(panels_arr)
  File.open("#{WORKINGDIR}/index.html", "w+") do | file |
    puts "Writing HTML header. . ."
    header = '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>👁 Panel Viewer 👁</title> <style>/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */button,hr,input{overflow:visible}progress,sub,sup{vertical-align:baseline}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{padding:.35em .75em .625em}legend{color:inherit;display:table;max-width:100%;white-space:normal}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}[hidden],template{display:none}</style> <style>#main_area,#sidebar{display:flex;padding:1.5rem}*{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;box-sizing:border-box}.rule{width:100%;border-bottom:1px solid #000}#nav_container{width:100vw;height:4rem;padding:1rem 2rem;position:fixed;background:#000;display:flex}#nav_container .nav_item{flex:1;margin:auto 0}#nav_container .nav_item:first-child{margin-left:calc(20% + 2.35rem)}#nav_container .nav_item:not(:last-child){margin-right:2%}.nav_item select{width:100%;font-size:1.5rem;outline:0;background:#fff}#body_container{width:100%;display:flex;padding-top:4rem;min-height:100vh}#sidebar{flex:1;flex-direction:column;justify-content:space-between}#sidebar .panel_info{position:relative;width:85%;top:-2px;transition:all .65s;display:none}#sidebar .panel_info h1{font-size:1.5rem;font-weight:400;margin:0}#sidebar .panel_info p,#sidebar_footnote span{font-size:.9rem;line-height:125%;margin:.75rem 0}#sidebar .panel_info.show{display:block}#sidebar_footnote{flex:0 1 auto;margin-top:auto}#main_area{flex:4;flex-direction:column}.panel_cell,.panel_row{flex:0 1 auto;display:flex}.panel_row{width:100%}.panel_cell{width:calc(100%/ 6);height:12vw;padding:1.5vw;transition:width .75s,height .75s}img.panel{flex:0 1 auto;max-width:100%;max-height:100%;margin:auto;box-shadow:10px 10px 20px rgba(0,0,0,.5);pointer-events:none}</style></head><body>'

    puts "Building dropdowns. . ."
    dropdowns = make_dropdowns(get_selectors(panels_arr))

    puts "Building sidebar. . ."
    sidebar = make_sidebar(panels_arr)

    puts "Adding images. . ."
    main_area = "<div id=\"main_area\">#{parse_images(WORKINGDIR, panels_arr)}</div>"

    puts "Writing footer. . ."
    footer = '<script>let opened=null;let timeOut;const DROPDOWNSTATE={};const dropdowns=document.querySelectorAll("select");const mainArea=document.getElementById("main_area");const panelRows=document.querySelectorAll(".panel_row");const panelCells=document.querySelectorAll(".panel_cell");const panelImgs=document.querySelectorAll(".panel_cell img");const makeCheckerboard=()=>{panelRows.forEach((row,rowIndex)=>{const cells=row.querySelectorAll(".panel_cell");const visibleCells=[];cells.forEach(cell=>{if(cell.style.display!=="none"){visibleCells.push(cell);cell.style.background=""}});if(rowIndex%2===0){visibleCells.forEach((cell,cellIndex)=>{if(cellIndex%2===0)cell.style.background="black"})}else{visibleCells.forEach((cell,cellIndex)=>{if(cellIndex%2!==0)cell.style.background="black"})}})};const loadState=(elmtWithData,stateContainer)=>{elmtWithData.forEach(elmt=>{Object.keys(elmt.dataset).map(data=>stateContainer[data]="")})};const checkState=image=>{let show=!0;const selectorsArray=Object.keys(image.dataset);selectorsArray.forEach(key=>{if(!image.dataset[key].includes(DROPDOWNSTATE[key]))show=!1;image.parentElement.style.display=(!show)?"none":""})};const scrollPanelInfo=evt=>{const shownInfo=document.querySelector(".panel_info.show");if(evt.type==="click"&&shownInfo){shownInfo.style.top=`${window.scrollY - 2}px`;return} if(timeOut)clearTimeout(timeOut);timeOut=setTimeout(()=>{if(!shownInfo)return;shownInfo.style.top=`${window.scrollY - 2}px`},100)};const updateDropdowns=function(){DROPDOWNSTATE[this.id]=this.value;panelImgs.forEach(img=>{checkState(img)});makeCheckerboard()};const togglePanelInfo=(target,classToRemove="",classToAdd="")=>{const panelInfo=document.querySelectorAll("#sidebar .panel_info");const panelCode=target.querySelector("img").alt;panelInfo.forEach(info=>{if(info.classList.contains(classToRemove)){info.classList.remove(classToRemove)}else if(classToAdd&&info.id===panelCode){info.classList.add(classToAdd)}})};const enlargeOnFocus=evt=>{const clickedObj=evt.target;const resetStyles=elmt=>{elmt.style.width="";elmt.style.height="";elmt.style.padding=""};if(!Array.from(panelCells).includes(clickedObj))return;if(clickedObj!==opened){const newDivisions=100/6;const newWidth=newDivisions*2;panelCells.forEach(cell=>{cell.style.width=`${newDivisions}%`;cell.style.height=""});clickedObj.style.width=`${newWidth}%`;clickedObj.style.height="30vw";clickedObj.style.padding="1vw";togglePanelInfo(clickedObj,"show","show");opened=clickedObj}else{panelCells.forEach(cell=>{resetStyles(cell)});togglePanelInfo(clickedObj,"show");opened=null} scrollPanelInfo(evt)};loadState(panelImgs,DROPDOWNSTATE);makeCheckerboard();dropdowns.forEach(dropdown=>{dropdown.addEventListener("change",updateDropdowns)});mainArea.addEventListener("click",enlargeOnFocus);window.addEventListener("scroll",scrollPanelInfo)</script></body></html>'

    puts "Putting it all together"
    file << header + dropdowns + "<div id=\"body_container\">" + sidebar + main_area + "</div>" + footer
  end
end

if ARGV[0] == "--build" || ARGV[0] == "-B"
  puts "Reading config file. . ."
  all_panels = read_config()

  puts "Building index.html. . ."
  create_index(all_panels)

  puts "index.html built with assets in current folder"
else
  puts "Not a valid command. Only accepted command is --build or -B"
end
