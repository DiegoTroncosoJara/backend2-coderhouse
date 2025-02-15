import { Router } from 'express'
import userModel from '../daos/models/user.model.js'

const router = Router()

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, cart, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
      cart,
      role
    })

    await newUser.save()
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error })
  }
})

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error })
  }
})

// Get a single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error })
  }
})

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, cart, role } = req.body
    const updateData = { first_name, last_name, email, age, cart, role }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    if (!updatedUser) return res.status(404).json({ message: 'User not found' })
    res
      .status(200)
      .json({ message: 'User updated successfully', user: updatedUser })
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error })
  }
})

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error })
  }
})

export default router
