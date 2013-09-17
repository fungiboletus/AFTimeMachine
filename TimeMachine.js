/**
 * AF TimeMachine
 *
 * Save and restore HTML forms.
 *
 * Usage :
 *
 * var delorean = new TimeMachine("Create EMD", "formEMD");
 * delorean.save();
 * delorean.restore();
*/

/**
 * The TimeMachine constructor.
 *
 * name {String} Name of the segment. It's an identifiant.
 * segment {DOM|String} segment DOM element or segment ID
 * vars {Array} Optionnal array of javascript self scope variables identifiers.
 */
function TimeMachine(name, segment, vars) {

	this.name = name;

	if (typeof segment === 'string') {
		segment = document.getElementById(segment);
	}

	this.segment = segment;
	this.vars = vars;
}

/**
 * Save the segment state.
 *
 * Doesn't throw exception if an error occur.
 *
 * Return true when the save is OK.
 */
TimeMachine.prototype.save = function() {
	try {
		return this._save();
	} catch (e) {
		if (window.console) {
			console.log(e);
		}
		return false;
	}
};

/**
 * Save the segment state (internal).
 *
 * Throw exceptions.
 *
 * You shouldn't use this wonderfull function.
 */
TimeMachine.prototype._save = function() {

	// List of modified DOM elements
	// They are cleaned after
	var listValue = [],
		listChecked = [],
		listSelected = [];

	// Save the segment values with data attributes

	// Save input values
	var inputs = this.segment.getElementsByTagName("input");

	for (var i = 0, l = inputs.length; i < l; ++i) {
		var input = inputs[i];
		input.setAttribute("data-proto-value", input.value);
		listValue.push(input);

		// Manage checkbox and radio buttons
		if (input.checked) {
			input.setAttribute("data-proto-checked", "true");
			listChecked.push(input);
		}
	}

	// save Textarea values
	var textareas = this.segment.getElementsByTagName("textarea");

	for (i = 0, l = textareas.length; i < l; ++i) {
		var textarea = textareas[i];
		textarea.setAttribute("data-proto-value", textarea.value);
		listValue.push(textarea);
	}

	// Manage select elements (with multiple elements support)
	var options = this.segment.getElementsByTagName("option");
 
	for (i = 0, l = options.length; i < l; ++i) {
		var option = options[i];
		if (option.selected) {
			option.setAttribute("data-proto-selected", "true");
			listSelected.push(option);
		}
	}

	// Save the segment with the innerHTML method
	var html = this.segment.innerHTML;

	// Reset the segment state
	for (i = 0, l = listValue.length; i < l; ++i) {
		listValue[i].removeAttribute("data-proto-value");
	}

	for (i = 0, l = listChecked.length; i < l; ++i) {
		listChecked[i].removeAttribute("data-proto-checked");
	}

	for (i = 0, l = listSelected.length; i < l; ++i) {
		listSelected[i].removeAttribute("data-proto-selected");
	}

	// Use localStorage for data persistance
	window.localStorage['timeMachine'+this.name+'HTML'] = html;



	// Save variables
	if (this.vars) {
		var vars = {};
		
		for (i = 0, l = this.vars.length; i < l; ++i) {
			vars[this.vars[i]] = self[this.vars[i]];
		}

		window.localStorage['timeMachine'+this.name+'Data'] = window.JSON.stringify(vars);
	}


	return true;
};

/**
 * Return true you can can back in time.
 */
TimeMachine.prototype.canGoBackInTime = function() {
	return window.localStorage && window.localStorage['TimeMachine'+this.name+'HTML'];
};

/**
 * Restore the segment state.
 */
TimeMachine.prototype.restore = function() {
	if (!this.canGoBackInTime()) {
		alert("I can't restore this form");
		return;
	}

	// Retrieve the data from the localStorage
	var html = window.localStorage['timeMachine'+this.name+'HTML'],
		dataKey = 'timeMachine'+this.name+'Data',
		data = null;

	if (window.localStorage[dataKey]) {
		data = window.JSON.parse(window.localStorage[dataKey]);
	}

	// Create a new segment
	var segment = this.segment.cloneNode(false);

	// Set the segment content
	segment.innerHTML = html;

	// Fill the segment with the data attributes
	var inputs = segment.getElementsByTagName("input");

	for (var i = 0, l = inputs.length; i < l; ++i) {
		var input = inputs[i];
		input.value = input.getAttribute("data-proto-value");

		if (input.getAttribute("data-proto-checked")) {
			input.checked = true;
			input.removeAttribute("data-proto-checked");
		}
		if (input.getAttribute("data-proto-selected")) {
			input.checked = true;
			input.removeAttribute("data-proto-selected");
		}

		input.removeAttribute("data-proto-value");
	}
	
	var textareas = segment.getElementsByTagName("textarea");

	for (i = 0, l = textareas.length; i < l; ++i) {
		var textarea = textareas[i];
		textarea.value = textarea.getAttribute("data-proto-value");
		textarea.removeAttribute("data-proto-value");
	}

	var options = segment.getElementsByTagName("option");
 
	for (i = 0, l = options.length; i < l; ++i) {
		var option = options[i];
		if (option.getAttribute("data-proto-selected")) {
			option.selected = true;
			option.removeAttribute("data-proto-selected");
		}
	}	

	// Replace the segment with the new segment
	this.segment.parentNode.replaceChild(segment, this.segment);

	// Use the new segment for next uses
	this.segment = segment;

	if (data) {
		// Set the saved variables
		for (var key in data.vars) {
			if (data.vars.hasOwnProperty(key)) {
				self[key] = data.vars[key];
			}
		}
	}
};