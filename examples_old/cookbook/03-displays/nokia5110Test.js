#!/usr/bin/env node
//
// Copyright (C) 2012 - Cabin Programs, Ken Keller 
//

var lcd = require('nokia5110');
var b = require('bonescript');
var timeout = 0;
var inverseIndex;

//
//  Must define the following outputs to use LCD_5110.js
//
lcd.PIN_SDIN = "P9_17";
lcd.PIN_SCLK = "P9_21";
lcd.PIN_SCE  = "P9_11";
lcd.PIN_DC   = "P9_15";
lcd.PIN_RESET= "P9_13";

lcd.setup();
setTimeout(loop, 0);
// loop();

function loop() {
// test bitmap write
    console.log("test bitmap write");
//    lcd.clear();
    lcd.gotoXY(0, 0);
    lcd.bitmap(beagle);

    inverseIndex = 0;
    setTimeout(loop0, 1000*timeout);
}

function loop0() {
// test inverse video
    console.log("test inverse video");
    if(inverseIndex % 2) {
         lcd.inverse(lcd.LCD_INVERSE);
    } else {
         lcd.inverse(lcd.LCD_NORMAL);
    }

    inverseIndex++;

    if(inverseIndex < 19) {
        setTimeout(loop0, 50*timeout);
    } else {
        setTimeout(loop1, 50*timeout);
    }
}

function loop1() {
// test normal character write
    console.log("test normal character write");
    // lcd.clear();
    lcd.gotoXY(0, 0);
    for ( index = 0x41 ; index < 0x7b ; index++)
        lcd.character(String.fromCharCode(index));

    setTimeout(loop2, 2000*timeout);
}

function loop2() {
// test bitmap and string write
    console.log("test bitmap and string write");
    // lcd.clear();
    lcd.gotoXY(0, 0);
    lcd.bitmap(world_map);

    setTimeout(loop3, 1000*timeout);
}

function loop3() {
    var index;

    for (index=0; index<5; index++)
    {
        lcd.gotoXY(0, 3);
        lcd.string('HELLO WORLD!');
        lcd.gotoXY(0, 3);
        lcd.string('hello world!');
    }

    setTimeout(loop4, 0);
}

function loop4() {
    var index;

// test solid block character 
    console.log("test solid block character");
    // lcd.clear();
    lcd.gotoXY(0, 0);
    for ( index = 0 ; index < 72 ; index++)
        lcd.character(String.fromCharCode(0x7f));

// Scrolling text test
    console.log("Scrolling text test");
    // lcd.clear();
    var theTEXT = "Scroll text...";
    var numScrolls = lcd.scrollLength(theTEXT) * 2;
    
    lcd.scrollInit(3);
    for (index=0; index<numScrolls; index++)
    {
        lcd.scroll(3,theTEXT);
    }
    lcd.scrollInit(3);  // used to clear row

    setTimeout(loop5, 2000*timeout);
}

function loop5() {
    var index;

//  Progress Bar test
    console.log("Progress Bar test");
    lcd.gotoXY(0,0);
    lcd.string("Progress Bar");

    lcd.progressInit(2);
    for (index=0; index<101; index+=2)
      lcd.progressBar(2,index);

    for (index=100; index>=0; index-=2)
      lcd.progressBar(2,index);

    lcd.progressInit(2);
    for (index=100; index>=0; index-=6)
      lcd.progressBar(2,index);

    if(timeout) setTimeout(loop, 2000);
}

var beagle = [
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0xC0, 0x60, 0x60, 0x60, 0x60, 0x60, 0x70, 0xF8, 0xFC,
0x9C, 0x0C, 0x07, 0x07, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x07, 0x06, 0x0C,
0x1C, 0x18, 0x30, 0xE0, 0xC0, 0xC0, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0xE0, 0x70, 0x1E, 0x07, 0x01, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x03, 0x7F, 0xF8, 0xE0, 0x00, 0x00, 0xE0, 0xB0, 0x90, 0xF0, 0xE0, 0xE0,
0xC0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x38, 0x6D, 0x6D, 0x77, 0xFF, 0xEE, 0xF8, 0xC0, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0xE0, 0x38, 0x1E, 0x0F, 0x01, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x3F, 0xFF, 0xF8, 0x81, 0x02,
0x02, 0x03, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x03, 0x03, 0x02, 0x02, 0x06, 0x06, 0x84, 0xCC, 0x9C, 0xF8, 0x70, 0x70, 0x60, 0xC0, 0xC0,
0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xE0, 0xF0, 0xFE, 0xF7, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x07, 0x1F, 0xFC, 0xF0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x1F, 0x7F, 0x78, 0xF8, 0xFC, 0xFC,
0xFE, 0xFE, 0x7E, 0x7F, 0x7F, 0xE2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x07, 0x3F, 0xFF, 0xC0,
0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0xC0, 0xFF, 0x7F, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xC0, 0xC0, 0xE0, 0xE0, 0x60,
0x20, 0x30, 0x30, 0xD0, 0x98, 0x08, 0x1C, 0x3E, 0x63, 0xC1, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0xE0, 0x30, 0x31, 0x33, 0xF7, 0xEF, 0x0E, 0x0C, 0x1C, 0x38, 0xF8, 0xF8, 0x18, 0x18, 0x18,
0x18, 0x18, 0x18, 0x18, 0x1C, 0x1C, 0x0E, 0x0E, 0x07, 0x03, 0x01, 0x00, 0x00, 0x00, 0x10, 0x10,
0x30, 0x30, 0x60, 0x60, 0x60, 0x60, 0x40, 0x45, 0x43, 0x43, 0x47, 0x47, 0x7F, 0x7F, 0xFF, 0xFF,
0x0F, 0x0F, 0x0F, 0x0E, 0x1D, 0x38, 0x30, 0x30, 0x21, 0x23, 0x24, 0x24, 0x38, 0x0F, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x0F, 0xFA, 0xF0, 0xE0, 0x8F, 0x3F, 0x7E, 0xD8, 0x30, 0xF0, 0xFF,
0xFF, 0x00, 0x00, 0x00, 0xC0, 0xC0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xE0, 0xC0, 0x00,
0x00, 0x02, 0x06, 0xFF, 0xF8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x03, 0x0F, 0x3F, 0xFC, 0xF0,
0xE0, 0x01, 0x03, 0x03, 0x01, 0x00, 0x00, 0x00, 0x1F, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0xF0,
0xF0, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0xF0, 0x00, 0x00, 0x00, 0x00,
0x70, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x01, 0x03, 0x87, 0xFE, 0x7C, 0x60, 0x00, 0x00, 0x00, 0xC0, 0xFF, 0x3F, 0x00,
0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFE, 0xFF, 0x0F,
0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0x3F, 0xFE, 0x00, 0x00, 0x3C, 0x7F, 0xFF, 0xE0, 0xC0, 0x80,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0E, 0x3F, 0xFF, 0xE1, 0xC0, 0xC0, 0x80, 0xE0, 0x78, 0x0E,
0x03, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xDF, 0x31, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x70, 0xF1, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0x0D, 0x30, 0xE0, 0x80, 0x80,
0x80, 0x81, 0xFF, 0xFF, 0x1C, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00,
0x20, 0x00, 0x00, 0x00, 0x50, 0x00, 0x00, 0x00, 0x90, 0x00, 0x00, 0x00, 0xC0, 0x20, 0x20, 0x00,
0xF7, 0x5E, 0x5E, 0x0C, 0xEC, 0x8C, 0x84, 0x0E, 0xBE, 0x9E, 0x9F, 0x0F, 0x87, 0x91, 0x80, 0x00,
0x90, 0x90 ];

var world_map = [
 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
 0x00, 0x00, 0x80, 0x00, 0x60, 0xC0, 0xF0, 0xDC, 0x7C, 0X3C, 0x1C, 0xF0, 0xF8, 0xF0, 0xF0,
 0xF8, 0xF8, 0xFE, 0xFE, 0xE6, 0xD4, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x80,
 0x40, 0x00, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
 0x00, 0x60, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
 0x00, 0x00, 0x00, 0x00, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00, 0x00, 0x00, 0xB0, 0x70,
 0xC0, 0x60, 0x00, 0xB0, 0x90, 0x28, 0xE3, 0x41, 0xC0, 0x81, 0x01, 0x03, 0x0F, 0x3F, 0xFF,
 0xFF, 0xFF, 0xFF, 0xBF, 0x0F, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x81, 0x81,
 0x80, 0x80, 0x00, 0x00, 0x00, 0x00, 0x70, 0x08, 0x84, 0x40, 0x00, 0xE0, 0x80, 0xF0, 0xF8,
 0xF8, 0xFC, 0xFC, 0xEC, 0xE0, 0xE0, 0xE0, 0xE0, 0xC0, 0xC0, 0xE0, 0xC0, 0xC0, 0x80, 0x00,
 0x80, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
 0x00, 0x00, 0x00, 0x00, 0x0B, 0x3F, 0x0F, 0x0F, 0x0F, 0x0F, 0x1F, 0x3F, 0xFF, 0xFF, 0xFF,
 0xFE, 0xFF, 0xFE, 0xFE, 0xE7, 0xC1, 0xC1, 0x00, 0xF8, 0xF7, 0xE5, 0xC0, 0x00, 0x03, 0x0F,
 0x07, 0x01, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00, 0x80, 0x00, 0x98, 0xBC, 0xD7, 0xE9,
 0xEF, 0xFF, 0xFD, 0xFC, 0xFE, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xFE, 0xFF, 0xFF, 0xFF,
 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xBF, 0x0F, 0x0F, 0x0F, 0x0F, 0x3F,
 0x0F, 0x0F, 0x07, 0x03, 0x02, 0x00, 0x00, 0x00, 0x00, 
 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0F, 0x1F,
 0x3F, 0x7F, 0xFF, 0x7F, 0x3F, 0x3E, 0x3D, 0x1B, 0x07, 0x03, 0x01, 0x00, 0x01, 0x00, 0x00,
 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0xC0, 0xEC, 0xED, 0xF3, 0xF3, 0xE5, 0xC3, 0xEF,
 0xE7, 0xE9, 0x29, 0xFB, 0xFF, 0xB1, 0xBD, 0x7F, 0x7F, 0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F,
 0xFF, 0xFF, 0xFF, 0xFF, 0x7F, 0x67, 0x07, 0x07, 0x13, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
 0x00, 0x00, 0x00, 0x01, 0x00, 0x03, 0x02, 0x30, 0xFC, 0xFC, 0xFC, 0xF8, 0xF8, 0xE0, 0xE0,
 0xE0, 0x40, 0x00, 0x00, 0x00, 0x00, 0x03, 0x07, 0x07, 0x07, 0x07, 0x07, 0xBF, 0xFF, 0xFF,
 0xFF, 0xFF, 0xFF, 0x1E, 0x0F, 0x05, 0x01, 0x00, 0x00, 0x00, 0x00, 0x07, 0x01, 0x00, 0x00,
 0x01, 0x11, 0x23, 0x10, 0x10, 0x00, 0x00, 0x00, 0x80, 0x20, 0xA0, 0x00, 0x00, 0x00, 0x00,
 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFC, 0x7F, 0x3F, 0x0F, 0x0F, 0x03,
 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x07, 0x0F,
 0x0F, 0x07, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
 0x00, 0x00, 0x00, 0x00, 0x06, 0x0E, 0x0F, 0x0F, 0x0F, 0x0F, 0x1F, 0x5E, 0x0C, 0x00, 0x00,
 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]; 

