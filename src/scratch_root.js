/**
 * @fileoverview root component of the scratch app.
 */

goog.provide('scratch.Root');

goog.require('goog.functions');
goog.require('goog.debug.FancyWindow');
goog.require('goog.debug.Logger');
goog.require('goog.dom.classes');
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
scratch.Root.prototype.createDom = function() {
    this.logger_.warning('calling super createDom');
    var element = goog.base(this, 'createDom');

    this.logger_.warning('adding Blockly');

    var body = new goog.ui.Component(this.getDomHelper());
    this.addChild(body, true);
    var left = new goog.ui.Component(this.getDomHelper());
    body.addChild(left, true);
    goog.dom.classes.add(left.getElement(), goog.getCssName('scratch-root-left'));
    var right = new goog.ui.Component(this.getDomHelper());
    body.addChild(right, true);
    goog.dom.classes.add(right.getElement(), goog.getCssName('scratch-root-right'));

    left.addChild(new scratch.Blockly(), true);
    right.addChild(new scratch.Stage(), true);
    right.addChild(new scratch.SprintPalette(), true);

    return element;
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
