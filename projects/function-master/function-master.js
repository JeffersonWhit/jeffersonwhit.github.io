//////////////////////////////////////////////////////////////////////
// Function 1 - Object Values ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function objectValues(object) {
    var out = [];
    
    for(var i in object){
        out.push(object[i]);
    }
    
    return out;
} 

//////////////////////////////////////////////////////////////////////
// Function 2 - Keys to String ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function keysToString(object) {
    var out = "";
    
    for(var i in object){
        if(out!='') out += " ";
        out += i;
    }
    
    return out;
}

//////////////////////////////////////////////////////////////////////
// Function 3 - Values to String /////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function valuesToString(object) {
    var out = "";
    
    for(var i in object){
        if(typeof object[i] == "string") {
            if(out!='') out += " ";
            out += object[i];
        }
    }
    
    return out;
}

//////////////////////////////////////////////////////////////////////
// Function 4 - Array or Object //////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function arrayOrObject(collection) {
    if(Array.isArray(collection)) {return "array"} else {return "object"}
}

//////////////////////////////////////////////////////////////////////
// Function 5 - Capitalize Word //////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function capitalizeWord(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

//////////////////////////////////////////////////////////////////////
// Function 6 - Capitalize All Words /////////////////////////////////
//////////////////////////////////////////////////////////////////////

function capitalizeAllWords(string) {
    var inp = string.split(" ");
    var out = [];
    
    for(var i = 0; i < inp.length; i++){
        out.push(inp[i].charAt(0).toUpperCase() + inp[i].substring(1));
    }
    
    return out.join(" ");
}

//////////////////////////////////////////////////////////////////////
// Function 7 - Welcome Message //////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Name needs to be capitalized.

function welcomeMessage(object) {
    return 'Welcome ' + object.name.charAt(0).toUpperCase() + object.name.substring(1) + '!'; 
}

//////////////////////////////////////////////////////////////////////
// Function 8 - Profile Info /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Name *and* Species need to be capitalized.

function profileInfo(object) {
    return object.name.charAt(0).toUpperCase() + object.name.substring(1) + " is a " + object.species.charAt(0).toUpperCase() + object.species.substring(1);
}

//////////////////////////////////////////////////////////////////////
// Function 9 - Maybe Noises /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function maybeNoises(object) {
    
    if (object.hasOwnProperty('noises') && object.noises.length > 0){
        return object.noises.join(' ');
    }
    
    return 'there are no noises';
}

//////////////////////////////////////////////////////////////////////
// Function 10 - Has Words ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function hasWord(string, word) {
    if(string.split(word).length > 1){
        return true;
    } else {
        return false;
    }
}

//////////////////////////////////////////////////////////////////////
// Function 11 - Add Friend //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function addFriend (name, object) {
    object.friends.push(name);
    return object;
}

//////////////////////////////////////////////////////////////////////
// Function 12 - Is Friend ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function isFriend(name, object) {
    if(!object.friends) return false;
    for(var i = 0; i < object.friends.length; i++){
        if(object.friends[i] == name) return true;
    }
    return false
}

//////////////////////////////////////////////////////////////////////
// Function 13 - Non-Friends /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function nonFriends(name, array) {
    var list = [];
    var friendTest;
    
    for(var foo = 0; foo < array.length; foo++){
        if(array[foo].name == name) continue;
        friendTest = false;
        for(var bar = 0; bar < array[foo].friends.length; bar++){
            if(array[foo].friends[bar] == name){
                friendTest = true;
            }
        }
        if(!friendTest) list.push(array[foo].name);
    }
    
    return list;
}

//////////////////////////////////////////////////////////////////////
// Function 14 - Update Object ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function updateObject(object, key, value) {
    object[key] = value;
    return object;
}

//////////////////////////////////////////////////////////////////////
// Function 15 - Remove Properties ///////////////////////////////////
//////////////////////////////////////////////////////////////////////

function removeProperties(object, array) {
    
    for (var i = 0; i <= array.length; i++){
        if (object[array[i]] != undefined){
            delete object[array[i]]
        }
    }
}

//////////////////////////////////////////////////////////////////////
// Function 16 - Dedup ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function dedup(array) {
    
    var out = [array[0]];
    var i = 0;
    
    array.sort();
    
    for(var foo = 0; foo < array.length; foo++){
        if(array[foo] != out[i]){
            out.push(array[foo]);
            i++;
        }
    }
    
    return out;
    
    /*
    
    Here for historical purposes.
    
    for(var foo = 0; foo < array.length; foo++){
        for(var bar = 0 ; bar < array.length; bar++){
            if(array[foo] == array[bar] && foo != bar) array.splice(bar, 1);
        }
    }
    
    */
    
}

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

if((typeof process !== 'undefined') &&
   (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports.objectValues = objectValues;
    module.exports.keysToString = keysToString;
    module.exports.valuesToString = valuesToString;
    module.exports.arrayOrObject = arrayOrObject;
    module.exports.capitalizeWord = capitalizeWord;
    module.exports.capitalizeAllWords = capitalizeAllWords;
    module.exports.welcomeMessage = welcomeMessage;
    module.exports.profileInfo = profileInfo;
    module.exports.maybeNoises = maybeNoises;
    module.exports.hasWord = hasWord;
    module.exports.addFriend = addFriend;
    module.exports.isFriend = isFriend;
    module.exports.nonFriends = nonFriends;
    module.exports.updateObject = updateObject;
    module.exports.removeProperties = removeProperties;
    module.exports.dedup = dedup;
}