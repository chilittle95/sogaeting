import React, { useState, useEffect } from 'react';
import { Heart, ChevronRight, Sparkles, Check, ArrowLeft, Wine, Users, Clock } from 'lucide-react';

// --- color palette (warm bar-night vibe) ---
const C = {
  bg: '#1a0d07',
  bgSoft: '#2a160c',
  cream: '#f5e8d0',
  creamDeep: '#e6d3b3',
  ink: '#3a2415',
  inkSoft: '#7a5a3a',
  rose: '#d54a3f',
  gold: '#c89352',
  goldSoft: '#e0b870',
};

// --- mock participant data ---
const MEN = [
  { id: 'm1', nick: '진수', age: '20대 중반', mbti: 'INFP', intro: '오늘 처음이라 좀 긴장돼요... 잘 부탁드려요 :)', mood: '설렘', tension: '중' },
  { id: 'm2', nick: '동현', age: '20대 후반', mbti: 'ESTJ', intro: '전주 3년차, 맛집 다 알려드림', mood: '여유', tension: '상' },
  { id: 'm3', nick: '민재', age: '20대 중반', mbti: 'ENFP', intro: 'MBTI는 기분따라 바뀝니다 ㅎㅎ', mood: '신남', tension: '상' },
  { id: 'm4', nick: '태웅', age: '20대 후반', mbti: 'ISTP', intro: '조용히 술 좋아하는 편이에요', mood: '차분', tension: '중' },
  { id: 'm5', nick: '준영', age: '20대 중반', mbti: 'ENTP', intro: '재밌는 얘기 환영합니다', mood: '기대', tension: '상' },
];

const WOMEN = [
  { id: 'w1', nick: '수진', age: '20대 초반', mbti: 'INFJ', intro: '고양이 두 마리 집사입니다 🐈', mood: '편안', tension: '중' },
  { id: 'w2', nick: '예린', age: '20대 중반', mbti: 'ENFJ', intro: '전주 토박이, 막걸리 사랑해요', mood: '설렘', tension: '상' },
  { id: 'w3', nick: '하은', age: '20대 초반', mbti: 'ISTP', intro: '운동 좋아하고 활동적인 편', mood: '활기', tension: '상' },
  { id: 'w4', nick: '민지', age: '20대 중반', mbti: 'ESFP', intro: '노래방 가는 거 좋아함 🎤', mood: '신남', tension: '상' },
  { id: 'w5', nick: '서윤', age: '20대 후반', mbti: 'INTJ', intro: '조용한 분위기 선호해요', mood: '차분', tension: '하' },
];

const MBTI_LIST = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
const AGE_LIST = ['20대 초반', '20대 중반', '20대 후반', '30대 초반', '30대 중반'];
const MOOD_LIST = ['설렘', '신남', '편안', '차분', '긴장', '기대'];

// =============== screen components ===============

function WelcomeScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-between h-full px-6 py-10" style={{ background: `radial-gradient(ellipse at top, ${C.bgSoft} 0%, ${C.bg} 70%)` }}>
      <div className="w-full text-center pt-8">
        <div className="inline-block mb-4 px-3 py-1 rounded-full" style={{ border: `1px solid ${C.gold}`, color: C.goldSoft }}>
          <span className="text-xs tracking-widest">JEONJU · 혼술바</span>
        </div>
        <h1 className="text-5xl mb-2" style={{ color: C.cream, fontFamily: 'serif', letterSpacing: '0.05em' }}>올데이잭</h1>
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="h-px w-8" style={{ background: C.gold }}></div>
          <span className="text-xs tracking-[0.3em]" style={{ color: C.goldSoft }}>5 : 5 SOGAETING NIGHT</span>
          <div className="h-px w-8" style={{ background: C.gold }}></div>
        </div>
        <p className="text-sm mt-3" style={{ color: C.creamDeep }}>2026.05.10 SAT · 19:30</p>
      </div>

      <div className="w-full text-center my-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: C.bgSoft, border: `1px solid ${C.inkSoft}` }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.gold }}></div>
          <span className="text-xs" style={{ color: C.creamDeep }}>현재 <span style={{ color: C.cream, fontWeight: 600 }}>8명</span> 참여 중 · 2자리 남음</span>
        </div>

        <div className="mt-10 mb-6" style={{ color: C.creamDeep }}>
          <p className="text-sm mb-4 leading-relaxed">
            오늘 밤, 다섯 명의 인연을 만나보세요.<br/>
            한 잔 술과 함께하는 가장 솔직한 자기소개.
          </p>
        </div>
      </div>

      <div className="w-full">
        <button onClick={onStart} className="w-full py-4 rounded-2xl text-base font-medium transition active:scale-[0.98]" style={{ background: C.cream, color: C.ink }}>
          프로필 작성하고 입장하기
          <ChevronRight size={18} className="inline ml-1 -mt-0.5" />
        </button>
        <p className="text-center mt-3 text-xs" style={{ color: C.inkSoft }}>참여는 무료 · 익명 진행</p>
      </div>
    </div>
  );
}

function ProfileScreen({ onSubmit, onBack }) {
  const [nick, setNick] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [mbti, setMbti] = useState('');
  const [intro, setIntro] = useState('');
  const [mood, setMood] = useState('');
  const [tension, setTension] = useState('');

  const ready = nick && age && gender && mbti && intro && mood && tension;

  const handleSubmit = () => {
    if (!ready) return;
    onSubmit({ id: 'me', nick, age, gender, mbti, intro, mood, tension });
  };

  const Chip = ({ label, active, onClick }) => (
    <button onClick={onClick} className="px-3 py-1.5 rounded-full text-xs transition" style={{
      background: active ? C.ink : 'transparent',
      color: active ? C.cream : C.ink,
      border: `1px solid ${active ? C.ink : C.inkSoft}`,
    }}>{label}</button>
  );

  return (
    <div className="h-full flex flex-col" style={{ background: C.cream }}>
      <div className="flex items-center px-4 py-4" style={{ borderBottom: `1px solid ${C.creamDeep}` }}>
        <button onClick={onBack} style={{ color: C.ink }}><ArrowLeft size={20} /></button>
        <span className="ml-3 text-sm font-medium" style={{ color: C.ink }}>프로필 카드 작성</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        <div>
          <label className="block text-xs mb-2" style={{ color: C.inkSoft }}>닉네임</label>
          <input value={nick} onChange={e => setNick(e.target.value)} placeholder="오늘 불릴 이름" className="w-full px-3 py-2.5 rounded-lg text-sm bg-transparent" style={{ border: `1px solid ${C.creamDeep}`, color: C.ink }} />
        </div>

        <div>
          <label className="block text-xs mb-2" style={{ color: C.inkSoft }}>성별</label>
          <div className="flex gap-2">
            {['남자', '여자'].map(g => <Chip key={g} label={g} active={gender === g} onClick={() => setGender(g)} />)}
          </div>
        </div>

        <div>
          <label className="block text-xs mb-2" style={{ color: C.inkSoft }}>나이대</label>
          <div className="flex gap-2 flex-wrap">
            {AGE_LIST.map(a => <Chip key={a} label={a} active={age === a} onClick={() => setAge(a)} />)}
          </div>
        </div>

        <div>
          <label className="block text-xs mb-2" style={{ color: C.inkSoft }}>MBTI</label>
          <div className="grid grid-cols-4 gap-1.5">
            {MBTI_LIST.map(m => (
              <button key={m} onClick={() => setMbti(m)} className="py-2 rounded-md text-xs transition" style={{
                background: mbti === m ? C.ink : 'transparent',
                color: mbti === m ? C.cream : C.ink,
                border: `1px solid ${mbti === m ? C.ink : C.creamDeep}`,
              }}>{m}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs mb-2" style={{ color: C.inkSoft }}>한 줄 소개</label>
          <textarea value={intro} onChange={e => setIntro(e.target.value)} placeholder="가볍게 한 마디로 나를 소개해주세요" rows={2} className="w-full px-3 py-2.5 rounded-lg text-sm bg-transparent resize-none" style={{ border: `1px solid ${C.creamDeep}`, color: C.ink }} />
        </div>

        <div className="pt-2 pb-2" style={{ borderTop: `1px dashed ${C.creamDeep}` }}>
          <p className="text-[11px] tracking-widest mt-3 mb-3" style={{ color: C.inkSoft }}>✦ 즉각 질문</p>

          <label className="block text-xs mb-2" style={{ color: C.inkSoft }}>지금 기분, 한 단어로?</label>
          <div className="flex gap-2 flex-wrap mb-4">
            {MOOD_LIST.map(m => <Chip key={m} label={m} active={mood === m} onClick={() => setMood(m)} />)}
          </div>

          <label className="block text-xs mb-2" style={{ color: C.inkSoft }}>오늘의 텐션</label>
          <div className="flex gap-2">
            {['상', '중', '하'].map(t => <Chip key={t} label={t} active={tension === t} onClick={() => setTension(t)} />)}
          </div>
        </div>
      </div>

      <div className="px-5 py-4" style={{ borderTop: `1px solid ${C.creamDeep}` }}>
        <button onClick={handleSubmit} disabled={!ready} className="w-full py-3.5 rounded-xl text-sm font-medium transition" style={{
          background: ready ? C.ink : C.creamDeep,
          color: ready ? C.cream : C.inkSoft,
        }}>
          {ready ? '입장하기' : '모든 항목을 채워주세요'}
        </button>
      </div>
    </div>
  );
}

function LobbyScreen({ me, onStartVote }) {
  const others = me.gender === '남자' ? WOMEN : MEN;
  const sameGender = me.gender === '남자' ? MEN : WOMEN;
  const [tab, setTab] = useState('opposite');
  const [selected, setSelected] = useState(null);

  const list = tab === 'opposite' ? others : [me, ...sameGender.slice(0, 4)];

  return (
    <div className="h-full flex flex-col" style={{ background: C.bg }}>
      <div className="px-5 pt-6 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl" style={{ color: C.cream, fontFamily: 'serif' }}>참가자</h2>
          <div className="flex items-center gap-1 text-xs" style={{ color: C.goldSoft }}>
            <Users size={12} /> 10/10
          </div>
        </div>

        <div className="flex gap-1 p-1 rounded-lg" style={{ background: C.bgSoft }}>
          <button onClick={() => setTab('opposite')} className="flex-1 py-2 rounded-md text-xs transition" style={{
            background: tab === 'opposite' ? C.cream : 'transparent',
            color: tab === 'opposite' ? C.ink : C.creamDeep,
          }}>{me.gender === '남자' ? '여자' : '남자'} 5명</button>
          <button onClick={() => setTab('same')} className="flex-1 py-2 rounded-md text-xs transition" style={{
            background: tab === 'same' ? C.cream : 'transparent',
            color: tab === 'same' ? C.ink : C.creamDeep,
          }}>{me.gender === '남자' ? '남자' : '여자'} 5명</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3">
        {list.map(p => (
          <button key={p.id} onClick={() => setSelected(p)} className="w-full text-left p-4 rounded-xl transition active:scale-[0.99]" style={{
            background: C.cream,
            border: p.id === 'me' ? `2px solid ${C.gold}` : 'none',
          }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium" style={{ color: C.ink }}>{p.nick}</span>
                  {p.id === 'me' && <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: C.gold, color: C.cream }}>나</span>}
                </div>
                <span className="text-xs" style={{ color: C.inkSoft }}>{p.age}</span>
              </div>
              <span className="text-xs px-2 py-1 rounded-md" style={{ background: C.ink, color: C.cream }}>{p.mbti}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.ink }}>{p.intro}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: C.creamDeep, color: C.ink }}>기분 · {p.mood}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: C.creamDeep, color: C.ink }}>텐션 · {p.tension}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="px-5 py-4" style={{ borderTop: `1px solid ${C.bgSoft}` }}>
        <button onClick={onStartVote} className="w-full py-3.5 rounded-xl text-sm font-medium" style={{ background: C.rose, color: C.cream }}>
          <Heart size={14} className="inline mr-2 -mt-0.5" />최종 선택 하러 가기
        </button>
        <p className="text-center text-[11px] mt-2" style={{ color: C.inkSoft }}>모든 라운드가 끝나면 활성화돼요 · 데모에선 바로 진행 가능</p>
      </div>

      {selected && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setSelected(null)}>
          <div className="w-full p-6 rounded-t-3xl" style={{ background: C.cream }} onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: C.creamDeep }}></div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-medium" style={{ color: C.ink }}>{selected.nick}</h3>
                <span className="text-sm" style={{ color: C.inkSoft }}>{selected.age}</span>
              </div>
              <span className="text-sm px-3 py-1.5 rounded-md" style={{ background: C.ink, color: C.cream }}>{selected.mbti}</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: C.ink }}>{selected.intro}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg" style={{ background: C.creamDeep }}>
                <div style={{ color: C.inkSoft }}>지금 기분</div>
                <div style={{ color: C.ink, marginTop: 4, fontWeight: 500 }}>{selected.mood}</div>
              </div>
              <div className="p-3 rounded-lg" style={{ background: C.creamDeep }}>
                <div style={{ color: C.inkSoft }}>오늘 텐션</div>
                <div style={{ color: C.ink, marginTop: 4, fontWeight: 500 }}>{selected.tension}</div>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="w-full mt-4 py-3 rounded-xl text-sm" style={{ background: C.ink, color: C.cream }}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

function VotingScreen({ me, onSubmit }) {
  const candidates = me.gender === '남자' ? WOMEN : MEN;
  const [picks, setPicks] = useState([]);

  const togglePick = (id) => {
    if (picks.includes(id)) {
      setPicks(picks.filter(p => p !== id));
    } else if (picks.length < 3) {
      setPicks([...picks, id]);
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ background: C.bg }}>
      <div className="px-5 pt-8 pb-5 text-center">
        <Heart size={28} style={{ color: C.rose }} className="mx-auto mb-3" />
        <h2 className="text-2xl mb-1" style={{ color: C.cream, fontFamily: 'serif' }}>최종 선택</h2>
        <p className="text-xs leading-relaxed" style={{ color: C.creamDeep }}>
          마음에 드는 분을 1지망부터 3지망까지 선택해주세요<br/>
          <span style={{ color: C.goldSoft }}>· 결과는 서로 선택했을 때만 공개됩니다 ·</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-2.5">
        {candidates.map(p => {
          const rank = picks.indexOf(p.id);
          const picked = rank !== -1;
          return (
            <button key={p.id} onClick={() => togglePick(p.id)} className="w-full text-left p-4 rounded-xl transition active:scale-[0.99] flex items-center gap-3" style={{
              background: picked ? C.cream : C.bgSoft,
              border: picked ? `2px solid ${C.rose}` : `1px solid ${C.bgSoft}`,
            }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0" style={{
                background: picked ? C.rose : C.bg,
                color: picked ? C.cream : C.inkSoft,
                border: picked ? 'none' : `1px solid ${C.inkSoft}`,
              }}>
                {picked ? rank + 1 : ''}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium" style={{ color: picked ? C.ink : C.cream }}>{p.nick}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: picked ? C.ink : C.bg, color: picked ? C.cream : C.creamDeep }}>{p.mbti}</span>
                </div>
                <p className="text-xs truncate" style={{ color: picked ? C.inkSoft : C.creamDeep }}>{p.intro}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-5 py-4" style={{ borderTop: `1px solid ${C.bgSoft}` }}>
        <button onClick={() => onSubmit(picks)} disabled={picks.length === 0} className="w-full py-3.5 rounded-xl text-sm font-medium" style={{
          background: picks.length > 0 ? C.rose : C.bgSoft,
          color: picks.length > 0 ? C.cream : C.inkSoft,
        }}>
          {picks.length > 0 ? `선택 완료 (${picks.length}명)` : '최소 1명을 선택해주세요'}
        </button>
      </div>
    </div>
  );
}

function WaitingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setTimeout(onComplete, 300); return 100; }
        return p + 4;
      });
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center px-8" style={{ background: C.bg }}>
      <Sparkles size={32} style={{ color: C.gold }} className="animate-pulse mb-6" />
      <h2 className="text-xl mb-3 text-center" style={{ color: C.cream, fontFamily: 'serif' }}>
        다른 분들의 선택을<br/>기다리는 중이에요
      </h2>
      <p className="text-xs text-center mb-8" style={{ color: C.creamDeep }}>잠시만 한 모금 더 어떠세요? 🥃</p>
      <div className="w-full max-w-xs h-1 rounded-full" style={{ background: C.bgSoft }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: C.gold }}></div>
      </div>
      <p className="text-[10px] mt-3" style={{ color: C.inkSoft }}>{progress}%</p>
    </div>
  );
}

function ResultScreen({ me, onRestart }) {
  const matched = me.gender === '남자' ? WOMEN[1] : MEN[2]; // mock match: 예린 / 민재

  return (
    <div className="h-full flex flex-col" style={{ background: `radial-gradient(ellipse at center, ${C.bgSoft} 0%, ${C.bg} 80%)` }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 px-3 py-1 rounded-full" style={{ border: `1px solid ${C.gold}`, color: C.goldSoft }}>
          <span className="text-[10px] tracking-[0.3em]">MATCH RESULT</span>
        </div>
        <h1 className="text-3xl mb-2" style={{ color: C.cream, fontFamily: 'serif' }}>
          축하해요!
        </h1>
        <p className="text-sm mb-8" style={{ color: C.creamDeep }}>
          서로를 선택했어요 ✨
        </p>

        <div className="w-full max-w-xs p-6 rounded-2xl mb-6" style={{ background: C.cream, boxShadow: `0 20px 60px rgba(213, 74, 63, 0.3)` }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-medium mx-auto mb-1" style={{ background: C.ink, color: C.cream }}>
                {me.nick.charAt(0)}
              </div>
              <span className="text-xs" style={{ color: C.ink }}>{me.nick}</span>
            </div>
            <Heart size={20} style={{ color: C.rose }} className="animate-pulse" />
            <div className="text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-medium mx-auto mb-1" style={{ background: C.rose, color: C.cream }}>
                {matched.nick.charAt(0)}
              </div>
              <span className="text-xs" style={{ color: C.ink }}>{matched.nick}</span>
            </div>
          </div>

          <div className="pt-4" style={{ borderTop: `1px dashed ${C.creamDeep}` }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-base font-medium" style={{ color: C.ink }}>{matched.nick}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: C.ink, color: C.cream }}>{matched.mbti}</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: C.inkSoft }}>{matched.intro}</p>
          </div>
        </div>

        <div className="px-4 py-3 rounded-lg max-w-xs" style={{ background: C.bgSoft }}>
          <p className="text-xs leading-relaxed" style={{ color: C.creamDeep }}>
            잠시 후 사장님이<br/>
            <span style={{ color: C.gold }}>같은 자리로 안내해드릴 거예요</span><br/>
            천천히 한 잔 더 하세요 🥂
          </p>
        </div>
      </div>

      <div className="px-5 py-4">
        <button onClick={onRestart} className="w-full py-3 rounded-xl text-xs" style={{ background: C.bgSoft, color: C.creamDeep, border: `1px solid ${C.inkSoft}` }}>
          처음부터 다시 보기 (데모)
        </button>
      </div>
    </div>
  );
}

// =============== main ===============

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [me, setMe] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 500);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const restart = () => { setScreen('welcome'); setMe(null); };

  // On mobile: full-screen app feel. On desktop: phone frame for demo.
  const containerStyle = isMobile
    ? { width: '100%', height: '100vh', background: C.bg }
    : {
        width: 'min(100%, 390px)',
        height: 'min(844px, 90vh)',
        borderRadius: 32,
        overflow: 'hidden',
        boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 8px #1a1a1a, 0 0 0 9px #2a2a2a`,
      };

  return (
    <div className={isMobile ? '' : 'w-full min-h-screen flex items-center justify-center py-6'} style={!isMobile ? { background: '#0a0604' } : { background: C.bg }}>
      <div className="relative overflow-hidden" style={containerStyle}>
        {screen === 'welcome' && <WelcomeScreen onStart={() => setScreen('profile')} />}
        {screen === 'profile' && <ProfileScreen onSubmit={(p) => { setMe(p); setScreen('lobby'); }} onBack={() => setScreen('welcome')} />}
        {screen === 'lobby' && me && <LobbyScreen me={me} onStartVote={() => setScreen('voting')} />}
        {screen === 'voting' && me && <VotingScreen me={me} onSubmit={() => setScreen('waiting')} />}
        {screen === 'waiting' && <WaitingScreen onComplete={() => setScreen('result')} />}
        {screen === 'result' && me && <ResultScreen me={me} onRestart={restart} />}
      </div>
    </div>
  );
}
