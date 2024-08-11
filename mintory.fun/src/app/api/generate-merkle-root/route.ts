import type { NextApiRequest, NextApiResponse } from 'next'
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

type RequestData = {
  tokenIds: number[]
}

type ResponseData = {
  merkleRoot: string
}

type ErrorResponse = {
  error: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorResponse>
) {
  if (req.method === 'POST') {
    try {
      const { tokenIds } = req.body as RequestData;

      // Validate input
      if (!Array.isArray(tokenIds) || !tokenIds.every(id => typeof id === 'number')) {
        return res.status(400).json({ error: 'Invalid input: tokenIds must be an array of numbers' });
      }

      // Create the Merkle tree
      const tree = StandardMerkleTree.of(
        tokenIds.map((v) => [v]),
        ["uint256"]
      );

      // Get the Merkle root
      const root = tree.root;

      res.status(200).json({ merkleRoot: root });
    } catch (error) {
      console.error('Error generating Merkle root:', error);
      res.status(500).json({ error: 'Error generating Merkle root' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}