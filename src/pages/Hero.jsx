import { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import { Mail, Phone, Download, Award, Briefcase, User, Home, ChevronDown, ExternalLink, Star, BarChart2, Database, FileSpreadsheet, TrendingUp, MessageSquare, Users, Brain, Menu, X } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import Vaishali from '../assets/vaishali.png'
// Add this to your useInView hooks at the top of the component:
const NAV_LINKS = ["Home", "About", "Education", "Projects", "Experience", "Skills", "Certifications", "Achievements", "Contact"];
// ─── ACHIEVEMENTS DATA ───────────────────────────────────────────────────────
const ACHIEVEMENTS = [
    {
        icon: "🥇",
        title: "Gold Medalist",
        org: "Bharathidasan University",
        desc: "Awarded Gold Medal for academic excellence in B.COM",
        color: "#f59e0b",
        year: "2024",
    },
    {
        icon: "🏆",
        title: "University Rank Holder",
        org: "Periyar Maniammai Institute of Science & Technology",
        desc: "Secured top university rank among all MBA students in the specialization batch",
        color: "#6366f1",
        year: "2026",
    },
    {
        icon: "📊",
        title: "HR Analytics Practitioner",
        org: "Data Patterns & Netaxis IT",
        desc: "Applied analytical thinking to real-world HR operations across 2 internships",
        color: "#10b981",
        year: "2025 - 2026",
    },
    {
        icon: "💡",
        title: "MBA Specialization",
        org: "Human Resource Management",
        desc: "Dual specialization in HR and Business Analytics with distinction-level performance",
        color: "#ec4899",
        year: "2024–2026",
    },

];

// Add this data near your other constants at the top:
const BOOK = {
    title: "The Role of Artificial Intelligence in Personalized Learning Environments for Students",
    book: "Problem Solving Using Basic Statistical Tool",
    editor: "Dr. K.V.R. Rajandran",
    isbn: "978-93-94503-79-3",
    year: "2024",
    description:
        "This chapter dives deep into how AI is transforming education — making learning smarter, more personalized, and truly student-centric. With technology advancing every day, our classrooms are no longer one-size-fits-all.",
    highlights: [
        "AI-powered adaptive learning systems",
        "Personalized student learning paths",
        "Data-driven classroom insights",
        "Future of smart education",
    ],
    bookDownloadUrl: "https://drive.google.com/file/d/1pLDhJgNTmmZGASpp_84Elv_2nwjus3U_/view?usp=sharing",  // ← Replace with actual link
    chapterUrl: "https://drive.google.com/file/d/1AAvlKcWuKV9XFb5_mY3QGcDL8Eo8WXRF/view?usp=sharing",
    // ← Replace with actual link
};

const SKILLS = [
    { name: "MS Excel", icon: <FileSpreadsheet size={22} />, level: 90, color: "#16a34a" },
    { name: "Power BI", icon: <BarChart2 size={22} />, level: 85, color: "#f59e0b" },
    { name: "Python", icon: <Brain size={22} />, level: 78, color: "#6366f1" },
    { name: "Looker Studio", icon: <TrendingUp size={22} />, level: 80, color: "#06b6d4" },
    { name: "HR Analytics", icon: <Users size={22} />, level: 88, color: "#ec4899" },
    // { name: "SQL", icon: <Database size={22} />, level: 72, color: "#f97316" },
    { name: "Communication", icon: <MessageSquare size={22} />, level: 92, color: "#8b5cf6" },
    { name: "Talent Management", icon: <Star size={22} />, level: 85, color: "#14b8a6" },
];

const EXPERIENCES = [
    {
        company: "Data Patterns",
        location: "Chennai",
        role: "HR Intern",
        duration: "2 Months",
        year: "Jun 2025 - July 2025",
        points: [
            "Supported end-to-end recruitment process including resume screening and interview coordination",
            "Managed onboarding activities and coordinated with cross-functional teams",
            "Maintained accurate employee records and HR documentation",
            "Assisted in HR reporting and data analysis tasks",
        ],
        color: "#6366f1",
        bg: "from-indigo-500/10 to-purple-500/5",
        href: "https://drive.google.com/file/d/1Dfts0FtchbCtXtcsrS8hB9PnmmeENV6H/view?usp=sharing",
    },
    {
        company: "Netaxis IT Solutions",
        location: "Chennai – Anna Nagar",
        role: "HR Intern",
        duration: "2 Month",
        year: "Dec 2025 - Jan 2026",
        points: [
            "Assisted HR team in daily operations and employee engagement activities",
            "Handled HR documentation, filing, and record management",
            "Supported onboarding coordination for new joiners",
            "Applied analytical thinking to optimize HR reporting workflows",
        ],
        color: "#06b6d4",
        bg: "from-cyan-500/10 to-blue-500/5",
        href: "https://drive.google.com/file/d/1yNH44Oza59uGPXd59WRdXcTrx0u1zK09/view?usp=sharing",
    },
];

// ─── PROJECTS DATA ───────────────────────────────────────────────────────────
const PROJECTS = [
    {
        type: "Descriptive Research · 2025",
        title: "Impact of Artificial Intelligence on Employee Training Effectiveness",
        org: "Netaxis IT Solutions Pvt. Ltd., Chennai",
        sample: "150 Employees",
        scale: "5-Point Likert Scale",
        stats: [
            { val: "150", label: "Respondents" },
            { val: "4", label: "Statistical Tools" },
            { val: "5", label: "AI Dimensions" },
        ],
        desc: "Examined how AI technologies — including machine learning, NLP, and predictive analytics — shape employee training effectiveness in a real-world organizational setting.",
        points: [
            "Collected and analyzed primary data from 150 employees using a structured 5-point Likert scale questionnaire.",
            "Applied Mean Analysis, ANOVA, Correlation, and Regression to identify key drivers of training effectiveness.",
            "Evaluated AI's role across personalized learning, real-time feedback, skill development, accessibility, and engagement.",
            "Identified challenges including technological adaptation, ethical concerns, and continuous reskilling needs.",
            "Concluded that AI significantly enhances training outcomes by making learning more personalized and outcome-oriented.",
        ],
        tools: ["MS Excel", "SPSS", "ANOVA", "Regression Analysis", "Correlation", "Mean Analysis", "Likert Scale"],
        insight: "AI-powered training systems demonstrated a statistically significant positive impact on learning personalization and employee engagement.",
    },
];

const CERTIFICATIONS = [
    {
        name: "Soft Skills for Business Negotiation",
        org: "MSME",
        color: "#6366f1",
        desc: "Completed certification focused on business negotiation, conflict resolution, and decision-making skills. This course improved my confidence in handling real-world business situations.",
        href: "https://drive.google.com/file/d/10WjLNeTktGOA0c0t6UzaoQ2Zg1Usd5XV/view?usp=sharing"
    },
    {
        name: "Python for Data Science",
        org: "NPTEL - IIT Madras (SWAYAM)",
        color: "#22c55e",
        href: "https://drive.google.com/file/d/1SvRbfwZ_kd3GJVKdMt2FI3WTkqwVjQ1E/view?usp=sharing",
        desc: "Learned Python fundamentals, data analysis, and visualization using NumPy, pandas, and matplotlib. Worked with real-world datasets. Achieved Elite certification with 68%."
    },
    {
        name: "Data Science for Engineers",
        org: "NPTEL",
        color: "#f59e0b",
        href: "https://drive.google.com/file/d/1hn8ODj6EGnTh_Opw0WannUDS7m42R_F3/view?usp=sharing",
        desc: "Gained strong understanding of data science concepts and analytical thinking. Completed with Elite certification (61%) through consistent effort and practical learning."
    }
];
const EDUCATION = [
    {
        degree: "MBA - HR & Business Analytics",
        college: "PMIST University",
        year: "Aug 2024 – July 2026",
        score: "CGPA: 9.6",
        color: "#6366f1",
    },
    {
        degree: "B.Com",
        college: "Bharathidasan University",
        year: "Oct 2021 –May  2024",
        score: "CGPA: 9.1",
        color: "#22c55e",
    },
];

function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

function SkillBar({ skill, delay }) {
    const [ref, visible] = useInView();
    return (
        <div ref={ref} className="group" style={{ transitionDelay: `${delay}ms` }}>
            <div className="flex items-center gap-3 mb-2">
                <span style={{ color: skill.color }} className="transition-transform group-hover:scale-125 duration-300">{skill.icon}</span>
                <span className="text-sm font-semibold text-slate-200 tracking-wide">{skill.name}</span>
                <span className="ml-auto text-xs font-mono" style={{ color: skill.color }}>{skill.level}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                        width: visible ? `${skill.level}%` : "0%",
                        background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                        transitionDelay: `${delay + 200}ms`,
                        boxShadow: visible ? `0 0 12px ${skill.color}66` : "none",
                    }}
                />
            </div>
        </div>
    );
}


export default function Hero() {
    const [active, setActive] = useState("Home");
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [achieveRef, achieveVisible] = useInView();
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSend = (e) => {
        e.preventDefault();
        setLoading(true)
        emailjs
            .send(
                "service_tvrydfg",   // 🔁 replace
                "template_xecb0v9",  // 🔁 replace
                {
                    from_name: form.name,
                    from_email: form.email,
                    subject: form.subject,
                    message: form.message,
                },
                "H79AU5DuhkjQX48wv"    // 🔁 replace
            )
            .then(() => {
                alert("Message sent successfully ✅");
                setForm({ name: "", email: "", subject: "", message: "" });
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to send ❌");
                setLoading(false)
            });
    };
    const handleChange = (e) => {
        const { placeholder, value } = e.target;

        const keyMap = {
            "Your Name": "name",
            "Your Email": "email",
            Subject: "subject",
            "Your message...": "message",
        };

        setForm({ ...form, [keyMap[placeholder]]: value });
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
        setActive(id);
        setMenuOpen(false);
    };

    const [aboutRef, aboutVisible] = useInView();
    const [expRef, expVisible] = useInView();
    const [certRef, certVisible] = useInView();
    const [contactRef, contactVisible] = useInView();

    return (
        <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');
        * { box-sizing: border-box; scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c14; }
        ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 9px; }
        .font-display { font-family: 'Playfair Display', serif; }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 32px #6366f155,0 0 0 0 #6366f100} 50%{box-shadow:0 0 64px #6366f188,0 0 0 8px #6366f122} }
        @keyframes spinRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideInLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 30%{transform:translate(3%,-1%)} 50%{transform:translate(-1%,2%)} 70%{transform:translate(2%,1%)} 90%{transform:translate(-3%,2%)} }
        .float-anim { animation: floatY 4s ease-in-out infinite; }
        .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .spin-ring { animation: spinRing 10s linear infinite; }
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .slide-left { animation: slideInLeft 0.7s ease forwards; }
        .slide-right { animation: slideInRight 0.7s ease forwards; }
        .scale-in { animation: scaleIn 0.7s ease forwards; }
        .shimmer-text { background: linear-gradient(90deg, #a5b4fc, #f0abfc, #6366f1, #a5b4fc); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s linear infinite; }
        .glass { backdrop-filter: blur(16px); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
        .gold-badge { background: linear-gradient(135deg, #f59e0b, #fbbf24, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .grid-dots { background-image: radial-gradient(rgba(99,102,241,0.15) 1px, transparent 1px); background-size: 32px 32px; }
      `}</style>

            {/* NAVBAR */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "glass shadow-lg shadow-black/40 py-2" : "bg-transparent py-4"}`}>
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                    <span className="font-display italic text-xl text-indigo-400 tracking-wide">Vaishali<span className="text-white">.</span></span>
                    <div className="hidden md:flex gap-1">
                        {NAV_LINKS.map(link => (
                            <button key={link} onClick={() => scrollTo(link)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active === link ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
                                {link}
                            </button>
                        ))}
                    </div>
                    <button className="md:hidden text-slate-300" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                {menuOpen && (
                    <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4 flex flex-col gap-2">
                        {NAV_LINKS.map(link => (
                            <button key={link} onClick={() => scrollTo(link)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium text-left transition-all ${active === link ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}>
                                {link}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* HOME SECTION */}
            <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden grid-dots">
                {/* Background blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" style={{ transform: "translate(-50%,-50%)" }} />

                <div className="max-w-6xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16 w-full">
                    {/* Text */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <div className="fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
                            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 mb-4">
                                ✦ MBA · HR Analytics · Business Analytics
                            </span>
                        </div>
                        <h1 className="fade-up font-display text-5xl md:text-6xl xl:text-7xl leading-tight" style={{ animationDelay: "0.2s", opacity: 0 }}>
                            Hi, I'm <span className="shimmer-text">Vaishali</span>
                        </h1>
                        <p className="fade-up text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0" style={{ animationDelay: "0.35s", opacity: 0 }}>
                            A <span className="text-indigo-300 font-semibold">Gold Medalist</span> & <span className="text-indigo-300 font-semibold">University Rank Holder</span> passionate about transforming HR through data-driven insights and analytical thinking.
                        </p>
                        <div className="fade-up flex flex-wrap gap-3 justify-center lg:justify-start" style={{ animationDelay: "0.5s", opacity: 0 }}>
                            <button onClick={() => scrollTo("Contact")}
                                className="px-7 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:scale-95">
                                Get In Touch
                            </button>
                            <button onClick={() => scrollTo("Experience")}
                                className="px-7 py-3 rounded-full glass text-slate-300 hover:text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5">
                                View Experience
                            </button>
                        </div>
                    </div>

                    {/* Profile image */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4 fade-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
                        <div className="relative float-anim">
                            {/* Spinning ring */}
                            <div className="absolute inset-0 rounded-full spin-ring" style={{
                                background: "conic-gradient(from 0deg, #6366f1, #a78bfa, #06b6d4, #6366f1)",
                                padding: "3px",
                                borderRadius: "9999px",
                            }}>
                                <div className="w-full h-full rounded-full bg-[#080c14]" />
                            </div>
                            {/* Inner glow ring */}
                            <div className="absolute -inset-3 rounded-full glow-pulse" style={{ border: "1px solid #6366f133" }} />
                            {/* Image placeholder – user will drop their photo here */}
                            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-indigo-600/40"
                                style={{ boxShadow: "0 0 48px #6366f155" }}>
                                {/* Gradient placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-800 to-cyan-800 flex items-center justify-center">
                                    <div className="text-center">
                                        {/* <User size={64} className="text-indigo-300 mx-auto mb-2 opacity-60" /> */}
                                        <p className="text-xs text-indigo-300 px-4">
                                            <img src={Vaishali} className="w-full h-full rounded-full" alt="" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Badge */}
                        <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg">
                            <Award size={20} className="text-yellow-400" />
                            <div>
                                <p className="text-xs font-bold gold-badge">Gold Medalist</p>
                                <p className="text-xs text-slate-500">Bharathidasan University</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 animate-bounce">
                    <ChevronDown size={20} />
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="py-28 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-6xl mx-auto px-6">
                    <div ref={aboutRef} className={`transition-all duration-1000 ${aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                        <div className="flex items-center gap-4 mb-12">
                            <span className="w-10 h-0.5 bg-indigo-500" />
                            <h2 className="font-display text-4xl md:text-5xl">About <span className="shimmer-text">Me</span></h2>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    I'm an <span className="text-indigo-300 font-semibold">MBA graduate</span> specializing in <span className="text-indigo-300 font-semibold">Human Resource </span> and <span className="text-indigo-300 font-semibold">Business Analytics</span>, driven by a passion for leveraging data to enhance employee experiences and organizational effectiveness.
                                </p>
                                <p className="text-slate-400 leading-relaxed">
                                    My academic journey at Bharathidasan University crowned me a <strong className="text-yellow-400">Gold Medalist and University Rank Holder</strong>, reflecting my dedication to continuous excellence. I combine strong HR fundamentals with modern analytical tools to deliver meaningful people insights.
                                </p>
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    {[
                                        { label: "Internships", value: "2", sub: "Completed" },
                                        { label: "Tools", value: "4+", sub: "Proficient" },
                                        { label: "Specialization", value: "HR", sub: "& Analytics" },
                                        { label: "Achievement", value: "🥇", sub: "Gold Medalist" },
                                    ].map(item => (
                                        <div key={item.label} className="glass rounded-2xl p-4 text-center hover:border-indigo-500/30 transition-colors">
                                            <p className="text-2xl font-bold text-indigo-400">{item.value}</p>
                                            <p className="text-xs text-slate-400 mt-1">{item.label}</p>
                                            <p className="text-xs text-slate-600">{item.sub}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="glass rounded-3xl p-8 space-y-4">
                                <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                                    <User size={18} className="text-indigo-400" /> Quick Info
                                </h3>
                                {[
                                    { label: "Degree", value: "MBA – HR & Business Analytics" },
                                    { label: "University", value: "PMIST University [Deemed University] - MBA" },
                                    { label: "Achievement", value: "Gold Medalist in B.COM · University Rank Holder" },
                                    { label: "Interests", value: "HR Analytics · Talent Management · BI" },
                                    { label: "Location", value: "Tamil Nadu, India" },
                                ].map(item => (
                                    <div key={item.label} className="flex gap-4 py-2 border-b border-white/5 last:border-0">
                                        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider w-28 flex-shrink-0 pt-0.5">{item.label}</span>
                                        <span className="text-sm text-slate-300">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            <a href="https://drive.google.com/file/d/1p5dk7jPCk2KCg3nQh7svPnLwIDSKp8fa/view?usp=sharing" target="_blank" className="inline-block px-7 text-center py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:scale-95">
                                Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* Education Section */}

            <section
                id="education"
                className="py-28 relative overflow-hidden"
            >
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-14">
                        <span className="w-10 h-0.5 bg-indigo-500" />
                        <h2 className="text-4xl md:text-5xl font-display">
                            <span className="shimmer-text">Education</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {EDUCATION.map((edu, i) => (
                            <div
                                key={i}
                                className="glass rounded-3xl p-6 flex flex-col gap-3 hover:-translate-y-2 transition-all duration-500"
                                style={{ border: `1px solid ${edu.color}22` }}
                            >
                                {/* Top */}
                                <div className="flex items-center justify-between">
                                    <h3 className="text-white font-semibold text-lg">
                                        {edu.degree}
                                    </h3>
                                    <span
                                        className="text-xs font-medium px-3 py-1 rounded-full"
                                        style={{
                                            background: `${edu.color}22`,
                                            color: edu.color,
                                        }}
                                    >
                                        {edu.year}
                                    </span>
                                </div>

                                {/* College */}
                                <p className="text-sm text-slate-400">{edu.college}</p>

                                {/* Score */}
                                <p
                                    className="text-sm font-semibold"
                                    style={{ color: edu.color }}
                                >
                                    {edu.score}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="py-28 relative overflow-hidden" style={{ background: "#f7f5f0" }}>
                {/* bg dots */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "radial-gradient(#6366f118 1px, transparent 1px)",
                    backgroundSize: "28px 28px"
                }} />
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{
                    background: "radial-gradient(circle, #e8e3f8 0%, transparent 70%)"
                }} />
                <div className="absolute bottom-10 left-0 w-64 h-64 rounded-full pointer-events-none" style={{
                    background: "radial-gradient(circle, #d4f0e8 0%, transparent 70%)"
                }} />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="flex items-center gap-4 mb-14">
                        <span className="w-10 h-0.5 bg-indigo-500" />
                        <h2 className="font-display text-4xl md:text-5xl text-[#1a1625]">
                            Research <span className="italic text-indigo-500">Projects</span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-8">
                        {PROJECTS.map((proj, idx) => (
                            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-indigo-100 shadow-lg hover:-translate-y-1 transition-all duration-300">
                                {/* Card Header */}
                                <div className="p-8 relative overflow-hidden" style={{
                                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #06b6d4 100%)"
                                }}>
                                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-white/90 border border-white/25 bg-white/15 mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />{proj.type}
                                    </span>
                                    <h3 className="font-display text-2xl font-semibold text-white mb-3 relative z-10">{proj.title}</h3>
                                    <div className="flex flex-wrap gap-2 relative z-10">
                                        {[`🏢 ${proj.org}`, `👥 Sample: ${proj.sample}`, `📋 ${proj.scale}`].map(m => (
                                            <span key={m} className="px-3 py-1 rounded-full text-xs text-white/85 bg-white/15">{m}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-8">
                                    {/* Stats strip */}
                                    <div className="grid grid-cols-3 gap-px bg-indigo-100 rounded-xl overflow-hidden mb-6">
                                        {proj.stats.map(s => (
                                            <div key={s.label} className="bg-indigo-50/60 p-4 text-center">
                                                <p className="font-display text-2xl font-semibold text-indigo-500">{s.val}</p>
                                                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{proj.desc}</p>

                                    <ul className="space-y-2.5 mb-7">
                                        {proj.points.map((pt, j) => (
                                            <li key={j} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-2" />
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Tools & Methods</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {proj.tools.map(t => (
                                            <span key={t} className="font-mono text-xs px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-500 border border-indigo-200">{t}</span>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 items-start bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-100 rounded-2xl p-4">
                                        <span className="text-lg">💡</span>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            <span className="font-semibold text-indigo-500">Key Insight: </span>{proj.insight}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, transparent 0%, #0d111e 50%, transparent 100%)" }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div ref={expRef}>
                        <div className="flex items-center gap-4 mb-14">
                            <span className="w-10 h-0.5 bg-indigo-500" />
                            <h2 className="font-display text-4xl md:text-5xl">Work <span className="shimmer-text">Experience</span></h2>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {EXPERIENCES.map((exp, i) => (
                                <div key={exp.company}
                                    className={`glass rounded-3xl p-8 group hover:border-opacity-40 transition-all duration-700 ${expVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
                                    style={{ transitionDelay: `${i * 200}ms`, borderColor: `${exp.color}22`, background: `linear-gradient(135deg, ${exp.color}08, transparent)` }}>
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Briefcase size={16} style={{ color: exp.color }} />
                                                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: exp.color }}>{exp.duration}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                                            <p className="text-slate-400 text-sm mt-0.5">{exp.role} · {exp.location}</p>
                                        </div>
                                        <span className="text-xs glass rounded-full px-3 py-1 text-slate-400">{exp.year}</span>
                                    </div>
                                    <ul className="space-y-3 mb-6">
                                        {exp.points.map((pt, j) => (
                                            <li key={j} className="flex items-start gap-2.5 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href={exp.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                                        style={{ background: `${exp.color}22`, color: exp.color, border: `1px solid ${exp.color}44` }}
                                    >
                                        <Download size={15} /> Download Certificate
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="py-28 relative overflow-hidden">
                <div className="absolute left-0 top-1/2 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-14">
                        <span className="w-10 h-0.5 bg-indigo-500" />
                        <h2 className="font-display text-4xl md:text-5xl">My <span className="shimmer-text">Skills</span></h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {SKILLS.map((skill, i) => (
                            <div key={skill.name} className="glass rounded-2xl p-6 hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                                <SkillBar skill={skill} delay={i * 80} />
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {["Recruitment Support", "Onboarding Coordination", "Employee Records", "HR Documentation", "Problem Solving", "Team Collaboration", "Data Analysis", "Report Generation"].map(tag => (
                            <span key={tag} className="glass text-xs px-4 py-2 rounded-full text-slate-400 hover:text-indigo-300 hover:border-indigo-500/30 transition-all cursor-default">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CERTIFICATIONS SECTION */}
            <section id="certifications" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, transparent, #0d111e 40%, #0d111e 60%, transparent)" }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div ref={certRef}>
                        <div className="flex items-center gap-4 mb-14">
                            <span className="w-10 h-0.5 bg-indigo-500" />
                            <h2 className="font-display text-4xl md:text-5xl"><span className="shimmer-text">Certifications</span></h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {CERTIFICATIONS.map((cert, i) => (
                                <div key={cert.name}
                                    className={`glass rounded-3xl p-6 flex flex-col gap-4 group hover:border-opacity-40 transition-all duration-700 hover:-translate-y-2 ${certVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                                    style={{ transitionDelay: `${i * 120}ms`, borderColor: `${cert.color}22` }}>
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${cert.color}22` }}>
                                        <Award size={24} style={{ color: cert.color }} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white text-sm leading-snug">{cert.name}</h3>
                                        <p className="text-xs mt-1 font-medium" style={{ color: cert.color }}>{cert.org}</p>
                                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{cert.desc}</p>
                                    </div>
                                    <a
                                        href={cert.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 group-hover:-translate-y-0.5 active:scale-95 w-full justify-center"
                                        style={{ background: `${cert.color}18`, color: cert.color, border: `1px solid ${cert.color}33` }}
                                    >
                                        <Download size={13} /> Download Certificate
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ACHIEVEMENTS SECTION ─────────────────────────────────────────────── */}
            <section id="achievements" className="py-28 relative overflow-hidden">
                <div className="absolute inset-0 grid-dots opacity-40 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6">
                    <div ref={achieveRef}>

                        {/* Heading */}
                        <div className={`flex items-center gap-4 mb-14 transition-all duration-700 ${achieveVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                            <span className="w-10 h-0.5 bg-yellow-500" />
                            <h2 className="font-display text-4xl md:text-5xl">
                                Achieve<span className="shimmer-text">ments</span>
                            </h2>
                        </div>

                        {/* Stat strip */}
                        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-700 delay-100 ${achieveVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                            {[
                                { value: "🥇", label: "Gold Medal", sub: "Top Graduate" },
                                { value: "#1", label: "University Rank", sub: "Batch Topper" },
                                { value: "2", label: "Internships", sub: "Completed" },
                                { value: "1", label: "Publication", sub: "Book Chapter" },
                            ].map((s) => (
                                <div key={s.label} className="glass rounded-2xl p-5 text-center hover:-translate-y-1 transition-all duration-300 group">
                                    <p className="text-3xl font-bold text-yellow-400 group-hover:scale-110 inline-block transition-transform duration-300">{s.value}</p>
                                    <p className="text-sm font-semibold text-slate-200 mt-1">{s.label}</p>
                                    <p className="text-xs text-slate-600 mt-0.5">{s.sub}</p>
                                </div>
                            ))}
                        </div>

                        {/* 4 Achievement cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                            {ACHIEVEMENTS.map((item, i) => (
                                <div
                                    key={item.title}
                                    className={`glass rounded-3xl p-6 flex flex-col gap-4 group hover:-translate-y-2 transition-all duration-700 ${achieveVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                                    style={{
                                        transitionDelay: `${i * 120 + 200}ms`,
                                        borderColor: `${item.color}33`,
                                        background: `linear-gradient(145deg, ${item.color}08, transparent)`,
                                    }}
                                >
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                                        style={{ background: `${item.color}20` }}
                                    >
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 space-y-1.5">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-bold text-white text-sm leading-snug">{item.title}</h3>
                                            <span
                                                className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-mono"
                                                style={{ background: `${item.color}18`, color: item.color }}
                                            >
                                                {item.year}
                                            </span>
                                        </div>
                                        <p className="text-xs font-semibold" style={{ color: item.color }}>{item.org}</p>
                                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                    <div
                                        className="h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
                                        style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* ── BOOK CARD — separate, full width, inside same section ── */}
                        <div
                            className={`glass rounded-3xl overflow-hidden transition-all duration-1000 delay-700 ${achieveVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                            style={{ borderColor: "#06b6d433", background: "linear-gradient(135deg, #06b6d408, #6366f105)" }}
                        >
                            {/* Top rainbow bar */}
                            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #06b6d4, #6366f1, #ec4899)" }} />

                            <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8">

                                {/* Book mockup */}
                                <div className="flex-shrink-0 flex flex-col items-center gap-4">
                                    <div className="relative float-anim">
                                        <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-150 pointer-events-none" />
                                        <div
                                            className="relative w-36 h-48 rounded-xl overflow-hidden"
                                            style={{ boxShadow: "0 24px 48px #06b6d444, 0 0 0 1px #06b6d433" }}
                                        >
                                            <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, #0c4a6e, #0e7490, #155e75)" }} />
                                            <div className="absolute left-5 top-0 bottom-0 w-px bg-cyan-400/30" />
                                            <div className="absolute inset-0 flex flex-col justify-between p-4">
                                                <div>
                                                    <div className="text-2xl mb-2">📖</div>
                                                    <p className="text-cyan-200 text-xs font-bold uppercase tracking-widest mb-1">Chapter</p>
                                                    <p className="text-white text-xs leading-relaxed font-medium">AI in Personalized Learning</p>
                                                </div>
                                                <div>
                                                    <div className="h-px bg-cyan-400/30 mb-2" />
                                                    <p className="text-cyan-300 text-xs" style={{ fontSize: "9px" }}>ISBN: 978-93-94503-79-3</p>
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 opacity-10" style={{ background: "linear-gradient(135deg, white 0%, transparent 60%)" }} />
                                        </div>
                                    </div>
                                    {/* Published badge */}
                                    <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-xs font-semibold text-green-400">Officially Published</span>
                                    </div>
                                </div>

                                {/* Vertical divider */}
                                <div className="hidden md:block w-px self-stretch bg-cyan-500/15" />

                                {/* Content */}
                                <div className="flex-1 space-y-4 text-center md:text-left">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">📚 Book Chapter Publication · {BOOK.year}</p>
                                        <h3 className="font-display text-lg md:text-xl text-white leading-snug">"{BOOK.title}"</h3>
                                    </div>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-1.5 text-xs text-slate-400">
                                        <span>📘 <span className="text-slate-300 font-medium">Book:</span> {BOOK.book}</span>
                                        <span>✏️ <span className="text-slate-300 font-medium">Editor:</span> {BOOK.editor}</span>
                                        <span>🔖 <span className="text-slate-300 font-medium">ISBN:</span> {BOOK.isbn}</span>
                                    </div>

                                    <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{BOOK.description}</p>

                                    {/* Highlights */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {BOOK.highlights.map((h, i) => (
                                            <div key={i} className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                                                <span className="text-xs text-slate-400">{h}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* ── TWO BUTTONS ── */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                                        <a
                                            href={BOOK.bookDownloadUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                                            style={{
                                                background: "linear-gradient(135deg, #0e7490, #06b6d4)",
                                                boxShadow: "0 8px 24px #06b6d433",
                                                color: "white",
                                            }}
                                        >
                                            <Download size={15} /> Download Book
                                        </a>
                                        <a
                                            href={BOOK.chapterUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 glass"
                                            style={{ border: "1px solid #06b6d444", color: "#06b6d4" }}
                                        >
                                            <ExternalLink size={15} /> View My Chapter
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quote banner */}
                        <div
                            className={`mt-6 glass rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 transition-all duration-700 delay-700 ${achieveVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            style={{ borderColor: "#f59e0b22", background: "linear-gradient(135deg, #f59e0b08, transparent)" }}
                        >
                            <div className="text-5xl">🎓</div>
                            <div className="text-center md:text-left">
                                <p className="text-lg font-display italic text-slate-200">
                                    "Excellence is not a destination but a continuous journey of learning and growth."
                                </p>
                                <p className="text-sm text-yellow-500 font-semibold mt-2">
                                    — Gold Medalist · University Rank Holder · Published Author · Bharathidasan University
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-28 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-3xl mx-auto px-6 text-center" ref={contactRef}>
                    <div className={`transition-all duration-1000 ${contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                        <div className="flex items-center justify-center gap-4 mb-12">
                            <span className="w-10 h-0.5 bg-indigo-500" />
                            <h2 className="font-display text-4xl md:text-5xl">Let's <span className="shimmer-text">Connect</span></h2>
                            <span className="w-10 h-0.5 bg-indigo-500" />
                        </div>
                        <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                            I'm actively seeking opportunities in <span className="text-indigo-300">HR Analytics</span>, <span className="text-indigo-300">Talent Management</span>, or <span className="text-indigo-300">Business Analytics</span>. Feel free to reach out!
                        </p>
                        <div className="grid sm:grid-cols-3 gap-4 mb-10">
                            {[
                                {
                                    icon: <Phone size={20} />,
                                    label: "Phone",
                                    value: "+91 8072 053 546",
                                    link: "tel:+918072053546",
                                    color: "#10b981",
                                },
                                {
                                    icon: <Mail size={20} />,
                                    label: "Email",
                                    value: "vaishaliit444@gmail.com",
                                    link: "mailto:vaishaliit444@gmail.com",
                                    color: "#6366f1",
                                },
                                {
                                    icon: <FaLinkedinIn size={20} />,
                                    label: "LinkedIn",
                                    value: "View Profile",
                                    link: "https://www.linkedin.com/in/vaishalihr4/", // 👈 replace this
                                    color: "#06b6d4",
                                },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.link}
                                    target={item.label === "LinkedIn" ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="glass rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-opacity-40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                                    style={{ borderColor: `${item.color}22` }}
                                >
                                    <span
                                        style={{ color: item.color }}
                                        className="group-hover:scale-110 transition-transform duration-300"
                                    >
                                        {item.icon}
                                    </span>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-slate-600 mb-0.5">
                                            {item.label}
                                        </p>
                                        <p className="text-sm font-medium text-slate-300">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <form
                            onSubmit={handleSend}
                            className="glass rounded-3xl p-8 text-left space-y-4"
                        >
                            <h3 className="font-semibold text-slate-200 flex items-center gap-2 mb-6">
                                <ExternalLink size={16} className="text-indigo-400" /> Send a Message
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                                />
                                <input
                                    placeholder="Your Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    type="email"
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                                />
                            </div>

                            <input
                                placeholder="Subject"
                                value={form.subject}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                            />

                            <textarea
                                placeholder="Your message..."
                                rows={4}
                                value={form.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:scale-95"
                            >
                                {loading ? "Sending..." : "Send Message ✦"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/5 py-8 text-center">
                <p className="text-slate-600 text-sm">
                    Crafted with ♥ by <span className="text-indigo-400 font-medium">Vaishali</span> · MBA · HR Analytics
                </p>
                <p className="text-slate-700 text-xs mt-1">Gold Medalist · Bharathidasan University</p>
            </footer>
        </div>
    );
}