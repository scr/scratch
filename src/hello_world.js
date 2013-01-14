goog.provide('hello.world');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.soy.Renderer');
goog.require('goog.ui.Component');

goog.require('hello.world.templates');



/**
 * Class for hello world experimentation.
 * @constructor
 * @extends {goog.ui.Component}
 */
hello.world.HelloWorld = function() {
    goog.base(this);

    /**
     * @type {goog.soy.Renderer}
     * @private
     */
    this.soyRenderer_ = new goog.soy.Renderer();
    this.registerDisposable(this.soyRenderer_);
};
goog.inherits(hello.world.HelloWorld, goog.ui.Component);
goog.addSingletonGetter(hello.world.HelloWorld);


/** @override */
hello.world.HelloWorld.prototype.createDom = function() {
    goog.base(this, 'createDom');

    var element = this.getContentElement();
    this.soyRenderer_.renderElement(element, hello.world.templates.sayHi);
};


/**
 * Renders when the DOM has loaded.
 */
hello.world.HelloWorld.prototype.addLoadListener = function() {
    this.getHandler().listen(
	goog.global, goog.events.EventType.LOAD, function(e) {
	    this.render();
	});
};

// Load the load listener.
hello.world.HelloWorld.getInstance().addLoadListener();
