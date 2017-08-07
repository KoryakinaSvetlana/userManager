angular.module('UserManagerApp.Cservices', [])
    .factory('dateTimeService', function () {

        var dateTimeServiceAPI = {};
      
        dateTimeServiceAPI.format = function (dt, format) {
            var mm = dt.getMonth() + 1; // getMonth() is zero-based
            var dd = dt.getDate();

            return [dt.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
            ].join('-');          
        }

        dateTimeServiceAPI.stringToDate = function (str) { //yyyy-mm-dd
            return new Date(str);
        }

        dateTimeServiceAPI.dateToIsoString = function (dt) {
           return dt.toISOString().split('.')[0] + "Z"; 
        }

        return dateTimeServiceAPI;
    });