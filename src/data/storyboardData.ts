export interface StoryboardSection {
  id: number;
  timeRange: string;
  durationSeconds: number;
  title: string;
  koreanDirection: string;
  aiPromptEnglish: string;
  koreanScript: string;
  category: '오프닝' | '개념' | '수당' | '정착금' | '종합지원' | '건강상담' | '문의' | '플랫폼' | '엔딩';
  tags: string[];
  keyHighlights: string[];
  cameraDetails: {
    shotType: string;
    cameraMovement: string;
    lighting: string;
    mood: string;
  };
  sampleImage: string; // Curated high quality visual representing the scene
}

export const STORYBOARD_SECTIONS: StoryboardSection[] = [
  {
    id: 1,
    timeRange: '00:00–00:35',
    durationSeconds: 35,
    title: '오프닝',
    koreanDirection: '따뜻하고 안정감을 주는 상담센터 복도, 친근하게 다가오는 상담사의 모습',
    aiPromptEnglish:
      'Cinematic steadycam shot moving slowly down a warm, sunlit counseling center hallway. Clean wooden bookshelves filled with neatly organized welfare and housing data files. A friendly, professional counselor walks slowly toward the camera, smiling warmly. Natural golden hour lighting, soft focus, high production value, 4k.',
    koreanScript:
      '안녕하세요, 새로운 시작을 준비하는 여러분. 세상에 첫발을 내딛는 순간이 낯설고 두렵게 느껴질 수 있습니다. 하지만 여러분은 혼자가 아닙니다. 지금부터 여러분의 든든한 울타리가 되어줄 자립지원 혜택들을 하나씩 안내해 드리겠습니다.',
    category: '오프닝',
    tags: ['따뜻한 오프닝', '상담센터 복도', '신뢰와 공감', '골든아워'],
    keyHighlights: [
      '안정감과 환영의 감정을 전달하는 인트로',
      '자연스러운 햇살과 원목 인테리어의 따스한 톤앤매너',
      '전문적이면서도 다정한 상담사의 첫인상'
    ],
    cameraDetails: {
      shotType: 'Steadicam tracking medium shot',
      cameraMovement: 'Slow forward dolly tracking along hallway',
      lighting: 'Golden hour natural sunlight with soft fill',
      mood: 'Welcoming, serene, trustworthy, hopeful'
    },
    sampleImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    timeRange: '00:35–01:20',
    durationSeconds: 45,
    title: '자립준비청년이란?',
    koreanDirection: '상담사가 책장에서 자료를 꺼내며 차분하게 설명하는 장면',
    aiPromptEnglish:
      'Medium shot of a professional counselor in a cozy office, pulling a reference folder from a neat bookshelf. The counselor turns to face the camera and speaks calmly with an empathetic and reassuring expression. Warm indoor lighting, shallow depth of field, professional corporate video style.',
    koreanScript:
      '자립준비청년이란 아동양육시설, 공동생활가정, 가정위탁 등의 보호를 받다가 만 18세(본인 희망 시 최대 24세)가 되어 사회로 첫걸음을 내딛는 청년을 의미합니다. 사회에 안정적으로 정착할 수 있도록 정부와 지자체가 다양한 맞춤형 제도를 마련해 두고 있습니다.',
    category: '개념',
    tags: ['용어 정의', '만 18세~24세', '보호종료', '법적 보호체계'],
    keyHighlights: [
      '만 18세 보호종료 및 최대 만 24세 보호연장 제도 안내',
      '아동복지법에 근거한 공식 국가 지원 대상 확인',
      '책장 자료를 꺼내는 제스처를 통한 신뢰감 형성'
    ],
    cameraDetails: {
      shotType: 'Medium shot',
      cameraMovement: 'Gentle pan following counselor turn to camera',
      lighting: 'Warm ambient office lighting, 4500K color temp',
      mood: 'Calm, informative, empathetic, authoritative'
    },
    sampleImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    timeRange: '01:20–02:05',
    durationSeconds: 45,
    title: '자립수당',
    koreanDirection: '상담 테이블로 이동해 자립수당 자료를 펼치며 안내하는 장면',
    aiPromptEnglish:
      'Medium close-up shot as the counselor moves to a clean wooden consultation table, opening a document folder about financial support. The counselor looks engagingly at the camera, explaining clearly with polite and supportive gestures. Bright and neat interior office setting.',
    koreanScript:
      '가장 기본이 되는 현금 지원은 바로 \'자립수당\'입니다. 보호종료 후 5년(60개월) 동안 매월 50만 원씩 생활 안정을 위해 지급됩니다. 주민센터를 방문하거나 \'복지로\' 웹사이트에서 본인이 직접 간편하게 신청할 수 있습니다.',
    category: '수당',
    tags: ['월 50만원', '보호종료 5년', '매월 현금지급', '복지로 온라인신청'],
    keyHighlights: [
      '매월 50만 원 정기 현금 지급 (5년간 총 최대 3,000만원 지원)',
      '신청 자격: 보호종료 5년 이내 자립준비청년',
      '신청처: 관할 읍·면·동 주민센터 또는 복지로(bokjiro.go.kr)'
    ],
    cameraDetails: {
      shotType: 'Medium close-up shot',
      cameraMovement: 'Subtle tilt down to table document, then smooth tilt up',
      lighting: 'Soft diffused high-key keylight',
      mood: 'Clear, encouraging, pragmatic, comforting'
    },
    sampleImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    timeRange: '02:05–02:55',
    durationSeconds: 50,
    title: '자립정착금',
    koreanDirection: '지역별 차이가 있는 자립정착금 제도를 짚어주는 진지하고 신뢰감 있는 장면',
    aiPromptEnglish:
      'Close-up shot of the counselor holding an information sheet with regional data charts, pointing gently while explaining. Professional, trustworthy, and caring demeanor. Soft lighting, modern office background, clean composition.',
    koreanScript:
      '다음은 홀로서기의 초기 종잣돈이 되는 \'자립정착금\'입니다. 지자체별로 지원 금액에 차이가 있어 최소 1,000만 원에서 최대 2,000만 원까지 지급됩니다. 본인이 거주하는 지자체의 지급 기준과 일시/분할 지급 여부를 반드시 확인해보세요.',
    category: '정착금',
    tags: ['1,000만~2,000만원', '지자체별 상이', '초기 주거보증금/살림', '분할지급'],
    keyHighlights: [
      '서울/경기/대전 등 지자체별 1,500만~2,000만 원 지원',
      '주거 보증금, 필수 가전·가구 구입, 초기 생활 안정 자금 용도',
      '금융 사기 예방을 위한 단계별 분할 지급 지자체 증가 추세'
    ],
    cameraDetails: {
      shotType: 'Close-up shot',
      cameraMovement: 'Static stable frame with hand gestures in foreground',
      lighting: 'Contrasted soft side lighting highlighting info sheet',
      mood: 'Careful, advisory, protective, credible'
    },
    sampleImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    timeRange: '02:55–03:45',
    durationSeconds: 50,
    title: '주거·취업·교육·금융',
    koreanDirection: '네 가지 분야 자료를 순서대로 짚어주며 다양한 지원을 안내하는 장면',
    aiPromptEnglish:
      'Medium shot of the counselor standing near a multi-section shelf, gesturing toward different categorized folders for housing, employment, education, and finance. Dynamic yet calm movement, warm office atmosphere, professional presentation.',
    koreanScript:
      '생활의 4대 핵심 축인 주거, 취업, 교육, 금융 지원입니다. LH 청년 전세임대 무이자·저금리 지원, 국민취업지원제도 및 청년도약계좌, 그리고 대학 등록금 및 생활비 장학금까지 다방면의 연계 제도가 여러분을 뒷받침합니다.',
    category: '종합지원',
    tags: ['LH 청년전세', '국민취업지원제도', '디딤씨앗통장', '국가장학금'],
    keyHighlights: [
      '주거: LH 청년전세임대 1순위 우대 (최대 1.2억 한도, 연 1~2% 저리)',
      '취업: 국민취업지원제도 1유형 (구직수당 월 50만원 x 6개월)',
      '교육: 대학 진학 시 국가장학금 전액 및 생활비 장학금 연계',
      '금융: 디딤씨앗통장(CDA) 정부 1:2 매칭 적립금 만기 수령'
    ],
    cameraDetails: {
      shotType: 'Medium shot',
      cameraMovement: 'Lateral slider movement panning across 4 categorized sections',
      lighting: 'Even multi-point commercial studio fill',
      mood: 'Organized, multifaceted, empowering, uplifting'
    },
    sampleImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    timeRange: '03:45–04:30',
    durationSeconds: 45,
    title: '의료·심리상담',
    koreanDirection: '상담 테이블에 앉아 마음 건강과 심리상담 지원을 따뜻한 눈빛으로 전하는 장면',
    aiPromptEnglish:
      'Medium close-up shot of the counselor sitting across a consultation desk, leaning in slightly with an empathetic, warm, and caring expression. Soft natural light, comforting and safe environment, high emotional connection.',
    koreanScript:
      '몸과 마음의 건강은 자립에서 가장 소중한 밑거름입니다. 의료비 본인부담금 경감 혜택과 더불어, 청년 마음건강 바우처 및 1:1 심리상담 멘토링을 통해 지친 마음을 언제든 털어놓을 수 있습니다.',
    category: '건강상담',
    tags: ['마음건강 바우처', '의료비 경감', '1:1 심리케어', '정서적 지지망'],
    keyHighlights: [
      '청년마음건강지원사업: 전문 심리상담 3개월(10회) 바우처 지원',
      '의료급여 2종 자격 연장 및 건강보험 본인부담금 지원',
      '전담기관 1:1 맞춤형 사례관리사 배정 및 정기 모니터링'
    ],
    cameraDetails: {
      shotType: 'Intimate medium close-up',
      cameraMovement: 'Slow inward push-in to counselor eyes and sincere gesture',
      lighting: 'Warm gentle window backlight with warm frontal softbox',
      mood: 'Deep empathy, safety, healing, compassionate'
    },
    sampleImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 7,
    timeRange: '04:30–05:15',
    durationSeconds: 45,
    title: '어디에 문의해야 할까?',
    koreanDirection: '벽면의 안내판이나 핵심 기관 정보를 가리키며 명확하게 안내하는 장면',
    aiPromptEnglish:
      'Medium shot of the counselor standing up and gesturing toward an information board on the wall, explaining contact centers and local support offices with an encouraging nod. Bright, organized, and helpful atmosphere.',
    koreanScript:
      '혼자 고민하지 마세요. 전국 17개 시도에 위치한 \'자립지원전담기관\'의 전담 상담관이 여러분을 기다리고 있습니다. 보건복지상담센터 국번없이 129, 또는 자립지원 콜센터 1522-3865로 언제든 연락주세요.',
    category: '문의',
    tags: ['콜센터 1522-3865', '보건복지상담센터 129', '전국 17개 시도', '전담기관'],
    keyHighlights: [
      '자립지원 대표 콜센터: 1522-3865 (평일 09:00~18:00)',
      '보건복지상담센터: 국번없이 129 (24시간 복지 긴급 상담)',
      '전국 17개 시·도 자립지원전담기관 방문 및 1:1 상담 예약'
    ],
    cameraDetails: {
      shotType: 'Medium shot',
      cameraMovement: 'Slow camera pan right directing gaze to contact numbers',
      lighting: 'Crisp high-definition office lighting',
      mood: 'Direct, clear, accessible, dependable'
    },
    sampleImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 8,
    timeRange: '05:15–05:45',
    durationSeconds: 30,
    title: '자립정보ON',
    koreanDirection: '노트북을 열어 \'자립정보ON\' 플랫폼 화면을 보여주며 소개하는 장면',
    aiPromptEnglish:
      'Over-the-shoulder and medium shot of the counselor opening a laptop on a clean desk, displaying a digital portal interface on the screen. Professional workspace, soft modern lighting, clean tech-friendly vibe.',
    koreanScript:
      '스마트폰이나 PC로 \'자립정보ON(jaripon.ncrc.or.kr)\'에 접속해 보세요. 나에게 꼭 맞는 맞춤형 지원 정책을 한 번에 검색하고, 최신 주거 및 취업 공고를 손쉽게 확인할 수 있습니다.',
    category: '플랫폼',
    tags: ['jaripon.ncrc.or.kr', '맞춤 정책 검색', '온라인 자립지원', '실시간 공고'],
    keyHighlights: [
      '아동권리보장원 운영 공식 플랫폼: jaripon.ncrc.or.kr',
      '개인별 상황 기반 맞춤형 지원제도 큐레이션 및 알림',
      '선배 자립준비청년 수기 및 자립 커뮤니티 네트워킹'
    ],
    cameraDetails: {
      shotType: 'Over-the-shoulder turning to medium 2-shot angle',
      cameraMovement: 'Rack focus from laptop display to counselor speaking',
      lighting: 'Cool screen glow blended with warm interior room lamp',
      mood: 'Modern, connected, tech-savvy, accessible'
    },
    sampleImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 9,
    timeRange: '05:45–06:00',
    durationSeconds: 15,
    title: '엔딩',
    koreanDirection: '카메라를 정면으로 바라보며 위로와 용기의 메시지를 전하는 따뜻한 마무리',
    aiPromptEnglish:
      'Cinematic medium shot of the counselor looking directly into the camera with a warm, reassuring smile. Golden afternoon sunlight streaming through a window in the background, peaceful, hopeful, and comforting mood.',
    koreanScript:
      '당신의 홀로서기는 외로운 싸움이 아닙니다. 새로운 내일을 향해 당당하게 걸어갈 수 있도록 늘 곁에서 함께하겠습니다. 청년 여러분의 빛나는 자립을 진심으로 응원합니다.',
    category: '엔딩',
    tags: ['따뜻한 클로징', '위로와 용기', '곁에 있는 멘토', '골든아워 감동'],
    keyHighlights: [
      '진심 어린 응원과 감정적 위로를 전하는 마지막 클로징',
      '사회적 고립감 해소 및 심리적 안전기지 역할 확립',
      '따뜻한 석양 빛과 시선 맞춤으로 깊은 여운 부여'
    ],
    cameraDetails: {
      shotType: 'Cinematic medium shot',
      cameraMovement: 'Gentle slow floating push-in with slow motion feel',
      lighting: 'Golden afternoon sunlight flare through window',
      mood: 'Warm, emotional, deeply reassuring, inspiring'
    },
    sampleImage: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=1200&q=80'
  }
];

export interface RegionSettlementFund {
  region: string;
  amount: string;
  numericAmount: number; // in 만원
  disbursementType: string;
  notes: string;
}

export const REGIONAL_SETTLEMENT_FUNDS: RegionSettlementFund[] = [
  { region: '서울특별시', amount: '2,000만원', numericAmount: 2000, disbursementType: '일시 또는 5개년 분할', notes: '전국 최대 수준 지원 및 금융교육 이수 연계' },
  { region: '경기도', amount: '1,500만원', numericAmount: 1500, disbursementType: '1,000만원 일시 + 500만원 분할', notes: '자립두배통장 추가 참여 가능' },
  { region: '부산광역시', amount: '1,500만원', numericAmount: 1500, disbursementType: '일시 지급', notes: '부산청년 자립체험홈 연계' },
  { region: '인천광역시', amount: '1,500만원', numericAmount: 1500, disbursementType: '1차 1,000만원 + 2차 500만원', notes: '전담사례관리사 모니터링 후 지급' },
  { region: '대전광역시', amount: '1,500만원', numericAmount: 1500, disbursementType: '일시 지급', notes: '청년내일희망카드 연계' },
  { region: '대구광역시', amount: '1,200만원', numericAmount: 1200, disbursementType: '일시 지급', notes: '자립정착 멘토링 연계' },
  { region: '광주광역시', amount: '1,500만원', numericAmount: 1500, disbursementType: '분할 지급', notes: '빛고을자립정착금 우대' },
  { region: '울산광역시', amount: '1,200만원', numericAmount: 1200, disbursementType: '일시 지급', notes: '청년자립지원관 운영' },
  { region: '세종특별자치시', amount: '1,500만원', numericAmount: 1500, disbursementType: '일시 지급', notes: '맞춤형 임대주택 우선 추천' },
  { region: '충청남도/북도', amount: '1,200만원', numericAmount: 1200, disbursementType: '일시 지급', notes: '도내 취업 연계 장려금 추가' },
  { region: '전라남도/북도', amount: '1,200만원', numericAmount: 1200, disbursementType: '일시 지급', notes: '청년 농업/창업 정착 바우처' },
  { region: '경상남도/북도', amount: '1,200만원', numericAmount: 1200, disbursementType: '일시 지급', notes: '희망디딤돌센터 거주 우대' },
  { region: '강원특별자치도', amount: '1,200만원', numericAmount: 1200, disbursementType: '일시 지급', notes: '강원형 청년일자리 연계' },
  { region: '제주특별자치도', amount: '1,500만원', numericAmount: 1500, disbursementType: '일시 지급', notes: '항공/교통바우처 및 주거지원' },
];
