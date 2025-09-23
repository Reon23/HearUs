import { prisma } from "../server.js";

// Register a new complaint
export const register = async (req, res) => {
  try {
    const { imgurl, title, desc, category, position } = req.body;
    const complaint = await prisma.complaint.create({
      data: {
        imgurl,
        title,
        desc,
        category,
        position,
      },
    });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deregister (delete) a complaint by ID
export const deregister = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComplaint = await prisma.complaint.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedComplaint);
  } catch (error) {
    res.status(404).json({ error: "Complaint not found" });
  }
};
