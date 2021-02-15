var attributionService = (function () {
    // Need to send - ip, items_in_cart, user_status, music_active_subscription
    var init = function (user_id, email, filter, artlist_user, ip, items_in_cart, user_status, footage_active_subscription) {
        var jwtUser = JSON.parse(localStorage.getItem("currentUser"));

        email = email || jwtUser.userName;
        var jwtToken = jwtUser.access_token;

        var categoryIndex = window.location.href.indexOf("category");
        if (!filter && categoryIndex > -1) {
            filter = window.location.href.substring(categoryIndex);
        }

        artlist_user = artlist_user || email && email != "none" ? "true" : "false";

        setSuperProps(filter, ip, items_in_cart);
        setUserProps(user_id, email, artlist_user, user_status, footage_active_subscription);
    }

    var clear = function () {
        setSuperProps();
        setUserProps();
    }

    var setSuperProps = function (filter, ip, items_in_cart) {
        var userSuperProps = {
            [attributionService.properties.userSuper.filter]: filter || "",
            [attributionService.properties.userSuper.ip]: ip || "",
            [attributionService.properties.userSuper.page]: "",
            [attributionService.properties.userSuper.items_in_cart]: items_in_cart || ""
        };

        updateSuperProps(userSuperProps);
    }

    var setUserProps = function (user_id, email, artlist_user, user_status, footage_active_subscription) {
        var userProps = {
            [attributionService.properties.user.user_id]: user_id || "New User",
            [attributionService.properties.user.user_status]: user_status || "",
            [attributionService.properties.user.footage_active_subscription]: footage_active_subscription || "",
            [attributionService.properties.user.artlist_user]: artlist_user || email ? "true" : "false",
            [attributionService.properties.user.email]: email || ""
        };

        updateUserProps(userProps);
    }


    var updateSuperProps = function (object) {
        attribution.register(object);
    }

    var updateUserProps = function (object) {
        attribution.people.set(object);
        object && object.user_id && updateIdentify(object.user_id);
    }

    var updateIdentify = function (userId) {
        attribution.identify(userId);
    }

    var properties = {
        userSuper: {
            user_status: "user_status",
            page: "page",
            ip: "ip",
            filter: "filter",
            items_in_cart: "items_in_cart"
        },
        user: {
            user_id: "user_id",
            user_status: "user_status",
            footage_active_subscription: "footage_active_subscription",
            artlist_user: "artlist_user",
            email: "email"
        }
    }

    return {
        init: init,
        clear: clear,
        setSuperProps: setSuperProps,
        setUserProps: setUserProps,
        updateSuperProps: updateSuperProps,
        updateUserProps: updateUserProps,
        updateIdentify: updateIdentify,
        properties: properties
    }
})();