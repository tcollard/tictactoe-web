var tests = [
    // Load the example tests, replace this and add your own tests.
    'tests/storage-controller-test',
];

// Prefer the BDD testing style.
mocha.setup('bdd');

// Make async.
if (window.__karma__) {
    window.__karma__.loaded = function() {};
}

require(
    {
        // Set the application endpoint.
        paths: {
            tests: '../test/mocha/tests',
            chai: '../test/mocha/vendor/chai'
        },

        // Determine the baseUrl if we are in Karma or not.
        baseUrl: window.__karma__ ? 'base/app' : '../../app'
    },

    // Load the configuration.
    ['config'],

    function() {
        // Load all tests.
        require(tests, function() {

            // This will start Karma if it exists.
            if (window.__karma__) {
                window.__karma__.start();
            } else {
                // Only once the dependencies have finished loading, call mocha.run.
                mocha.run();
            }

        });
    }
);