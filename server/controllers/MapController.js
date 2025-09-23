import { prisma } from "../server.js";

export const getMapData = async (req, res) => {
  const MapData = await prisma.complaint.findMany();

  if (!MapData) {
    return res.status(400).json({ message: "error fetching complaints" });
  }

  return res.status(200).json({ MapData });
};

export const getMapDataById = async (req, res) => {
  const id = req.params.id;
  const MapData = await prisma.complaint.findUnique({
    where: { id: Number(id) },
  });

  if (!MapData) {
    return res.status(400).json({ message: "error fetching complaint" });
  }
  console.log(MapData);

  return res.status(200).json({ MapData });
};
