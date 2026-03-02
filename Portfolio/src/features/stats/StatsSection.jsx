import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion"; // <-- YEH ZAROORI HAI NAYE PROGRESS BARS KE LIYE
import "./StatsSection.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axiosInstance from "../../services/axiosInstance";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const containerRef = useRef();
  const [activeCard, setActiveCard] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // =====================================
  // LEETCODE STATES
  // =====================================
  const [totalLCQ, setTotalLCQ] = useState(0);
  const [easyLCQ, setEasyLCQ] = useState(0);
  const [mediumLCQ, setMediumLCQ] = useState(0);
  const [hardLCQ, setHardLCQ] = useState(0);
  const [lcRanking, setLcRanking] = useState(0);
  const [lcAcceptanceRate, setLcAcceptanceRate] = useState(0);
  const [lcContributionPoints, setLcContributionPoints] = useState(0);
  const [lcBadges, setLcBadges] = useState([]);

  // =====================================
  // CODEFORCES STATES
  // =====================================
  const [cfHandle, setCfHandle] = useState("Loading...");
  const [cfRating, setCfRating] = useState(0);
  const [cfMaxRating, setCfMaxRating] = useState(0);
  const [cfRank, setCfRank] = useState("UNRATED");
  const [cfMaxRank, setCfMaxRank] = useState("N/A");
  const [cfContribution, setCfContribution] = useState(0);
  const [cfContestsAttended, setCfContestsAttended] = useState(0);
  const [cfBestRank, setCfBestRank] = useState("N/A");
  const [cfTotalSolved, setCfTotalSolved] = useState(0);

  // =====================================
  // GITHUB STATES
  // =====================================
  const [ghUsername, setGhUsername] = useState("Loading...");
  const [ghName, setGhName] = useState("");
  const [ghAvatar, setGhAvatar] = useState("");
  const [ghBio, setGhBio] = useState("");
  const [ghPublicRepos, setGhPublicRepos] = useState(0);
  const [ghFollowers, setGhFollowers] = useState(0);
  const [ghTotalStars, setGhTotalStars] = useState(0);
  const [ghTotalForks, setGhTotalForks] = useState(0);
  const [ghLanguages, setGhLanguages] = useState({});

  // Yahan apna handle update kar lena
  const codeforcesHandle = "your_cf_handle";
  const githubHandle = "Shivwhoo";

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const response = await axiosInstance.get(`/stats/dashboard`);
        const statsData = response.data.data;

        // 1. Setup LeetCode Data
        if (statsData.leetcode) {
          const lc = statsData.leetcode;
          setTotalLCQ(lc.totalSolved || 0);
          setEasyLCQ(lc.easySolved || 0);
          setMediumLCQ(lc.mediumSolved || 0);
          setHardLCQ(lc.hardSolved || 0);
          setLcRanking(lc.ranking || 0);
          setLcAcceptanceRate(lc.acceptanceRate || 0);
          setLcContributionPoints(lc.contestRating || 0);

          if (lc.badges && lc.badges.length > 0) {
            setLcBadges(lc.badges);
          }
        }

        // 2. Setup Codeforces Data
        if (statsData.codeforces) {
          const cf = statsData.codeforces;
          setCfHandle(cf.handle || "Unknown");
          setCfRating(cf.rating || 0);
          setCfMaxRating(cf.maxRating || 0);
          setCfRank(cf.rank || "UNRATED");
          setCfMaxRank(cf.maxRank || "N/A");
          setCfContribution(cf.contribution || 0);
          setCfContestsAttended(cf.contestsAttended || 0);
          setCfBestRank(cf.bestRank !== Infinity ? cf.bestRank : "N/A");
          setCfTotalSolved(cf.totalSolved || 0);
        }

        // 3. Setup Github Data
        if (statsData.github) {
          const gh = statsData.github;
          setGhUsername(gh.username || "Unknown");
          setGhName(gh.name || "");
          setGhAvatar(gh.avatar || "");
          setGhBio(gh.bio || "No bio available.");
          setGhPublicRepos(gh.publicRepos || 0);
          setGhFollowers(gh.followers || 0);
          setGhTotalStars(gh.totalStars || 0);
          setGhTotalForks(gh.totalForks || 0);
          setGhLanguages(gh.languagesUsed || {});
        }
      } catch (error) {
        console.error("Error fetching stats data:", error);
      } finally {
        setDataLoaded(true);
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }
    };

    fetchStatsData();
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".glass-module",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef, dependencies: [dataLoaded] },
  );

  return (
    <div id="stats" className="stats-dashboard-container" ref={containerRef}>
      <div className="header-group">
        <h2 className="section-header">
          CODING <span className="highlight">COMMAND CENTER</span>
        </h2>
        <p className="text-zinc-400 mt-2 font-mono">
          Real-time competitive programming & dev stats
        </p>
      </div>

      <div
        className={`dashboard-grid ${activeCard ? "has-active" : ""}`}
        onMouseLeave={() => setActiveCard(null)}
      >
        {/* ==================== LEETCODE MODULE ==================== */}
        <div
          className={`glass-module ${activeCard === "lc" ? "expanded" : activeCard ? "collapsed" : ""}`}
          onMouseEnter={() => setActiveCard("lc")}
          onClick={() => setActiveCard(activeCard === "lc" ? null : "lc")}
        >
          <div className="view-compact">
            <div className="big-logo-container">
              <svg viewBox="0 0 24 24" fill="white" className="huge-logo">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.541l5.967 5.68c.8.761 2.077.761 2.877 0l5.611-5.343a1.36 1.36 0 0 0 0-1.921 1.362 1.362 0 0 0-1.922 0l-4.65 4.427a.496.496 0 0 1-.72 0l-5.966-5.68a3.166 3.166 0 0 1-.871-1.377 3.016 3.016 0 0 1-.145-1.597 3.253 3.253 0 0 1 .655-1.287 3.204 3.204 0 0 1 .482-.49L7.18 8.16l4.424-4.737a.496.496 0 0 1 .72 0l3.852 4.126a1.362 1.362 0 0 0 1.922 0 1.362 1.362 0 0 0 0-1.921L14.246.438A1.374 1.374 0 0 0 13.483 0zm5.105 10.103c-.663 0-1.2.537-1.2 1.2s.537 1.2 1.2 1.2h4.008c.663 0 1.2-.537 1.2-1.2s-.537-1.2-1.2-1.2h-4.008z" />
              </svg>
            </div>

            <div className="compact-text-group">
              <div className="platform-title">LEETCODE.SYS</div>
              <div className="rank-tag">
                Rank: #{lcRanking > 0 ? lcRanking : "Loading..."}
              </div>
            </div>

            <div className="main-display lc-split">
              <div className="progress-ring">
                <svg viewBox="0 0 100 100">
                  <circle className="ring-bg" cx="50" cy="50" r="45" />
                  <circle
                    className="ring-meter lc-meter"
                    cx="50"
                    cy="50"
                    r="45"
                  />
                </svg>
                <div className="ring-text">
                  <span className="big-num">
                    {totalLCQ > 0 ? totalLCQ : "0"}
                  </span>
                  <span className="label">SOLVED</span>
                </div>
              </div>

              <div className="bars-container">
                <div className="bar-row">
                  <span className="bar-label">EASY</span>
                  <div className="bar-bg">
                    <div
                      className="bar-fill easy-fill"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <span className="bar-val">
                    {easyLCQ > 0 ? easyLCQ : "--"}
                  </span>
                </div>
                <div className="bar-row">
                  <span className="bar-label">MED</span>
                  <div className="bar-bg">
                    <div
                      className="bar-fill med-fill"
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                  <span className="bar-val">
                    {mediumLCQ > 0 ? mediumLCQ : "--"}
                  </span>
                </div>
                <div className="bar-row">
                  <span className="bar-label">HARD</span>
                  <div className="bar-bg">
                    <div
                      className="bar-fill hard-fill"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                  <span className="bar-val">
                    {hardLCQ > 0 ? hardLCQ : "--"}
                  </span>
                </div>
              </div>
            </div>

            <div className="module-footer lc-footer">
              <div className="footer-stat">
                Acceptance <strong>{lcAcceptanceRate}%</strong>
              </div>
            </div>
          </div>

          <div className="view-expanded">
            <div className="exp-header">
              <h2>
                LEETCODE.SYS //{" "}
                <span className="highlight">DETAILED_ANALYSIS</span>
              </h2>
            </div>

            <div className="exp-content">
              <div className="exp-stats-box">
                <p>
                  Global Ranking:{" "}
                  <strong className="highlight">
                    #{lcRanking > 0 ? lcRanking : "0"}
                  </strong>
                </p>
                <p>
                  Contest Rating:{" "}
                  <strong>
                    {lcContributionPoints > 0 ? lcContributionPoints : "0"}
                  </strong>
                </p>
                <div className="mt-8">
                  <p className="log-line"> {">"} STATUS: ACTIVE SOLVER</p>
                  <p className="log-line">
                    {" "}
                    {">"} FOCUS: DATA STRUCTURES & ALGORITHMS
                  </p>
                  <p className="log-line success">
                    {" "}
                    {">"} CONSISTENCY: OPTIMAL
                  </p>
                </div>
              </div>

              <div className="terminal-log flex flex-col">
                <p className="log-line mb-4 font-bold border-b border-zinc-700 pb-2">
                  {" "}
                  {">"} ACQUIRED BADGES_
                </p>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {lcBadges.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {lcBadges.map((badge, index) => {
                        const iconUrl = badge.icon.startsWith("/")
                          ? `https://leetcode.com${badge.icon}`
                          : badge.icon;

                        return (
                          <div
                            key={badge.id || index}
                            className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
                          >
                            <img
                              src={iconUrl}
                              alt={badge.displayName}
                              className="w-16 h-16 object-contain drop-shadow-lg mb-2"
                            />
                            <span className="text-xs text-center font-mono text-zinc-300 leading-tight">
                              {badge.displayName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-zinc-500 text-sm mt-4 italic">
                      No badges acquired yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== CODEFORCES MODULE ==================== */}
        <div
          className={`glass-module ${activeCard === "cf" ? "expanded" : activeCard ? "collapsed" : ""}`}
          onMouseEnter={() => setActiveCard("cf")}
          onClick={() => setActiveCard(activeCard === "cf" ? null : "cf")}
        >
          <div className="view-compact">
            <div className="big-logo-container cf-bars-wrapper">
              <div className="cf-big-bar yellow"></div>
              <div className="cf-big-bar blue"></div>
              <div className="cf-big-bar red"></div>
            </div>

            <div className="compact-text-group">
              <div className="platform-title">CODEFORCES.EXE</div>
              <div className="rank-tag">
                {cfRank !== "UNRATED" ? cfRank.toUpperCase() : "UNRATED"}
              </div>
            </div>

            <div className="hero-section">
              <h2 className="hero-rating cf-color">{cfRating || "---"}</h2>
              <p className="hero-sub">MAX RATING: {cfMaxRating || "---"}</p>
            </div>

            <div className="stats-mini-grid">
              <div className="mini-box">
                <span>SOLVED</span>
                <strong>{cfTotalSolved}</strong>
              </div>
              <div className="mini-box">
                <span>CONTESTS</span>
                <strong>{cfContestsAttended}</strong>
              </div>
            </div>

            <a
              href={`https://codeforces.com/profile/${codeforcesHandle}`}
              target="_blank"
              rel="noreferrer"
              className="action-btn"
            >
              ACCESS_PROFILE _
            </a>
          </div>

          <div className="view-expanded">
            <div className="exp-header">
              <h2>
                CODEFORCES.EXE // <span className="cf-color">{cfHandle}</span>
              </h2>
            </div>

            <div className="exp-content">
              <div className="exp-stats-box">
                <p>
                  Current Rating:{" "}
                  <strong className="cf-color">{cfRating || "0"}</strong>
                </p>
                <p>
                  Max Rank:{" "}
                  <strong className="cf-color">
                    {cfMaxRank !== "N/A" ? cfMaxRank.toUpperCase() : "N/A"}
                  </strong>
                </p>
                <div className="mt-8">
                  <p className="log-line">
                    {" "}
                    {">"} TOTAL SOLVED: {cfTotalSolved}
                  </p>
                  <p className="log-line">
                    {" "}
                    {">"} CONTESTS ATTENDED: {cfContestsAttended}
                  </p>
                  <p className="log-line success"> {">"} STATUS: CONNECTED</p>
                </div>
              </div>

              <div className="terminal-log flex flex-col justify-center">
                <p className="log-line mb-4 font-bold border-b border-zinc-700 pb-2">
                  {" "}
                  {">"} CONTEST_DIAGNOSTICS_
                </p>
                <div className="space-y-4">
                  <p className="log-line">
                    {" "}
                    {">"} BEST_RANK:{" "}
                    <span className="text-white">{cfBestRank}</span>
                  </p>
                  <p className="log-line">
                    {" "}
                    {">"} MAX_RATING_ACHIEVED:{" "}
                    <span className="text-white">{cfMaxRating}</span>
                  </p>
                  <p className="log-line">
                    {" "}
                    {">"} CONTRIBUTION_SCORE:{" "}
                    <span className="text-white">{cfContribution}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== GITHUB MODULE ==================== */}
        <div
          className={`glass-module ${activeCard === "gh" ? "expanded" : activeCard ? "collapsed" : ""}`}
          onMouseEnter={() => setActiveCard("gh")}
          onClick={() => setActiveCard(activeCard === "gh" ? null : "gh")}
        >
          {/* COMPACT VIEW */}
          <div className="view-compact">
            <div className="big-logo-container">
              <svg viewBox="0 0 24 24" fill="white" className="huge-logo">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>

            <div className="compact-text-group">
              <div className="platform-title">GITHUB.SYS</div>
              <div className="rank-tag">{ghName || "Developer"}</div>
            </div>

            <div className="hero-section">
              <h2 className="hero-rating" style={{ color: "#fff" }}>
                {ghPublicRepos}
              </h2>
              <p className="hero-sub">PUBLIC REPOSITORIES</p>
            </div>

            <div className="stats-mini-grid">
              <div className="mini-box">
                <span>STARS</span>
                <strong>{ghTotalStars}</strong>
              </div>
              <div className="mini-box">
                <span>FOLLOWERS</span>
                <strong>{ghFollowers}</strong>
              </div>
            </div>

            <a
              href={`https://github.com/${githubHandle}`}
              target="_blank"
              rel="noreferrer"
              className="action-btn !border-white/30 !text-white hover:!bg-white/10 hover:!shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              VIEW_GITHUB _
            </a>
          </div>

          {/* EXPANDED VIEW (MAGICAL UPGRADE) */}
          <div className="view-expanded">
            <div className="exp-header flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h2 className="text-2xl font-black text-white m-0">
                GITHUB.SYS //{" "}
                <span className="text-indigo-400">{ghUsername}</span>
              </h2>
              {/* Blinking Live Status */}
              <div className="flex gap-2 items-center">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-[10px] text-green-400 font-mono tracking-widest uppercase">
                  Live_Node
                </span>
              </div>
            </div>

            <div className="exp-content flex gap-6 h-full">
              {/* LEFT BOX: Avatar & Bio */}
              <div className="exp-stats-box flex-1 bg-[#121214]/60 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                {/* Cyberpunk Hover Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] pointer-events-none" />

                <div className="relative mb-6">
                  {/* Rotating Holographic Rings */}
                  <div className="absolute -inset-3 rounded-full border border-indigo-500/30 border-t-transparent border-b-transparent animate-[spin_4s_linear_infinite]" />
                  <div className="absolute -inset-5 rounded-full border border-purple-500/20 border-l-transparent border-r-transparent animate-[spin_6s_linear_infinite_reverse]" />

                  {ghAvatar ? (
                    <img
                      src={ghAvatar}
                      alt="Github Avatar"
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/20 shadow-[0_0_20px_rgba(129,140,248,0.3)] relative z-10 object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 flex items-center justify-center relative z-10 text-white/50 font-mono">
                      N/A
                    </div>
                  )}
                </div>

                <p className="text-zinc-300 font-sans text-[0.9rem] italic mb-6 max-w-[260px] leading-relaxed relative z-10">
                  <span className="text-indigo-400 font-bold font-mono not-italic mr-1">
                    {">"}
                  </span>
                  "{ghBio}"
                </p>

                {/* Dashboard style Repo & Forks counter */}
                <div className="w-full grid grid-cols-2 gap-3 mt-auto relative z-10">
                  <div className="bg-[#0a0a0c]/80 border border-white/5 rounded-xl p-3 flex flex-col items-center hover:border-indigo-500/40 transition-colors">
                    <span className="block text-[9px] text-zinc-500 font-mono tracking-widest uppercase mb-1">
                      Total_Forks
                    </span>
                    <strong className="text-white text-lg">
                      {ghTotalForks}
                    </strong>
                  </div>
                  <div className="bg-[#0a0a0c]/80 border border-white/5 rounded-xl p-3 flex flex-col items-center hover:border-purple-500/40 transition-colors">
                    <span className="block text-[9px] text-zinc-500 font-mono tracking-widest uppercase mb-1">
                      Public_Repos
                    </span>
                    <strong className="text-white text-lg">
                      {ghPublicRepos}
                    </strong>
                  </div>
                </div>
              </div>

              {/* RIGHT BOX: Languages with Progress Bars */}
              <div className="terminal-log flex-1 bg-[#121214]/60 border border-white/5 rounded-2xl p-6 flex flex-col relative overflow-hidden">
                <p className="log-line mb-5 font-bold border-b border-white/5 pb-3 flex justify-between items-center text-sm">
                  <span className="text-zinc-300 font-mono uppercase">
                    {">"} Tech_Stack_Analysis
                  </span>
                  <span className="text-[10px] text-indigo-400 font-mono tracking-widest">
                    TOP_5
                  </span>
                </p>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {Object.keys(ghLanguages).length > 0 ? (
                    <div className="space-y-5">
                      {Object.entries(ghLanguages)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([lang, count], index, arr) => {
                          const maxCount = arr[0][1];
                          const percent = Math.max((count / maxCount) * 100, 5);

                          return (
                            <div key={index} className="group/lang">
                              <div className="flex justify-between items-end mb-1.5">
                                <span className="text-zinc-300 font-mono text-[11px] uppercase flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover/lang:animate-pulse"></span>
                                  {lang}
                                </span>
                                <span className="text-zinc-500 font-mono text-[10px]">
                                  {count} Repos
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percent}%` }}
                                  transition={{
                                    duration: 1,
                                    delay: 0.5 + index * 0.1,
                                    ease: "easeOut",
                                  }}
                                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative shadow-[0_0_10px_rgba(129,140,248,0.5)]"
                                >
                                  <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/40 rounded-full blur-[1px]"></div>
                                </motion.div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 mt-4 text-zinc-500 font-mono text-xs">
                      <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      Scanning memory banks...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
