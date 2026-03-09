import { useState, useEffect, useRef, useCallback } from "react";

// ── Themed Paragraph Pools ──────────────────────────────────────────────────
// Each entry is a paragraph (array of words). 8 paragraphs per theme×difficulty.
const PARAGRAPHS = {
  zombie: {
    easy: [
      ["run","hide","door","safe","move","dark","flee","fast","go","away","help","lock","jump","rush","now"],
      ["left","path","tree","wall","stay","look","back","near","stop","yard","gate","barn","hill","dusk","fog"],
      ["arms","moan","herd","drag","rot","slow","gray","eyes","bite","dead","cold","pale","torn","limp","groan"],
      ["barn","shed","roof","attic","bolt","rope","fire","axe","plank","nail","block","trap","fence","wire","chain"],
      ["scream","sprint","crash","dodge","climb","vault","leap","duck","roll","spin","twist","push","pull","throw","fall"],
      ["dawn","quiet","mist","still","cool","lone","hope","safe","calm","rest","wake","light","door","open","free"],
      ["groan","shamble","horde","swarm","crowd","mass","pack","wave","surge","flood","press","rush","flow","pour","spill"],
      ["axe","bat","pipe","plank","rock","fire","smoke","flare","trap","snare","wall","ditch","moat","tower","cage"],
    ],
    medium: [
      ["escape","corner","shadow","danger","hunter","sprint","panic","bridge","rescue","hiding","terror","pursue","faster","street","window","shimmer","target","fallen","racing","vanished"],
      ["barricade","undead","shelter","survivor","outbreak","rooftop","alleyway","stumble","retreat","daylight","flashlight","footstep","heartbeat","darkness","whisper","infected","scatter","scavenge","bloodstain","silence"],
      ["abandoned","hospital","corridor","shambling","lurching","growling","decaying","fortress","supplies","humanity","collapse","infected","outbreak","quarantine","survivor","escaped","northern","basement","generator","emergency"],
      ["gasoline","chainsaw","fortress","overrun","evacuate","supplies","medicine","barricade","generator","electricity","radiation","mutated","infected","military","checkpoint","helicopter","extraction","deadline","countdown","survival"],
      ["cemetery","darkness","moonlight","shuffling","rasping","staggered","crouching","sprinting","heartbeat","adrenaline","whispering","listening","breathing","trembling","survival","distance","boundary","perimeter","watchtower","searchlight"],
      ["morning","silence","rebuild","humanity","freedom","daylight","laughter","children","garden","future","healing","sunlight","warmth","shelter","security","strength","purpose","memory","courage","endurance"],
      ["shambling","outbreak","perimeter","quarantine","infected","military","evacuation","checkpoint","overriding","desperate","fortified","isolated","abandoned","survivor","searching","supplies","medicine","generator","emergency","protocol"],
      ["lurking","shadows","alleyway","crumbling","decayed","rotting","staggering","moaning","clawing","reaching","stumbling","collapsing","crawling","dragging","groaning","shambling","lurching","swaying","twitching","hungering"],
    ],
    hard: [
      ["relentless","catastrophe","adrenaline","overwhelmed","surveillance","acceleration","disoriented","maneuvering","untraceable","jurisdiction","infiltration","extraordinary","reconnaissance","confrontation","undetectable","hypersensitive","electromagnetic","counterintelligence","deconstruction","claustrophobic","disenfranchised","metamorphosis","unprecedented","biomechanical","breathtaking"],
      ["reanimation","necrobiological","pathological","decomposition","manifestation","deterioration","hallucination","cardiovascular","immunodeficiency","contamination","pharmaceutical","neurochemical","disintegration","catastrophically","systematically","overwhelmingly","disproportionate","incomprehensible","uncontrollable","biochemically","exponentially","irrecoverably","unprecedented","destabilization","desensitization"],
      ["electromagnetic","psychological","physiological","biomechanical","neurological","immunological","pathological","microbiological","epidemiological","pharmacological","toxicological","parasitological","virological","bacteriological","mycological","hematological","oncological","radiological","immunodeficiency","hypersensitivity","hyperstimulation","desensitization","hyperactivation","reactivation","deactivation"],
      ["disorientation","misidentification","overcompensation","misrepresentation","underestimation","overestimation","misinterpretation","miscommunication","misinformation","disinformation","counterintelligence","counterterrorism","counterproductive","counterintuitive","counteroffensive","counterrevolution","counterattack","counterargument","countermeasure","counterbalance","counterculture","counterfactual","counterexample","counterpoint","counterclaim"],
      ["incomprehensibly","catastrophically","extraordinarily","disproportionately","overwhelmingly","systematically","exponentially","irrecoverably","uncontrollably","hallucinated","deteriorating","decomposing","reanimating","contaminating","pharmaceutically","neurochemically","biochemically","pathologically","epidemiologically","immunologically","physiologically","electromagnetically","psychologically","biomechanically","toxicologically"],
      ["surveillance","reconnaissance","destabilization","disintegration","manifestation","decomposition","deterioration","hallucination","contamination","pharmaceutical","neurochemical","disorientation","catastrophically","systematically","overwhelmingly","disproportionate","incomprehensible","uncontrollable","biochemically","exponentially","irrecoverably","unprecedented","biomechanical","electromagnetic","psychological"],
      ["hypersensitivity","hyperstimulation","desensitization","hyperactivation","reactivation","deactivation","misidentification","overcompensation","misrepresentation","underestimation","overestimation","misinterpretation","miscommunication","misinformation","disinformation","counterintelligence","counterterrorism","counterproductive","counterintuitive","counteroffensive","counterrevolution","counterattack","counterargument","countermeasure","counterbalance"],
      ["necrobiological","immunodeficiency","cardiovascular","reanimation","pathological","pharmacological","toxicological","parasitological","virological","bacteriological","mycological","hematological","oncological","radiological","epidemiological","microbiological","neurological","immunological","physiological","biomechanical","psychological","electromagnetic","biochemically","exponentially","unprecedented"],
    ],
  },
  police: {
    easy: [
      ["run","fast","left","turn","jump","hide","door","car","stop","move","go","duck","flee","grab","key"],
      ["vault","wall","alley","dark","roof","drop","slide","skip","dash","swap","fake","spin","roll","dip","sway"],
      ["bag","cash","gems","gold","heist","loot","safe","code","lock","key","vault","switch","flip","drop","swap"],
      ["crowd","blend","hat","coat","walk","slow","calm","act","look","shop","blend","melt","hide","mask","role"],
      ["fence","jump","gap","leap","grab","hang","drop","roll","run","sprint","bolt","dash","race","zoom","fly"],
      ["siren","flash","light","wail","scan","beam","spot","catch","trap","net","cage","cuff","hold","stop","end"],
      ["border","cross","gate","guard","slip","dodge","weave","duck","hide","crawl","creep","sneak","stalk","ghost","vanish"],
      ["engine","rev","zoom","drift","skid","spin","turn","brake","steer","floor","boost","launch","charge","rush","bolt"],
    ],
    medium: [
      ["escape","corner","shadow","danger","diamond","sprint","panic","alleyway","rescue","pursuit","getaway","police","faster","street","window","shimmer","target","fallen","racing","vanished"],
      ["downtown","rooftop","undercover","stakeout","footchase","handcuffs","detective","criminal","evidence","contraband","smuggling","trafficking","syndicate","operation","informant","disguised","fugitive","suspect","arrested","escaped"],
      ["disguised","lookout","crooked","bribery","racketeer","smuggler","launderer","extortion","forgery","blackmail","conspiracy","organized","criminal","network","frontman","getaway","driver","safehouse","hideout","offshore"],
      ["surveillance","undercover","detective","operation","informant","evidence","contraband","smuggling","trafficking","syndicate","criminal","network","fugitive","stakeout","footchase","handcuffs","downtown","rooftop","disguised","arrested"],
      ["checkpoint","roadblock","perimeter","helicopter","spotlight","infrared","scanner","database","fugitive","identity","documents","forged","passport","disguise","safehouse","extraction","offshore","account","laundered","vanished"],
      ["backstreets","rooftops","shortcuts","alleyways","crowded","markets","subway","tunnels","drainage","channels","climbing","jumping","sliding","rolling","ducking","weaving","sprinting","darting","dodging","evading"],
      ["detective","sergeant","constable","inspector","commander","lieutenant","captain","officer","patrolman","investigator","forensics","evidence","witness","testimony","alibi","motive","suspect","criminal","fugitive","arrested"],
      ["getaway","vehicle","modified","engine","bulletproof","tinted","windows","stolen","plates","scanner","jammer","tracker","disabled","pursuit","abandoned","switched","disguised","vanished","untraceable","disappeared"],
    ],
    hard: [
      ["relentless","jurisdiction","infiltration","extraordinary","reconnaissance","confrontation","undetectable","counterintelligence","unprecedented","electromagnetic","surveillance","acceleration","catastrophe","adrenaline","overwhelmed","disoriented","maneuvering","untraceable","hypersensitive","deconstruction","claustrophobic","disenfranchised","metamorphosis","biomechanical","breathtaking"],
      ["undercover","investigation","surveillance","infrastructure","documentation","identification","authorization","authentication","cryptographic","cybersecurity","counterterrorism","counterintelligence","disinformation","misinformation","misrepresentation","misidentification","overcompensation","overestimation","underestimation","miscommunication","misinterpretation","counterproductive","counteroffensive","counterrevolution","counterbalance"],
      ["impersonation","interrogation","incarceration","incrimination","circumstances","constitutional","jurisdictional","prosecutorial","investigative","surveillance","wiretapping","interception","decryption","encryption","authentication","authorization","identification","documentation","falsification","fabrication","manipulation","orchestration","coordination","communication","counterintelligence"],
      ["electromagnetic","cryptographic","cybersecurity","infrastructure","authentication","authorization","documentation","identification","impersonation","interrogation","incarceration","incrimination","circumstances","constitutional","jurisdictional","prosecutorial","investigative","surveillance","wiretapping","interception","decryption","encryption","falsification","fabrication","manipulation"],
      ["orchestration","coordination","communication","counterintelligence","counterterrorism","counterproductive","counterintuitive","counteroffensive","counterrevolution","misidentification","overcompensation","misrepresentation","underestimation","overestimation","misinterpretation","miscommunication","misinformation","disinformation","cybersecurity","cryptographic","electromagnetic","impersonation","interrogation","incarceration","incrimination"],
      ["circumstances","constitutional","jurisdictional","prosecutorial","investigative","surveillance","wiretapping","interception","decryption","encryption","authentication","authorization","identification","documentation","falsification","fabrication","manipulation","orchestration","coordination","communication","electromagnetic","cryptographic","cybersecurity","infrastructure","impersonation"],
      ["interrogation","incarceration","incrimination","circumstances","constitutional","jurisdictional","prosecutorial","investigative","surveillance","wiretapping","interception","decryption","encryption","authentication","authorization","identification","documentation","falsification","fabrication","manipulation","orchestration","coordination","communication","counterintelligence","counterterrorism"],
      ["counterproductive","counterintuitive","counteroffensive","counterrevolution","misidentification","overcompensation","misrepresentation","underestimation","overestimation","misinterpretation","miscommunication","misinformation","disinformation","cybersecurity","cryptographic","electromagnetic","impersonation","interrogation","incarceration","incrimination","circumstances","constitutional","jurisdictional","prosecutorial","investigative"],
    ],
  },
  train: {
    easy: [
      ["run","door","last","train","late","sprint","jump","gap","move","fast","go","now","step","leap","catch"],
      ["bag","drop","grab","dash","slip","trip","fall","roll","get","up","keep","going","hustle","push","shove"],
      ["clock","tick","time","left","count","down","zero","horn","blow","door","shut","miss","catch","make","it"],
      ["crowd","weave","dodge","thread","slip","through","fast","keep","pace","dont","slow","down","nearly","there","go"],
      ["whistle","steam","smoke","chug","clack","track","rail","ties","gravel","blur","speed","wind","hair","blur","rush"],
      ["platform","edge","gap","jump","land","grab","rail","hold","on","dont","fall","steady","balance","move","ahead"],
      ["ticket","check","gate","scan","pass","through","run","stairs","escalator","platform","board","doors","close","made","it"],
      ["engine","roar","piston","drive","wheel","spin","track","blur","speed","climb","faster","harder","push","reach","there"],
    ],
    medium: [
      ["station","platform","departure","schedule","boarding","conductor","passenger","locomotive","carriage","destination","connection","terminal","timetable","luggage","commuter","sprinting","catching","departure","scrambling","arriving"],
      ["locomotive","engineer","conductor","passenger","departure","timetable","connection","terminal","platform","schedule","boarding","luggage","commuter","destination","carriage","sprinting","scrambling","arriving","catching","deadline"],
      ["departure","countdown","platform","scramble","deadline","overdue","commuter","connection","terminal","timetable","locomotive","engineer","conductor","passenger","schedule","boarding","luggage","destination","carriage","arriving"],
      ["overrunning","scrambling","sprinting","catching","boarding","departure","countdown","platform","deadline","timetable","connection","terminal","commuter","locomotive","schedule","luggage","passenger","destination","arriving","engineer"],
      ["connection","deadline","terminal","countdown","scramble","overdue","sprinting","catching","boarding","departure","platform","timetable","locomotive","engineer","conductor","passenger","schedule","luggage","commuter","destination"],
      ["schedule","boarding","luggage","commuter","destination","carriage","sprinting","scrambling","arriving","catching","deadline","departure","countdown","platform","connection","terminal","timetable","locomotive","engineer","conductor"],
      ["passenger","departure","timetable","connection","terminal","platform","schedule","boarding","luggage","commuter","destination","carriage","sprinting","scrambling","arriving","catching","deadline","locomotive","engineer","conductor"],
      ["timetable","locomotive","engineer","conductor","passenger","departure","schedule","boarding","luggage","commuter","destination","carriage","sprinting","scrambling","arriving","catching","deadline","countdown","platform","connection"],
    ],
    hard: [
      ["relentless","catastrophe","adrenaline","overwhelmed","acceleration","disoriented","maneuvering","untraceable","extraordinary","confrontation","undetectable","hypersensitive","electromagnetic","unprecedented","biomechanical","breathtaking","surveillance","reconnaissance","counterintelligence","deconstruction","claustrophobic","disenfranchised","metamorphosis","jurisdiction","infiltration"],
      ["transportation","infrastructure","interconnected","transcontinental","electromagnetic","acceleration","deceleration","aerodynamics","streamlined","locomotive","engineering","maintenance","operational","conductivity","electrification","signalization","synchronization","coordination","communication","authentication","authorization","documentation","identification","verification","certification"],
      ["infrastructure","transcontinental","electromagnetic","aerodynamics","streamlined","locomotive","engineering","maintenance","operational","conductivity","electrification","signalization","synchronization","coordination","communication","authentication","authorization","documentation","identification","verification","certification","transportation","interconnected","acceleration","deceleration"],
      ["deceleration","aerodynamics","streamlined","locomotive","engineering","maintenance","operational","conductivity","electrification","signalization","synchronization","coordination","communication","authentication","authorization","documentation","identification","verification","certification","transportation","infrastructure","interconnected","transcontinental","electromagnetic","acceleration"],
      ["electrification","signalization","synchronization","coordination","communication","authentication","authorization","documentation","identification","verification","certification","transportation","infrastructure","interconnected","transcontinental","electromagnetic","acceleration","deceleration","aerodynamics","streamlined","locomotive","engineering","maintenance","operational","conductivity"],
      ["synchronization","coordination","communication","authentication","authorization","documentation","identification","verification","certification","transportation","infrastructure","interconnected","transcontinental","electromagnetic","acceleration","deceleration","aerodynamics","streamlined","locomotive","engineering","maintenance","operational","conductivity","electrification","signalization"],
      ["authentication","authorization","documentation","identification","verification","certification","transportation","infrastructure","interconnected","transcontinental","electromagnetic","acceleration","deceleration","aerodynamics","streamlined","locomotive","engineering","maintenance","operational","conductivity","electrification","signalization","synchronization","coordination","communication"],
      ["verification","certification","transportation","infrastructure","interconnected","transcontinental","electromagnetic","acceleration","deceleration","aerodynamics","streamlined","locomotive","engineering","maintenance","operational","conductivity","electrification","signalization","synchronization","coordination","communication","authentication","authorization","documentation","identification"],
    ],
  },
};

// Track which paragraph indices have been used per session
const usedParagraphs = { zombie: { easy: [], medium: [], hard: [] }, police: { easy: [], medium: [], hard: [] }, train: { easy: [], medium: [], hard: [] } };

function getNextParagraph(themeId, difficulty) {
  const pool = PARAGRAPHS[themeId][difficulty];
  const used = usedParagraphs[themeId][difficulty];
  // Reset if all used
  if (used.length >= pool.length) used.length = 0;
  // Pick unused random index
  const available = pool.map((_, i) => i).filter(i => !used.includes(i));
  const idx = available[Math.floor(Math.random() * available.length)];
  used.push(idx);
  return [...pool[idx]];
}
const DIFFICULTY = {
  easy:   { time: 60,  label: "Easy",   color: "#00ff88", totalRounds: 8 },
  medium: { time: 75,  label: "Medium",  color: "#ffaa00", totalRounds: 8 },
  hard:   { time: 60,  label: "Hard",    color: "#ff3366", totalRounds: 8 },
};

function calcWPM(correctChars, elapsedSeconds) {
  if (elapsedSeconds <= 0) return 0;
  return Math.round((correctChars / 5) / (elapsedSeconds / 60));
}
function calcAccuracy(correct, total) {
  return total === 0 ? 100 : Math.round((correct / total) * 100);
}

// ── Sound Engine (Web Audio API — no external files) ─────────────────────
const AudioCtx = typeof window !== "undefined" ? (window.AudioContext || window.webkitAudioContext) : null;
let _actx = null;
function getACtx() {
  if (!_actx && AudioCtx) _actx = new AudioContext();
  return _actx;
}

function playTone({ freq = 440, type = "sine", vol = 0.18, attack = 0.005, decay = 0.08, sustain = 0.6, release = 0.12, duration = 0.18, detune = 0, delay = 0 } = {}) {
  try {
    const ctx = getACtx(); if (!ctx) return;
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type; osc.frequency.setValueAtTime(freq, t); osc.detune.setValueAtTime(detune, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + attack);
    gain.gain.linearRampToValueAtTime(vol * sustain, t + attack + decay);
    gain.gain.setValueAtTime(vol * sustain, t + duration - release);
    gain.gain.linearRampToValueAtTime(0, t + duration);
    osc.start(t); osc.stop(t + duration + 0.01);
  } catch(e) {}
}

function playNoise({ vol = 0.15, duration = 0.06, freq = 400, q = 8, delay = 0 } = {}) {
  try {
    const ctx = getACtx(); if (!ctx) return;
    const t = ctx.currentTime + delay;
    const buf = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass"; filter.frequency.value = freq; filter.Q.value = q;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, t);
    gain.gain.linearRampToValueAtTime(0, t + duration);
    src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    src.start(t); src.stop(t + duration + 0.01);
  } catch(e) {}
}

const SFX = {
  // Correct word typed
  correctWord(themeId) {
    if (themeId === "zombie") {
      playTone({ freq: 523, type: "triangle", vol: 0.22, duration: 0.1, attack: 0.003, decay: 0.04, sustain: 0.3, release: 0.06 });
      playTone({ freq: 784, type: "triangle", vol: 0.18, duration: 0.12, attack: 0.003, decay: 0.04, sustain: 0.3, release: 0.06, delay: 0.06 });
    } else if (themeId === "police") {
      playTone({ freq: 660, type: "square", vol: 0.12, duration: 0.09, attack: 0.002, decay: 0.03, sustain: 0.2, release: 0.05 });
      playTone({ freq: 880, type: "square", vol: 0.1,  duration: 0.09, attack: 0.002, decay: 0.03, sustain: 0.2, release: 0.05, delay: 0.055 });
    } else {
      playTone({ freq: 587, type: "sine", vol: 0.2, duration: 0.13, attack: 0.003, decay: 0.05, sustain: 0.4, release: 0.07 });
      playTone({ freq: 880, type: "sine", vol: 0.15, duration: 0.13, attack: 0.003, decay: 0.05, sustain: 0.4, release: 0.07, delay: 0.07 });
    }
  },

  // Wrong key
  wrongKey() {
    playNoise({ vol: 0.2, duration: 0.07, freq: 180, q: 4 });
    playTone({ freq: 150, type: "sawtooth", vol: 0.12, duration: 0.08, attack: 0.002, decay: 0.04, sustain: 0.1, release: 0.03 });
  },

  // Footstep (called on each correct char)
  footstep(themeId) {
    if (themeId === "zombie") {
      playNoise({ vol: 0.08, duration: 0.04, freq: 120, q: 5 });
    } else if (themeId === "police") {
      playNoise({ vol: 0.07, duration: 0.035, freq: 200, q: 6 });
    } else {
      playNoise({ vol: 0.09, duration: 0.03, freq: 300, q: 7 });
    }
  },

  // Countdown beep
  countdownBeep(n) {
    const freq = n === 0 ? 880 : 440;
    const vol  = n === 0 ? 0.28 : 0.2;
    playTone({ freq, type: "sine", vol, duration: n === 0 ? 0.35 : 0.18, attack: 0.005, decay: 0.06, sustain: 0.5, release: 0.1 });
    if (n === 0) playTone({ freq: 1100, type: "sine", vol: 0.22, duration: 0.3, attack: 0.005, decay: 0.05, sustain: 0.5, release: 0.1, delay: 0.12 });
  },

  // Danger heartbeat (low thud)
  heartbeat() {
    playTone({ freq: 60, type: "sine", vol: 0.35, duration: 0.12, attack: 0.005, decay: 0.05, sustain: 0.15, release: 0.06 });
    playTone({ freq: 55, type: "sine", vol: 0.28, duration: 0.1,  attack: 0.005, decay: 0.04, sustain: 0.1,  release: 0.05, delay: 0.14 });
  },

  // Win fanfare
  win(themeId) {
    const notes = themeId === "police"
      ? [523,659,784,1047] : themeId === "train"
      ? [440,554,659,880]  : [523,659,784,1047];
    notes.forEach((f, i) => playTone({ freq: f, type: "triangle", vol: 0.22, duration: 0.22, attack: 0.005, decay: 0.06, sustain: 0.6, release: 0.1, delay: i * 0.13 }));
    // Sparkle
    [1047,1319,1568].forEach((f, i) => playTone({ freq: f, type: "sine", vol: 0.12, duration: 0.3, attack: 0.003, decay: 0.08, sustain: 0.3, release: 0.15, delay: 0.55 + i * 0.08 }));
  },

  // Lose sting
  lose(themeId) {
    const notes = [330, 294, 262, 220];
    notes.forEach((f, i) => playTone({ freq: f, type: "sawtooth", vol: 0.16, duration: 0.2, attack: 0.005, decay: 0.06, sustain: 0.4, release: 0.1, delay: i * 0.15 }));
    playNoise({ vol: 0.18, duration: 0.3, freq: 100, q: 3, delay: 0.6 });
  },

  // Siren (police) — short wail
  siren() {
    playTone({ freq: 880,  type: "sawtooth", vol: 0.1, duration: 0.18, attack: 0.01, decay: 0.05, sustain: 0.6, release: 0.05 });
    playTone({ freq: 1100, type: "sawtooth", vol: 0.1, duration: 0.18, attack: 0.01, decay: 0.05, sustain: 0.6, release: 0.05, delay: 0.18 });
  },

  // Zombie groan
  zombieGroan() {
    playTone({ freq: 80,  type: "sawtooth", vol: 0.14, duration: 0.35, attack: 0.04, decay: 0.1, sustain: 0.5, release: 0.15, detune: 30 });
    playTone({ freq: 95,  type: "sawtooth", vol: 0.1,  duration: 0.35, attack: 0.04, decay: 0.1, sustain: 0.5, release: 0.15, detune: -20, delay: 0.05 });
  },

  // Train whistle
  trainWhistle() {
    playTone({ freq: 1200, type: "sine", vol: 0.2, duration: 0.4, attack: 0.02, decay: 0.05, sustain: 0.85, release: 0.1 });
    playTone({ freq: 1500, type: "sine", vol: 0.14, duration: 0.4, attack: 0.02, decay: 0.05, sustain: 0.85, release: 0.1 });
  },
};

// ── SVG Characters ──────────────────────────────────────────────────────────

function RunnerSVG({ run, scared }) {
  return (
    <svg width="58" height="78" viewBox="0 0 58 78" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.8))", overflow: "visible" }}>
      <style>{`
        @keyframes rBob { 0%{transform:translateY(0px)} 100%{transform:translateY(-4px)} }
        @keyframes rLL  { 0%{transform:rotate(-32deg)} 100%{transform:rotate(28deg)} }
        @keyframes rRL  { 0%{transform:rotate(28deg)} 100%{transform:rotate(-32deg)} }
        @keyframes rLA  { 0%{transform:rotate(35deg)} 100%{transform:rotate(-28deg)} }
        @keyframes rRA  { 0%{transform:rotate(-28deg)} 100%{transform:rotate(35deg)} }
        .rBody { animation: ${run ? "rBob 0.32s ease-in-out infinite alternate" : "none"}; }
        .rLL   { transform-origin:24px 52px; animation: ${run ? "rLL 0.32s ease-in-out infinite alternate" : "none"}; }
        .rRL   { transform-origin:34px 52px; animation: ${run ? "rRL 0.32s ease-in-out infinite alternate" : "none"}; }
        .rLA   { transform-origin:16px 36px; animation: ${run ? "rLA 0.32s ease-in-out infinite alternate" : "none"}; }
        .rRA   { transform-origin:42px 36px; animation: ${run ? "rRA 0.32s ease-in-out infinite alternate" : "none"}; }
      `}</style>
      <g className="rBody">
        {/* Shadow */}
        <ellipse cx="29" cy="76" rx="14" ry="3" fill="black" opacity="0.4"/>
        {/* Head */}
        <ellipse cx="29" cy="13" rx="11" ry="12" fill="#F5C5A3"/>
        {/* Hair */}
        <ellipse cx="29" cy="4"  rx="11" ry="6"  fill="#5a2d0c"/>
        <rect x="18" y="4" width="22" height="7" fill="#5a2d0c"/>
        {/* Ears */}
        <ellipse cx="18" cy="14" rx="3" ry="4" fill="#F5C5A3"/>
        <ellipse cx="40" cy="14" rx="3" ry="4" fill="#F5C5A3"/>
        {/* Eyes */}
        <ellipse cx="24" cy="12" rx="3"   ry={scared ? 3.5 : 2.5} fill="white"/>
        <ellipse cx="34" cy="12" rx="3"   ry={scared ? 3.5 : 2.5} fill="white"/>
        <circle  cx="24.5" cy="12.5" r="1.8" fill="#1a1a1a"/>
        <circle  cx="34.5" cy="12.5" r="1.8" fill="#1a1a1a"/>
        <circle  cx="25"   cy="12"   r="0.7" fill="white"/>
        <circle  cx="35"   cy="12"   r="0.7" fill="white"/>
        {/* Eyebrows scared/normal */}
        {scared
          ? <><path d="M21 8 L27 10" stroke="#5a2d0c" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M31 10 L37 8" stroke="#5a2d0c" strokeWidth="1.5" strokeLinecap="round"/></>
          : <><path d="M21 9 Q24 7 27 9" stroke="#5a2d0c" strokeWidth="1.5" fill="none"/>
              <path d="M31 9 Q34 7 37 9" stroke="#5a2d0c" strokeWidth="1.5" fill="none"/></>}
        {/* Mouth */}
        {scared
          ? <path d="M23 20 Q29 17 35 20" stroke="#c0825a" strokeWidth="1.5" fill="none"/>
          : <path d="M23 19 Q29 22 35 19" stroke="#c0825a" strokeWidth="1.5" fill="none"/>}
        {/* Sweat drop */}
        {scared && <path d="M41 9 Q43 12 41 15 Q39 12 41 9Z" fill="#88bbff" opacity="0.85"/>}
        {/* Neck */}
        <rect x="25" y="24" width="8" height="5" fill="#F5C5A3"/>
        {/* T-shirt body */}
        <rect x="18" y="29" width="22" height="20" rx="5" fill="#e74c3c"/>
        {/* Shirt detail */}
        <rect x="26" y="29" width="6" height="20" fill="#c0392b" opacity="0.4"/>
        {/* Collar */}
        <path d="M24 29 Q29 34 34 29" stroke="#c0392b" strokeWidth="1.5" fill="none"/>
      </g>
      {/* Left arm */}
      <g className="rLA"><rect x="7"  y="31" width="12" height="5" rx="2.5" fill="#F5C5A3"/></g>
      {/* Right arm */}
      <g className="rRA"><rect x="39" y="31" width="12" height="5" rx="2.5" fill="#F5C5A3"/></g>
      {/* Left leg */}
      <g className="rLL">
        <rect x="19" y="49" width="10" height="20" rx="5" fill="#2c3e50"/>
        <rect x="17" y="66" width="14" height="7"  rx="3" fill="#1a252f"/>
        <rect x="17" y="70" width="14" height="3"  rx="1" fill="#e74c3c"/>
      </g>
      {/* Right leg */}
      <g className="rRL">
        <rect x="29" y="49" width="10" height="20" rx="5" fill="#2c3e50"/>
        <rect x="29" y="66" width="14" height="7"  rx="3" fill="#1a252f"/>
        <rect x="29" y="70" width="14" height="3"  rx="1" fill="#e74c3c"/>
      </g>
    </svg>
  );
}

function ZombieSVG({ run }) {
  return (
    <svg width="62" height="84" viewBox="0 0 62 84" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 12px #00ff4488)", overflow: "visible" }}>
      <style>{`
        @keyframes zW  { 0%{transform:rotate(-5deg) translateY(0)} 100%{transform:rotate(5deg) translateY(-2px)} }
        @keyframes zLL { 0%{transform:rotate(-18deg)} 100%{transform:rotate(14deg)} }
        @keyframes zRL { 0%{transform:rotate(14deg)} 100%{transform:rotate(-18deg)} }
        @keyframes zLA { 0%{transform:rotate(-15deg) translateY(0)} 50%{transform:rotate(10deg) translateY(-3px)} 100%{transform:rotate(-15deg) translateY(0)} }
        .zBody { animation: ${run ? "zW 0.48s ease-in-out infinite alternate" : "none"}; }
        .zLL   { transform-origin: 25px 58px; animation: ${run ? "zLL 0.48s ease-in-out infinite alternate" : "none"}; }
        .zRL   { transform-origin: 37px 58px; animation: ${run ? "zRL 0.48s ease-in-out infinite alternate" : "none"}; }
        .zLA   { transform-origin: 14px 38px; animation: ${run ? "zLA 0.8s ease-in-out infinite" : "none"}; }
      `}</style>
      <g className="zBody">
        <ellipse cx="31" cy="78" rx="14" ry="3" fill="black" opacity="0.4"/>
        {/* Head */}
        <ellipse cx="31" cy="14" rx="12" ry="13" fill="#8fbc6f"/>
        {/* Skull crack */}
        <path d="M26 4 L28 10 L25 14" stroke="#5a7a3a" strokeWidth="1" fill="none" opacity="0.7"/>
        {/* Sparse rotting hair */}
        <rect x="20" y="3"  width="6" height="7"  rx="3" fill="#2a3a1a"/>
        <rect x="30" y="2"  width="5" height="6"  rx="2" fill="#2a3a1a"/>
        <rect x="38" y="4"  width="5" height="6"  rx="2" fill="#2a3a1a"/>
        {/* Ears */}
        <ellipse cx="19" cy="15" rx="3" ry="4" fill="#7aac5f"/>
        <ellipse cx="43" cy="15" rx="3" ry="4" fill="#7aac5f"/>
        {/* Wound on forehead */}
        <ellipse cx="24" cy="9" rx="2.5" ry="1.5" fill="#880000" opacity="0.9"/>
        <path d="M38 7 Q41 11 39 14" stroke="#880000" strokeWidth="1.5" fill="none" opacity="0.8"/>
        {/* Glowing eyes */}
        <ellipse cx="26" cy="14" rx="3.5" ry="4" fill="#ddff44"/>
        <ellipse cx="36" cy="14" rx="3.5" ry="4" fill="#ddff44"/>
        <circle  cx="26"   cy="14"   r="2.2" fill="#cc6600"/>
        <circle  cx="36"   cy="14"   r="2.2" fill="#cc6600"/>
        <circle  cx="26.5" cy="13.5" r="0.8" fill="#ffff99" opacity="0.9"/>
        <circle  cx="36.5" cy="13.5" r="0.8" fill="#ffff99" opacity="0.9"/>
        {/* Eye glow rings */}
        <ellipse cx="26" cy="14" rx="4.5" ry="5" fill="none" stroke="#aaff00" strokeWidth="0.5" opacity="0.5"/>
        <ellipse cx="36" cy="14" rx="4.5" ry="5" fill="none" stroke="#aaff00" strokeWidth="0.5" opacity="0.5"/>
        {/* Nose decay */}
        <path d="M28 18 L31 20 L34 18" stroke="#5a7a3a" strokeWidth="1" fill="none"/>
        {/* Mouth – teeth showing */}
        <path d="M23 23 Q31 28 39 23" stroke="#5a1a1a" strokeWidth="2" fill="#3a1a1a"/>
        <rect x="25" y="23" width="4" height="5" rx="1" fill="#ddeebb"/>
        <rect x="30" y="23" width="4" height="5" rx="1" fill="#ddeebb"/>
        <rect x="35" y="23" width="3" height="4" rx="1" fill="#cce8aa"/>
        {/* Neck with veins */}
        <rect x="27" y="26" width="8" height="6" fill="#7aac5f"/>
        <path d="M28 26 L29 32" stroke="#5a8a4a" strokeWidth="0.8"/>
        <path d="M33 26 L32 32" stroke="#5a8a4a" strokeWidth="0.8"/>
        {/* Torn shirt */}
        <rect x="18" y="32" width="26" height="22" rx="4" fill="#3a5a2a"/>
        <path d="M18 48 L23 54 L18 54Z" fill="#2a4a1a"/>
        <path d="M44 46 L40 54 L44 54Z" fill="#2a4a1a"/>
        {/* Blood stain */}
        <ellipse cx="31" cy="40" rx="7" ry="5" fill="#880000" opacity="0.55"/>
        <ellipse cx="28" cy="45" rx="3" ry="4" fill="#880000" opacity="0.4"/>
      </g>
      {/* Outstretched clawing arm */}
      <g className="zLA">
        <rect x="3" y="33" width="17" height="7" rx="3.5" fill="#7aac5f" transform="rotate(-12 3 33)"/>
        <ellipse cx="4" cy="40" rx="4" ry="5" fill="#8fbc6f"/>
        <line x1="1"  y1="37" x2="-2" y2="32" stroke="#aacc88" strokeWidth="2" strokeLinecap="round"/>
        <line x1="3"  y1="36" x2="1"  y2="31" stroke="#aacc88" strokeWidth="2" strokeLinecap="round"/>
        <line x1="6"  y1="36" x2="5"  y2="31" stroke="#aacc88" strokeWidth="2" strokeLinecap="round"/>
        <line x1="8"  y1="37" x2="9"  y2="32" stroke="#aacc88" strokeWidth="2" strokeLinecap="round"/>
      </g>
      {/* Other arm */}
      <rect x="44" y="34" width="14" height="6" rx="3" fill="#7aac5f"/>
      {/* Legs */}
      <g className="zLL">
        <rect x="19" y="54" width="11" height="22" rx="5" fill="#4a6a3a"/>
        <rect x="17" y="73" width="15" height="7"  rx="3" fill="#333"/>
      </g>
      <g className="zRL">
        <rect x="32" y="54" width="11" height="22" rx="5" fill="#4a6a3a"/>
        <rect x="32" y="73" width="15" height="7"  rx="3" fill="#333"/>
      </g>
    </svg>
  );
}

function ThiefSVG({ run }) {
  return (
    <svg width="58" height="82" viewBox="0 0 58 82" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.9))", overflow: "visible" }}>
      <style>{`
        @keyframes tBob { 0%{transform:translateY(0)} 100%{transform:translateY(-5px)} }
        @keyframes tLL  { 0%{transform:rotate(-36deg)} 100%{transform:rotate(30deg)} }
        @keyframes tRL  { 0%{transform:rotate(30deg)} 100%{transform:rotate(-36deg)} }
        @keyframes tLA  { 0%{transform:rotate(38deg)} 100%{transform:rotate(-28deg)} }
        @keyframes tRA  { 0%{transform:rotate(-28deg)} 100%{transform:rotate(38deg)} }
        .tBody { animation: ${run ? "tBob 0.28s ease-in-out infinite alternate" : "none"}; }
        .tLL   { transform-origin: 22px 52px; animation: ${run ? "tLL 0.28s ease-in-out infinite alternate" : "none"}; }
        .tRL   { transform-origin: 36px 52px; animation: ${run ? "tRL 0.28s ease-in-out infinite alternate" : "none"}; }
        .tLA   { transform-origin: 14px 36px; animation: ${run ? "tLA 0.28s ease-in-out infinite alternate" : "none"}; }
        .tRA   { transform-origin: 44px 36px; animation: ${run ? "tRA 0.28s ease-in-out infinite alternate" : "none"}; }
      `}</style>
      <g className="tBody">
        <ellipse cx="29" cy="79" rx="14" ry="3" fill="black" opacity="0.5"/>
        {/* Balaclava */}
        <ellipse cx="29" cy="13" rx="12" ry="13" fill="#1a1a1a"/>
        <ellipse cx="29" cy="22" rx="12" ry="8"  fill="#1a1a1a"/>
        <rect    x="17" y="13" width="24" height="12" fill="#1a1a1a"/>
        {/* Eye holes */}
        <ellipse cx="23" cy="12" rx="3.5" ry="3" fill="#222"/>
        <ellipse cx="35" cy="12" rx="3.5" ry="3" fill="#222"/>
        <ellipse cx="23" cy="12" rx="2.5" ry="2.2" fill="white"/>
        <ellipse cx="35" cy="12" rx="2.5" ry="2.2" fill="white"/>
        <circle  cx="23.5" cy="12.5" r="1.5" fill="#222"/>
        <circle  cx="35.5" cy="12.5" r="1.5" fill="#222"/>
        <circle  cx="24"   cy="12"   r="0.6" fill="white"/>
        <circle  cx="36"   cy="12"   r="0.6" fill="white"/>
        {/* Mouth slit */}
        <rect x="22" y="19" width="14" height="3" rx="1.5" fill="#111"/>
        <rect x="23" y="20" width="12" height="1.5" rx="0.7" fill="#333"/>
        {/* Neck */}
        <rect x="25" y="25" width="8" height="5" fill="#111"/>
        {/* Black turtleneck */}
        <rect x="16" y="30" width="26" height="21" rx="5" fill="#111"/>
        <rect x="23" y="30" width="12" height="21" fill="#0a0a0a" opacity="0.5"/>
        {/* Money bag */}
        <ellipse cx="47" cy="37" rx="9" ry="10" fill="#8B6914"/>
        <ellipse cx="47" cy="30" rx="4" ry="3"  fill="#6B4F10"/>
        <text x="47" y="41" textAnchor="middle" fill="#FFD700" fontSize="11" fontWeight="bold" fontFamily="monospace">$</text>
        <path d="M38 30 Q40 25 44 28" stroke="#8B6914" strokeWidth="2" fill="none"/>
      </g>
      <g className="tLA"><rect x="5"  y="32" width="13" height="6" rx="3" fill="#111"/></g>
      <g className="tRA"><rect x="40" y="32" width="13" height="6" rx="3" fill="#111"/></g>
      <g className="tLL">
        <rect x="17" y="51" width="11" height="22" rx="5" fill="#111"/>
        <rect x="15" y="70" width="14" height="7"  rx="3" fill="#0a0a0a"/>
        <rect x="15" y="73" width="14" height="3"  rx="1" fill="#222"/>
      </g>
      <g className="tRL">
        <rect x="30" y="51" width="11" height="22" rx="5" fill="#111"/>
        <rect x="30" y="70" width="14" height="7"  rx="3" fill="#0a0a0a"/>
        <rect x="30" y="73" width="14" height="3"  rx="1" fill="#222"/>
      </g>
    </svg>
  );
}

function PoliceSVG({ run }) {
  return (
    <svg width="120" height="65" viewBox="0 0 120 65" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 16px rgba(60,100,255,0.7))", overflow: "visible" }}>
      <style>{`
        @keyframes pShake { 0%{transform:translateY(0) rotate(0deg)} 100%{transform:translateY(-2px) rotate(0.5deg)} }
        @keyframes sirenR  { 0%,100%{fill:#ff2222;opacity:1} 50%{fill:#ff2222;opacity:0.15} }
        @keyframes sirenB  { 0%,100%{fill:#2255ff;opacity:0.15} 50%{fill:#2255ff;opacity:1} }
        @keyframes headlightPulse { 0%,100%{opacity:0.9} 50%{opacity:0.6} }
        @keyframes wheelSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        .pCar    { animation: ${run ? "pShake 0.14s ease-in-out infinite alternate" : "none"}; }
        .sirenR  { animation: ${run ? "sirenR 0.4s ease-in-out infinite" : "none"}; }
        .sirenB  { animation: ${run ? "sirenB 0.4s ease-in-out infinite" : "none"}; }
        .headlt  { animation: ${run ? "headlightPulse 0.5s ease-in-out infinite" : "none"}; }
        .wFL { transform-origin: 28px 55px; animation: ${run ? "wheelSpin 0.5s linear infinite" : "none"}; }
        .wRL { transform-origin: 90px 55px; animation: ${run ? "wheelSpin 0.5s linear infinite" : "none"}; }
      `}</style>
      <g className="pCar">
        {/* Body */}
        <rect x="5"  y="24" width="110" height="30" rx="7" fill="#1133aa"/>
        {/* Roof */}
        <rect x="22" y="11" width="66" height="17"  rx="6" fill="#1a44cc"/>
        {/* Windshields */}
        <rect x="26" y="13" width="26" height="13" rx="4" fill="#aaddff" opacity="0.75"/>
        <rect x="58" y="13" width="24" height="13" rx="4" fill="#aaddff" opacity="0.55"/>
        {/* Sirens */}
        <g className="sirenR"><rect x="32" y="5" width="18" height="9" rx="4" fill="#ff2222"/></g>
        <g className="sirenB"><rect x="54" y="5" width="18" height="9" rx="4" fill="#2255ff"/></g>
        {/* Siren glow */}
        <ellipse cx="41" cy="12" rx="14" ry="6" fill="#ff222222"/>
        <ellipse cx="63" cy="12" rx="14" ry="6" fill="#2255ff22"/>
        {/* POLICE stripe */}
        <rect x="5" y="37" width="110" height="7" fill="#2244ee" opacity="0.6"/>
        {/* POLICE text */}
        <text x="60" y="44" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="2">POLICE</text>
        {/* White door lines */}
        <line x1="55" y1="24" x2="55" y2="54" stroke="white" strokeWidth="0.5" opacity="0.2"/>
        {/* Bumper */}
        <rect x="108" y="32" width="10" height="14" rx="3" fill="#0a2288"/>
        {/* Headlights */}
        <g className="headlt">
          <ellipse cx="116" cy="36" rx="5" ry="4" fill="#ffffcc" opacity="0.95"/>
          <ellipse cx="116" cy="43" rx="5" ry="4" fill="#ffffcc" opacity="0.8"/>
          <ellipse cx="116" cy="36" rx="10" ry="6" fill="#ffff8844"/>
          <ellipse cx="116" cy="43" rx="10" ry="6" fill="#ffff8833"/>
        </g>
        {/* Wheels */}
        <g className="wFL">
          <circle cx="28" cy="55" r="11" fill="#111"/>
          <circle cx="28" cy="55" r="7"  fill="#2a2a2a"/>
          <circle cx="28" cy="55" r="3"  fill="#555"/>
          <line x1="28" y1="48" x2="28" y2="62" stroke="#444" strokeWidth="1.5"/>
          <line x1="21" y1="55" x2="35" y2="55" stroke="#444" strokeWidth="1.5"/>
        </g>
        <g className="wRL">
          <circle cx="90" cy="55" r="11" fill="#111"/>
          <circle cx="90" cy="55" r="7"  fill="#2a2a2a"/>
          <circle cx="90" cy="55" r="3"  fill="#555"/>
          <line x1="90" y1="48" x2="90" y2="62" stroke="#444" strokeWidth="1.5"/>
          <line x1="83" y1="55" x2="97" y2="55" stroke="#444" strokeWidth="1.5"/>
        </g>
        {/* Exhaust */}
        {run && <ellipse cx="7" cy="46" rx="5" ry="3" fill="#aaaaaa" opacity="0.3"/>}
      </g>
    </svg>
  );
}

function TrainSVG({ run }) {
  return (
    <svg width="145" height="72" viewBox="0 0 145 72" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 20px rgba(255,120,0,0.65))", overflow: "visible" }}>
      <style>{`
        @keyframes trnShake { 0%{transform:translateY(0)} 100%{transform:translateY(-3px)} }
        @keyframes steam1   { 0%{transform:translate(0,0);opacity:0.8} 100%{transform:translate(-18px,-22px);opacity:0} }
        @keyframes steam2   { 0%{transform:translate(0,0);opacity:0.6} 100%{transform:translate(-12px,-28px);opacity:0} }
        @keyframes wSpin    { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        .trnBody { animation: ${run ? "trnShake 0.13s ease-in-out infinite alternate" : "none"}; }
        .trnS1   { animation: ${run ? "steam1 0.65s ease-out infinite" : "none"}; }
        .trnS2   { animation: ${run ? "steam2 0.65s ease-out 0.32s infinite" : "none"}; }
        .trnW1 { transform-origin:22px 58px; animation:${run?"wSpin 0.4s linear infinite":"none"}; }
        .trnW2 { transform-origin:55px 58px; animation:${run?"wSpin 0.4s linear infinite":"none"}; }
        .trnW3 { transform-origin:90px 58px; animation:${run?"wSpin 0.4s linear infinite":"none"}; }
        .trnW4 { transform-origin:122px 58px;animation:${run?"wSpin 0.4s linear infinite":"none"}; }
      `}</style>
      <g className="trnBody">
        {/* Main car */}
        <rect x="8"  y="16" width="130" height="38" rx="7" fill="#b03020"/>
        {/* Front cab */}
        <rect x="120" y="10" width="25" height="20" rx="5" fill="#cc3820"/>
        {/* Boiler front dome */}
        <ellipse cx="142" cy="25" rx="6" ry="12" fill="#dd4430"/>
        {/* Windows */}
        <rect x="16"  y="21" width="24" height="16" rx="4" fill="#bbddff" opacity="0.85"/>
        <rect x="48"  y="21" width="24" height="16" rx="4" fill="#bbddff" opacity="0.85"/>
        <rect x="82"  y="21" width="24" height="16" rx="4" fill="#bbddff" opacity="0.85"/>
        <rect x="122" y="13" width="18" height="12" rx="3" fill="#bbddff" opacity="0.85"/>
        {/* Window reflections */}
        <rect x="17"  y="22" width="6" height="14" rx="2" fill="white" opacity="0.2"/>
        <rect x="49"  y="22" width="6" height="14" rx="2" fill="white" opacity="0.2"/>
        <rect x="83"  y="22" width="6" height="14" rx="2" fill="white" opacity="0.2"/>
        {/* Yellow stripe */}
        <rect x="8"   y="40" width="130" height="7" fill="#f39c12"/>
        <rect x="8"   y="42" width="130" height="3" fill="#e67e22" opacity="0.5"/>
        {/* Headlight */}
        <ellipse cx="142" cy="22" rx="5" ry="5" fill="#ffffaa" opacity="0.95"/>
        <ellipse cx="142" cy="22" rx="9" ry="9" fill="#ffff8833"/>
        {/* Chimney */}
        <rect x="112" y="3" width="10" height="14" rx="3" fill="#444"/>
        <rect x="110" y="3" width="14" height="5"  rx="2" fill="#555"/>
        {/* Coupling */}
        <rect x="0" y="30" width="10" height="8" rx="2" fill="#333"/>
      </g>
      {/* Steam */}
      <g className="trnS1"><ellipse cx="114" cy="6"  rx="9" ry="6" fill="white" opacity="0.75"/></g>
      <g className="trnS2"><ellipse cx="116" cy="2"  rx="6" ry="5" fill="#ddd"   opacity="0.55"/></g>
      {/* Wheels */}
      <g className="trnW1">
        <circle cx="22" cy="58" r="10" fill="#222"/>
        <circle cx="22" cy="58" r="6"  fill="#3a3a3a"/>
        <circle cx="22" cy="58" r="2.5" fill="#666"/>
        <line x1="22" y1="48" x2="22" y2="68" stroke="#555" strokeWidth="1.5"/>
        <line x1="12" y1="58" x2="32" y2="58" stroke="#555" strokeWidth="1.5"/>
      </g>
      <g className="trnW2">
        <circle cx="55" cy="58" r="10" fill="#222"/>
        <circle cx="55" cy="58" r="6"  fill="#3a3a3a"/>
        <circle cx="55" cy="58" r="2.5" fill="#666"/>
        <line x1="55" y1="48" x2="55" y2="68" stroke="#555" strokeWidth="1.5"/>
        <line x1="45" y1="58" x2="65" y2="58" stroke="#555" strokeWidth="1.5"/>
      </g>
      <g className="trnW3">
        <circle cx="90" cy="58" r="10" fill="#222"/>
        <circle cx="90" cy="58" r="6"  fill="#3a3a3a"/>
        <circle cx="90" cy="58" r="2.5" fill="#666"/>
        <line x1="90" y1="48" x2="90" y2="68" stroke="#555" strokeWidth="1.5"/>
        <line x1="80" y1="58" x2="100" y2="58" stroke="#555" strokeWidth="1.5"/>
      </g>
      <g className="trnW4">
        <circle cx="122" cy="58" r="10" fill="#222"/>
        <circle cx="122" cy="58" r="6"  fill="#3a3a3a"/>
        <circle cx="122" cy="58" r="2.5" fill="#666"/>
        <line x1="122" y1="48" x2="122" y2="68" stroke="#555" strokeWidth="1.5"/>
        <line x1="112" y1="58" x2="132" y2="58" stroke="#555" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}

function SprintSVG({ run }) {
  return (
    <svg width="56" height="78" viewBox="0 0 56 78" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.8))", overflow: "visible" }}>
      <style>{`
        @keyframes spBob { 0%{transform:translateY(0)} 100%{transform:translateY(-5px)} }
        @keyframes spLL  { 0%{transform:rotate(-40deg)} 100%{transform:rotate(34deg)} }
        @keyframes spRL  { 0%{transform:rotate(34deg)} 100%{transform:rotate(-40deg)} }
        @keyframes spLA  { 0%{transform:rotate(42deg)} 100%{transform:rotate(-32deg)} }
        @keyframes spRA  { 0%{transform:rotate(-32deg)} 100%{transform:rotate(42deg)} }
        .spBody { animation: ${run ? "spBob 0.24s ease-in-out infinite alternate" : "none"}; }
        .spLL   { transform-origin: 20px 52px; animation: ${run ? "spLL 0.24s ease-in-out infinite alternate" : "none"}; }
        .spRL   { transform-origin: 34px 52px; animation: ${run ? "spRL 0.24s ease-in-out infinite alternate" : "none"}; }
        .spLA   { transform-origin: 12px 36px; animation: ${run ? "spLA 0.24s ease-in-out infinite alternate" : "none"}; }
        .spRA   { transform-origin: 44px 36px; animation: ${run ? "spRA 0.24s ease-in-out infinite alternate" : "none"}; }
      `}</style>
      <g className="spBody">
        <ellipse cx="28" cy="76" rx="13" ry="3" fill="black" opacity="0.4"/>
        {/* Head */}
        <ellipse cx="28" cy="12" rx="10" ry="11" fill="#F5C5A3"/>
        {/* Hair */}
        <ellipse cx="28" cy="4"  rx="10" ry="6"  fill="#3a2010"/>
        <rect x="18" y="4" width="20" height="7" fill="#3a2010"/>
        {/* Ears */}
        <ellipse cx="18" cy="13" rx="2.5" ry="3.5" fill="#F5C5A3"/>
        <ellipse cx="38" cy="13" rx="2.5" ry="3.5" fill="#F5C5A3"/>
        {/* Eyes */}
        <ellipse cx="24" cy="11" rx="2.5" ry="2.5" fill="white"/>
        <ellipse cx="32" cy="11" rx="2.5" ry="2.5" fill="white"/>
        <circle  cx="24.5" cy="11.5" r="1.5" fill="#222"/>
        <circle  cx="32.5" cy="11.5" r="1.5" fill="#222"/>
        <circle  cx="25"   cy="11"   r="0.6" fill="white"/>
        <circle  cx="33"   cy="11"   r="0.6" fill="white"/>
        {/* Determined brow */}
        <path d="M22 8 L26 9.5" stroke="#3a2010" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M30 9.5 L34 8" stroke="#3a2010" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 17 Q28 20 34 17" stroke="#c0825a" strokeWidth="1.2" fill="none"/>
        {/* Neck */}
        <rect x="24" y="22" width="8" height="5" fill="#F5C5A3"/>
        {/* Suit jacket */}
        <rect x="15" y="27" width="26" height="21" rx="5" fill="#27ae60"/>
        {/* Lapels */}
        <path d="M24 27 L28 33 L32 27" fill="#1e8449"/>
        {/* Tie */}
        <rect x="26" y="27" width="6" height="18" rx="2" fill="#c0392b"/>
        <polygon points="29,44 26,37 32,37" fill="#a93226"/>
        {/* Briefcase */}
        <rect x="36" y="31" width="16" height="12" rx="3" fill="#8B6914"/>
        <rect x="38" y="27" width="12" height="6"  rx="2" fill="#7a5c10"/>
        <rect x="42" y="35" width="8"  height="2"  rx="1" fill="#6a4c08"/>
        <circle cx="44" cy="36" r="1.5" fill="#aaa" opacity="0.8"/>
      </g>
      <g className="spLA"><rect x="4"  y="29" width="12" height="5" rx="2.5" fill="#F5C5A3"/></g>
      <g className="spRA"><rect x="40" y="29" width="12" height="5" rx="2.5" fill="#F5C5A3"/></g>
      <g className="spLL">
        <rect x="15" y="48" width="10" height="22" rx="5" fill="#1a2535"/>
        <rect x="13" y="67" width="14" height="7"  rx="3" fill="#111"/>
        <rect x="13" y="71" width="14" height="3"  rx="1" fill="#27ae60"/>
      </g>
      <g className="spRL">
        <rect x="28" y="48" width="10" height="22" rx="5" fill="#1a2535"/>
        <rect x="28" y="67" width="14" height="7"  rx="3" fill="#111"/>
        <rect x="28" y="71" width="14" height="3"  rx="1" fill="#27ae60"/>
      </g>
    </svg>
  );
}

// ── Backgrounds ─────────────────────────────────────────────────────────────

function ZombieBackground() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 700 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="moonGlow" cx="85%" cy="18%" r="20%">
          <stop offset="0%" stopColor="#e8e8cc" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="fogGlow" cx="50%" cy="90%" r="50%">
          <stop offset="0%" stopColor="#00ff44" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect width="700" height="200" fill="#040c04"/>
      <rect width="700" height="200" fill="url(#moonGlow)"/>
      {/* Stars */}
      {[[40,8],[95,14],[180,6],[260,18],[340,9],[420,16],[520,7],[610,20],[670,11],[70,26],[310,5],[580,15],[150,22]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%3===0?2:1.2} fill="white" opacity={0.4+i%3*0.2}/>
      ))}
      {/* Moon */}
      <circle cx="595" cy="32" r="28" fill="#d4d4a0"/>
      <circle cx="608" cy="25" r="26" fill="#040c04"/>
      <circle cx="595" cy="32" r="28" fill="none" stroke="#c8c888" strokeWidth="1.5" opacity="0.4"/>
      {/* Clouds */}
      <ellipse cx="160" cy="55" rx="80" ry="22" fill="#0d1f0d" opacity="0.9"/>
      <ellipse cx="380" cy="48" rx="100" ry="18" fill="#0d1f0d" opacity="0.8"/>
      <ellipse cx="560" cy="62" rx="70"  ry="16" fill="#0d1f0d" opacity="0.7"/>
      {/* Ground */}
      <rect x="0" y="140" width="700" height="60" fill="#06100a"/>
      {/* Road */}
      <rect x="0" y="155" width="700" height="20" fill="#0a0a0a"/>
      {[40,110,180,250,320,390,460,530,600,670].map((x,i)=>(
        <rect key={i} x={x} y="163" width="42" height="4" rx="2" fill="#1a1a1a"/>
      ))}
      {/* Gravestones */}
      {[[55,108],[120,100],[210,112],[290,104],[380,108],[460,100],[560,110],[640,104]].map(([x,y],i)=>(
        <g key={i}>
          <rect x={x-10} y={y} width="20" height="32" rx="10 10 2 2" fill="#1e2e1e"/>
          <rect x={x-10} y={y+26} width="20" height="7" rx="1" fill="#161e16"/>
          {i%2===0 && <>
            <line x1={x-6} y1={y+9} x2={x+6} y2={y+9} stroke="#0d1a0d" strokeWidth="2"/>
            <line x1={x}   y1={y+5} x2={x}   y2={y+13} stroke="#0d1a0d" strokeWidth="2"/>
          </>}
          {i%3===0 && <text x={x} y={y+22} textAnchor="middle" fill="#0d1a0d" fontSize="7" fontFamily="monospace">RIP</text>}
        </g>
      ))}
      {/* Dead trees */}
      {[[35,72],[170,68],[490,70],[655,74]].map(([x,y],i)=>(
        <g key={i}>
          <rect x={x-3} y={y} width="7" height="56" fill="#121f12"/>
          <line x1={x} y1={y+8}  x2={x-22} y2={y-2}   stroke="#121f12" strokeWidth="5" strokeLinecap="round"/>
          <line x1={x} y1={y+22} x2={x+18} y2={y+6}   stroke="#121f12" strokeWidth="4" strokeLinecap="round"/>
          <line x1={x} y1={y+35} x2={x-14} y2={y+20}  stroke="#121f12" strokeWidth="3" strokeLinecap="round"/>
          <line x1={x} y1={y+12} x2={x+12} y2={y+2}   stroke="#121f12" strokeWidth="3" strokeLinecap="round"/>
        </g>
      ))}
      {/* Ground fog layers */}
      <rect width="700" height="200" fill="url(#fogGlow)"/>
      <ellipse cx="350" cy="158" rx="350" ry="22" fill="#00cc3318" opacity="0.8"/>
      <ellipse cx="180" cy="162" rx="180" ry="14" fill="#00cc3312"/>
      <ellipse cx="540" cy="160" rx="160" ry="12" fill="#00cc3312"/>
      {/* Scattered bones */}
      {[[100,150],[280,148],[450,151],[620,149]].map(([x,y],i)=>(
        <g key={i} opacity="0.4">
          <ellipse cx={x}   cy={y} rx="8" ry="3" fill="#cccc99" transform={`rotate(${i*25} ${x} ${y})`}/>
          <circle  cx={x-9} cy={y} r="3" fill="#cccc99" transform={`rotate(${i*25} ${x} ${y})`}/>
          <circle  cx={x+9} cy={y} r="3" fill="#cccc99" transform={`rotate(${i*25} ${x} ${y})`}/>
        </g>
      ))}
    </svg>
  );
}

function PoliceBackground() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 700 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sirenGlowR" cx="30%" cy="90%" r="30%">
          <stop offset="0%" stopColor="#ff2222" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="sirenGlowB" cx="70%" cy="90%" r="30%">
          <stop offset="0%" stopColor="#2244ff" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect width="700" height="200" fill="#03030e"/>
      <rect width="700" height="200" fill="url(#sirenGlowR)"/>
      <rect width="700" height="200" fill="url(#sirenGlowB)"/>
      {/* Stars */}
      {[[30,8],[90,18],[200,6],[320,12],[460,8],[590,16],[660,6],[140,25],[400,4],[530,20]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="1.2" fill="white" opacity="0.5"/>
      ))}
      {/* Buildings */}
      {[[0,95,55,105],[55,82,42,118],[97,108,48,92],[145,78,58,122],[203,96,44,104],[247,72,66,128],[313,98,52,102],[365,84,44,116],[409,68,62,132],[471,88,52,112],[523,78,48,122],[571,62,58,138],[629,82,44,118],[673,88,27,112]].map(([x,y,w,h],i)=>(
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill="#08081a"/>
          {Array.from({length:Math.floor(h/15)}).map((_,row)=>
            Array.from({length:Math.floor(w/14)}).map((_,col)=>{
              const lit = (i*7+row*3+col*5)%8 > 3;
              return lit ? <rect key={`${row}-${col}`} x={x+3+col*12} y={y+5+row*13} width="7" height="9" rx="1" fill="#ffee88" opacity="0.55"/> : null;
            })
          )}
          {/* Rooftop details */}
          {i%3===0 && <rect x={x+w/2-4} y={y-8} width="8" height="10" rx="1" fill="#060616"/>}
          {i%4===0 && <circle cx={x+w/2} cy={y-4} r="4" fill="#ff2222" opacity="0.7"/>}
        </g>
      ))}
      {/* Road */}
      <rect x="0" y="158" width="700" height="42" fill="#0c0c0c"/>
      <rect x="0" y="154" width="700" height="7"  fill="#181818"/>
      {/* Lane markings */}
      {[50,120,190,260,330,400,470,540,610,680].map((x,i)=>(
        <rect key={i} x={x} y="178" width="50" height="4" rx="2" fill="#252525"/>
      ))}
      {/* Sidewalks */}
      <rect x="0" y="154" width="700" height="6" fill="#111"/>
      {/* Streetlights */}
      {[80,230,380,530,660].map((x,i)=>(
        <g key={i}>
          <rect x={x-2} y="110" width="4" height="48" fill="#222"/>
          <rect x={x-16} y="108" width="20" height="6" rx="3" fill="#333"/>
          <ellipse cx={x-6} cy="114" rx="14" ry="10" fill="#ffee8828"/>
        </g>
      ))}
      {/* Fire hydrant */}
      {[200,500].map((x,i)=>(
        <g key={i}>
          <rect x={x-4} y="148" width="8" height="10" rx="2" fill="#cc2200"/>
          <rect x={x-6} y="153" width="12" height="4"  rx="1" fill="#aa1800"/>
        </g>
      ))}
      {/* Wet road reflection */}
      <rect x="0" y="170" width="700" height="30" fill="#2244ff08"/>
    </svg>
  );
}

function TrainBackground() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 700 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dawnSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0a0500"/>
          <stop offset="50%"  stopColor="#1f0a00"/>
          <stop offset="100%" stopColor="#4a1800"/>
        </linearGradient>
        <radialGradient id="sunRise" cx="88%" cy="75%" r="25%">
          <stop offset="0%"  stopColor="#ff8800" stopOpacity="0.5"/>
          <stop offset="60%" stopColor="#ff4400" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect width="700" height="200" fill="url(#dawnSky)"/>
      <rect width="700" height="200" fill="url(#sunRise)"/>
      {/* Rising sun disc */}
      <ellipse cx="630" cy="148" rx="45" ry="38" fill="#ff6600" opacity="0.22"/>
      <ellipse cx="630" cy="148" rx="25" ry="22" fill="#ffaa00" opacity="0.32"/>
      <ellipse cx="630" cy="148" rx="12" ry="10" fill="#ffcc00" opacity="0.5"/>
      {/* Stars fading */}
      {[[40,10],[100,18],[200,8],[350,14],[480,6],[140,22],[420,10]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="1.2" fill="white" opacity="0.3"/>
      ))}
      {/* Station building */}
      <rect x="350" y="55"  width="350" height="145" fill="#120800"/>
      <rect x="350" y="48"  width="350" height="14"  fill="#1e0e00"/>
      <rect x="370" y="24"  width="70"  height="32"  fill="#120800"/>
      <rect x="520" y="30"  width="90"  height="26"  fill="#120800"/>
      {/* Station windows */}
      {[[360,62],[420,62],[480,62],[540,62],[600,62],[660,62],
        [360,90],[420,90],[480,90],[540,90],[600,90],[660,90],
        [360,118],[420,118],[480,118],[540,118],[600,118],[660,118]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="36" height="22" rx="3" fill="#ffcc44" opacity={0.3+i%3*0.15}/>
      ))}
      {/* Station name board */}
      <rect x="420" y="42" width="150" height="22" rx="4" fill="#cc4400" opacity="0.9"/>
      <text x="495" y="57" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="1">CENTRAL STATION</text>
      {/* Clock tower */}
      <rect x="372" y="10" width="36"  height="46" fill="#1e0e00"/>
      <circle cx="390" cy="28" r="13" fill="#120800" stroke="#ff8800" strokeWidth="2" opacity="0.9"/>
      <line x1="390" y1="28" x2="390" y2="18" stroke="#ffaa00" strokeWidth="2"/>
      <line x1="390" y1="28" x2="398" y2="34" stroke="#ffaa00" strokeWidth="2"/>
      {/* Pillars */}
      {[360,400,440,480,520,560,600,640,680].map((x,i)=>(
        <rect key={i} x={x} y="55" width="8" height="145" fill="#1a0a00" opacity="0.8"/>
      ))}
      {/* Platform */}
      <rect x="0" y="148" width="700" height="52" fill="#180c00"/>
      <rect x="0" y="144" width="700" height="8"  fill="#240e00"/>
      {/* Platform edge orange glow */}
      <rect x="0" y="142" width="700" height="5" fill="#ff6600" opacity="0.4"/>
      <rect x="0" y="140" width="700" height="4" fill="#ff4400" opacity="0.2"/>
      {/* Train tracks */}
      <rect x="0" y="154" width="700" height="5" fill="#333"/>
      <rect x="0" y="162" width="700" height="5" fill="#333"/>
      {[0,35,70,105,140,175,210,245,280,315,350,385,420,455,490,525,560,595,630,665].map((x,i)=>(
        <rect key={i} x={x} y="151" width="24" height="18" rx="1" fill="#1a0800"/>
      ))}
      {/* Departure board */}
      <rect x="10" y="90" width="200" height="50" rx="5" fill="#0a0500" stroke="#ff6600" strokeWidth="1" opacity="0.8"/>
      <text x="110" y="106" textAnchor="middle" fill="#ff6600" fontSize="8"  fontFamily="monospace">DEPARTURES</text>
      <text x="110" y="120" textAnchor="middle" fill="#ffaa00" fontSize="9"  fontFamily="monospace">22:58 → PLATFORM 1</text>
      <text x="110" y="133" textAnchor="middle" fill="#ff4400" fontSize="9"  fontFamily="monospace">⚠ LAST TRAIN</text>
      {/* Ambient people silhouettes on platform */}
      {[[80,142],[130,140],[200,142],[250,138]].map(([x,y],i)=>(
        <g key={i} opacity="0.25">
          <ellipse cx={x} cy={y-14} rx="5" ry="6"  fill="#cc8844"/>
          <rect    x={x-5} y={y-8} width="10" height="14" rx="3" fill="#443322"/>
        </g>
      ))}
    </svg>
  );
}

// ── Chase Scene Component ──────────────────────────────────────────────────
function ChaseScene({ themeId, progress, isGame, timeLeft, totalTime }) {
  const playerX = Math.max(30, Math.min(70, 70 - progress * 38));
  const chaserX = Math.max(0, playerX - 20 - (1 - progress) * 10);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-3"
      style={{ height: 190, background: "#050505", boxShadow: "inset 0 0 30px rgba(0,0,0,0.8)" }}>
      {/* Background */}
      <div className="absolute inset-0">
        {themeId === "zombie"  && <ZombieBackground/>}
        {themeId === "police"  && <PoliceBackground/>}
        {themeId === "train"   && <TrainBackground/>}
      </div>

      {/* Speed lines when danger */}
      {progress > 0.55 && Array.from({length:7}).map((_,i) => (
        <div key={i} className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: 20 + i * 25,
            height: 1,
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${0.04 + progress * 0.08}) 40%, transparent 100%)`,
            animation: `speedLine${i%3} ${0.18 + i*0.02}s linear infinite`,
          }}/>
      ))}

      {/* Chaser character */}
      <div className="absolute transition-all duration-500 ease-out"
        style={{ bottom: themeId === "police" ? 10 : themeId === "train" ? 14 : 14, left: `${Math.min(chaserX, playerX - 10)}%` }}>
        {themeId === "zombie" && <ZombieSVG run={isGame}/>}
        {themeId === "police" && <PoliceSVG run={isGame}/>}
        {themeId === "train"  && <TrainSVG  run={isGame}/>}
      </div>

      {/* Player character */}
      <div className="absolute transition-all duration-500 ease-out"
        style={{ bottom: 14, left: `${playerX}%` }}>
        {themeId === "zombie" && <RunnerSVG run={isGame} scared={progress > 0.55}/>}
        {themeId === "police" && <ThiefSVG  run={isGame}/>}
        {themeId === "train"  && <SprintSVG run={isGame}/>}
      </div>

      {/* Goal */}
      <div className="absolute bottom-4 right-5 text-3xl" style={{ filter: "drop-shadow(0 0 10px gold)", fontSize: 32 }}>
        {themeId === "zombie" ? "🏠" : themeId === "police" ? "🚗" : "🚪"}
      </div>

      {/* Danger vignette */}
      {progress > 0.8 && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ boxShadow: `inset 0 0 40px rgba(255,0,0,${(progress - 0.8) * 1.5})`, animation: "dangerPulse 0.35s ease-in-out infinite alternate" }}/>
      )}

      {/* Timer bar */}
      {isGame && (
        <div className="absolute bottom-0 left-0 right-0 h-2">
          <div className="h-full transition-all duration-1000 rounded-b-2xl"
            style={{
              width: `${(timeLeft / totalTime) * 100}%`,
              background: timeLeft/totalTime > 0.5 ? "#00ff88" : timeLeft/totalTime > 0.25 ? "#ffaa00" : "#ff3333",
              boxShadow: `0 0 8px currentColor`,
            }}/>
        </div>
      )}
    </div>
  );
}

// ── Word Display ──────────────────────────────────────────────────────────
function WordDisplay({ words, currentWord, currentInput, typedWords, theme }) {
  return (
    <div className="w-full rounded-xl p-4 mb-3 font-mono text-lg leading-loose"
      style={{ background: "#08080f", border: `1px solid ${theme.accent}22`, minHeight: 88 }}>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {words.map((word, wi) => {
          if (wi < currentWord) {
            const tw = typedWords[wi] || "";
            return (
              <span key={wi}>
                {word.split("").map((ch, ci) => (
                  <span key={ci} style={{ color: tw[ci] === ch ? theme.accent : "#ff4466", textShadow: tw[ci] === ch ? `0 0 6px ${theme.accent}88` : "none" }}>{ch}</span>
                ))}
              </span>
            );
          }
          if (wi === currentWord) {
            return (
              <span key={wi} className="rounded px-1" style={{ background: `${theme.accent}15`, boxShadow: `0 0 10px ${theme.accent}22` }}>
                {word.split("").map((ch, ci) => {
                  let color = "#333";
                  if (ci < currentInput.length) color = currentInput[ci] === ch ? theme.accent : "#ff4466";
                  const cursor = ci === currentInput.length;
                  return (
                    <span key={ci} style={{
                      color,
                      borderBottom: cursor ? `2px solid ${theme.accent}` : "none",
                      textShadow: ci < currentInput.length && currentInput[ci] === ch ? `0 0 8px ${theme.accent}aa` : "none",
                    }}>{ch}</span>
                  );
                })}
              </span>
            );
          }
          return <span key={wi} style={{ color: "#1e1e2a" }}>{word}</span>;
        })}
      </div>
    </div>
  );
}

// ── Theme Config ──────────────────────────────────────────────────────────
const THEMES = {
  zombie: { id: "zombie", name: "Zombie Chase", icon: "🧟", bg: "#030803", accent: "#00ff88", danger: "#ff2222",
    tagline: "Type fast or become undead...", winMsg: "You escaped the horde! 🏠", loseMsg: "The zombies got you... 🧟",
    homeDesc: "The dead are rising. Your keyboard is your only weapon. Run.", startBtn: "🏃 START RUNNING" },
  police: { id: "police", name: "Heist Escape", icon: "💎", bg: "#020208", accent: "#4499ff", danger: "#ff3344",
    tagline: "The cops are right behind you...", winMsg: "You lost the police! 💎", loseMsg: "Busted! Hands up! 🚔",
    homeDesc: "You grabbed the diamonds. Now get out before the cops arrive.", startBtn: "💎 START HEIST" },
  train:  { id: "train",  name: "Catch the Train", icon: "🚆", bg: "#080400", accent: "#ff8800", danger: "#cc2200",
    tagline: "Last train is leaving the station...", winMsg: "You caught the train! 🎉", loseMsg: "Train left without you... 😢",
    homeDesc: "It's the last train. The doors are closing. SPRINT.", startBtn: "🚂 SPRINT!" },
};

// ── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]           = useState("home");
  const [themeKey, setThemeKey]       = useState("zombie");
  const [difficulty, setDifficulty]   = useState("medium");
  const [countdown, setCountdown]     = useState(3);
  const [words, setWords]             = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [typedWords, setTypedWords]   = useState({});
  const [timeLeft, setTimeLeft]       = useState(60);
  const [totalTime, setTotalTime]     = useState(60);
  const [wpm, setWpm]                 = useState(0);
  const [accuracy, setAccuracy]       = useState(100);
  const [results, setResults]         = useState(null);
  const [round, setRound]             = useState(1);
  // cumulative session stats across rounds
  const sessionRef = useRef({ totalWpm: 0, totalAcc: 0, rounds: 0 });

  const inputRef        = useRef(null);
  const timerRef        = useRef(null);
  const startTimeRef    = useRef(null);
  const correctCharsRef = useRef(0);
  const totalCharsRef   = useRef(0);
  const currentWordRef  = useRef(0);
  const typedWordsRef   = useRef({});
  const heartbeatRef    = useRef(null);
  const sirenRef        = useRef(null);
  const stepCountRef    = useRef(0);
  const [soundOn, setSoundOn] = useState(true);
  const soundOnRef = useRef(true);
  useEffect(() => { soundOnRef.current = soundOn; }, [soundOn]);

  const sfx = useCallback((fn, ...args) => {
    if (soundOnRef.current) fn(...args);
  }, []);

  const theme = THEMES[themeKey];
  const diff  = DIFFICULTY[difficulty];

  // Stop ambient loops
  const stopAmbient = useCallback(() => {
    clearInterval(heartbeatRef.current);
    clearInterval(sirenRef.current);
  }, []);

  // Launch a round (roundNum: which round 1-based)
  const launchRound = useCallback((roundNum, themeId, diff_key) => {
    stopAmbient();
    try { if (_actx && _actx.state === "suspended") _actx.resume(); } catch(e){}
    const wordList = getNextParagraph(themeId, diff_key);
    setWords(wordList);
    setRound(roundNum);
    setCurrentWord(0); currentWordRef.current = 0;
    setCurrentInput("");
    setTypedWords({}); typedWordsRef.current = {};
    const t = DIFFICULTY[diff_key].time;
    setTimeLeft(t); setTotalTime(t);
    setWpm(0); setAccuracy(100);
    correctCharsRef.current = 0; totalCharsRef.current = 0;
    stepCountRef.current = 0;
    setCountdown(3);
    setScreen("countdown");
  }, [stopAmbient]);

  const startGame = useCallback(() => {
    sessionRef.current = { totalWpm: 0, totalAcc: 0, rounds: 0 };
    // reset used paragraphs for fresh session
    Object.keys(usedParagraphs).forEach(th =>
      Object.keys(usedParagraphs[th]).forEach(d => { usedParagraphs[th][d] = []; })
    );
    launchRound(1, themeKey, difficulty);
  }, [themeKey, difficulty, launchRound]);

  // Countdown beeps
  useEffect(() => {
    if (screen !== "countdown") return;
    sfx(SFX.countdownBeep, countdown);
    if (countdown === 0) {
      const t = setTimeout(() => { setScreen("game"); startTimeRef.current = Date.now(); }, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 950);
    return () => clearTimeout(t);
  }, [screen, countdown, sfx]);

  const endGame = useCallback((reason, wordCount) => {
    clearInterval(timerRef.current);
    stopAmbient();
    const elapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : diff.time;
    const cc = correctCharsRef.current, tc = totalCharsRef.current;
    const wc = wordCount !== undefined ? wordCount : currentWordRef.current;
    const roundWpm = calcWPM(cc, Math.max(elapsed, 1));
    const roundAcc = calcAccuracy(cc, tc);
    const won = reason === "complete";
    // accumulate session
    sessionRef.current.totalWpm += roundWpm;
    sessionRef.current.totalAcc += roundAcc;
    sessionRef.current.rounds   += 1;
    setResults({
      wpm: roundWpm,
      accuracy: roundAcc,
      elapsed: Math.round(elapsed),
      wordsCompleted: wc,
      totalWords: words.length,
      won,
      reason,
      avgWpm: Math.round(sessionRef.current.totalWpm / sessionRef.current.rounds),
      avgAcc: Math.round(sessionRef.current.totalAcc / sessionRef.current.rounds),
      sessionRounds: sessionRef.current.rounds,
    });
    setTimeout(() => { if (won) sfx(SFX.win, themeKey); else sfx(SFX.lose, themeKey); }, 200);
    setScreen("results");
  }, [diff.time, words, themeKey, sfx, stopAmbient]);

  // Game timer + ambient sounds
  useEffect(() => {
    if (screen !== "game") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        const next = t - 1;
        if (next <= 0) { clearInterval(timerRef.current); endGame("timeout"); return 0; }
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setWpm(calcWPM(correctCharsRef.current, Math.max(elapsed, 1)));
        setAccuracy(calcAccuracy(correctCharsRef.current, totalCharsRef.current));

        // Theme-specific timed ambient
        if (soundOnRef.current) {
          if (themeKey === "train" && next % 12 === 0) SFX.trainWhistle();
          if (themeKey === "police" && next % 8 === 0) SFX.siren();
        }
        return next;
      });
    }, 1000);

    // Heartbeat when danger (starts after 40% time gone)
    heartbeatRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (soundOnRef.current && t / diff.time < 0.35) SFX.heartbeat();
        return t;
      });
    }, 900);

    // Zombie groans periodically
    if (themeKey === "zombie") {
      sirenRef.current = setInterval(() => {
        if (soundOnRef.current) SFX.zombieGroan();
      }, 7000);
    }

    return () => { clearInterval(timerRef.current); stopAmbient(); };
  }, [screen, endGame, diff.time, themeKey, stopAmbient]);

  useEffect(() => {
    if (screen === "game") setTimeout(() => inputRef.current?.focus(), 100);
  }, [screen]);

  // Last 5s urgent beeps
  useEffect(() => {
    if (screen === "game" && timeLeft <= 5 && timeLeft > 0) {
      sfx(playTone, { freq: 660 + timeLeft * 40, type: "square", vol: 0.15, duration: 0.08, attack: 0.002, decay: 0.03, sustain: 0.1, release: 0.04 });
    }
  }, [timeLeft, screen, sfx]);

  const handleInput = useCallback((e) => {
    const val = e.target.value;
    if (val.endsWith(" ")) {
      const typed = val.trim();
      if (!typed) return;
      const wi = currentWordRef.current;
      const wordsSnap = words;
      const expected = wordsSnap[wi];
      if (!expected) return;
      const newTyped = { ...typedWordsRef.current, [wi]: typed };
      typedWordsRef.current = newTyped;
      setTypedWords({ ...newTyped });
      let correct = 0;
      for (let i = 0; i < expected.length; i++) if (typed[i] === expected[i]) correct++;
      correctCharsRef.current += correct;
      totalCharsRef.current   += expected.length;
      // Word complete sound
      const accuracy = correct / expected.length;
      if (accuracy >= 0.8) sfx(SFX.correctWord, themeKey);
      else sfx(SFX.wrongKey);
      const next = wi + 1;
      currentWordRef.current = next;
      setCurrentWord(next);
      setCurrentInput("");
      if (next >= wordsSnap.length) endGame("complete", next);
    } else {
      // Per-character sounds
      const prevLen = currentInput.length;
      const newLen  = val.length;
      if (newLen > prevLen) {
        const wi = currentWordRef.current;
        const expected = words[wi] || "";
        const ci = newLen - 1;
        const correct = val[ci] === expected[ci];
        // Footstep every 2 correct chars
        if (correct) {
          stepCountRef.current++;
          if (stepCountRef.current % 2 === 0) sfx(SFX.footstep, themeKey);
        } else {
          sfx(SFX.wrongKey);
        }
      }
      setCurrentInput(val);
    }
  }, [words, endGame, currentInput, themeKey, sfx]);

  const chaseProgress = screen === "game"
    ? Math.max(0, Math.min(0.98, (1 - timeLeft / totalTime) * 1.2 - (currentWord / Math.max(words.length, 1)) * 0.45))
    : 0;

  const timerFrac  = timeLeft / totalTime;
  const timerColor = timerFrac > 0.5 ? theme.accent : timerFrac > 0.25 ? "#ffaa00" : "#ff3333";

  return (
    <div className="w-screen flex items-center justify-center p-4"
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        background: theme.bg,
        backgroundImage: `radial-gradient(ellipse at 20% 30%, ${theme.accent}07 0%, transparent 60%),
          radial-gradient(ellipse at 80% 70%, ${theme.danger}07 0%, transparent 60%)`,
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');
        html, body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; }
        * { font-family: 'Share Tech Mono', monospace; box-sizing: border-box; }
        .ofont { font-family: 'Orbitron', monospace; }
        @keyframes slideUp    { from{transform:translateY(18px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes countIn    { 0%{transform:scale(1.7);opacity:0} 60%{transform:scale(0.92)} 100%{transform:scale(1);opacity:1} }
        @keyframes dangerPulse{ from{opacity:0} to{opacity:1} }
        @keyframes speedLine0 { from{transform:translateX(100%)} to{transform:translateX(-110%)} }
        @keyframes speedLine1 { from{transform:translateX(80%)}  to{transform:translateX(-110%)} }
        @keyframes speedLine2 { from{transform:translateX(120%)} to{transform:translateX(-110%)} }
        .btn { transition: all 0.15s ease; cursor: pointer; }
        .btn:active  { transform: scale(0.95); }
        .btn:hover   { filter: brightness(1.18); }
      `}</style>

      <div className="w-full" style={{ maxWidth: "860px", maxHeight: "96vh", overflowY: "auto", overflowX: "hidden", animation: "slideUp 0.4s ease" }}>

        {/* HOME */}
        {screen === "home" && (
          <div className="flex flex-col gap-5">
            <div className="text-center relative">
              <button onClick={() => setSoundOn(s => !s)} className="btn absolute right-0 top-0 rounded-xl px-3 py-2 text-lg"
                title={soundOn ? "Mute sounds" : "Unmute sounds"}
                style={{ background: "#0d0d14", border: `1px solid ${soundOn ? theme.accent+"44" : "#333"}`, color: soundOn ? theme.accent : "#444" }}>
                {soundOn ? "🔊" : "🔇"}
              </button>
              <div style={{ fontSize: 72 }} className="mb-2">{theme.icon}</div>
              <div className="ofont font-black mb-1" style={{ fontSize: 42, color: theme.accent, textShadow: `0 0 30px ${theme.accent}99, 0 0 60px ${theme.accent}44` }}>
                TYPE OR DIE
              </div>
              <div className="text-xs tracking-widest opacity-40" style={{ color: theme.accent }}>{theme.tagline}</div>
            </div>

            {/* Scene preview */}
            <div className="rounded-2xl overflow-hidden" style={{ height: 130, boxShadow: `0 0 30px ${theme.accent}22` }}>
              {themeKey === "zombie" && <ZombieBackground/>}
              {themeKey === "police" && <PoliceBackground/>}
              {themeKey === "train"  && <TrainBackground/>}
            </div>

            {/* Theme tabs */}
            <div className="grid grid-cols-3 gap-2">
              {Object.values(THEMES).map(t => (
                <button key={t.id} onClick={() => setThemeKey(t.id)} className="btn rounded-xl p-3 text-center"
                  style={{
                    background: themeKey === t.id ? `${t.accent}18` : "#0d0d14",
                    border: `1.5px solid ${themeKey === t.id ? t.accent : "#14141e"}`,
                    boxShadow: themeKey === t.id ? `0 0 14px ${t.accent}44` : "none",
                    color: themeKey === t.id ? t.accent : "#2a2a3a",
                  }}>
                  <div style={{ fontSize: 40 }} className="mb-1">{t.icon}</div>
                  <div className="text-xs font-bold tracking-wide">{t.name}</div>
                </button>
              ))}
            </div>

            <p className="text-center text-xs opacity-40" style={{ color: theme.accent }}>{theme.homeDesc}</p>

            {/* Difficulty */}
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(DIFFICULTY).map(([k, d]) => (
                <button key={k} onClick={() => setDifficulty(k)} className="btn rounded-xl p-3 text-center"
                  style={{
                    background: difficulty === k ? `${d.color}18` : "#0d0d14",
                    border: `1.5px solid ${difficulty === k ? d.color : "#14141e"}`,
                    boxShadow: difficulty === k ? `0 0 12px ${d.color}44` : "none",
                  }}>
                  <div className="font-black text-base" style={{ color: difficulty === k ? d.color : "#2a2a3a" }}>{d.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: difficulty === k ? d.color : "#1a1a28" }}>{d.totalRounds} rounds · {d.time}s</div>
                </button>
              ))}
            </div>

            <button onClick={startGame} className="btn ofont w-full py-5 rounded-2xl text-xl font-black tracking-widest"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}22, ${theme.accent}0a)`,
                border: `2px solid ${theme.accent}`,
                color: theme.accent,
                boxShadow: `0 0 30px ${theme.accent}44, inset 0 0 20px ${theme.accent}0a`,
              }}>
              {theme.startBtn}
            </button>
          </div>
        )}

        {/* COUNTDOWN */}
        {screen === "countdown" && (
          <div className="flex flex-col items-center gap-5 py-4">
            <ChaseScene themeId={themeKey} progress={0} isGame={false} timeLeft={diff.time} totalTime={diff.time}/>
            <div className="ofont font-black" key={countdown}
              style={{
                fontSize: 100, lineHeight: 1,
                color: theme.accent,
                textShadow: `0 0 50px ${theme.accent}, 0 0 100px ${theme.accent}77`,
                animation: "countIn 0.75s cubic-bezier(0.175,0.885,0.32,1.275)",
              }}>
              {countdown > 0 ? countdown : "GO!"}
            </div>
            <div className="tracking-widest text-sm opacity-30" style={{ color: theme.accent }}>
              {countdown > 0 ? "GET READY..." : "MOVE MOVE MOVE!!!"}
            </div>
          </div>
        )}

        {/* GAME */}
        {screen === "game" && (
          <div className="flex flex-col gap-3">
            {/* Stats */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs opacity-30" style={{ color: theme.accent }}>WPM</div>
                <div className="ofont text-3xl font-black" style={{ color: theme.accent, textShadow: `0 0 12px ${theme.accent}88` }}>{wpm}</div>
              </div>
              <div className="text-center flex flex-col items-center gap-1">
                <div className="ofont text-4xl font-black"
                  style={{
                    color: timerColor,
                    textShadow: `0 0 20px ${timerColor}`,
                    animation: timeLeft <= 5 ? "countIn 0.4s ease-in-out infinite" : "none",
                  }}>
                  {timeLeft}s
                </div>
                <button onClick={() => setSoundOn(s => !s)} className="btn text-sm px-2 py-0.5 rounded-lg"
                  style={{ background: "#0d0d14", border: `1px solid ${soundOn ? theme.accent+"33" : "#222"}`, color: soundOn ? theme.accent : "#333" }}>
                  {soundOn ? "🔊" : "🔇"}
                </button>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-30" style={{ color: theme.accent }}>ACC</div>
                <div className="ofont text-3xl font-black" style={{ color: accuracy > 80 ? theme.accent : "#ff4466" }}>{accuracy}%</div>
              </div>
            </div>

            <ChaseScene themeId={themeKey} progress={chaseProgress} isGame={true} timeLeft={timeLeft} totalTime={totalTime}/>
            <WordDisplay words={words} currentWord={currentWord} currentInput={currentInput} typedWords={typedWords} theme={theme}/>

            <input ref={inputRef} value={currentInput} onChange={handleInput}
              onPaste={e => e.preventDefault()} autoComplete="off" autoCorrect="off" spellCheck="false"
              className="w-full px-5 py-4 rounded-xl text-lg outline-none"
              placeholder="start typing..."
              style={{
                background: "#06060e",
                border: `2px solid ${theme.accent}44`,
                color: theme.accent,
                caretColor: theme.accent,
                boxShadow: `0 0 16px ${theme.accent}0a`,
              }}
            />

            <div className="flex items-center gap-2">
              <span className="text-xs opacity-25 shrink-0" style={{ color: theme.accent }}>R{round}</span>
              <span className="text-xs opacity-25" style={{ color: theme.accent }}>{currentWord}/{words.length}</span>
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#111" }}>
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(currentWord / Math.max(words.length, 1)) * 100}%`, background: theme.accent, boxShadow: `0 0 6px ${theme.accent}` }}/>
              </div>
              {/* Round pips */}
              <div className="flex gap-1 shrink-0">
                {Array.from({ length: Math.min(diff.totalRounds, 8) }).map((_, i) => (
                  <div key={i} className="rounded-full" style={{
                    width: 6, height: 6,
                    background: i < round ? theme.accent : "#1a1a2a",
                    boxShadow: i === round - 1 ? `0 0 4px ${theme.accent}` : "none",
                  }}/>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {screen === "results" && results && (
          <div className="flex flex-col gap-4" style={{ animation: "slideUp 0.5s ease" }}>

            {/* Round badge + outcome */}
            <div className="text-center">
              {/* Round pills */}
              <div className="flex items-center justify-center gap-1.5 mb-3">
                {Array.from({ length: diff.totalRounds }).map((_, i) => (
                  <div key={i} className="rounded-full transition-all duration-300"
                    style={{
                      width: i < round ? 22 : 10,
                      height: 10,
                      background: i < round ? theme.accent : "#1a1a2a",
                      boxShadow: i === round - 1 ? `0 0 8px ${theme.accent}` : "none",
                    }}/>
                ))}
              </div>
              <div className="text-xs tracking-widest mb-1 opacity-40" style={{ color: theme.accent }}>
                ROUND {round} / {diff.totalRounds}
              </div>
              <div style={{ fontSize: 44 }} className="mb-1">{results.won ? "🎉" : "💀"}</div>
              <div className="ofont text-xl font-black"
                style={{ color: results.won ? theme.accent : "#ff3366", textShadow: `0 0 20px ${results.won ? theme.accent : "#ff3366"}88` }}>
                {results.won ? theme.winMsg : results.reason === "timeout" ? "⏰ Time's up!" : theme.loseMsg}
              </div>
            </div>

            {/* Scene thumbnail */}
            <div className="rounded-2xl overflow-hidden" style={{ height: 115 }}>
              {themeKey === "zombie" && <ZombieBackground/>}
              {themeKey === "police" && <PoliceBackground/>}
              {themeKey === "train"  && <TrainBackground/>}
            </div>

            {/* This round stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "WPM",      value: results.wpm,                                       icon: "⚡" },
                { label: "ACCURACY", value: `${results.accuracy}%`,                            icon: "🎯" },
                { label: "TIME",     value: `${results.elapsed}s`,                             icon: "⏱️" },
                { label: "WORDS",    value: `${results.wordsCompleted}/${results.totalWords}`,  icon: "📝" },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3 text-center"
                  style={{ background: "#08080f", border: `1px solid ${theme.accent}20` }}>
                  <div style={{ fontSize: 20 }} className="mb-0.5">{s.icon}</div>
                  <div className="ofont text-2xl font-black" style={{ color: theme.accent, textShadow: `0 0 8px ${theme.accent}88` }}>{s.value}</div>
                  <div className="text-xs opacity-25 tracking-widest mt-0.5" style={{ color: theme.accent }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Session average (shown after round 2+) */}
            {results.sessionRounds >= 2 && (
              <div className="rounded-xl p-3 flex items-center justify-between"
                style={{ background: `${theme.accent}08`, border: `1px solid ${theme.accent}22` }}>
                <div className="text-xs opacity-40 tracking-widest" style={{ color: theme.accent }}>SESSION AVG</div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="ofont text-lg font-black" style={{ color: theme.accent }}>{results.avgWpm}</div>
                    <div className="text-xs opacity-30" style={{ color: theme.accent }}>WPM</div>
                  </div>
                  <div className="text-center">
                    <div className="ofont text-lg font-black" style={{ color: theme.accent }}>{results.avgAcc}%</div>
                    <div className="text-xs opacity-30" style={{ color: theme.accent }}>ACC</div>
                  </div>
                  <div className="text-center">
                    <div className="ofont text-lg font-black" style={{ color: theme.accent }}>{results.sessionRounds}</div>
                    <div className="text-xs opacity-30" style={{ color: theme.accent }}>ROUNDS</div>
                  </div>
                </div>
              </div>
            )}

            {/* Grade */}
            <div className="rounded-xl p-3 text-center" style={{ background: `${theme.accent}0d`, border: `1px solid ${theme.accent}33` }}>
              <div className="text-xs opacity-30 tracking-widest mb-1" style={{ color: theme.accent }}>PERFORMANCE GRADE</div>
              <div className="ofont text-4xl font-black"
                style={{ color: results.wpm >= 60 ? "#00ff88" : results.wpm >= 40 ? "#ffaa00" : results.wpm >= 20 ? "#ff8800" : "#ff3366" }}>
                {results.wpm >= 60 ? "S ★★★" : results.wpm >= 40 ? "A ★★☆" : results.wpm >= 20 ? "B ★☆☆" : "C ☆☆☆"}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 items-stretch">
              {/* Next Round */}
              <button
                onClick={() => launchRound(round + 1, themeKey, difficulty)}
                className="btn ofont py-4 rounded-xl font-black tracking-wide text-base"
                style={{
                  flex: 3,
                  background: `linear-gradient(135deg, ${theme.accent}28, ${theme.accent}10)`,
                  border: `2px solid ${theme.accent}`,
                  color: theme.accent,
                  boxShadow: `0 0 24px ${theme.accent}44`,
                }}>
                NEXT →
              </button>
              {/* Restart */}
              <button onClick={startGame} className="btn rounded-xl font-bold"
                style={{
                  flex: 1,
                  background: "#0d0d14",
                  border: `1.5px solid ${theme.accent}55`,
                  color: theme.accent,
                  fontSize: 22,
                }}>
                ↺
              </button>
              {/* Home */}
              <button onClick={() => setScreen("home")} className="btn rounded-xl"
                style={{
                  flex: 1,
                  background: "#0d0d14",
                  border: "1.5px solid #2a2a3a",
                  color: "#888",
                  fontSize: 22,
                }}>
                ⌂
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}