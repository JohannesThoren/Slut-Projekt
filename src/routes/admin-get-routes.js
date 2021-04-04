/*
 *   Copyright (c) 2021 Johannes Thorén
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

const md5 = require('md5');

module.exports = (app, blogPost, project) => {
    app.get('/admin/:token', (req, res) => {
        if (req.params.token == md5(process.env.ADMIN_TOKEN)) {

            blogPost.find({}, (err, posts) => {
                if (!err) {
                    project.find({}, (err, projects) => {
                        if (!err)
                            res.render('admin/admin', { token: req.params.token, posts: posts, projects: projects })
                        else
                            console.log(err)
                    })
                }
                else
                    console.log(err)
            })
        }
        else
            res.redirect('/')

    })

    app.get('/admin/:token/posts/new', (req, res) => {
        if (req.params.token == md5(process.env.ADMIN_TOKEN))
            res.render('admin/new_blog_post', { token: req.params.token })
        else
            res.redirect('/')
    })

    app.get('/admin/:token/posts/:id/edit', (req, res) => {

        if (req.params.token == md5(process.env.ADMIN_TOKEN)) {
            blogPost.findById(req.params.id, (err, post) => {
                if (!err)
                    res.render('admin/edit_blog_post', { token: req.params.token, post: post })
                else
                    console.log(err)
            })
        }
        else
            res.redirect('/')
    })

    app.get('/admin/:token/posts/:id/delete', (req, res) => {
        if (req.params.token == md5(process.env.ADMIN_TOKEN))
            res.render('admin/delete_blog_post', { token: req.params.token, post_id: req.params.id })
        else
            res.redirect('/')
    })

    app.get('/admin', (req, res) => {
        console.log(md5(process.env.ADMIN_TOKEN))
        res.redirect('/')
    })

    app.get('/admin/:token/projects/new', (req, res) => {
        if (req.params.token == md5(process.env.ADMIN_TOKEN))
            res.render('admin/new_project', {token: req.params.token})
        else
            res.redirect('/')


    })
}