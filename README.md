# 올데이잭 5:5 소개팅 프로토타입

전주 혼술바 5:5 소개팅 이벤트용 모바일 프로토타입.

## 🚀 배포 방법 (가장 쉬운 순서)

### 방법 1: Vercel + GitHub (브라우저만으로 가능, 추천 ⭐)

소요 시간 약 10분, Node.js 설치 필요 없음.

1. **GitHub 계정 만들기** (이미 있으면 스킵) — https://github.com 에서 가입
2. **새 저장소(Repository) 생성**
   - GitHub 우측 상단 + 버튼 → New repository
   - 이름: `sogaeting-prototype` (아무거나)
   - Public 선택 → Create repository
3. **이 폴더 안의 파일들 업로드**
   - 만들어진 빈 저장소 페이지에서 "uploading an existing file" 링크 클릭
   - 이 zip을 풀어서 나온 파일들을 **모두** 드래그 (단, `node_modules` 폴더는 없을 거임 - 정상)
   - "Commit changes" 클릭
4. **Vercel 가입 + 배포**
   - https://vercel.com 가서 GitHub로 로그인 (Sign Up with GitHub)
   - "Add New..." → "Project" 클릭
   - 방금 만든 저장소 옆 "Import" 클릭
   - 설정은 그대로 두고 "Deploy" 클릭
   - 1~2분 기다리면 → `https://대충뭐뭐.vercel.app` 형태의 URL 생성 완료

### 방법 2: Vercel CLI (터미널 사용 가능하면)

소요 시간 약 3분, Node.js 필요.

```bash
npm install -g vercel
cd 이폴더
vercel
```

질문 몇 개 답하면 (대부분 엔터) URL 나옴.

### 방법 3: Netlify Drop (가장 빠름, 가입도 거의 필요없음)

이 경우 **`dist` 폴더 zip**을 사용:
1. https://app.netlify.com/drop 접속
2. dist 폴더 안의 내용물을 통째로 드래그
3. 끝. URL 나옴.

단점: Netlify는 매번 새 URL이 나오고 영구 보관하려면 가입해야 함.

---

## 로컬에서 미리 보고 싶으면

```bash
npm install
npm run dev
```

http://localhost:5173 에서 확인.

## 기술 스택

- React 18 + Vite
- Tailwind CSS
- lucide-react (아이콘)
