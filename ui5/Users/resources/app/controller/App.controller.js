sap.ui.define([
    "com/laravelui5/core/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/laravelui5/core/LaravelUi5",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
], function (BaseController, Filter, FilterOperator, LaravelUi5, MessageBox, MessageToast) {
    "use strict";

    return BaseController.extend("io.pragmatiqu.users.controller.App", {
        onSearch: function (event) {
            const q = event.getParameter("newValue");
            const list = this.byId("usersList");
            const binding = list.getBinding("items");

            const filters = [];
            if (q) {
                filters.push(new Filter({
                    path: "name",
                    operator: FilterOperator.Contains,
                    value1: q
                }));
            }
            binding.filter(filters);
        },

        onUserSelect: function (event) {
            const item = event.getParameter("listItem");
            const context = item.getBindingContext();
            const detailPage = this.byId("detailPage");
            detailPage.setBindingContext(context);
            this.byId("app").to(detailPage);
        },

        onToggleLock: async function (event) {
            const userPage = this.byId("detailPage");
            const context = userPage.getBindingContext();
            const userId = context.getProperty("id");

            try {
                await LaravelUi5.call("toggle-lock", {user: userId});
                context.requestRefresh();
                MessageToast.show("User lock state toggled");
            }
            catch (error) {
                console.error("Failed to toggle lock: ", error);
                MessageBox.error("Failed to toggle lock!");
            }
        }
    });
});
