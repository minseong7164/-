export interface PolicyItem {
  id: string;
  title: string;
  subtitle: string;
  category: '금융·소득' | '주거' | '일자리·취업' | '교육·진로' | '의료·심리' | '긴급·생활';
  targetAudience: string;
  amountOrBenefit: string;
  summary: string;
  details: string[];
  eligibility: string[];
  howToApply: {
    channel: string;
    websiteUrl?: string;
    websiteName?: string;
    phone?: string;
    documents: string[];
  };
  tags: string[];
  isEssential: boolean; // 꼭 챙겨야 할 필수 혜택
}

export const POLICIES_DATABASE: PolicyItem[] = [
  // 1. 금융·소득
  {
    id: 'jarip-allowance',
    title: '자립수당',
    subtitle: '보호종료 후 5년간 매월 50만 원 정기 현금 지급',
    category: '금융·소득',
    targetAudience: '아동양육시설·공동생활가정·가정위탁 보호종료 5년 이내 청년',
    amountOrBenefit: '매월 50만 원 (5년간 총 최대 3,000만 원)',
    summary: '안정적인 사회 정착과 생활 안정을 위해 국가에서 매월 20일 청년 본인 명의 계좌로 직접 현금을 입금해 주는 가장 대표적인 기본 소득 지원제도입니다.',
    details: [
      '지급일: 매월 20일 (토/공휴일인 경우 그 전일 지급)',
      '지급 기간: 보호종료일이 속하는 달부터 5년(60개월) 동안',
      '다른 복지급여(생계급여, 기초생활보장) 수급 여부와 관계없이 신청 가능',
      '아르바이트나 근로소득이 발생해도 전액 그대로 지급 (소득 무관)'
    ],
    eligibility: [
      '만 18세 이후 만기 보호종료된 자립준비청년',
      '보호종료일로부터 5년이 지나지 않은 청년',
      '보호종료 이전 2년 이상 연속하여 보호를 받은 자'
    ],
    howToApply: {
      channel: '온라인(복지로) 또는 관할 읍·면·동 주민센터 방문',
      websiteUrl: 'https://www.bokjiro.go.kr',
      websiteName: '복지로(bokjiro.go.kr)',
      phone: '보건복지상담센터 129',
      documents: ['자립수당 지급 신청서', '신분증', '본인 명의 통장 사본', '보호종료확인서']
    },
    tags: ['월 50만원', '필수', '현금지원', '복지로', '소득제한없음'],
    isEssential: true
  },
  {
    id: 'settlement-fund',
    title: '자립정착금',
    subtitle: '사회 첫출발을 위한 1,000만~2,000만 원 초기 정착 종잣돈',
    category: '금융·소득',
    targetAudience: '보호종료 대상 자립준비청년',
    amountOrBenefit: '1,000만 원 ~ 2,000만 원 (지자체별 상이)',
    summary: '홀로서기를 시작할 때 주거 보증금 마련, 첫 살림살이(가전·가구) 구입, 필수 생활비로 사용할 수 있도록 거주 지자체에서 지급하는 일시금/분할금입니다.',
    details: [
      '지자체별 지급 기준: 서울(2,000만원), 경기/부산/인천/대전/광주(1,500만원), 충남/경남/전남/강원 등(1,200만원)',
      '지급 방식: 일시금 지급 또는 사기 예방을 위한 단계별 분할 지급(예: 1차 1,000만원 + 2차 500만원)',
      '지급 시 금융 교육 이수 의무가 연계될 수 있습니다.'
    ],
    eligibility: [
      '시설, 공동생활가정, 가정위탁 등에서 퇴소하는 청년',
      '퇴소 당시 주민등록상 거주 지자체 기준 적용'
    ],
    howToApply: {
      channel: '퇴소 전 소속 시설 또는 거주지 관할 시·군·구청 복지과',
      phone: '자립지원 콜센터 1522-3865',
      documents: ['자립정착금 신청서', '자립계획서', '통장 사본']
    },
    tags: ['목돈', '정착금', '지자체지원', '보증금마련', '필수'],
    isEssential: true
  },
  {
    id: 'didim-seed',
    title: '디딤씨앗통장 (CDA) 만기 적립금',
    subtitle: '정부 1:2 매칭 적립금 만 18세 이후 자립용도 사용',
    category: '금융·소득',
    targetAudience: '디딤씨앗통장 가입자 중 만 18세 도달자',
    amountOrBenefit: '본인 저축액 + 정부 매칭금(최대 월 10만원, 1:2 지원) 및 이자 전액',
    summary: '아동기 동안 적립된 본인 저축금에 정부가 1:2 비율로 매칭 적립해 준 자금을 만 18세 이후 주거비, 학자금, 기술훈련, 취업훈련 등의 자립 용도로 인출할 수 있습니다.',
    details: [
      '만 18세~24세까지는 자립 용도(학비, 주거, 취업) 증빙 후 사용 가능',
      '만 24세 이후에는 사용 용도 제한 없이 전액 자유 수령 가능',
      '목돈 관리를 위한 재무컨설팅 연계 지원'
    ],
    eligibility: ['디딤씨앗통장을 보유한 만 18세 이상 보호종료 청년'],
    howToApply: {
      channel: '관할 시·군·구청 아동복지과 또는 읍·면·동 주민센터 방문 승인 후 은행 수령',
      documents: ['지급신청서', '사용용도 증빙서류(임대차계약서, 등록금고지서 등)', '신분증']
    },
    tags: ['자산형성', '정부매칭', '만 18세이후', '목돈'],
    isEssential: false
  },

  // 2. 주거
  {
    id: 'lh-youth-lease',
    title: 'LH 청년 전세임대 (1순위 우대)',
    subtitle: '수도권 최대 1.2억 원 보증금 융자 (연 1~2% 저리)',
    category: '주거',
    targetAudience: '무주택 자립준비청년',
    amountOrBenefit: '단독 거주 기준 수도권 최대 1.2억 원 지원 (보증금 100~200만 원)',
    summary: '청년이 직접 살고 싶은 주택(빌라, 원룸, 오피스텔 등)을 찾으면, LH가 주택 소유자와 전세계약을 맺고 청년에게 재임대하는 안전한 주거복지 제도입니다.',
    details: [
      '지원한도액: 수도권 1억 2,000만원, 광역시 9,000만원, 기타 8,500만원',
      '임대료 부담: LH 지원금에서 입주자 보증금을 뺀 금액에 대해 연 1~2% 수준의 저렴한 이자만 월 납부',
      '자립준비청년은 만 20세까지 월 임대료 전액 면제 혜택 제공 지자체 다수'
    ],
    eligibility: [
      '아동복지시설(가정위탁 포함) 보호종료 청년',
      '무주택자'
    ],
    howToApply: {
      channel: 'LH 청약플러스 온라인 수시 청약 신청',
      websiteUrl: 'https://apply.lh.or.kr',
      websiteName: 'LH 청약플러스(apply.lh.or.kr)',
      phone: 'LH 콜센터 1600-1004',
      documents: ['보호종료확인서', '주민등록등본', '가족관계증명서']
    },
    tags: ['주거1순위', 'LH전세임대', '보증금지원', '월세절감', '필수'],
    isEssential: true
  },
  {
    id: 'housing-rent-subsidy',
    title: '청년월세 한시 특별지원',
    subtitle: '실제 납부하는 월세 중 매월 최대 20만 원(총 240만 원) 지원',
    category: '주거',
    targetAudience: '만 19~34세 독립 거주 무주택 청년',
    amountOrBenefit: '월 최대 20만 원 x 12개월 (총 최대 240만 원)',
    summary: '월세 부담으로 생활고를 겪는 독립 청년들을 위해 매달 실제 지출한 월세 중 최대 20만 원을 1년간 현금으로 지원합니다.',
    details: [
      '보증금 5,000만 원 이하 및 월세 70만 원 이하 주택 대상',
      '부모와 별도 거주하는 자립준비청년은 본인 소득·재산만 단독 심사 우대'
    ],
    eligibility: ['만 19~34세, 무주택 청년, 기준중위소득 60% 이하'],
    howToApply: {
      channel: '복지로 온라인 신청 또는 거주지 읍·면·동 행정복지센터',
      websiteUrl: 'https://www.bokjiro.go.kr',
      websiteName: '복지로',
      documents: ['임대차계약서', '월세이체확인서', '통장사본']
    },
    tags: ['월세지원', '월20만원', '주거비절감'],
    isEssential: false
  },
  {
    id: 'hope-stepping-stone',
    title: '희망디딤돌 자립체험홈 & 입주지원',
    subtitle: '최대 2년간 1인 1실 무료 거주 및 1:1 맞춤형 자립 훈련',
    category: '주거',
    targetAudience: '보호종료 예정자 및 보호종료 5년 이내 청년',
    amountOrBenefit: '1인 1실 주거 공간 무상 제공 + 생활 가전·가구 완비',
    summary: '삼성과 사회복지공동모금회, 지자체가 협력하여 운영하는 전국 거점 센터로, 독립 전 혼자 사는 연습(자립체험)을 하거나 최대 2년간 안전하게 거주할 수 있는 독립 주거 공간입니다.',
    details: [
      '자립체험실(수일~수주일 단기 체험) 및 자립생활관(최대 2년 장기 거주) 운영',
      '가전제품, 조리기구, 침구류 풀옵션 구비',
      '센터 내 전담 코치가 상주하여 요리, 청소, 공과금 납부, 재정관리 멘토링'
    ],
    eligibility: ['만 18세~24세 자립준비청년'],
    howToApply: {
      channel: '각 시·도별 희망디딤돌센터 또는 자립지원전담기관 문의',
      phone: '1522-3865',
      documents: ['입주신청서', '보호종료확인서']
    },
    tags: ['무료주거', '1인1실', '체험홈', '풀옵션'],
    isEssential: true
  },

  // 3. 일자리·취업
  {
    id: 'k-job-support',
    title: '국민취업지원제도 1유형 (특정계층 우대)',
    subtitle: '구직촉진수당 월 50만 원 x 6개월(총 300만 원) + 1:1 취업 알선',
    category: '일자리·취업',
    targetAudience: '만 18~34세 취업 준비 자립준비청년',
    amountOrBenefit: '구직촉진수당 월 50만 원 x 6개월 (최대 300만 원) + 취업성공수당 최대 150만 원',
    summary: '취업을 준비하는 동안 생계 걱정 없이 구직활동에 전념할 수 있도록 매달 50만 원을 지급하며, 전담 상담사가 1:1로 자소서 첨삭, 면접 코칭, 취업처를 매칭해 줍니다.',
    details: [
      '자립준비청년은 소득·재산 조사 면제 특례 대상(선발형 특정계층)으로 최우선 선정',
      '직업훈련 참여 시 훈련수당 추가 지급',
      '취업 후 6개월 근속 시 50만원, 1년 근속 시 100만원 취업성공수당 추가 지급'
    ],
    eligibility: ['만 18~34세 자립준비청년 중 미취업 구직자'],
    howToApply: {
      channel: '고용24 웹사이트 또는 관할 고용복지+센터 방문',
      websiteUrl: 'https://www.work24.go.kr',
      websiteName: '고용24(work24.go.kr)',
      phone: '고용노동부 상담센터 1350',
      documents: ['보호종료확인서', '취업지원 신청서']
    },
    tags: ['취업수당', '월50만원', '취업매칭', '이력서첨삭', '필수'],
    isEssential: true
  },
  {
    id: 'youth-internship-corporate',
    title: '민간기업 연계 청년인턴십 & 멘토링',
    subtitle: '대기업·공공기관 맞춤형 직무경험 및 멘토링 급여 지원',
    category: '일자리·취업',
    targetAudience: '취업 희망 자립준비청년',
    amountOrBenefit: '실무 인턴십 급여 (월 200만 원 이상) + 우수 수료자 정규직 채용 연계',
    summary: '현대차그룹, 포스코, 카카오 등 주요 기업과 아동권리보장원이 협약하여 자립준비청년을 위한 정규 인턴십, IT 개발/디자인/사무 직무 부트캠프, 1:1 현직자 멘토링을 제공합니다.',
    details: [
      '실무 중심 직무 교육 및 프로젝트 포트폴리오 완성',
      '인턴 기간 동안 주거비 보조금 및 장학금 별도 지원 기업 다수',
      '취업 후 직장 적응 코칭'
    ],
    eligibility: ['자립준비청년(만 18세~34세)'],
    howToApply: {
      channel: '자립정보ON 포털 공지사항 수시 모집 확인',
      websiteUrl: 'https://jaripon.ncrc.or.kr',
      websiteName: '자립정보ON 채용공고',
      phone: '1522-3865',
      documents: ['이력서', '자기소개서', '보호종료확인서']
    },
    tags: ['대기업인턴', '실무경험', '취업연계'],
    isEssential: false
  },

  // 4. 교육·진로
  {
    id: 'national-scholarship',
    title: '대학 국가장학금 1유형 (등록금 전액)',
    subtitle: '대학 재학 중 등록금 전액 지원 + 근로장학생 우선 선발',
    category: '교육·진로',
    targetAudience: '국내 대학(전문대 포함) 재학 중인 자립준비청년',
    amountOrBenefit: '대학 등록금 전액 지원 (학기당 필수 수업료 100%)',
    summary: '대학에 진학한 자립준비청년의 학비 부담을 완전히 덜어주기 위해 한국장학재단에서 등록금 필수 경비 전액을 국가장학금으로 지원합니다.',
    details: [
      '자립준비청년은 성적 기준(C학점 등) 미적용 특례가 적용되어 학업 유지 시 전액 지원',
      '교내외 국가근로장학생 선발 시 1순위 최우선 선발 (시급 약 1만 원 이상)',
      '생활비 대출 무이자 혜택'
    ],
    eligibility: ['대학(전문대 포함) 재학 중인 보호종료 5년 이내 청년'],
    howToApply: {
      channel: '한국장학재단 홈페이지 또는 모바일 앱',
      websiteUrl: 'https://www.kosaf.go.kr',
      websiteName: '한국장학재단',
      phone: '1599-2000',
      documents: ['보호종료확인서', '가족관계증명서']
    },
    tags: ['등록금전액', '한국장학재단', '대학생', '생활비대출무이자', '필수'],
    isEssential: true
  },
  {
    id: 'cert-exam-reimbursement',
    title: '국가자격증 취득 및 어학시험 응시료 지원',
    subtitle: '토익, 컴퓨터활용, 운전면허, 국가기술자격 응시료 실비 전액 환급',
    category: '교육·진로',
    targetAudience: '자기계발 및 취업 역량 강화를 준비하는 청년',
    amountOrBenefit: '연간 최대 50만~100만 원 한도 응시료 실비 환급',
    summary: '취업에 필수적인 운전면허, 컴퓨터 자격증, 토익/토플, 전기/기계/조리 등 국가공인 자격증 시험 응시료를 전액 지원합니다.',
    details: [
      '1인당 연간 2~4회 실비 지원',
      '자격증 합격 시 취득 축하금(10만~30만 원)을 지급하는 지자체 지원사업 연계 가능'
    ],
    eligibility: ['자립준비청년'],
    howToApply: {
      channel: '거주 시·도 자립지원전담기관에 영수증 제출',
      phone: '1522-3865',
      documents: ['응시확인서 또는 결제 영수증', '통장 사본']
    },
    tags: ['운전면허', '토익', '컴활', '응시료환급'],
    isEssential: false
  },

  // 5. 의료·심리
  {
    id: 'mental-health-voucher',
    title: '청년 마음건강지원 바우처',
    subtitle: '1:1 전문 심리상담 3개월(10회) 전액 지원',
    category: '의료·심리',
    targetAudience: '만 19~34세 청년 (자립준비청년 1순위)',
    amountOrBenefit: '회당 6~7만 원 상당 전문 심리상담 10회 지원 (본인부담금 면제 또는 10%)',
    summary: '홀로서기 과정에서 겪는 불안감, 우울감, 진로 스트레스, 대인관계 고민을 전문 심리상담사와 1:1로 안전하게 상담받을 수 있는 정부 지원 바우처입니다.',
    details: [
      '자립준비청년은 소득 기준과 상관없이 1순위 최우선 배정',
      '사전·사후 심리검사(MMPI 등) 무료 제공',
      '전문 1급/2급 상담심리사가 배정된 인근 전문 상담기관을 본인이 직접 선택'
    ],
    eligibility: ['만 19세 이상 자립준비청년 (별도 소득 기준 없음)'],
    howToApply: {
      channel: '거주지 읍·면·동 행정복지센터 방문 신청',
      phone: '129 보건복지상담센터',
      documents: ['신분증', '보호종료확인서']
    },
    tags: ['심리상담', '마음건강', '스트레스해소', '1순위', '필수'],
    isEssential: true
  },
  {
    id: 'medicare-extension',
    title: '의료급여 2종 자격 연장',
    subtitle: '만 24세까지 병원비·약제비 본인부담금 대폭 경감',
    category: '의료·심리',
    targetAudience: '의료급여 수급권자 중 보호종료 청년',
    amountOrBenefit: '외래 진료비 1,000~1,500원, 입원비 본인부담금 10% 수준',
    summary: '보호가 종료되더라도 만 24세까지는 아프거나 다쳤을 때 경제적 부담 없이 진료를 받을 수 있도록 의료급여 2종 자격을 안정적으로 연장해 줍니다.',
    details: [
      '일반 건강보험 대비 병원 진료비 부담 대폭 완화',
      '중증 질환 또는 긴급 입원 시 추가 긴급의료비 지원 연계 가능'
    ],
    eligibility: ['보호종료 전 의료급여 수급 이력이 있는 만 24세 이하 청년'],
    howToApply: {
      channel: '관할 읍·면·동 주민센터 복지팀',
      phone: '국번없이 129',
      documents: ['의료급여 신청서', '신분증']
    },
    tags: ['병원비감면', '의료급여', '만24세까지'],
    isEssential: true
  },
  {
    id: 'case-management-mentoring',
    title: '전담기관 1:1 맞춤형 사례관리 & 멘토링',
    subtitle: '나만의 전담 상담관 배정, 일상 상담부터 위기 지원까지 든든한 동행',
    category: '의료·심리',
    targetAudience: '전국 17개 시·도 자립준비청년 누구나',
    amountOrBenefit: '전담 복지사 1:1 밀착 관리 + 연간 생활보조 물품 및 멘토링 활동비',
    summary: '가족이 없어도 혼자가 아닙니다. 전국 17개 시도에 위치한 자립지원전담기관에서 전담 사례관리사가 배정되어 정기적으로 안부를 묻고, 계약서 작성 동행, 병원 동행, 긴급 구호물품을 제공합니다.',
    details: [
      '주거 계약 시 공인중개사 사무소 동행 서비스',
      '명절 키트 및 생필품 박스 정기 배송',
      '선배 자립청년들과의 자조모임 및 힐링 캠프 참여'
    ],
    eligibility: ['자립준비청년 누구나 무료 참여'],
    howToApply: {
      channel: '관할 시·도 자립지원전담기관 유선 문의',
      phone: '1522-3865',
      documents: ['신청서(기관 제공)']
    },
    tags: ['1:1멘토', '동행서비스', '생필품지원', '마음의울타리', '필수'],
    isEssential: true
  },

  // 6. 긴급·생활
  {
    id: 'emergency-welfare',
    title: '위기 청년 긴급복지 생계·주거비',
    subtitle: '갑작스러운 실직, 질병, 퇴거 위기 시 3일 내 긴급 현금 지급',
    category: '긴급·생활',
    targetAudience: '생계 곤란 위기 자립준비청년',
    amountOrBenefit: '1인 가구 기준 긴급 생계비 월 약 71만 원 + 긴급 의료비 최대 300만 원',
    summary: '실직으로 월세를 내지 못해 퇴거 위기에 놓이거나 큰 병에 걸렸을 때, 신속하게 긴급 생계비와 주거비, 의료비를 먼저 지원하고 사후 조사하는 안전망 제도입니다.',
    details: [
      '신청 접수 후 현장 확인을 통해 72시간 내 신속 지급 원칙',
      '최대 3~6개월간 연장 지원 가능',
      '임시 거처 긴급 주거 연계'
    ],
    eligibility: ['중위소득 75% 이하, 위기 사유(실직, 질병, 퇴거 등) 발생자'],
    howToApply: {
      channel: '보건복지상담센터(129) 전화 또는 시·군·구청 긴급지원팀 방문',
      phone: '129 (24시간 가능)',
      documents: ['위기상황 증빙서류(진단서, 퇴거통보서 등)']
    },
    tags: ['긴급생계비', '위기지원', '129콜센터', '즉시지원'],
    isEssential: false
  },
  {
    id: 'legal-aid-lease',
    title: '대한법률구조공단 무료 법률구조',
    subtitle: '전세 사기, 보증금 미반환, 부당 계약 무료 변호사 소송 대리',
    category: '긴급·생활',
    targetAudience: '법적 분쟁이나 사기 피해를 입은 청년',
    amountOrBenefit: '무료 법률 상담 + 민·형사 소송 변호사 선임비 전액 국비 지원',
    summary: '부동산 전세사기, 보증금 떼임, 명의도용, 불법 대출, 부당해고 등 억울한 일을 당했을 때 국비로 전담 변호사가 소송 대리와 합의를 대행해 주는 제도입니다.',
    details: [
      '자립준비청년은 소득 심사 없이 무료 법률구조 대상',
      '보증금 반환 청구 소송, 내용증명 무료 대리 작성',
      '전국 130여 개 법률구조공단 지부에서 대면 상담'
    ],
    eligibility: ['자립준비청년 확인서 제출자'],
    howToApply: {
      channel: '대한법률구조공단 예약 방문 또는 전화',
      websiteUrl: 'https://www.klac.or.kr',
      websiteName: '대한법률구조공단(klac.or.kr)',
      phone: '국번없이 132',
      documents: ['보호종료확인서', '피해 관련 계약서 및 증빙']
    },
    tags: ['전세사기대응', '무료변호사', '소송대리', '132'],
    isEssential: false
  }
];
