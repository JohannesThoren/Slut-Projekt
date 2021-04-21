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
const md5 = require("md5");
module.exports = (app, blogPost, project, contact, multer) => {
  

  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/imgs");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  var upload = multer({ storage: storage });

  app.post("/blog/:token", upload.array("images", 10), (req, res) => {
    if (req.params.token == md5(process.env.ADMIN_TOKEN)) {
      console.log(req.files);
      console.log(req.body);

      blogPost.create({
        date: Date.now(),
        title: req.body.title,
        markdown: req.body.markdown,
        description: req.body.description,
      });

      res.redirect("/admin/" + req.params.token);
    } else res.redirect("/");
  });

  app.post("/portfolio/:token", upload.array("images", 10), (req, res) => {
    if (req.params.token == md5(process.env.ADMIN_TOKEN)) {
      let tags = req.body.tags.split(",");
      console.log(tags);

      project.create({
        tags: tags,
        projectName: req.body.projectName,
        description: req.body.description,
        markdown: req.body.markdown,
        git: req.body.git,
        date: Date.now(),
      });

      res.redirect("/admin/" + req.params.token);
    }
  });

  app.post("/contact", (req, res) => {
    contact.create({
      subject: req.body.subject,
      message: req.body.message,
      name: req.body.name,
      email: req.body.email,
      date: Date.now(),
    });
    res.redirect("/contact");
  });
};
