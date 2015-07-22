
/**
 * csv
 *
 * @return {Object} result
 */
 
var csv = function(options) {
	try {
	    var csv = '';
	    
		var ATTRIBUTES_BLACKLIST = [],
		    myClass = ds[options.class],
		    myAttributes = [],
			myCollection = myClass.all();
        
        // generate attribute array
		for (var attrName in myClass.attributes){		
			// validate attribute kind
			if ((myClass[attrName].kind == 'storage') && (myClass[attrName].type !== 'image')) {
			    // validate blacklist
			    if (ATTRIBUTES_BLACKLIST.indexOf(attrName) === -1) {
					myAttributes.push(attrName);
			    }
			}
		}
		// add header line
		csv += myAttributes.join(';');
        // add datasets
        myCollection.forEach(function(item) {
        	// new line
            csv += '\r\n';
            // loop attributes
            for (var i = 0; i < myAttributes.length; i++) {
            	// add content if not null
                csv += item[myAttributes[i]] ? item[myAttributes[i]] : '';
                // skip for last element
                if (i !== myAttributes.length -1) {
	                csv += ';';
                }
            };         
        });
        
        if (options.file) {
            return save(csv, 'export_' + generateUUID() + '.csv');
        } else {
            return csv;
        }
	} catch (e) {
		WAKTOOLS.log(e);
		return e;
	}
};



/**
 * save string as file
 *
 * @return {Object} result
 */
 
var save = function(str, fileName) {
	try {
	    var result = {},
	        exportFile;
	        
	    // export file
	    exportFile = new File(ds.getModelFolder().path + 'WebFolder/downloads/' + fileName);
	    exportFile.parent.create();
	    // save as file
	    saveText(str, exportFile);
	    	    
	    return exportFile;
	} catch (e) {
		WAKTOOLS.log(e);
		return e;
	}
};

exports.csv = csv;