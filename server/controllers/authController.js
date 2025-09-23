import { prisma } from "../server.js";

// User signup: create a new user
export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone } = req.body;
    // You should hash the password if you store one!
    // Assume password is added to the model if needed.
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        // password
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
};

// User login: find user and authenticate
export const login = async (req, res) => {
  try {
    const { email, phone } = req.body;
    // Replace with password check if password exists
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    // Authenticate password here if using one
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
};
