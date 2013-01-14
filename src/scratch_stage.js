/**
 * @fileoverview root component of the scratch app.
 */

goog.provide('scratch.Stage');

goog.require('goog.functions');
goog.require('scratch.stage.templates');
goog.require('scratch.SoyComponent');



/**
 * @param {goog.dom.DomHelper=} opt_domHelper The optional dom helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
scratch.Stage = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(scratch.Stage, scratch.SoyComponent);


/** @override */
scratch.Stage.prototype.getTemplate = goog.functions.constant(
    scratch.stage.templates.root);
