const router = require('express').Router()
const db = require('../../config/connection')
const { User } = require('../../models')

const {authMiddleware, signToken} = require ('../../utils/auth')

router.get('/', authMiddleware, async (req, res) => {

  try {
    const result = await User.find({}).lean();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  const userId = req.params.id;
console.log (userId)
  try {

    const result = await User.findById(userId).lean();
console.log (result)
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.post('/', async (req, res) => {
  console.log("post")
  const userData = req.body;
console.log(req.body)
  try {
    const newUser = await User.create(userData);
    const token = signToken(newUser);
    res.json({ token, newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.post('/')


router.post('/login', async (req, res) => {
  const body = req.body;

 const user = await User.findOne({ username: body.username });
 if (!user) {
   return res.status(400).json({ message: "Can't find this user" });
 }

 const correctPw = await user.isCorrectPassword(body.password);

 if (!correctPw) {
   return res.status(400).json({ message: 'Wrong password!' });
 }
 const token = signToken(user);
 res.json({ token, user });

});

router.put('/:id', authMiddleware,  async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({err});
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ _id: req.params.id });

    if (!result) {
      res.status(404).json({ error: 'Post not found' });
      console.log('Post not found');
    } else {
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

module.exports = router