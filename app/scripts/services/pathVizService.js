'use strict';

angular.module('a3App')
  .service('pathVizService', function (CsvReaderService) {
    var self = this;

    self.courseData = [];
    self.alumniData = [];
    self.loadData = function (callback) {
      CsvReaderService.read('/images/anon689_2.csv', callback);  
    }
    self.loadData2 = function (callback) {
      CsvReaderService.read2Json('/images/anon689_2.csv', callback);  
    }
    self.loadCourseData = function (callback) {
      CsvReaderService.read('/images/course.csv', callback);
    }
    self.loadAlumniData = function (callback) {
      CsvReaderService.read('/images/alumni.csv', callback);
    }
    self.onCourseDataLoaded = function (data) {
        angular.forEach(data, function (row, index) {
            // Skip header
            if (index === 0)
                return;
            self.courseData.push({
                id: row[0],
                number: row[1],
                name: row[2],
                coord: {x: row[0]/3 * 100, y: index%3 * 100},
                popularity: row[3]
            });
        });
        console.log(self.courseData);
    }
    self.loadCourseData(self.onCourseDataLoaded);

    self.onAlumniDataLoaded = function (data) {
        angular.forEach(data, function (row, index) {
            // Skip header
            if (index === 0)
                return;
            self.alumniData.push({
                id: row[0],
                coord: {x: -100, y: ((20)*row[0]-90), originalY: ((20)*row[0]-90)},
                position: row[1],
                name: row[2],
                courses: [ row[3],row[4],row[5] ],
                hidden: false,
                selected: false
            });
        });
        angular.forEach(self.alumniData, function (alumnus, index) {
            alumnus.pathCoords = [];
            alumnus.pathCoords.push(alumnus.coord.x + ' ' + alumnus.coord.y);
            angular.forEach(alumnus.courses, function (courseId, index) {
                var c = self.courseData[courseId].coord;
                alumnus.pathCoords.push(c.x + ' ' + c.y);
            });
            alumnus.d = 'M ' + alumnus.pathCoords.join(' L ');
            alumnus.d2 = alumnus.pathCoords.slice(1).join(' L ');
        });

        console.log(self.alumniData);
    }
    self.loadAlumniData(self.onAlumniDataLoaded);




  });
