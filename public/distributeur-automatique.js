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


function _init2DArray(m, n) {
    var a = new Array(m);
    for (var i = 0; i < a.length; ++i) {
        a[i] = new Array(n).fill(0);
    }
    return a;
}


function MaxPurchaseSolutionCache(prices) {
    this.prices = prices;
    this.solutionMap = {};

    this.findMaxPurchase = function (priceLen, budget) {
        return this.findMaxPurchaseFast(priceLen, budget);
    };

    this.findMaxPurchaseFast = function (priceLen, budget) {
        var solutionKey = [priceLen, budget].toString();
        if (this.solutionMap.hasOwnProperty(solutionKey)) {
            return this.solutionMap[solutionKey];
        } else {
            var solutionValue = this.findMaxPurchaseSlow(priceLen, budget);
            this.solutionMap[solutionKey] = solutionValue;
            return solutionValue;
        }
    };

    this.findMaxPurchaseSlow = function (priceLen, budget) {
        if (priceLen <= 0) {// || budget <= 0){
            return 0;
        }

        var maxPurchase = this.findMaxPurchaseFast(priceLen - 1, budget);

        var price = this.prices[priceLen - 1];
        if (budget >= price) {
            var purchase = price + this.findMaxPurchaseFast(priceLen, budget - price);
            maxPurchase = Math.max(maxPurchase, purchase);
        }

        return maxPurchase;
    };
}


function MaxPurchaseSolutionDP(prices, budget) {
    function buildMaxPurchaseSolution(prices, budget) {
        var dp = _init2DArray(prices.length + 1, budget + 1);

        for (var priceLen = 1; priceLen <= prices.length; ++priceLen) {
            dp[priceLen][0] = 0;
            for (var partOfBudget = 1; partOfBudget <= budget; ++partOfBudget) {
                var maxPurchase = dp[priceLen - 1][partOfBudget];

                var price = prices[priceLen - 1];
                if (partOfBudget >= price) {
                    var purchase = price + dp[priceLen][partOfBudget - price];
                    maxPurchase = Math.max(maxPurchase, purchase);
                }
                dp[priceLen][partOfBudget] = maxPurchase;
            }
        }

        return dp;
    }

    this.solutionTable = buildMaxPurchaseSolution(prices, budget);

    this.findMaxPurchase = function (priceLen, budget) {
        return this.solutionTable[priceLen][budget];
    };
}


function evaluateMaxPurchase(prices, budget) {
    var solutions = [];
    var path = [];
    var arePricesUnused = new Array(prices.length).fill(true);
    function traceMaxPurchase(maxPurchaseSolution, prices, priceLen, budget) {
        if (priceLen <= 0) {// || budget <= 0){
            solutions.push(path.slice());
            return 0;
        }

        var maxPurchase = maxPurchaseSolution.findMaxPurchase(priceLen, budget);

        var purchaseWithoutThisItem = maxPurchaseSolution.findMaxPurchase(priceLen - 1, budget);
        if (maxPurchase === purchaseWithoutThisItem) {
            traceMaxPurchase(maxPurchaseSolution, prices, priceLen - 1, budget);
        }

        var price = prices[priceLen - 1];
        if (budget >= price) {
            var purchaseWithThisItem = price + maxPurchaseSolution.findMaxPurchase(priceLen, budget - price);
            if (maxPurchase === purchaseWithThisItem) {
                arePricesUnused[priceLen - 1] = false;
                path.push(price);
                traceMaxPurchase(maxPurchaseSolution, prices, priceLen, budget - price);
                path.pop();
            }
        }

        return maxPurchase;
    }

    //var maxPurchaseSolution = new MaxPurchaseSolutionCache(prices);
    var maxPurchaseSolution = new MaxPurchaseSolutionDP(prices, budget);

    var maxPurchase = traceMaxPurchase(maxPurchaseSolution, prices, prices.length, budget, []);

    var unusedPrices = [];
    for (var i in prices) {
        if (arePricesUnused[i]) {
            unusedPrices.push(prices[i]);
        }
    }

    return {
        maxPurchase: maxPurchase,
        unusedPrices: unusedPrices,
        solutions: solutions
    }
}

