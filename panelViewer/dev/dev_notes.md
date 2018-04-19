# Dev notes
Process, etc.

Write "back-end" in Ruby / Python because Macs come with both by default. Ruby for practice?

This tool should:
- be executed as a CLI
- parse a config file (maybe a file that *contains* `config.txt`, so a user can write `_config.txt`)
- create Ruby hash / Python dict / JS object based on the text in `config.txt`
- look at current folder for images (.jpg/.jpeg, .gif, .tif/.tiff, .png)
- generate HTML & flow images into

`config.txt` should be written like so:

```
HH_IP_a
Human History, Natural History
Identification Panel
Horizontal
### <-- (this denotes a break)
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

which will yield a JS object / Ruby hash that looks like this:
```
{
  code: "HH_IP_a",
  selectors: {
    0: ["Human History", "Natural History"],
    1: ["Identification Panel"],
    2: ["Horizontal"]
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