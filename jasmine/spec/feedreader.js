/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        // test case to make sure that rss feeds are defined in allfeeds array
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        // test case to make sure that all feeds have url and the url is not empty
        it('has url', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* A test that loops through each feed
        * in the allFeeds object and ensures it has a name defined
        * and that the name is not empty.
        */
        // test case to make sure that all feeds have feed and the feed is not empty
        it('has feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* A new test suite named "The menu" */
    describe('The menu', function() {

        // getting the body elememt and the menuIcon element to use it with each test case.
        var body, menuIcon;

        beforeEach(function(){
            body = $('body');
            menuIcon = $('.menu-icon-link');
        });


        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        // test case to make sure that the menu is hidden by default
        it('is hidden', function(){
            expect(body.attr('class')).toEqual('menu-hidden');
        });



         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        // test case to make sure that the menuIcon button is functional
        it('show when clicked and hide when clicked again', function(){
            menuIcon.click();
            expect(body.attr('class')).not.toEqual('menu-hidden');
            menuIcon.click();
            expect(body.attr('class')).toEqual('menu-hidden');
        });

    });

    /* A new test suite named "The menu" */
    describe('Initial Entries', function(){

        beforeEach(function (done) {
            loadFeed(0,function(){
                done();
            });
        });
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // test case to make sure that the loadFeed function load at least 1 entry
        it('should have at least 1 entry', function(done){
            expect( ($('.feed').find('.entry')).length ).toBeGreaterThan(0);
            done();
            });

    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        // getting the old content and the new one to compare them.
        var oldContent, newContent;

        beforeEach(function (done) {
            loadFeed(1,function(){
                oldContent = $('.feed').html();
                loadFeed(2,function(){
                    done();
                });
            });
        });
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // test case to make sure that the content does change when a new feed is loaded.
        it('should change after adding a new one', function(done){
            newContent = $('.feed').html();
            expect(oldContent).not.toEqual(newContent);
            done();
        })


    });
}());
