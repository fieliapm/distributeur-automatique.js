/*
 * distributeur-automatique.js - evaluate max purchase strategy
 * Copyright (C) 2021-present Himawari Tachibana <fieliapm@gmail.com>
 *
 * This file is part of date-boundary.js
 *
 * distributeur-automatique.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* jshint esversion: 6 */


"use strict";


function parseNumberArray(numberArrayStr) {
    return numberArrayStr.split(",").map(function (num) {
        return parseInt(num);
    });
}

function formatNumberArray(numberArray) {
    return numberArray.map(function (num) {
        return num.toString();
    }).join(",");
}


const COOKIE_KEY = "distributeur-automatique";

function loadStorage() {
    var jsonData = getCookie(COOKIE_KEY);
    if (jsonData !== undefined) {
        return JSON.parse(jsonData);
    } else {
        return null;
    }
}

function saveStorage(prices, budget) {
    var jsonData = JSON.stringify({ prices: prices, budget: budget });
    setCookieToExpireAfter1Month(COOKIE_KEY, jsonData);
}

function clearStorage() {
    clearCookie(COOKIE_KEY);
}

