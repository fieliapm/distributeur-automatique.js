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


function setCookie(key, value, expire) {
    document.cookie = key + "=" + value + ";expires=" + expire.toUTCString();
}

function clearCookie(key) {
    document.cookie = key + "=;expires=" + (new Date(0)).toUTCString();
}

function getCookies() {
    var cookieStr = document.cookie;

    var cookies = {};
    var cookieArray = cookieStr.split(";");
    for (var i in cookieArray) {
        var cookiePair = cookieArray[i].split("=");
        cookiePair[0] = cookiePair[0].trim();
        if (cookiePair[0] !== "") {
            cookies[cookiePair[0]] = cookiePair[1];
        }
    }
    return cookies
}

function getCookie(key) {
    var cookies = getCookies();
    return cookies[key];
}


function addMonth(date, offset) {
    var dateOffset = new Date(date);
    dateOffset.setMonth(dateOffset.getMonth() + offset);
    return dateOffset;
}

function setCookieToExpireAfter1Month(key, value) {
    setCookie(key, value, addMonth(new Date(), 1));
}

