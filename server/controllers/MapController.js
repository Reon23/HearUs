import { prisma } from "../server.js";

export const getMapData = async (req, res) => {
  const MapData = await prisma.complaint.findMany();

  if (!MapData) {
    return res.status(400).json({ message: "error fetch complaints" });
  }

  return res.status(200).json({ MapData });
};
