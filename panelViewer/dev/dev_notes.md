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
```
{
  type: "Panel type",
  dropdowns: {
    dropdown_1: {
      option_1_value: "Option 1 Text",
      option_2_value: "Option 2 Text",
    },
    dropdown_2: {
      option_1_value: "Option 1 Text",
      option_2_value: "Option 2 Text",
      option_3_value: "Option 3 Text",
    },
    dropdown_3: {
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

```
{
  type: "HH_IP_a",
  dropdowns: {
    dropdown_0: {
      human_history: "Human History",
      natural_history: "Natural History"
    },
    dropdown_1: {
      identification_panel: "Identification Panel"
    },
    dropdown_2: {
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
