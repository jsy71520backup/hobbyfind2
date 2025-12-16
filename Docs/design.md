# Web Service Design Guide

## HobbyFind — Airbnb Design Style Reference

---

## 1. 디자인 시스템 개요 (Design System Overview)

### 1-1. 브랜드 아이덴티티

| 항목       | 정의                          |
| -------- | --------------------------- |
| 브랜드 키워드  | 친근한, 탐색하기 쉬운, 여백 있는, 신뢰감 있는 |
| 디자인 레퍼런스 | Airbnb Design System        |
| 핵심 방향    | 정보 밀도를 낮추고 카드 중심 탐색 경험 제공   |

HobbyFind는 **Airbnb처럼 “고르기 쉬운 경험”**을 목표로 한다. 시각적 과잉을 피하고, 넉넉한 여백·부드러운 인터랙션·카드 중심 레이아웃을 통해 취미 탐색 자체에 집중하도록 설계한다.

---

### 1-2. 톤 앤 매너 (Tone & Manner)

* 둥근 모서리(radius)와 부드러운 그림자 사용
* 강한 대비보다는 **밝은 배경 + 또렷한 콘텐츠 카드** 구조
* 텍스트는 짧고 직관적으로
* 인터랙션은 과하지 않게, **미세한 움직임(micro-interaction)** 위주

---

### 1-3. UI 키 비주얼 가이드

| 요소    | 가이드                     |
| ----- | ----------------------- |
| 카드    | 둥근 모서리 + 얕은 그림자         |
| 버튼    | Pill 형태 또는 Soft Rounded |
| 레이아웃  | Max-width 기반 중앙 정렬      |
| 애니메이션 | hover / transition 중심   |

---

## 2. TailwindCSS 색상 팔레트 (Color Palette)

> Airbnb의 Neutral + Accent 구조를 참고하되, HobbyFind에 맞게 단순화

### 2-1. 브랜드 컬러

| 용도            | 색상      | Tailwind 예시                    |
| ------------- | ------- | ------------------------------ |
| Primary       | #FF5A5F | `text-rose-500`, `bg-rose-500` |
| Primary Hover | #E0484D | `hover:bg-rose-600`            |

---

### 2-2. 서브 / 뉴트럴 컬러

| 용도             | 색상      | Tailwind 예시       |
| -------------- | ------- | ----------------- |
| Background     | #FFFFFF | `bg-white`        |
| Section BG     | #F7F7F7 | `bg-gray-100`     |
| Border         | #E5E7EB | `border-gray-200` |
| Text Primary   | #222222 | `text-gray-900`   |
| Text Secondary | #717171 | `text-gray-500`   |

---

### 2-3. 상태 색상

| 상태       | 색상      | 사용 예       |
| -------- | ------- | ---------- |
| Active   | Primary | 선택된 필터     |
| Disabled | Gray    | 비활성 버튼     |
| Error    | Red     | 로그인 에러 메시지 |

---

## 3. 페이지 구현 가이드 (Page Implementations)

### 3-1. 루트페이지 (/)

**레이아웃 구조**

```
Header
Hero Section
Category Filter
Hobby Card Grid
```

**Hero 섹션 가이드**

* 짧은 한 문장 소개
* 좌측 정렬, 과도한 비주얼 배제

```html
<h1 class="text-3xl md:text-4xl font-semibold text-gray-900">
  나에게 맞는 취미를 찾아보세요
</h1>
```

---

### 3-2. 카테고리별 페이지 (/category/[type])

* Hero 없이 **카테고리 헤더 + 카드 그리드**만 구성
* 홈과 동일한 카드 스타일 재사용

```html
<h2 class="text-2xl font-semibold mb-2">운동형 취미</h2>
<p class="text-gray-500 mb-6">몸을 움직이며 즐길 수 있는 취미들</p>
```

---

### 3-3. 로그인 / 회원가입 페이지

* 중앙 정렬 카드 레이아웃
* 최대 너비 제한 (`max-w-md`)

```html
<div class="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm">
```

---

### 3-4. 마이페이지 (/mypage)

* 상단: 요약 정보 + 통계 차트
* 하단: 북마크 카드 리스트

---

## 4. 레이아웃 컴포넌트 (Layout Components)

### 4-1. Top Bar (Header)

| 요소 | 가이드          |
| -- | ------------ |
| 높이 | 64px         |
| 배경 | White        |
| 위치 | Sticky (top) |

```html
<header class="sticky top-0 bg-white border-b border-gray-200">
```

---

### 4-2. 그리드 레이아웃

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

### 4-3. 취미 카드 컴포넌트

| 요소      | 가이드                         |
| ------- | --------------------------- |
| Radius  | rounded-xl                  |
| Shadow  | shadow-sm / hover:shadow-md |
| Padding | p-4                         |

```html
<div class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
```

---

## 5. 상호작용 패턴 (Interaction Patterns)

### 5-1. 버튼

* Primary 버튼만 컬러 강조
* 나머지는 텍스트 또는 Outline

```html
<button class="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition">
```

---

### 5-2. 카드 Hover

* 살짝 떠오르는 느낌
* 이동보다는 shadow 변화 위주

---

### 5-3. 페이지 전환

* Next.js 기본 전환
* 추가 애니메이션 사용하지 않음

---

## 6. 반응형 브레이크포인트 (Breakpoints)

| Breakpoint | 기준      | UI 가이드   |
| ---------- | ------- | -------- |
| sm         | ≥640px  | 2열 카드    |
| md         | ≥768px  | 여백 확대    |
| lg         | ≥1024px | 3열 카드    |
| xl         | ≥1280px | 콘텐츠 폭 제한 |
| 2xl        | ≥1536px | 중앙 정렬 유지 |

---

## 7. 반응형 UX 원칙

* 모바일: 한 열 카드 + 터치 친화적 버튼
* 태블릿: 2열 그리드 중심
* 데스크톱: 여백 강조, 콘텐츠 집중
