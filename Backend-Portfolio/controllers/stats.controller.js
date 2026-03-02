import { getLeetCodeStats } from "../leetCodeService.js";
import { getCodeforcesStats } from "../codeforcesService.js";
import fetchGithubStats from '../github.Service.js'

export const getDashboardStats = async (req, res) => {
  try {
    const [leetcode, codeforces,github] = await Promise.all([
      getLeetCodeStats(process.env.LEETCODE_USERNAME),
      getCodeforcesStats("Shivwhoo"),
      fetchGithubStats("Shivwhoo")
    ]);

    return res.status(200).json({
      success: true,
      data: {
        leetcode,
        codeforces,
        github
      }
    });

  } catch (error) {
    console.error("Stats Controller Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stats"
    });
  }
};