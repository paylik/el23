const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const config = require('config')
const router = Router()

router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect password').isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data during registration'
        })
      }
      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'This user already exists.' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: 'User has been created!' })

    } catch (e) {
      res.status(500).json({ message: "Register Error " })
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Please enter a correct email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data during login'
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '5h' }
      )

      res.json({ token, userId: user.id, isAdmin: user.get('isAdmin') })

    } catch (e) {
      res.status(500).json({ message: "Login Error " })
    }
  }
)

module.exports = router
