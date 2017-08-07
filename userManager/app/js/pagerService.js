angular.module('UserManagerApp.Bservices', [])
    .factory('pagerService', function () {
        return {
            // service implementation
            getPager: function (totalItems, currentPage, pageSize) {
                // default to first page
                currentPage = currentPage || 1;

                // default page size is 10
                pageSize = pageSize || 10;

                // calculate total pages
                var totalPages = Math.ceil(totalItems / pageSize);

                var startPage, endPage;
                if (totalPages <= 10) {
                    // less than 10 total pages so show all
                    startPage = 1;
                    endPage = totalPages;
                } else {
                    // more than 10 total pages so calculate start and end pages
                    if (currentPage <= 6) {
                        startPage = 1;
                        endPage = 10;
                    } else if (currentPage + 4 >= totalPages) {
                        startPage = totalPages - 9;
                        endPage = totalPages;
                    } else {
                        startPage = currentPage - 5;
                        endPage = currentPage + 4;
                    }
                }

                // calculate start and end item indexes
                var startIndex = (currentPage - 1) * pageSize;
                var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

                // create an array of pages to ng-repeat in the pager control
                var pages = this.getRange(startPage, endPage, 1);

                // return object with all pager properties required by the view
                return {
                    totalItems: totalItems,
                    currentPage: currentPage,
                    pageSize: pageSize,
                    totalPages: totalPages,
                    startPage: startPage,
                    endPage: endPage,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    pages: pages
                };
            },
            getRange: function(start, end, step) {
                var range = [];
                var typeofStart = typeof start;
                var typeofEnd = typeof end;

                if (step === 0) {
                    throw TypeError("Step cannot be zero.");
                }

                if (typeofStart == "undefined" || typeofEnd == "undefined") {
                    throw TypeError("Must pass start and end arguments.");
                } else if (typeofStart != typeofEnd) {
                    throw TypeError("Start and end arguments must be of same type.");
                }

                typeof step == "undefined" && (step = 1);

                if (end < start) {
                    step = -step;
                }

                if (typeofStart == "number") {

                    while (step > 0 ? end >= start : end <= start) {
                        range.push(start);
                        start += step;
                    }

                } else if (typeofStart == "string") {

                    if (start.length != 1 || end.length != 1) {
                        throw TypeError("Only strings with one character are supported.");
                    }

                    start = start.charCodeAt(0);
                    end = end.charCodeAt(0);

                    while (step > 0 ? end >= start : end <= start) {
                        range.push(String.fromCharCode(start));
                        start += step;
                    }

                } else {
                    throw TypeError("Only string and number types are supported");
                }

                return range;

            }
        }

    });