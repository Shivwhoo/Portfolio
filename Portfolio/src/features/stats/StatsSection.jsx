import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./StatsSection.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axiosInstance from "../../services/axiosInstance";
import { lineDraw } from "../../hooks/useScrollAnimation";

// ─── Flip Digit Component ─────────────────────────────────
function FlipDigit({ char }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayedChar, setDisplayedChar] = useState(char);

  useEffect(() => {
    setDisplayedChar(char);
    setIsFlipped(true);
    const timer = setTimeout(() => setIsFlipped(false), 350);
    return () => clearTimeout(timer);
  }, [char]);

  // Periodic mechanical digit flapping flicker
  useEffect(() => {
    const triggerFlicker = () => {
      // 15% chance to scramble digit every 4s
      if (Math.random() > 0.85) {
        setIsFlipped(true);
        let tickCount = 0;
        const interval = setInterval(() => {
          const glyphs = "0123456789X#$@%&";
          setDisplayedChar(glyphs[Math.floor(Math.random() * glyphs.length)]);
          tickCount++;
          if (tickCount > 4) {
            clearInterval(interval);
            setDisplayedChar(char);
            setIsFlipped(false);
          }
        }, 60);
      }
    };

    const intervalId = setInterval(triggerFlicker, 4000);
    return () => clearInterval(intervalId);
  }, [char]);

  return (
    <div
      style={{
        position: "relative",
        width: "28px",
        height: "44px",
        perspective: "200px",
        display: "inline-block",
        margin: "0 2px",
      }}
      onMouseEnter={() => {
        setIsFlipped(true);
        setTimeout(() => setIsFlipped(false), 350);
      }}
    >
      <motion.div
        animate={isFlipped ? { rotateX: 180 } : { rotateX: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--ink)",
            color: "var(--cream)",
            border: "2px solid var(--vermilion)",
            fontFamily: "var(--font-mono)",
            fontWeight: 800,
            fontSize: "1.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backfaceVisibility: "hidden",
            borderRadius: "3px",
            boxShadow: "inset 0 -8px 1px rgba(0,0,0,0.5)",
          }}
        >
          {displayedChar}
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: "1px", background: "rgba(244,237,216,0.15)" }} />
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--ink)",
            color: "var(--cream)",
            border: "2px solid var(--vermilion)",
            fontFamily: "var(--font-mono)",
            fontWeight: 800,
            fontSize: "1.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
            borderRadius: "3px",
            boxShadow: "inset 0 8px 1px rgba(0,0,0,0.5)",
          }}
        >
          {displayedChar}
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: "1px", background: "rgba(244,237,216,0.15)" }} />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Flip Counter Component ───────────────────────────────
function FlipCounter({ value }) {
  const digits = String(value).split("");
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "1px" }}>
      {digits.map((char, idx) => (
        <FlipDigit key={idx} char={char} />
      ))}
    </div>
  );
}

// ─── StatsSection Component ───────────────────────────────
const StatsSection = () => {
  const containerRef = useRef();
  const [dataLoaded, setDataLoaded] = useState(false);

  // LeetCode States
  const [totalLCQ, setTotalLCQ] = useState(0);
  const [easyLCQ, setEasyLCQ] = useState(0);
  const [mediumLCQ, setMediumLCQ] = useState(0);
  const [hardLCQ, setHardLCQ] = useState(0);
  const [lcRanking, setLcRanking] = useState(0);
  const [lcAcceptanceRate, setLcAcceptanceRate] = useState(0);
  const [lcContributionPoints, setLcContributionPoints] = useState(0);
  const [lcBadges, setLcBadges] = useState([]);

  // Codeforces States
  const [cfHandle, setCfHandle] = useState("Loading...");
  const [cfRating, setCfRating] = useState(0);
  const [cfMaxRating, setCfMaxRating] = useState(0);
  const [cfRank, setCfRank] = useState("UNRATED");
  const [cfMaxRank, setCfMaxRank] = useState("N/A");
  const [cfContribution, setCfContribution] = useState(0);
  const [cfContestsAttended, setCfContestsAttended] = useState(0);
  const [cfBestRank, setCfBestRank] = useState("N/A");
  const [cfTotalSolved, setCfTotalSolved] = useState(0);

  // GitHub States
  const [ghUsername, setGhUsername] = useState("Loading...");
  const [ghName, setGhName] = useState("");
  const [ghAvatar, setGhAvatar] = useState("");
  const [ghBio, setGhBio] = useState("");
  const [ghPublicRepos, setGhPublicRepos] = useState(0);
  const [ghFollowers, setGhFollowers] = useState(0);
  const [ghTotalStars, setGhTotalStars] = useState(0);
  const [ghTotalForks, setGhTotalForks] = useState(0);
  const [ghLanguages, setGhLanguages] = useState({});

  const codeforcesHandle = "Shivwhoo";
  const githubHandle = "Shivwhoo";

  // Data fetching
  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const response = await axiosInstance.get(`/stats/dashboard`);
        const statsData = response.data.data;

        // LeetCode Setup
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

        // Codeforces Setup
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

        // GitHub Setup
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
      }
    };

    fetchStatsData();
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".poster-stats-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
    },
    { scope: containerRef, dependencies: [dataLoaded] },
  );

  return (
    <section
      id="stats"
      ref={containerRef}
      style={{
        padding: "3.5rem 2rem",
        background: "var(--charcoal)",
        position: "relative",
        overflow: "clip",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="section-label" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            The Terminal
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(3rem, 9vw, 7rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              color: "var(--cream)",
              marginTop: "0.5rem",
            }}
          >
            Coding<br />
            <span style={{ color: "var(--vermilion)" }}>Command Center</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "rgba(244,237,216,0.35)",
              letterSpacing: "0.1em",
              marginTop: "1rem",
            }}
          >
            Real-time competitive programming & dev stats
          </p>
        </div>

        {/* Divider */}
        <motion.div
          {...lineDraw}
          style={{ ...lineDraw.style, height: "2px", background: "var(--vermilion)", transformOrigin: "left", marginBottom: "2.5rem" }}
        />

        {/* Grid */}
        <div className="stats-brutalist-grid">
          {/* ==================== LEETCODE CARD ==================== */}
          <div className="poster-stats-card card-lc">
            <div className="card-header-bar bar-lc">
              <span className="card-header-title">LEETCODE.SYS</span>
              <span className="card-header-tag">#{lcRanking > 0 ? lcRanking : "..."}</span>
            </div>
            <div className="card-content-body">
              <div className="card-hero-metric" style={{ marginBottom: "1.25rem" }}>
                <FlipCounter value={totalLCQ > 0 ? totalLCQ : 0} />
                <span className="metric-label">Solved</span>
              </div>

              <div className="progress-bars-container">
                <div className="stat-row">
                  <span className="stat-label">EASY</span>
                  <div className="stat-track">
                    <div className="stat-fill fill-easy" style={{ width: totalLCQ > 0 ? `${(easyLCQ / totalLCQ) * 100}%` : "0%" }}></div>
                  </div>
                  <span className="stat-value">{easyLCQ > 0 ? easyLCQ : "--"}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">MED</span>
                  <div className="stat-track">
                    <div className="stat-fill fill-medium" style={{ width: totalLCQ > 0 ? `${(mediumLCQ / totalLCQ) * 100}%` : "0%" }}></div>
                  </div>
                  <span className="stat-value">{mediumLCQ > 0 ? mediumLCQ : "--"}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">HARD</span>
                  <div className="stat-track">
                    <div className="stat-fill fill-hard" style={{ width: totalLCQ > 0 ? `${(hardLCQ / totalLCQ) * 100}%` : "0%" }}></div>
                  </div>
                  <span className="stat-value">{hardLCQ > 0 ? hardLCQ : "--"}</span>
                </div>
              </div>

              <div className="metrics-summary-grid">
                <div className="summary-box">
                  <span className="box-label">ACCEPTANCE</span>
                  <strong className="box-value">{lcAcceptanceRate}%</strong>
                </div>
                <div className="summary-box">
                  <span className="box-label">CONTEST RATING</span>
                  <strong className="box-value">{lcContributionPoints > 0 ? Math.round(lcContributionPoints) : "0"}</strong>
                </div>
              </div>

              <div className="badges-compact-footer">
                <span className="footer-small-title">{">"} Badges:</span>
                <div className="badges-mini-list">
                  {lcBadges.slice(0, 4).map((badge, idx) => (
                    <span key={badge.id || idx} className="mini-badge-pill">
                      {badge.displayName}
                    </span>
                  ))}
                  {lcBadges.length === 0 && <span className="mini-badge-pill italic">None</span>}
                </div>
              </div>
            </div>
          </div>

          {/* ==================== CODEFORCES CARD ==================== */}
          <div className="poster-stats-card card-cf">
            <div className="card-header-bar bar-cf">
              <span className="card-header-title">CODEFORCES.EXE</span>
              <span className="card-header-tag">{cfRank.toUpperCase()}</span>
            </div>
            <div className="card-content-body">
              <div className="card-hero-metric" style={{ marginBottom: "1.25rem" }}>
                <FlipCounter value={cfRating > 0 ? cfRating : 0} />
                <span className="metric-label">Rating</span>
              </div>

              <div className="metrics-flat-list">
                <div className="metric-item">
                  <span className="item-label">MAX RATING</span>
                  <span className="item-value highlight-cf">{cfMaxRating || "---"}</span>
                </div>
                <div className="metric-item">
                  <span className="item-label">MAX RANK</span>
                  <span className="item-value">{cfMaxRank !== "N/A" ? cfMaxRank.toUpperCase() : "---"}</span>
                </div>
                <div className="metric-item">
                  <span className="item-label">TOTAL SOLVED</span>
                  <span className="item-value">{cfTotalSolved || "--"}</span>
                </div>
                <div className="metric-item">
                  <span className="item-label">CONTESTS</span>
                  <span className="item-value">{cfContestsAttended || "--"}</span>
                </div>
                <div className="metric-item">
                  <span className="item-label">BEST RANK</span>
                  <span className="item-value">{cfBestRank}</span>
                </div>
              </div>

              <div className="card-action-container">
                <a
                  href={`https://codeforces.com/profile/${codeforcesHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sticker-action-btn btn-cf-style"
                >
                  ACCESS_PROFILE _
                </a>
              </div>
            </div>
          </div>

          {/* ==================== GITHUB CARD ==================== */}
          <div className="poster-stats-card card-gh">
            <div className="card-header-bar bar-gh">
              <span className="card-header-title">GITHUB.SYS</span>
              <span className="card-header-tag">{ghUsername}</span>
            </div>
            <div className="card-content-body">
              <div className="github-profile-header">
                {ghAvatar && <img src={ghAvatar} alt="Github Avatar" className="github-mini-avatar" />}
                <div className="github-profile-meta">
                  <span className="github-name">{ghName || "Developer"}</span>
                  <span className="github-bio">"{ghBio.substring(0, 50)}..."</span>
                </div>
              </div>

              <div className="card-hero-metric" style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                <FlipCounter value={ghPublicRepos > 0 ? ghPublicRepos : 0} />
                <span className="metric-label">Repositories</span>
              </div>

              <div className="metrics-summary-grid" style={{ marginTop: "0.5rem" }}>
                <div className="summary-box">
                  <span className="box-label">STARS</span>
                  <strong className="box-value">{ghTotalStars}</strong>
                </div>
                <div className="summary-box">
                  <span className="box-label">FOLLOWERS</span>
                  <strong className="box-value">{ghFollowers}</strong>
                </div>
                <div className="summary-box">
                  <span className="box-label">FORKS</span>
                  <strong className="box-value">{ghTotalForks}</strong>
                </div>
              </div>

              <div className="languages-bars-container" style={{ marginTop: "1rem" }}>
                <span className="footer-small-title">{">"} Top Languages:</span>
                <div className="languages-stretcher">
                  {Object.keys(ghLanguages).length > 0 ? (
                    Object.entries(ghLanguages)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([lang, count]) => (
                        <div key={lang} className="lang-bar-row">
                          <span className="lang-label">{lang}</span>
                          <div className="lang-bar-track">
                            <div className="lang-bar-fill" style={{ width: `${Math.min((count / 15) * 100, 100)}%` }}></div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <span className="footer-small-title italic">Scanning directories...</span>
                  )}
                </div>
              </div>

              <div className="card-action-container">
                <a
                  href={`https://github.com/${githubHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sticker-action-btn btn-gh-style"
                >
                  VIEW_GITHUB _
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
