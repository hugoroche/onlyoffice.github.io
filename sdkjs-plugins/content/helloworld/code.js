// Example set settings to editors
(function (window, undefined) {

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    var _Control = null;

    // plugin init method
    window.Asc.plugin.init = function () {

        // register message listener
        // this listener will be able to intercept actions outside the iframe of the plugin and posted to the iframe of the onlyoffice editor
        // this allows Pulse Vaadin based javascript component to communicate with the onlyoffice editor for adding custom content controls
    };

    // this method is called once the content control has been added to the document
    // now we will set the content control content, creating a StdRun entry in the docx XML format
    window.Asc.plugin.onMethodReturn = function (returnValue) {
        var _plugin = window.Asc.plugin;

        if (_plugin.info.methodName == "AddContentControl") {
            if (_Control) {

                // create the color
                var color = hexToRgb(_Control.color);

                // create the script to insert content as a SdtRun inside the content control
                var _script = "\r\n\
			var oDocument = Api.GetDocument();\r\n\
			var oParagraph = Api.CreateParagraph();\r\n\
			var oRun = oParagraph.AddText(\' " + _Control.label + " \');\r\n\
			oRun.SetShd(\"clear\","+color.r+","+color.g+","+color.b+");\r\n\
			oDocument.InsertContent([oParagraph], true);\r\n\
			";

                _script = _script.replaceAll("\r\n", "");
                _script = _script.replaceAll("\n", "");

                var _scriptObject = {
                    "Props": {
                        "Tag": _Control.tag,
                        "Lock": 3,
                        "InternalId": returnValue.InternalId
                    },
                    "Script": _script
                };

                // replace content
                window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_scriptObject]]);

                // move to the end
                //window.Asc.plugin.executeMethod ("MoveCursorToEnd", [false]);

                _Control = null;
            }
        }
    };

    window.Asc.plugin.button = function (id) {
        this.executeCommand("close", "");
    };

})(window, undefined);
