/**
 * @fileoverview Blockly component
 */

goog.provide('scratch.Blockly');

goog.require('goog.functions');
goog.require('scratch.blockly.templates');
goog.require('scratch.SoyComponent');



/**
 * @param {goog.dom.DomHelper=} opt_domHelper The optional dom helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
scratch.Blockly = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(scratch.Blockly, scratch.SoyComponent);


/** @override */
scratch.Blockly.prototype.getTemplate = goog.functions.constant(
    scratch.blockly.templates.root);
