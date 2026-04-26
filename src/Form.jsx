import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "./App";
import { addDoc, collection } from "firebase/firestore";
import "./App.css";
import confetti from "canvas-confetti";


export default function Form() {
const [rating, setRating] = useState(0);
const [like, setLike] = useState("");
const [improve, setImprove] = useState("");
const [likedThings, setLikedThings] = useState([]);
const [usage, setUsage] = useState([]);
const [issues, setIssues] = useState([]);
const [submitted, setSubmitted] = useState(false);
const [warning, setWarning] = useState(false);
const [touched, setTouched] = useState(false);
const [loading, setLoading] = useState(false); 
const [errors, setErrors] = useState({});
const [priceRange, setPriceRange] = useState([]);

const emojis = ["😡","☹️","😊","😘","😍👌"];

const handleCheckbox = (value, state, setState) => {
if (state.includes(value)) {
setState(state.filter((item) => item !== value));
} else {
setState([...state, value]);
}
};

const handleSubmit = async () => {
  

  setLoading(true);

  const newErrors = {};

if (rating === 0) newErrors.rating = true;
if (like.trim() === "") newErrors.like = true;
if (improve.trim() === "") newErrors.improve = true;
if (priceRange.length === 0) newErrors.priceRange = true;
if (usage.length === 0) newErrors.usage = true;
if (issues.length === 0) newErrors.issues = true;

if (Object.keys(newErrors).length > 0) {
  setErrors(newErrors);
  setWarning(true);
  setTimeout(() => setWarning(false), 2000);
  setLoading(false);
  return;
}

// clear errors if valid
setErrors({});
try{
    await addDoc(collection(db, "reviews"), {
      rating,
      like,
      improve,
      priceRange,
      usage,
      issues,
      time: new Date(),
    });

    setSubmitted(true);

// 🎉 CONFETTI BLAST
confetti({ particleCount: 100, spread: 60 });

setTimeout(() => {
  confetti({ particleCount: 120, spread: 100 });
}, 300);
    

  } catch (err) {
    console.log(err);
  }

  setLoading(false);
};

return (
  <div
    style={{
      background: "#0f0f0f",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }}
  >
    <AnimatePresence>
      {!submitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            width: "400px",
            padding: "20px",
            borderRadius: "15px",
            background: "#1a1a1a"
          }}
        >
<div style={{ textAlign: "center" }}>

  <h1 style={{ color: "#ff4d4d", marginBottom: "10px" }}>
    🔥 Spicy Nut Sauce
  </h1>

  <p style={{ color: "#aaa" }}>
    👇 Slide to Rate your experience 👇
  </p>

  <motion.div
    key={rating}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    style={{ fontSize: "60px", marginBottom: "10px" }}
  >
    {rating > 0 ? emojis[rating - 1] : ""}
  </motion.div>

</div>
        {!touched && (
          <p style={{ color: "#888", fontSize: "12px" }}>
            
          </p>
        )}
       {/* 🔥 SLIDER START */}
<input
  type="range"
  min="0"
  max="5"
  value={rating}
  onChange={(e) => {
  setRating(Number(e.target.value));
  setTouched(true);

  if (Number(e.target.value) > 0) {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.rating;
      return newErrors;
    });
  }
}}
  style={{
    width: "100%",
    marginTop: "10px",

    /* 🔥 HEIGHT BADHA */
    height: "25px",

    borderRadius: "10px",
    outline: "none",
    transition: "0.3s",

    boxShadow: rating === 0 ? "0 0 15px red" : "none",
    animation: rating === 0 ? "pulse 1s infinite" : "none"
  }}
/>
{/* 🔥 SLIDER END */}
{errors.rating && (
  <p style={{ color: "red", fontSize: "12px" }}>
    Please slide to give ratings
  </p>
)}
       <textarea
  placeholder="What did you like?"
  value={like}
 onChange={(e) => {
  setLike(e.target.value);

  if (e.target.value.trim() !== "") {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.like;
      return newErrors;
    });
  }
}}
  style={{
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: errors.like ? "2px solid red" : "1px solid #333",
    background: "#2a2a2a",
    color: "white"
  }}
/>

        <textarea
  placeholder="What can improve?"
  value={improve}
  onChange={(e) => {
  setImprove(e.target.value);

  if (e.target.value.trim() !== "") {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.improve;
      return newErrors;
    });
  }
}}
  style={{
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: errors.improve ? "2px solid red" : "1px solid #333",
    background: "#2a2a2a",
    color: "white"
  }}
/>
        {/* Section 1 */}
        <h4 style={{ textAlign: "left", marginTop: "20px" }}>
          1. What should be the price of 200gm of this sauce?
        </h4>
        <div style={{ marginLeft: "10px" }}>
          {[ "100-300", "300-315", "315-320", "320-350"].map((item) => (
  <label key={item} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
    <input
      type="checkbox"
      onChange={() => {
        handleCheckbox(item, priceRange, setPriceRange);

        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.priceRange;
          return newErrors;
        });
      }}
    />
    {item}
  </label>
))}
</div>
{errors.priceRange && (
  <p style={{ color: "red", fontSize: "12px" }}>
    Select at least one option
  </p>
)}

        {/* Section 2 */}
        <h4 style={{ textAlign: "left" }}>
          2. Where would you use this?
        </h4>
        <div style={{ marginLeft: "10px" }}>
          {["Snacks", "Rice", "Noodles", "chapati/paratha"].map((item) => (
            <label key={item} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
              <input
                type="checkbox"
              onChange={() => {
  handleCheckbox(item, usage, setUsage);

  setErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors.usage;
    return newErrors;
  });
}}
/>
              {item}
            </label>
          ))}
        </div>
        {errors.usage && (
  <p style={{ color: "red", fontSize: "12px" }}>
    Select at least one option
  </p>
)}

        {/* Section 3 */}
        <h4 style={{ textAlign: "left" }}>
          3. Any issues?
        </h4>
        <div style={{ marginLeft: "10px" }}>
          {["Too spicy","Too thick", "Too salty", "No issues"].map((item) => (
            <label key={item} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
              <input
                type="checkbox"
               onChange={() => {
  handleCheckbox(item, issues, setIssues);

  setErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors.issues;
    return newErrors;
  });
}}
              />
              {item}
            </label>
          ))}
        </div>
        {errors.issues && (
  <p style={{ color: "red", fontSize: "12px" }}>
    Select at least one option
  </p>
)}

        {/* Button */}
         <motion.button
  type="button"
  onClick={handleSubmit}
  disabled={loading}
  whileTap={{ scale: 0.95 }}
  style={{
    marginTop: "15px",
    padding: "10px",
    width: "100%",
    background: loading ? "#555" : "red",
    border: "none",
    color: "white",
    borderRadius: "10px",
    cursor: loading ? "not-allowed" : "pointer"
  }}
>
  {loading ? "Submitting..." : "SUBMIT TO SEE THAT I AM AKSHAY KUMAR"}
</motion.button>
          {warning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: "red", marginTop: "10px" }}
            >
              ⚠ Please give rating and answer the questions first!
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center" }}
          
        >
     <video
  src="/thankyou.mp4"
  autoPlay
  controls
  style={{
    width: "80%",
    maxWidth: "600px",
    height: "500px",
    borderRadius: "20px"
    
  }}
  
/>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
}
