#!/usr/bin/env node
'use strict';

const oui = require("./oui.json");

const ouiLookup = mac => {
  const prefix = mac.replace(/:|-/g, "").toUpperCase();

  return oui[prefix.slice(0, 6)] ||
    oui[prefix.slice(0, 7)] ||
    oui[prefix.slice(0, 9)];
};

module.exports = ouiLookup;

if(typeof require != "undefined" && require.main === module) {
  let macAddr = process.argv[2];
  if(!macAddr) {
    console.error("usage: oeuia <mac address>");
    return process.exit(2);
  }

  let org = ouiLookup(macAddr);
  if(org) {
    console.log(org);
    process.exit(0);
  }
  else {
    process.exit(1);
  }
}


