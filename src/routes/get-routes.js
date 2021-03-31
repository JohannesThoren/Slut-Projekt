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

const marked = require("marked")

module.exports = (app, blogPost, project) => {
   app.get('/', (req, res) => {
      res.render('index')
   })

   app.get('/blog', (req, res) => {

      // get all blogPosts and render them on the site as cards
      blogPost.find({}, (err, posts) => {
         if (!err) 
            res.render('blog', {posts: posts})
         else
            res.send("error 404, site not found")
      })
   })

   app.get('/blog/:post', (req, res) => {
      blogPost.findById(req.params.post, async (err, post) => {
         let md = await marked(post.markdown).toString()

         res.render('post', {markdown: md})
      })
   })

   app.get('/about', (req, res) => {
      res.render('about')
   })

   app.get('/contact', (req, res) => {
      res.render('contact')
   })

   app.get('/portfolio', (req, res) => {
      project.find({}, (err, projects) =>  {
         res.render('portfolio', {projects: projects})
      })
   })

   app.get('/portfolio/:tags', (req, res) => {
      project.find({tags: req.params.tags}, (err, projects) =>  {
         res.render('portfolio', {projects: projects})
      })
   })

   app.get('/portfolio/:lang/:project', (req, res) => {
      res.send(`${req.params.lang}, ${req.params.project}`)
   })

   app.get('/admin/:token', (req, res) => {
      res.redirect('/')
   })

   app.get('/admin/:token/posts', (req, res) => {
      res.redirect('/')
   })

   app.get('/admin/:token/posts/new', (req, res) => {
      res.redirect('/')
   })

   app.get('/admin/:token/posts/:id/edit', (req, res) => {
      res.redirect('/')
   })

   app.get('/admin/:token/posts/:id/delete', (req, res) => {
      res.redirect('/')
   })

   app.get('/admin', (req, res) => {
      res.redirect('/')
   })
}
