const router = require('express').Router();
const urlController = require('../controllers/url-controller');


//Test Route
router.get('/', function (req, res) {
    res.json({
        message: 'URL Shortner API..!'
    });
});

// router.route('/links')
//         .post(urlController.postUrl)

router.route('/links/:url').get(urlController.gethashedUrl);
router.route('/links/:id').put(urlController.updateHashedUrl)
router.route('/links/:id').delete(urlController.updateHashedUrl)



module.exports = router;
