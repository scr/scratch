/**
 * @fileoverview Blockly component
 */

goog.provide('scratch.Blockly');

goog.require('Blockly');
goog.require('Blockly.Block');
goog.require('Blockly.BlockSvg');
goog.require('Blockly.Bubble');
goog.require('Blockly.Comment');
goog.require('Blockly.Connection');
goog.require('Blockly.ContextMenu');
goog.require('Blockly.Field');
goog.require('Blockly.FieldCheckbox');
goog.require('Blockly.FieldColour');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldImage');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.FieldTextInput');
goog.require('Blockly.FieldVariable');
goog.require('Blockly.Flyout');
goog.require('Blockly.Generator');
goog.require('Blockly.inject');
goog.require('Blockly.Input');
goog.require('Blockly.Mutator');
goog.require('Blockly.Names');
goog.require('Blockly.Procedures');
goog.require('Blockly.Scrollbar');
goog.require('Blockly.Toolbox');
goog.require('Blockly.Tooltip');
goog.require('Blockly.Trashcan');
goog.require('Blockly.utils');
goog.require('Blockly.Variables');
goog.require('Blockly.Warning');
goog.require('Blockly.Workspace');
goog.require('Blockly.Xml');

goog.require('Blockly.JavaScript.control');
goog.require('Blockly.JavaScript.logic');

goog.require('Blockly.Language.control');
goog.require('Blockly.Language.logic');

goog.require('Blockly.messages.en');

goog.require('goog.functions');
goog.require('goog.debug.Logger');
goog.require('scratch.blockly.templates');
goog.require('scratch.SoyComponent');



/**
 * @param {goog.dom.DomHelper=} opt_domHelper The optional dom helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
scratch.Blockly = function(opt_domHelper) {
    goog.base(this, opt_domHelper);

    /**
     * @type {goog.debug.Logger}
     * @private
     */
    this.logger_ = goog.debug.Logger.getLogger('scratch.Root');
};
goog.inherits(scratch.Blockly, scratch.SoyComponent);


/** @override */
scratch.Blockly.prototype.getTemplate = goog.functions.constant(
    scratch.blockly.templates.root);


/** @override */
scratch.Blockly.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    this.logger_.warning('calling Blockly.inject on ' + this.getElement());    
    Blockly.inject(this.getElement());
};
