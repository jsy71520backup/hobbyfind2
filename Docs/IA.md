# Information Architecture (IA)

## HobbyFind 웹서비스

---

## 1. 전체 사이트맵 구조 (Site Map)

```
/
├─ / (Home)
│  ├─ Hero Section
│  ├─ Category Filter (운동형 / 지능형 / 예술형)
│  └─ Hobby Card Grid
│
├─ /category
│  ├─ /category/sports        (운동형)
│  ├─ /category/intelligence  (지능형)
│  └─ /category/art           (예술형)
│
├─ /login     (로그인)
├─ /signup    (회원가입)
└─ /mypage    (마이페이지, 로그인 필요)
   ├─ 북마크 목록
   └─ 북마크 통계
```

---

## 2. 사용자 흐름 (User Flow)

### 2-1. 비회원 사용자 플로우

```
홈 접속
 → 취미 카드 탐색
 → 카테고리 필터 선택
 → 카테고리별 페이지 이동
 → (북마크 시도)
 → 로그인 페이지로 이동 유도
```

**특징**

* 탐색 기능은 제한 없이 가능
* 북마크 및 마이페이지 접근 시 로그인 필요

---

### 2-2. 회원 사용자 플로우

```
홈 접속 (로그인 상태)
 → 취미 탐색
 → 취미 북마크 토글
 → 마이페이지 이동
 → 북마크 목록 / 통계 확인
 → 로그아웃
```

---

## 3. 내비게이션 구조 (Navigation Structure)

### Top Bar 공통 구조

| 상태   | 노출 요소                       |
| ---- | --------------------------- |
| 비로그인 | 로고 / 카테고리 메뉴 / 로그인 / 회원가입   |
| 로그인  | 로고 / 카테고리 메뉴 / 마이페이지 / 로그아웃 |

### 동작 규칙

* 로고 클릭 → 홈(/) 이동
* 카테고리 메뉴 클릭 → 해당 카테고리 페이지 이동
* 로그인/회원가입 → 인증 페이지 이동
* 로그아웃 → 세션 종료 후 홈으로 이동

---

## 4. 페이지 계층 구조 (Page Hierarchy)

### 4-1. 홈 (/)

```
Home
├─ Top Bar
├─ Hero Section
└─ Main Content
   ├─ Category Filter Toggle
   └─ Hobby Card Grid
```

---

### 4-2. 카테고리별 페이지 (/category/[type])

```
Category Page
├─ Top Bar
├─ Category Header
│  ├─ Category Title
│  └─ Category Description
└─ Hobby Card Grid
```

---

### 4-3. 로그인 (/login)

```
Login Page
├─ Login Form
│  ├─ ID Input
│  ├─ Password Input
│  └─ Submit Button
├─ Error Message Area
└─ Signup Link
```

---

### 4-4. 회원가입 (/signup)

```
Signup Page
├─ Signup Form
│  ├─ ID Input
│  ├─ Password Input
│  ├─ Terms Agreement
│  └─ Submit Button
└─ Login Link
```

---

### 4-5. 마이페이지 (/mypage)

```
My Page
├─ Bookmark Summary
│  ├─ Total Count
│  └─ Category Distribution Chart
└─ Bookmark Hobby List
```

---

## 5. 페이지별 주요 콘텐츠 구성 (Content Organization)

| 페이지   | 주요 콘텐츠                     |
| ----- | -------------------------- |
| 홈     | Hero 문구, 카테고리 필터, 전체 취미 카드 |
| 카테고리  | 카테고리 설명, 해당 취미 카드          |
| 로그인   | 로그인 폼, 에러 메시지              |
| 회원가입  | 회원가입 폼, 약관 동의              |
| 마이페이지 | 북마크 리스트, 통계 차트             |

---

## 6. 상호작용 패턴 (Interaction Patterns)

### 6-1. 카테고리 필터

* 토글 방식
* 선택 시 해당 카테고리 취미만 카드 그리드에 표시

### 6-2. 북마크 토글

| 상태   | 동작               |
| ---- | ---------------- |
| 비로그인 | 클릭 시 로그인 페이지로 이동 |
| 로그인  | 북마크 추가/해제 즉시 반영  |

### 6-3. 로그인 에러

* 잘못된 아이디/비밀번호 입력 시 인라인 에러 메시지 표시

### 6-4. 마이페이지 접근

* 비로그인 접근 시 → /login 리다이렉트

---

## 7. URL 구조 (URL Structure)

| URL                    | 설명    |
| ---------------------- | ----- |
| /                      | 홈     |
| /login                 | 로그인   |
| /signup                | 회원가입  |
| /mypage                | 마이페이지 |
| /category/sports       | 운동형   |
| /category/intelligence | 지능형   |
| /category/art          | 예술형   |

---

## 8. 컴포넌트 계층 구조 (Component Hierarchy)

```
App
├─ TopBar
│  ├─ Logo
│  ├─ CategoryMenu
│  └─ AuthMenu
│
├─ HeroSection (Home only)
├─ CategoryHeader (Category Page only)
├─ HobbyCardGrid
│  └─ HobbyCard
│     ├─ HobbyTitle
│     └─ BookmarkButton
│
├─ LoginForm / SignupForm
└─ MyPage
   ├─ StatsChart
   └─ BookmarkList
```

---

## 9. 상단바 / 하단바 구성

### 상단바 (필수)

* 로고
* 카테고리 메뉴
* 인증 관련 버튼 (로그인/회원가입 또는 마이페이지/로그아웃)

### 하단바 (선택)

* 기본 정보 링크 (예: 서비스 소개)
* 단, 기능 추가는 하지 않음

---

## 10. 기술 스택 고려 사항 (Next.js 기준)

* App Router 또는 Pages Router 기반 라우팅
* `/category/[type]` 다이내믹 라우트 사용
* 인증 상태에 따른 조건부 렌더링 (Top Bar, 북마크 버튼)
* 마이페이지는 인증 가드 적용

---

## 11. 취미 데이터 구조 (고정)

### 운동형 (sports)

* 조깅/러닝
* 요가
* 수영
* 자전거
* 클라이밍
* 댄스

### 지능형 (intelligence)

* 독서
* 퍼즐
* 체스
* 프로그래밍
* 외국어 학습
* 사진 촬영

### 예술형 (art)

* 그림 그리기
* 악기 연주
* 요리
* 서예
* 도자기 만들기
* 정원 가꾸기

※ 본 데이터는 변경·확장 불가.

---
