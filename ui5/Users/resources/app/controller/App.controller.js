sap.ui.define([
    "com/laravelui5/core/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], function (BaseController, Filter, FilterOperator) {
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
        }
    });
});
