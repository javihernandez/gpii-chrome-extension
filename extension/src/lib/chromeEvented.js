/* eslint-env node */
/* global fluid, require */

"use strict";

var gpii = fluid.registerNamespace("gpii");
var chrome = chrome || require("sinon-chrome");

fluid.defaults("gpii.chrome.eventedComponent", {
    gradeNames: "fluid.component",
    events: {
        onTabOpened: null,
        onTabUpdated: null
    },
    listeners: {
        onCreate: {
            funcName: "gpii.chrome.eventedComponent.init",
            args: "{that}"
        }
    }
});

gpii.chrome.eventedComponent.init = function (that) {
    chrome.tabs.onCreated.addListener(function (tab) {
        that.events.onTabOpened.fire(tab);
    });
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, oldTabStatus) {
        that.events.onTabUpdated.fire(tabId, changeInfo, oldTabStatus);
    });
};
