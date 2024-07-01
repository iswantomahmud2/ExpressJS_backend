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

/**
 * Show Post
 */
router.get('/(:id)',
    function (req, res) {
        let id = req.params.id;

        connection.query(`SELECT * FROM posts WHERE id = ${id}`, function (err, rows) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: 'Internal Server Error'
                })
            }

            // if post not found
            if (rows.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Data Post Not Found'
                })
            }
            // if post found
            else {
                return res.status(200).json({
                    status: true,
                    message: 'Detail Data Post',
                    data: rows[0]
                })
            }
        })
    });

/**
 * Update Post
 */
router.patch('/update/:id', [
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

    //id post
    let id = req.params.id;

    //data post
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    //update query
    connection.query(`UPDATE posts SET ? WHERE id = ${id}`, formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!'
            })
        }
    })
});

/**
 * Delete Data Post
 */

router.delete('/delete/(:id)', function (req, res) {
    let id = req.params.id

    connection.query(`DELETE FROM posts WHERE id = ${id}`, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully!'
            })
        }
    })
});

module.exports = router;