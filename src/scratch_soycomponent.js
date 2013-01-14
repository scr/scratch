/**
 * @fileoverview A simple soy rendering component.
 */

goog.provide('scratch.SoyComponent');

goog.require('goog.soy.Renderer');
goog.require('goog.ui.Component');



/**
 * @param {goog.dom.DomHelper=} opt_domHelper The optional dom helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
scratch.SoyComponent = function(opt_domHelper) {
    goog.base(this, opt_domHelper);

    /**
     * @type {goog.soy.Renderer}
     * @private
     */
    this.soyRenderer_ = new goog.soy.Renderer();
    this.registerDisposable(this.soyRenderer_);

    /**
     * @type {!Object}
     * @private
     */
    this.context_ = {};
};
goog.inherits(scratch.SoyComponent, goog.ui.Component);


/**
 * @return {!function(Object=, boolean=):string} The templating function.
 */
scratch.SoyComponent.prototype.getTemplate = goog.abstractMethod;


/** @override */
scratch.SoyComponent.prototype.createDom = function() {
    this.decorate(this.getDomHelper().createElement('div'));
};


/** @override */
scratch.SoyComponent.prototype.decorateInternal = function(element) {
    this.setElementInternal(element);
    this.soyRenderer_.renderElement(
	element, this.getTemplate(), this.getContext(element));
};


/**
 * @param {Element} element The element to get context for.
 * @return {!Object}
 */
scratch.SoyComponent.prototype.getContext = function(element) {
    return this.context_;
};
