import axios from "axios";

export const getLeetCodeStats = async (username) => {
  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: `
          query getUserFullProfile($username: String!) {
            matchedUser(username: $username) {

              username

              profile {
                ranking
                reputation
                realName
                aboutMe
                userAvatar
              }

              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }

              badges {
                id
                displayName
                icon
                creationDate
              }

              userCalendar {
                totalActiveDays
                submissionCalendar
              }
            }

            userContestRanking(username: $username) {
              rating
              globalRanking
              attendedContestsCount
              topPercentage
            }

            userContestRankingHistory(username: $username) {
              contest {
                title
                startTime
              }
              rating
              ranking
            }
          }
        `,
        variables: { username }
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = response.data.data;
    const user = data.matchedUser;
    const contest = data.userContestRanking;

    if (!user) return null;

    const stats = user.submitStats.acSubmissionNum;

    const total = stats.find(s => s.difficulty === "All");

    const acceptanceRate = total?.submissions
      ? ((total.count / total.submissions) * 100).toFixed(2)
      : 0;

    return {
      // Profile
      ranking: user.profile.ranking,
      reputation: user.profile.reputation,
      avatar: user.profile.userAvatar,

      // Problem Solving
      totalSolved: total?.count || 0,
      easySolved: stats.find(s => s.difficulty === "Easy")?.count || 0,
      mediumSolved: stats.find(s => s.difficulty === "Medium")?.count || 0,
      hardSolved: stats.find(s => s.difficulty === "Hard")?.count || 0,
      acceptanceRate,

      // Badges
      badges: user.badges,

      // Contest
      contestRating: contest?.rating || 0,
      contestGlobalRanking: contest?.globalRanking || 0,
      attendedContests: contest?.attendedContestsCount || 0,
      topPercentage: contest?.topPercentage || 0,

      // Activity
      totalActiveDays: user.userCalendar?.totalActiveDays || 0
    };

  } catch (error) {
    console.error("LeetCode Service Error:", error.message);
    return null;
  }
};