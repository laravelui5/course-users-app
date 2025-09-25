sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel"
], function (
    UIComponent,
    Device,
    JSONModel
) {
    "use strict";

    return UIComponent.extend("io.pragmatiqu.users.Component", {
        metadata: {
            manifest: "json",
            interfaces: ["sap.ui.core.IAsyncContentCreation"]
        },
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.call(this); // create the views based on the url/hash

            // ---
            // Why not just use `LaravelUi5` at the top of this module?
            // Short answer: `library-preload.js` timing.
            //
            // When OpenUI5 loads your self-contained app, it tries to fetch all required modules early.
            // But if your app depends on a custom library (like `io.pragmatiqu.core`),
            // and that library is bundled in a `library-preload.js` file,
            // you need to wait until it's fully registered *before* using its exports.
            //
            // If you `sap.ui.define([...], function(..., LaravelUi5) {...})` too early,
            // the preload hasn’t registered `LaravelUi5.js` yet,
            // and you’ll get undefined — or worse, an ugly 404.
            //
            // So here, we delay loading until runtime with `sap.ui.require()`.
            // This guarantees the preload is in place, and your module resolves cleanly.
            //
            // Feels a little weird? Yep. But it works. And it’s the officially supported way
            // to safely access modules inside a preloaded UI5 library.
            // ---
            const that = this;
            sap.ui.require(["com/laravelui5/core/LaravelUi5"], function (LaravelUi5) {
                LaravelUi5.init(that);
            });

            // create the device model
            this.setModel(new JSONModel(Device), "device");
        },

        /**
         * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
         * design mode class should be set, which influences the size appearance of some controls.
         * @public
         * @returns {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
         */
        getContentDensityClass: function () {
            if (this.contentDensityClass === undefined) {
                // check whether FLP has already set the content density class; do nothing in this case
                if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
                    this.contentDensityClass = "";
                } else if (!Device.support.touch) {
                    // apply "compact" mode if touch is not supported
                    this.contentDensityClass = "sapUiSizeCompact";
                } else {
                    // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
                    this.contentDensityClass = "sapUiSizeCozy";
                }
            }
            return this.contentDensityClass;
        }
    });
});
