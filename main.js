/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, window, $, Mustache, navigator */

define(function (require, exports, module) {
    "use strict";
    
    var CommandManager              = brackets.getModule("command/CommandManager"),
        Menus                       = brackets.getModule("command/Menus"),
		ExtensionUtils              = brackets.getModule("utils/ExtensionUtils"),
        Dialogs                     = brackets.getModule("widgets/Dialogs"),
        Strings                     = brackets.getModule("strings"),
        // テンプレートの読み込み
        CustomToolbarHtml           = require("text!htmlContent/custom_toolbar.html"),
        SimpleDialogTemplate        = require("text!htmlContent/simple_dialog.html");
    
    /* jQueryオブジェクトをセット */
    var $toolbarIcon                = $(CustomToolbarHtml);
    
    /** @constant {string} */
    var COMMAND_ID  = "jp.codezine.commands.custom_toolbar";
    var MENU_ID     = "jp.codezine.custom_menu";

    /* テンプレートに渡すオブジェクト */
    var DIALOG_INFORMATION = {
        TITLE: 'ツールバーからダイアログ',
        MESSAGE: 'わーい'
    };
    
    function showDialog() {
        var context = {
            Strings: Strings,
            DIALOG_INFORMATION: DIALOG_INFORMATION
        };
        
        // ダイアログを表示
        var dialog = Dialogs.showModalDialogUsingTemplate(Mustache.render(SimpleDialogTemplate, context));
    }
    
    $toolbarIcon.appendTo("#main-toolbar .buttons");
    $toolbarIcon.on('click', showDialog);
    ExtensionUtils.loadStyleSheet(module, "style/style.css");
        
    CommandManager.register('Simple dialog custom toolbar', COMMAND_ID, showDialog);
});