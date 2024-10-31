// Example set settings to editors
(function (window, undefined) {
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
