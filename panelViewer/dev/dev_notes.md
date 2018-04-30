# Dev notes
Process, etc.

Write "back-end" in Ruby / Python because Macs come with both by default. Ruby for practice?

This tool should:
- be executed as a CLI
- generate base HTML
- parse a config file (maybe a file that *contains* `config.txt`, so a user can write `_config.txt`)
- create Ruby hash / Python dict / JS object based on the text in `config.txt`
- use the config data to set up dynamic elements of the page (dropdowns, status text, etc.)
- look at current folder for images (.jpg/.jpeg, .gif, .tif/.tiff, .png), move images to a folder (`_imgs/`), and flow them into page

`config.txt` should be written like so:
```
panel_type_here
dropdown1_opt1, dropdown1_opt2, dropdown1_opt3, etc.
dropdown2_opt1, dropdown2_opt2, dropdown2_opt3, etc.
dropdown3_opt1...
...
### <-- (this denotes a break)
extra_info1
extra_info2
extra_info3
extra_info4
extra_info5
...
```
which will yield the following Ruby hash / Py dict / JS object:
``` javascript
{
  type: "Panel type",
  selectors: {
    selector_1: {
      option_1_value: "Option 1 Text",
      option_2_value: "Option 2 Text",
    },
    selector_2: {
      option_1_value: "Option 1 Text",
      option_2_value: "Option 2 Text",
      option_3_value: "Option 3 Text",
    },
    selector_3: {
      option_1_value: "Option 1 Text",
      ...
    }
  },
  extras: [
    "Extra info",
    "Extra info",
    "Extra info",
    "Extra info",
    "Extra info"
  ]
}
```

Example:
```
HH_IP_a
Human History, Natural History
Identification Panel
Horizontal
###
WORD COUNT
Title ENG: 5
Title FRE: 7
Body ENG: 50
Body FRE: 60
Object name ENG: 5
Object name FRE: 7
Object desc ENG: 20
Object desc FRE: 23
```

``` javascript
{
  type: "HH_IP_a",
  selectors: {
    selector_0: {
      human_history: "Human History",
      natural_history: "Natural History"
    },
    selector_1: {
      identification_panel: "Identification Panel"
    },
    selector_2: {
      horizontal: "Horizontal"
    }
  },
  extras: [
    "Title ENG: 5",
    "Title FRE: 7",
    "Body ENG: 50",
    "Body FRE: 60",
    "Object name ENG: 5",
    "Object name FRE: 7",
    "Object desc ENG: 20",
    "Object desc FRE: 23",
  ]
}
```

Some pseudocode to get things started...
``` javascript
// text = "HH_IP_a \n Human History, Natural History \n Identification Panel \n Horizontal \n ###\n Extra info 1 \n Extra info 2 \n Extra info 3"

temp_array = text.split("###\n").strip()
// ["HH_IP_a \n Human History, Natural History \n Identification Panel \n Horizontal", "Extra info 1 \n Extra info 2 \n Extra info 3"]

head_array = temp_array[0].split("\n")
  .map(item => item.strip())
// ["HH_IP_a", "Human History, Natural History", "Identification Panel", "Horizontal"]

extras_array = temp_array[1].split("\n")
  .map(item => item.strip())
// ["Extra info 1", "Extra info 2", "Extra info 3"]

object = {}
object[type] = head_array.shift() // consume first element
// head_array is now ["Human History, Natural History", "Identification Panel", "Horizontal"]

// At this point, object is:
// {
//  code: "HH_IP_a"
// }

object[selectors] = {}
key_index = 0

head_array.forEach(item => {
  selector_key = "selector_" + key_index

  // Look for comma-separated string
  // and turn it into an array [str1, str2]
  if(item.includes(", ")) {
    item = item.split(", ")
  }

  if(item is Array) {
    item.map(indv_item => {
      // "Human History" -> "human_history"
      val = indv_item.lowercase().to_snake_case()

      // "human_history" : "Human History"
      object.selectors.selector_key.val = indv_item
    })

  } else {
    // "Identification Panel" -> "identification_panel"
    val = item.lowercase().to_snake_case()
    
    // "identification_panel" : "Identification Panel"
    object.selectors.selector_key.val = item
  }

  key_index += 1
})
// After that, object should be:
// {
//   code: "HH_IP_a",
//   selectors: {
//     selector_0: {
//       "human_history" : "Human History",
//       "natural_history" : "Natural History",
//     },
//     selector_1: {
//       "identification_panel" : "Identification Panel"
//     },
//     selector_2: {
//       "horizontal" : "Horizontal"
//     }
//   }
// }

object[extras] = extras_array
// Now object should be:
// {
//   code: "HH_IP_a",
//   selectors: {
//     selector_0: {
//       "human_history" : "Human History",
//       "natural_history" : "Natural History",
//     },
//     selector_1: {
//       "identification_panel" : "Identification Panel"
//     },
//     selector_2: {
//       "horizontal" : "Horizontal"
//     }
//   },
//   extras: ["Extra info 1", "Extra info 2", "Extra info 3"]
// }
```