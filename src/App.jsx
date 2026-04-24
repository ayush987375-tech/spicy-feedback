import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNW06ZBWli_A9mgbgRLStpUOFDHy5hMe8",
  authDomain: "spicy-sauce-review.firebaseapp.com",
  projectId: "spicy-sauce-review",
  storageBucket: "spicy-sauce-review.firebasestorage.app",
  messagingSenderId: "267159692392",
  appId: "1:267159692392:web:85747ccc15ae7685e4c7dd",
  measurementId: "G-QBL3Z2K2CE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState(false);

  const [like, setLike] = useState("");
const [improve, setImprove] = useState("");
const [touched, setTouched] = useState(false);

const [likedThings, setLikedThings] = useState([]);
const [usage, setUsage] = useState([]);
const [issues, setIssues] = useState([]);

  const emojis = ["😡","😕","😐","😊","🤩"];
  <style>
{`
@keyframes pulse {
  0% { box-shadow: 0 0 5px #00ffcc; }
  50% { box-shadow: 0 0 20px #00ffcc; }
  100% { box-shadow: 0 0 5px #00ffcc; }
}
`}
</style>

  return (
    <div style={{
      background:"#0f0f0f",
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      color:"white"
    }}>

      <AnimatePresence>
  {!submitted ? (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        background: "#1c1c1c",
        padding: "25px",
        borderRadius: "20px",
        width: "420px",
        maxHeight: "90vh",
        overflow: "auto",
        textAlign: "center",
        boxShadow: "0 0 40px rgba(255,0,0,0.2)"
      }}
    >
      <h1 style={{ color: "#ff4d4d" }}>🔥 Spicy Nut Sauce</h1>
      <p style={{ color: "#aaa" }}>Rate your experience</p>
      {rating === 0 && (
  <p style={{color:"#888", marginBottom:"10px"}}>
    👉 Slide to rate
  </p>
)}

      {/* Emoji */}
     {rating > 0 && (
  <motion.div
    key={rating}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    style={{ fontSize: "70px", marginBottom: "15px" }}
  >
    {emojis[rating - 1]}
  </motion.div>
)}

{!touched && (
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{
      color: "#00ffcc",
      marginBottom: "10px",
      fontSize: "14px"
    }}
  >
    👉 Slide to rate your experience
  </motion.p>
)}

  

            {/* Slider */}
           <input
  type="range"
  min="0"
  max="5"
  value={rating}
  onChange={(e)=>{
    setRating(Number(e.target.value));
    setTouched(true); // 
  }}
  style={{
  width:"100%",
  marginBottom:"15px",
  boxShadow: !touched ? "0 0 15px #00ffcc" : "none",
  animation: !touched ? "pulse 1s infinite" : "none"
}}
/>

            {/* Text */}
           <textarea
             placeholder="What did you like?"
             value={like}
             onChange={(e) => setLike(e.target.value)}
             style={{width:"100%", marginBottom:"10px"}}
            />

            <textarea 
              placeholder="What can improve?"
              value={improve}
              onChange={(e) => setImprove(e.target.value)}
              style={{width:"100%", marginBottom:"15px"}} 
            />

           {/* CHECKBOX 1 */}
<div style={{textAlign:"left", marginBottom:"15px"}}>
  <p>What did you like the most?</p>

  <label>
    <input
      type="checkbox"
      value="Taste"
      onChange={(e) => {
        if (e.target.checked) {
          setLikedThings([...likedThings, e.target.value]);
        } else {
          setLikedThings(likedThings.filter(item => item !== e.target.value));
        }
      }}
    />
    Taste
  </label><br/>

  <label>
    <input
      type="checkbox"
      value="Texture"
      onChange={(e) => {
        if (e.target.checked) {
          setLikedThings([...likedThings, e.target.value]);
        } else {
          setLikedThings(likedThings.filter(item => item !== e.target.value));
        }
      }}
    />
    Texture
  </label><br/>

  <label>
    <input
      type="checkbox"
      value="Spiciness"
      onChange={(e) => {
        if (e.target.checked) {
          setLikedThings([...likedThings, e.target.value]);
        } else {
          setLikedThings(likedThings.filter(item => item !== e.target.value));
        }
      }}
    />
    Spiciness
  </label><br/>

  <label>
    <input
      type="checkbox"
      value="Aroma"
      onChange={(e) => {
        if (e.target.checked) {
          setLikedThings([...likedThings, e.target.value]);
        } else {
          setLikedThings(likedThings.filter(item => item !== e.target.value));
        }
      }}
    />
    Aroma
  </label><br/>

  <label>
    <input
      type="checkbox"
      value="Unique flavor"
      onChange={(e) => {
        if (e.target.checked) {
          setLikedThings([...likedThings, e.target.value]);
        } else {
          setLikedThings(likedThings.filter(item => item !== e.target.value));
        }
      }}
    />
    Unique flavor
  </label>

</div>

            {/* CHECKBOX 2 */}
<div style={{textAlign:"left", marginBottom:"15px"}}>
  <p>Where would you use this sauce?</p>

  <label>
    <input type="checkbox" value="Snacks"
      onChange={(e)=>{
        if(e.target.checked){
          setUsage([...usage, e.target.value])
        } else {
          setUsage(usage.filter(i=>i!==e.target.value))
        }
      }}
    /> Snacks
  </label><br/>

  <label>
    <input type="checkbox" value="Rice"
      onChange={(e)=>{
        if(e.target.checked){
          setUsage([...usage, e.target.value])
        } else {
          setUsage(usage.filter(i=>i!==e.target.value))
        }
      }}
    /> Rice
  </label><br/>

  <label>
    <input type="checkbox" value="Roti"
      onChange={(e)=>{
        if(e.target.checked){
          setUsage([...usage, e.target.value])
        } else {
          setUsage(usage.filter(i=>i!==e.target.value))
        }
      }}
    /> Roti/Paratha
  </label><br/>

  <label>
    <input type="checkbox" value="Dip"
      onChange={(e)=>{
        if(e.target.checked){
          setUsage([...usage, e.target.value])
        } else {
          setUsage(usage.filter(i=>i!==e.target.value))
        }
      }}
    /> Dip
  </label><br/>

  <label>
    <input type="checkbox" value="Cooking"
      onChange={(e)=>{
        if(e.target.checked){
          setUsage([...usage, e.target.value])
        } else {
          setUsage(usage.filter(i=>i!==e.target.value))
        }
      }}
    /> Cooking
  </label>

</div>

            {/* CHECKBOX 3 */}
<div style={{textAlign:"left", marginBottom:"15px"}}>
  <p>What should be improved?</p>

  <label>
    <input type="checkbox" value="Too spicy"
      onChange={(e)=>{
        if(e.target.checked){
          setIssues([...issues, e.target.value])
        } else {
          setIssues(issues.filter(i=>i!==e.target.value))
        }
      }}
    /> Too spicy
  </label><br/>

  <label>
    <input type="checkbox" value="Less spicy"
      onChange={(e)=>{
        if(e.target.checked){
          setIssues([...issues, e.target.value])
        } else {
          setIssues(issues.filter(i=>i!==e.target.value))
        }
      }}
    /> Less spicy
  </label><br/>

  <label>
    <input type="checkbox" value="Thickness"
      onChange={(e)=>{
        if(e.target.checked){
          setIssues([...issues, e.target.value])
        } else {
          setIssues(issues.filter(i=>i!==e.target.value))
        }
      }}
    /> Thickness
  </label><br/>

  <label>
    <input type="checkbox" value="Salt"
      onChange={(e)=>{
        if(e.target.checked){
          setIssues([...issues, e.target.value])
        } else {
          setIssues(issues.filter(i=>i!==e.target.value))
        }
      }}
    /> Salt level
  </label><br/>

  <label>
    <input type="checkbox" value="Oil"
      onChange={(e)=>{
        if(e.target.checked){
          setIssues([...issues, e.target.value])
        } else {
          setIssues(issues.filter(i=>i!==e.target.value))
        }
      }}
    /> Oil level
  </label>

</div>
{warning && (
  <div style={{
    background: "#ff4d4d",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    textAlign: "center"
  }}>
    ⚠️ Please fill all fields before submitting!
  </div>
)}

            {/* BUTTON */}
            <motion.button
              whileTap={{scale:0.9}}
              onClick={async () => {

  if (
    !like ||
    !improve ||
    likedThings.length === 0 ||
    usage.length === 0 ||
    issues.length === 0
  ) {
    setWarning(true);
    setTimeout(() => setWarning(false), 2000);
    return;
  }

  await addDoc(collection(db, "reviews"), {
    rating,
    like,
    improve,
    likedThings,
    usage,
    issues,
    time: new Date()
  });

  setSubmitted(true);
}}
              style={{
                padding:"12px 25px",
                background:"red",
                border:"none",
                borderRadius:"10px",
                color:"white",
                cursor:"pointer"
              }}
            >
              Submit
            </motion.button>

          </motion.div>

        ) : (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position:"fixed",
              top:0,
              left:0,
              width:"100%",
              height:"100%",
              background:"#000",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              flexDirection:"column"
            }}
          >
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize:"50px",
                color:"#00ffcc"
              }}
            >
              🙏 THANK YOU
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ color:"#aaa" }}
            >
              FOR YOUR PRECIOUS TIME
            </motion.p>
          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}