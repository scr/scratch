/**
 * @fileoverview Blockly component
 */

goog.provide('scratch.SprintPalette');

goog.require('goog.functions');
goog.require('scratch.sprintpalette.templates');
goog.require('scratch.SoyComponent');



/**
 * @param {goog.dom.DomHelper=} opt_domHelper The optional dom helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
scratch.SprintPalette = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(scratch.SprintPalette, scratch.SoyComponent);


/** @override */
scratch.SprintPalette.prototype.getTemplate = goog.functions.constant(
    scratch.sprintpalette.templates.root);
