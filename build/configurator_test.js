(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Configurator class for storing key-value pairs in localStorage
 * or for a single session
 *
 * @author Abhay Rana <capt.n3m0@gmail.com>
 * @contributor Amanpreet Singh <apsdehal@gmail.com>
 */  

// Export the module
module.exports = Configurator;

/**
 * Constructor function for configurator, gets config back from localStorage back if there is one
 * initialize a config property with key-value pairs from localStorage config and passed default
 * config
 *
 * @param object defaultConfig Object that is to made default config for the model
 * @param array persistent Key strings array that you want to be persitent via localStorage
 */

function Configurator (defaultConfig, persistent) {
  // The default object
  this.config = defaultConfig||{};
  this.persistent = persistent||[];
  // this is an array of configuration keys that remain persistent
  // using localStorage
  var conf = JSON.parse(localStorage.getItem('config'));
  if (conf) {
    for (i in this.conf) {
      this.config[i] = conf[i];
    }
  }
};

/** 
 * Canonical function to abstract working of config, returns the value for particular key
 * Loops through the config object recursively if such a key is passed (see further comments)
 *
 * @param string key Returns the value for a particular key
 */

Configurator.prototype.get = function (key) {
  // if key is direct (usual case)
  if (key.indexOf('.') < 0) {
    return this.config[key];
  }
  // if key is hidden inside some place
  // so key is something like "radioSettings.capital.url"
  var keys = key.split('.');
  var conf = this.config;
  // this will loop something like :
  // conf=conf['radioSettings']
  // conf=conf['capital']
  // conf=conf['url']
  // and finally return the requested key
  for(i in keys){
    conf = conf[keys[i]];
  }
  return conf;
};

/**
 * Set a key in the config
 * If the key is persistent, it is saved across to 
 * localStorage for persistence as well
 * from where it is retreived on next run
 *
 * @param string key String for which value is to set
 * @param string value String value which has to be set
 * @param boolean per If this key has to be persistent
 */

Configurator.prototype.set = function (key, value, per) {
  per = per||false;
  if (key.indexOf('.') < 0) {
    this.config[key] = value;
  } else {
    // they key is nested
    var keys=key.split('.');
    // a.b.c.d=value => {a:{b:{c:{d:value}}}}
    for (var i = 0, tmp = this.config; i < keys.length - 1; i++) {
       tmp = tmp[keys[i]] = {};
    }
    tmp[keys[i]] = value;
  }
  // if key is persistent and it's not already in the persistent list
  if (per && this.persistent.indexOf(key) < 0) {
    this.persistent.push(key);
  }
  //we update the localStorage config as well
  //if the key was persistent
  if (this.persistent.indexOf(key) > -1) {
    //create a new object with persistent stuff only
    var obj = {};
    for (i in this.persistent) {
      var key = this.persistent[i];
      obj[key] = this.config[key];
    }
    localStorage.setItem('config',JSON.stringify(obj));
  }
};

/** 
 * Clear localStorage
 * while making sure that persistent
 * config is not affected
 */

Configurator.prototype.clearLS = function () {
  localStorage.clear();
  localStorage.setItem('config',JSON.stringify(this.config));
};
},{}],2:[function(require,module,exports){
var Configurator = require('../src/configurator.js');

describe("Configurator", function() {
  var config = new Configurator(
    {
      a:12,
      b:2
    }
    ,['b']
  );

  it("should initialize with default values", function() {
    expect(config.get('a')).toBe(12);
    expect(config.get('b')).toBe(2);
  });

  it("should set nested values",function(){
  	config.set("x.b.c.d",123);
  	expect(config.get("x.b.c.d")).toBe(123);
  });

  it("should persist values after clearing localStorage",function(){
  	config.clearLS();
  	expect(config.get("b")).toBe(2);
  });

  it("should add persistent keys", function(){
  	config.set("c",3,true);
  	config.clearLS();
  	expect(config.get("c")).toBe(3);
  });

});

},{"../src/configurator.js":1}]},{},[2]);
