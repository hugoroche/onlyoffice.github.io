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
    window.Asc.plugin.init = function init() {
        this.callCommand(() => {
            /*var script = "\r\n\
          const oDocument = Api.GetDocument();\r\n\
          const oParagraph = Api.CreateParagraph();\r\n\
          const oRun = oParagraph.AddText(\"Hello world!\");\r\n\
          oRun.setShd(\"clear\", 124, 234, 52);\r\n\
          oDocument.InsertContent([oParagraph], true);"

          script = script.replaceAll("\r\n", "");
          script = script.replaceAll("\n", "");
          console.log("SCRIPT", script);

          var _scriptObject = {
            "Props": {
                "Tag": "gap;bidule",
                "Lock": 3,
                "InternalId": crypto.randomUUID()
            },
            "Script": script
        };*/

        // replace content
        //window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_scriptObject]]);
        }, true)
    };

    window.Asc.plugin.button = function (id) {
        this.executeCommand("close", "");
    };

})(window, undefined);
