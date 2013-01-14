/**
 * @fileoverview root component of the scratch app.
 */

goog.provide('scratch.Root');

goog.require('goog.functions');
goog.require('goog.debug.FancyWindow');
goog.require('goog.debug.Logger');
goog.require('scratch.Blockly');
goog.require('scratch.SoyComponent');
goog.require('scratch.SprintPalette');
goog.require('scratch.Stage');
goog.require('scratch.root.templates');



/**
 * @param {goog.dom.DomHelper=} opt_domHelper The optional dom helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
scratch.Root = function(opt_domHelper) {
    goog.base(this, opt_domHelper);

    if (goog.DEBUG) {
	var debugWindow = new goog.debug.FancyWindow('main');
	debugWindow.setEnabled(true);
	debugWindow.init();
    }

    /**
     * @type {goog.debug.Logger}
     * @private
     */
    this.logger_ = goog.debug.Logger.getLogger('scratch.Root');
};
goog.inherits(scratch.Root, scratch.SoyComponent);
goog.addSingletonGetter(scratch.Root);


/** @override */
scratch.Root.prototype.getTemplate = goog.functions.constant(
    scratch.root.templates.root);


/** @override */
scratch.Root.prototype.decorateInternal = function(element) {
    this.logger_.warning('calling super decorateInternal');
    goog.base(this, 'decorateInternal', element);

    this.logger_.warning('adding Blockly');

    this.addChild(new scratch.Blockly(), true);
    this.addChild(new scratch.Stage(), true);
    this.addChild(new scratch.SprintPalette(), true);
};


/**
 * Render our Root on load.
 */
scratch.Root.prototype.listenToLoad = function() {
    this.getHandler().listenOnce(
	goog.global, goog.events.EventType.LOAD, function() {
	    this.render();
	});
};

// Listen to LOAD event.
scratch.Root.getInstance().listenToLoad();
