const express = require('express');
const router = express.Router();

//import express validator
const {
    body,
    validationResult
} = require('express-validator');


//import database
const connection = require('../config/databases');

/** *Index Post */
router.get('/', function (req, res) {
    //query
    connection.query('SELECT * FROM posts ORDER BY id DESC', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Post',
                data: rows
            })
        }
    });
});

/** 
 * Store Post 
 */

router.post('/store', [
    //validation
    body('title').notEmpty(),
    body('content').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    // insert query
    connection.query('INSERT INTO posts SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Sukses',
                data: rows[0]
            })
        }
    })
});

module.exports = router;