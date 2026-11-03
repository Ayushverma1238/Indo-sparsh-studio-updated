import "./Career.css";
import { useEffect, useState } from "react";
import SocialLinks from "./SocialLinks";
import {
  FaRocket,
  FaBrain,
  FaGlobe,
  FaPaperPlane,
  FaComments,
  FaUpload,
} from "react-icons/fa6";
import Contact from "./Contact.jsx";
import "./Services.css";

import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import ScrollBeam from "./ScrollBeam";
import SEO from "../utils/seo.jsx";

export default function Career() {
  const [jobSuccess, setJobSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [resume, setResume] = useState(null);
  const [fileName, setFileName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const [jobForm, setJobForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", jobForm.name);
      formData.append("email", jobForm.email);
      formData.append("phone", jobForm.phone);
      formData.append("experience", jobForm.experience);
      formData.append("about", jobForm.about);
      formData.append("role", jobTitle);
      formData.append("resume", resume);
      const res = await fetch("/backend-php/api/career.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setJobSuccess(true);
        setJobForm({
          name: "",
          email: "",
          phone: "",
          experience: "",
          about: "",
        });
        setJobTitle("");
        setResume("");
        setFileName("");

        setTimeout(() => {
          setJobSuccess(false);
          setShowForm(false);
        }, 3000);
      }
    } catch (err) {
      alert("❌ Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleJobChange = (e) => {
    setJobForm({
      ...jobForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setFileName(file?.name);
  };

  const openForm = (title) => {
    setJobTitle(title);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };
  return (
    <>
      <SEO
        title="Careers | Indo Sparsh Studio"
        description="Explore career opportunities at Indo Sparsh Studio. Join our team and build your career in web development, app development, digital marketing, design, branding and technology."
        keywords="Indo Sparsh Studio careers, jobs at Indo Sparsh Studio, web development jobs, digital marketing jobs, UI UX jobs, software jobs, technology careers"
      />

      <section className="career-section">
        {/* HERO */}
        <div className="career-hero">
          <h1>
            Build Your <span>Future</span> With Us
          </h1>
          <p>
            Join Indo Sparsh Studio and work on futuristic products,
            cutting-edge technology, and meaningful digital experiences.
          </p>
        </div>

        {/* WHY WORK WITH US */}
        <div className="career-highlights">
          <div className="highlight-card">
            <h3>
              <FaRocket className="career-icon" />
              Growth Culture
            </h3>
            <p>Learn, build, and evolve with a team that pushes boundaries.</p>
          </div>

          <div className="highlight-card glow">
            <h3>
              <FaBrain className="career-icon" />
              Innovative Projects
            </h3>
            <p>Work on AI, immersive UI, and next-gen digital platforms.</p>
          </div>

          <div className="highlight-card">
            <h3>
              <FaGlobe className="career-icon" />
              Remote Friendly
            </h3>
            <p>Flexible work culture focused on results and creativity.</p>
          </div>
        </div>

        {/* ================= CAREER PIPELINE ================= */}
        <h2 className="career-title">Our Career Pipeline</h2>

        <div className="career-pipeline">
          <div className="pipeline-track"></div>

          <div className="pipeline-step s1">
            <div className="pipeline-core"></div>
            <div className="pipeline-card">
              <h3>
                <FaPaperPlane className="career-icon" />
                Apply
              </h3>
              <p>Submit your profile and portfolio.</p>
            </div>
          </div>

          <div className="pipeline-step s2">
            <div className="pipeline-core"></div>
            <div className="pipeline-card glow">
              <h3>
                <FaBrain className="career-icon" />
                Screening
              </h3>
              <p>We analyze skills and potential.</p>
            </div>
          </div>

          <div className="pipeline-step s3">
            <div className="pipeline-core"></div>
            <div className="pipeline-card">
              <h3>
                <FaComments className="career-icon" />
                Interview
              </h3>
              <p>Meet the Indo Sparsh team.</p>
            </div>
          </div>

          <div className="pipeline-step s4">
            <div className="pipeline-core"></div>
            <div className="pipeline-card glow">
              <h3>
                <HiOutlineClipboardDocumentList className="career-icon" />
                Task
              </h3>
              <p>Show how you think and build.</p>
            </div>
          </div>

          <div className="pipeline-step s5">
            <div className="pipeline-core"></div>
            <div className="pipeline-card">
              <h3>
                <FaRocket className="career-icon" />
                Welcome
              </h3>
              <p>You become part of Indo Sparsh.</p>
            </div>
          </div>
        </div>
        <ScrollBeam />
        {/* JOB OPENINGS */}
        <h2 className="career-title">Open Positions</h2>

        <div className="job-grid">
          <div className="job-card why-card">
            <h3>Frontend Developer (React)</h3>
            <p>Build immersive, high-performance user interfaces.</p>
            <span>Experience: 0–3 Years</span>
            <button onClick={() => openForm("Frontend Developer (React)")}>
              Apply Now
            </button>
          </div>

          <div className="job-card why-card glow">
            <h3>Backend Developer (Node.js)</h3>
            <p>Design secure, scalable backend systems and APIs.</p>
            <span>Experience: 0–4 Years</span>
            <button onClick={() => openForm("Backend Developer (Node.js)")}>
              Apply Now
            </button>
          </div>

          <div className="job-card why-card">
            <h3>UI/UX Designer</h3>
            <p>Create futuristic, human-centered digital experiences.</p>
            <span>Experience: 0–3 Years</span>
            <button onClick={() => openForm("UI/UX Designer")}>
              Apply Now
            </button>
          </div>

          <div className="job-card why-card">
            <h3>Explore more jobs</h3>
            <p>
              Discover exciting career opportunities across design, development,
              marketing, and more. Find the role that matches your skills and
              ambitions.
            </p>
            <span>Experience: 0–3 Years</span>
            <button
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSdgO__QQ8NtCMA278ZnQML5BTh9h7ONGlw2zO8iI_LtaBUhHg/viewform",
                  "_blank",
                )
              }
            >
              Apply Now
            </button>
          </div>
        </div>

        {showForm && (
          <div className="apply-modal">
            <div className="apply-form">
              <button className="close-btn" onClick={closeForm}>
                ✕
              </button>

              <h2>Apply for {jobTitle}</h2>

              <form onSubmit={handleJobSubmit}>
                <div className="form-group-contact">
                  <input
                    type="text"
                    name="name"
                    value={jobForm.name}
                    placeholder="Full Name"
                    onChange={handleJobChange}
                    required
                  />
                </div>

                <div className="form-group-contact">
                  <input
                    type="email"
                    name="email"
                    value={jobForm.email}
                    placeholder="Email Address"
                    onChange={handleJobChange}
                    required
                  />
                </div>

                <div className="form-group-contact">
                  <input
                    type="tel"
                    name="phone"
                    value={jobForm.phone}
                    placeholder="Phone Number"
                    onChange={handleJobChange}
                    required
                  />
                </div>

                <div className="form-group-contact">
                  <input
                    type="text"
                    name="experience"
                    value={jobForm.experience}
                    placeholder="Years of Experience"
                    onChange={handleJobChange}
                  />
                </div>

                <div className="form-group-contact file-upload">
                  <label className="upload-label">
                    <input
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                    />
                    <span className="upload-btn">
                      <FaUpload /> Upload Resume
                    </span>
                  </label>

                  {fileName && <p className="file-name">{fileName}</p>}
                </div>

                <div className="form-group-contact">
                  <textarea
                    value={jobForm.about}
                    name="about"
                    placeholder="Tell us about yourself"
                    onChange={handleJobChange}
                  ></textarea>
                </div>

                <button className="submit-btn">
                  {loading ? "Request Sending.." : "Submit Application"}
                </button>
              </form>
              {jobSuccess && (
                <div className="success-overlay">
                  <div className="success-box">
                    <div className="success-check">✓</div>
                    <h2>Application Sent</h2>
                    <p>Our team will review your profile soon.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <ScrollBeam />

      <Contact />
    </>
  );
}
