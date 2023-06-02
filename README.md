# Tycoon Game Template

Electron powered framework for creating a tycoon style web game, a la cookie clicker.

## What is it

This template provides everything you need to create a tycoon style game out of the box, made easy to expand to suit your preferences and add whatever functionality you deem necessary.

### Edit

You can use the in-line comments in **renderer.js** to make modifications to the game as you wish. Particular areas of interest would be the
**item** list where you can create and modify the various items that can be purchased by the player, and **style.css** where unique identifiers should make it easy to modify various aspects of the user interface.

Example of the item object:

    itemName = {
     id: exclusive num,
     name: visible name,
     cost: value,
     desc: visible description,
     count: num (default 0),
     buy: function(){ ... happens on buy},
     field: document.createElement("fieldset")
    }

## Installation

Installation is standard for an electron package

    npm install
    npm run start

If you want to export your built application to a standalone exe you can follow instructions on doing so from electrons documentation.
