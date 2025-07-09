const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const nanoid = require('nanoid');
const Url = require('../models/url');

require('dotenv').config();

// POST /shorten
router.post('/shorten', async (req, res) => {
    const { url } = req.body;
    const base = process.env.BASE_URL;

    if (!validUrl.isUri(url)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    const shortCode = nanoid.nanoid(6);
    const shortUrl = `${base}/${shortCode}`;

    try {
        let urlExists = await Url.findOne({ originalUrl: url });
        if (urlExists) {
            return res.json({ shortUrl: `${base}/${urlExists.shortCode}` });
        }

        const newUrl = new Url({
            originalUrl: url,
            shortCode
        });

        await newUrl.save();

        res.json({ shortUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

// GET /:code
router.get('/:code', async (req, res) => {
    console.log('GET /:code called with:', req.params.code);
    try {
        const url = await Url.findOne({ shortCode: req.params.code });
        console.log('Found URL:', url);

        if (url) {
            url.clicks += 1;
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({ error: 'Short URL not found' });
        }

    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json('Server error');
    }
});

module.exports = router;
