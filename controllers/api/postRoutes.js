const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      post_user_id: req.session.post_user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/post/:id/comments', withAuth, async (req, res) => {
  try {
      const newComment = await Comment.create({
          ...req.body,
          username: req.session.username, 
          post_id: req.session.post_id,
      });

      res.status(200).json(newComment);
  } catch (err) {
      res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try{
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if (!updatePost) {
      res.status(404).json({ message: '...WHAT!!! COMMENT!!!' });
      return;
    }
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
      const existingComment = await Comment.findByPk(req.params.id);
       if (!existingComment) {
          res.status(404).json({ message: "This comment don't exist, sweetie~~ delulu babygirl, huh?" });
      }

      const updateComment = await Comment.update(req.body, {
          where: {
              id: req.params.id,
          }
      });

      res.status(200).json(updateComment);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        post_user_id: req.session.post_user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
      const deleteComment = await Comment.destroy({
          where: {
              id: req.params.id,
              post_id: req.session.post_id,
          },
      });

      if (!deleteComment) {
          res.status(404).json({ message: 'Queen... I thought you were smart!' });
          return;
      }

  } catch (err) {
      res.status(500).json(err);
  }
});
module.exports = router;
