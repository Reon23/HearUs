import { prisma } from "../server.js";

// Register a new complaint
export const register = async (req, res) => {
  try {
    const { imgurl, title, desc, lat, lng } = req.body;
    const complaint = await prisma.complaint.create({
      data: {
        imgurl,
        title,
        desc,
        lat,
        lng,
      },
    });
    console.log(complaint);
    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deregister (delete) a complaint by ID
export const deregister = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deletedComplaint = await prisma.complaint.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedComplaint);
  } catch (error) {
    res.status(404).json({ error: "Complaint not found" });
  }
};

// Upvote complaint by id
export const upvote = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("upvote complaint id : ", id);
    const upvotedComplaint = await prisma.complaint.update({
      where: { id: Number(id) },
      data: { upvotes: { increment: 1 } },
    });
    res.status(200).json({ message: "upvoted complaint" });
  } catch (error) {
    res.status(404).json({ error: "Complaint not found" });
  }
};
