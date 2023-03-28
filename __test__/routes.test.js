const controller = require('../controllers/cwController');
test('responds to /about', () => {
        const req = {};
        const res = { text: '',
            	    send: function(input) { this.text = input } 
        };
        controller.about_us(req, res);
        expect(res.text).toEqual('<h1>about page to be implemented</h1>');
})