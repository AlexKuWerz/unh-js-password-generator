'use strict';

let generateBtn = document.querySelector("#generate");

function getRandomInt(max) {
    // return random integer from 0 to 'max'
    return Math.floor(Math.random() * Math.floor(max));
}

// Generate random password
function generatePassword() {
    let characters = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'abcdefghijklmnopqrstuvwxyz'.toUpperCase(),
        numeric: '0123456789',
        special: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
    };

    let validation = {
        maxLength: 128,
        minLength: 8,
        passwordLength: 0,
        isLowercase: false,
        isUppercase: false,
        isNumeric: false,
        isSpecial: false,
        typeSelectAlert: 'Please, try again and select at least one character type',
        wrongValueAlert: 'You didn\'t enter a password length or entered a wrong value. Please try again',
        lengthAlert: '',
    }

    validation.lengthAlert = `Please, enter Password length from ${validation.minLength} to ${validation.maxLength}`;
    validation.passwordLength = parseInt(prompt(`${validation.lengthAlert}:`));

    if (isNaN(validation.passwordLength)) {
        // if user enter something that not parse to integer or click 'cancel'
        return validation.wrongValueAlert;
    }

    if (validation.passwordLength > validation.maxLength
    || validation.passwordLength < validation.minLength) {
        // if user enter number not from range between 'validation.minLength' and 'validation.maxLength'
        return validation.lengthAlert;
    }

    validation.isLowercase = confirm('Do you want to use lowercase letters?');
    validation.isUppercase = confirm('Do you want to use uppercase letters?');
    validation.isNumeric = confirm('Do you want to use numbers?');
    validation.isSpecial = confirm('Do you want to use special characters?');

    if (!validation.isLowercase
    && !validation.isUppercase
    && !validation.isNumeric
    && !validation.isSpecial) {
        // if at least NO one character type selected
        return validation.typeSelectAlert;
    }

    let selectedChars = '';

    if (validation.isLowercase) {
        // add lowercase chars to seleted characters set if chosen by user
        selectedChars += characters.lowercase;
    }

    if (validation.isUppercase) {
        // add uppercase chars to seleted characters set if chosen by user
        selectedChars += characters.uppercase;
    }

    if (validation.isNumeric) {
        // add numeric chars to seleted characters set if chosen by user
        selectedChars += characters.numeric;
    }

    if (validation.isSpecial) {
        // add special chars to seleted characters set if chosen by user
        selectedChars += characters.special;
    }

    let password = '';

    for (let i = 0; i < validation.passwordLength; i++) {
        // pick random char from seleted characters set and add to password
        password += selectedChars[getRandomInt(selectedChars.length)];
    }

    return password;
}

// Write password to the #password input
function writePassword() {
    let password = generatePassword();

    if (password === undefined) {
        return;
    }

    let passwordText = document.querySelector("#password");

    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
