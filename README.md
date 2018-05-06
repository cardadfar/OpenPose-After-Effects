# iDance-ExtendScript

Interprets OpenPose data into After Effects shape layers.

The OpenPose JSON must be placed in the same directory as the script. On line 8, change 'output2.json' to the name os the JSON.
```
var file_to_read = File(script_file_path + "/output2.json");
```

In order to run the script, you also need the following ExtendScript JSON reader in the same directory:
https://raw.githubusercontent.com/douglascrockford/JSON-js/master/json2.js
