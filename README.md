AFTimeMachine
=============

Save and restore HTML forms (with the values).

## Usage
```javascript
var delorean = new TimeMachine("Create EMD", "formEMD");
delorean.save();
delorean.restore();
```

```html
<form id="formEMD">
    <input type="text" name="aircraft" value="" placeholder="Aircraft"/>
</form>
```

## Browsers comptability
Prerequisites are HTML5 WebStorage and JSON (if you want to store JavaScript variables).
Works well with Internet Explorer 8, Firefox 23, Google Chrome, etc.

## Licence
This tool is released under the BSD opensource licence.
