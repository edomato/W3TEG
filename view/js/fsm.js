var EventStateMachine = function(stateName, transitions) {
    "use strict";
    this.stateName = stateName;
    this.transitions = transitions;
    this.currentState = this.transitions[this.stateName];
    this.events = {};
    this.log = true;

    this.trigger = function(eventName, data) {
        if (this.currentState[eventName]) {
            this.stateName = this.currentState[eventName];
            if (this.log) {
                console.log("FSM Event: " + eventName + ". New state is: " + this.stateName);
            }
            this.currentState = this.transitions[this.stateName];
            this.cb(eventName, data);
        } else {
            if (this.log) {
                console.log("FSM Event: Trigger " + eventName + " is not available on state " + this.stateName);
            }
            return false;
        }
    };

    this.on = function(eventName, callback) {
        if (!this.events[eventName]) {
            // array of callback's
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    };

    this.cb = function(eventName, data) {
        if (this.events[eventName]) {
            // call every event callback's
            for (var i = 0; i < this.events[eventName].length; i++) {
                this.events[eventName][i](data);
            }
        } else {
            return false;
        }
        return true;
    };

};
