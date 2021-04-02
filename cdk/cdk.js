#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const Stack = require('./stack');

new Stack(new cdk.App(), 'FindVaccineNH');
