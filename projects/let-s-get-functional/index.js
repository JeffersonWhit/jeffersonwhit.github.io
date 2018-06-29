// #!/usr/bin/env node

'use strict';

var customers = require('./data/customers.json');
var _ = require('lodown-jeffersonwhit');

/**
 * 1. Import your lodown module using the require() method,
 *    using the string 'lodown-<my-username>', or whatever
 *    name with which you published your npm lodown project.
 *
 * 2. Solve all problems as outlined in the README.
 *
 * 3. We started the first one for you as an example! Make the rest in that style.
 *
 * 4. To test your work, run the following command in your terminal:
 *
 *    npm start --prefix ./projects/let-s-get-functional
 */

var maleCount = function(array) {
    var count = 0;
    _.filter(array, function(e, i, a){
        if(e.gender == 'male') count++;
    });
    return count;
};

var femaleCount = function(array) {
    var out = 0;
    
    // REDUCE MACHINE 🅱ROKE //
    _.each(array, function(e, i, a){
       if(e.gender == 'female') out++; 
    });
    
    console.log(out);
    return out;
};

var oldestCustomer = function(array) {
    var out = array[0];
    _.each(array, function(e, k, a){
        if(e.age > out.age) out = e;
    });
    return out.name;
};

var youngestCustomer = function(array) {
    var out = array[0];
    _.each(array, function(e, k, a){
        if(e.age < out.age) out = e;
    });
    return out.name;
};

var averageBalance = function(array) {
    var comp = 0;
    _.each(array, function(e, k, a){
        comp +=  parseFloat(e.balance.replace('$', '').replace(',', ''));
    });
    return (comp/array.length);
};

var firstLetterCount = function(array, letter){
    return _.filter(array, function(e, i, a){
        return (e.name[0].toLowerCase() == letter.toLowerCase());
    }).length;
};

var friendFirstLetterCount = function(array, customer, letter){
    /* return _.unique(_.filter(array, function(e, i, a){
        if(array.name == customer.name){
            return (_.some(e.friends, function(e, k, a){
                return (e.name[0].toLowerCase() == letter.toLowerCase());
            }));
        }
    })).length; */
    
    var target = 0;
    
    _.each(array, function(e, i, a) {
        if(e.name === customer) target = i;
    });
    
    return _.filter(array[target].friends, function(e, i, a){
        return (e.name[0].toLowerCase() == letter.toLowerCase());
    }).length;
};

var friendsCount = function(array, name){
    var ref = _.filter(array, function(e, i, a){
        return _.some(e.friends, function(e, k, a) {
            return(e.name == name);
        });
    });
    
    var out = [];
    _.each(ref, function(e, i, a){
        out.push(e.name);
    });
    return out;
};

var topThreeTags = function(array){
    
    var tags = [];
    
    _.each(array, function(e, i, a) {
        _.each(e.tags, function(e, i, a) {
            tags.push(e);
        });
    });
    
    var ref = _.unique(tags);
    
    var objRef = {};
    
    _.each(ref, function(reference, i, a) {
        objRef[reference] = 0;
        _.each(tags, function(e, i, a){
            if(e == reference) objRef[reference]++;
        });
    });
    
    var out = ['Alpha', 'Beta', 'Gamma'];
    
    _.each(out, function(e, i, a){
        let storage = ref[0];
        _.each(objRef, function(e, k, a) {
            if(e > objRef[storage]) storage = k;
        });
        a[i] = storage;
        delete objRef[storage];
    });
    
    return out;
    
};

var genderCount = function(array){
    var int = [];
    var out = {};
    
    _.each(array, function(e, k, a) {
        int.push(e.gender);
    });
    
    var ref = _.unique(int);
    
    // REDUCE MACHINE 🅱ROKE //
    _.each(ref, function(reference, i, a) {
        out[reference] = 0;
        _.each(int, function(e, i, a){
            if(e == reference) out[reference]++;
        });
    });
    
    console.log(int, ref, out);
    
    return out;
};

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// here, export any references you need for tests //
module.exports.maleCount = maleCount;
module.exports.femaleCount = femaleCount;
module.exports.oldestCustomer = oldestCustomer;
module.exports.youngestCustomer = youngestCustomer;
module.exports.averageBalance = averageBalance;
module.exports.firstLetterCount = firstLetterCount;
module.exports.friendFirstLetterCount = friendFirstLetterCount;
module.exports.friendsCount = friendsCount;
module.exports.topThreeTags = topThreeTags;
module.exports.genderCount = genderCount;
