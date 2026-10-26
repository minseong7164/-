export interface RegionalCenter {
  region: string;
  regionShort: string;
  settlementFund: string;
  numericFund: number; // in 만원
  disbursementPlan: string;
  centerName: string;
  phone: string;
  address: string;
  website?: string;
  specialBenefits: string[];
  keyAdvice: string;
}

export const REGIONAL_CENTERS_DATA: RegionalCenter[] = [
  {
    region: '서울특별시',
    regionShort: '서울',
    settlementFund: '2,000만 원',
    numericFund: 2000,
    disbursementPlan: '일시금 또는 5년 분할 지급 선택',
    centerName: '서울특별시 자립지원전담기관',
    phone: '02-766-3865',
    address: '서울특별시 중구 통일로 26 한일빌딩 3층',
    website: 'https://seoul.ncrc.or.kr',
    specialBenefits: [
      '청년 대중교통비 지원 (연 최대 10만 원)',
      '서울형 청년자립두배통장 가입 연계',
      '전담 변호사 및 공인중개사 부동산 계약 동행',
      '서울주택도시공사(SH) 맞춤형 임대주택 우선공급'
    ],
    keyAdvice: '전국 최대 수준인 2,000만 원 지원! 부동산 계약 전 반드시 전담기관의 계약 동행 서비스를 신청하세요.'
  },
  {
    region: '경기도',
    regionShort: '경기',
    settlementFund: '1,500만 원',
    numericFund: 1500,
    disbursementPlan: '1차 1,000만 원 일시 + 2차 500만 원(사례관리 이수 후)',
    centerName: '경기도 자립지원전담기관',
    phone: '031-248-3865',
    address: '경기도 수원시 팔달구 매산로 115 경기도사회서비스원 내',
    website: 'https://gg.ncrc.or.kr',
    specialBenefits: [
      '경기 자립두배통장 (월 10만원 저축 시 경기도가 20만원 지원, 총 1,080만원 수령)',
      '자립준비청년 멘토-멘티 마음이음 결연사업',
      '도내 청년기본소득 연 100만 원 추가 수령 가능'
    ],
    keyAdvice: '자립두배통장과 연계하면 2년 후 1,000만 원 이상의 추가 자산을 형성할 수 있습니다.'
  },
  {
    region: '부산광역시',
    regionShort: '부산',
    settlementFund: '1,500만 원',
    numericFund: 1500,
    disbursementPlan: '일시금 지급',
    centerName: '부산광역시 자립지원전담기관',
    phone: '051-441-3865',
    address: '부산광역시 동구 중앙대로 319 부산일보사 6층',
    specialBenefits: [
      '부산형 자립체험홈(단독 원룸형) 무료 거주 연계',
      '부산청년 일자리 매칭 및 취업 성공 축하금 50만 원',
      '치과/안과 비급여 의료비 최대 100만 원 지원'
    ],
    keyAdvice: '부산 내 지정 거점 체험홈을 통해 1년간 안전하게 독립 생활을 훈련할 수 있습니다.'
  },
  {
    region: '인천광역시',
    regionShort: '인천',
    settlementFund: '1,500만 원',
    numericFund: 1500,
    disbursementPlan: '1차 1,000만 원 + 2차 500만 원 분할',
    centerName: '인천광역시 자립지원전담기관',
    phone: '032-873-3865',
    address: '인천광역시 미추홀구 석정로 229 제물포스마트타운 10층',
    specialBenefits: [
      '인천 청년 주거비 지원 (월 10만 원 추가)',
      '인천e음 지역화폐 캐시백 우대',
      '운전면허 취득비용 전액 실비 지원'
    ],
    keyAdvice: '인천e음 지역화폐와 청년 주거비 지원을 합산하면 고정 생활비를 크게 절감할 수 있습니다.'
  },
  {
    region: '대전광역시',
    regionShort: '대전',
    settlementFund: '1,500만 원',
    numericFund: 1500,
    disbursementPlan: '일시금 지급',
    centerName: '대전광역시 자립지원전담기관',
    phone: '042-254-3865',
    address: '대전광역시 중구 중앙로 101 옛 충남도청 본관 2층',
    specialBenefits: [
      '대전 청년내일희망카드 (취업준비금 월 50만 원 x 6개월)',
      '대전형 임대주택 청년우대 쿼터',
      '청년마인드링크 정신건강 케어 1:1 진료비 전액'
    ],
    keyAdvice: '청년내일희망카드와 국가 취업수당을 전략적으로 연계해 자격증 준비 기간을 확보하세요.'
  },
  {
    region: '대구광역시',
    regionShort: '대구',
    settlementFund: '1,200만 원',
    numericFund: 1200,
    disbursementPlan: '일시금 지급',
    centerName: '대구광역시 자립지원전담기관',
    phone: '053-421-3865',
    address: '대구광역시 중구 봉산문화길 92 대구사회복지회관 4층',
    specialBenefits: [
      '대구청년 희망적금 연계',
      '청년 자립정착 멘토링 결연',
      '대구 행복주택 자립청년 우선 배정'
    ],
    keyAdvice: '대구 행복주택 청약 일정을 미리 전담기관에 알리면 서류 준비를 1:1로 지원받을 수 있습니다.'
  },
  {
    region: '광주광역시',
    regionShort: '광주',
    settlementFund: '1,500만 원',
    numericFund: 1500,
    disbursementPlan: '1차 1,000만 원 + 2차 500만 원 분할',
    centerName: '광주광역시 자립지원전담기관',
    phone: '062-383-3865',
    address: '광주광역시 서구 시청로 26 광주빛고을복지타운 2층',
    specialBenefits: [
      '빛고을자립정착금 우대 지원',
      '광주청년 드림수당 연계',
      '광주도시공사 맞춤형 청년전세임대 지원'
    ],
    keyAdvice: '광주청년 드림수당 신청 시 자립준비청년 가산점이 부여됩니다.'
  },
  {
    region: '울산광역시',
    regionShort: '울산',
    settlementFund: '1,200만 원',
    numericFund: 1200,
    disbursementPlan: '일시금 지급',
    centerName: '울산광역시 자립지원전담기관',
    phone: '052-258-3865',
    address: '울산광역시 중구 번영로 470 울산복지타운 3층',
    specialBenefits: [
      '울산청년 자립지원관 긴급숙소 운영',
      '조선·에너지 대기업 청년기술인턴십 우대',
      '생필품 패키지 연 2회 지원'
    ],
    keyAdvice: '지역 특화 기술훈련원 및 현대중공업 등 협력사 직업훈련 연계가 활발합니다.'
  },
  {
    region: '세종특별자치시',
    regionShort: '세종',
    settlementFund: '1,500만 원',
    numericFund: 1500,
    disbursementPlan: '일시금 지급',
    centerName: '세종특별자치시 자립지원전담기관',
    phone: '044-862-3865',
    address: '세종특별자치시 조치원읍 군청로 93',
    specialBenefits: [
      '세종시 청년임대주택 1순위 추천',
      '공공기관 인턴십 기회 우선 제공',
      '문화예술활동 바우처 연 30만 원'
    ],
    keyAdvice: '세종시 내 공공행정 인턴십 기회를 통해 공공부문 경력을 쌓을 수 있습니다.'
  },
  {
    region: '충청남도',
    regionShort: '충남',
    settlementFund: '1,200만 원',
    numericFund: 1200,
    disbursementPlan: '일시금 지급',
    centerName: '충청남도 자립지원전담기관',
    phone: '041-338-3865',
    address: '충청남도 예산군 예산읍 예산리 충남보건복지재단 내',
    specialBenefits: [
      '도내 기업 취업 시 정착지원금 연 200만 원 추가',
      '농업/스마트팜 창업 교육비 100% 지원',
      '청년 농촌주택 우선 임대'
    ],
    keyAdvice: '도내 산업단지 취업 시 지자체 추가 정착장려금이 더해집니다.'
  },
  {
    region: '충청북도',
    regionShort: '충북',
    settlementFund: '1,200만 원',
    numericFund: 1200,
    disbursementPlan: '일시금 지급',
    centerName: '충청북도 자립지원전담기관',
    phone: '043-234-3865',
    address: '충청북도 청주시 흥덕구 공단로 134 세종빌딩 4층',
    specialBenefits: [
      '충북행복결혼공제 연계',
      '청주 오송 바이오 헬스케어 인턴십',
      '긴급 병원비 본인부담금 전액 지원'
    ],
    keyAdvice: '오송 생명과학단지 내 직무 연수 프로그램 신청을 추천합니다.'
  },
  {
    region: '전라남도',
    regionShort: '전남',
    settlementFund: '1,200만 원',
    numericFund: 1200,
    disbursementPlan: '일시금 지급',
    centerName: '전라남도 자립지원전담기관',
    phone: '061-287-3865',
    address: '전라남도 무안군 삼향읍 후광대로 242 전남사회서비스원 3층',
    specialBenefits: [
      '전남청년 문화복지카드 연 25만 원',
      '청년 농어민 공익수당 지원',
      '도서벽지 이동 교통비 바우처'
    ],
    keyAdvice: '문화복지카드와 교통비 바우처를 신청해 문화생활 및 통학 비용을 지원받으세요.'
  },
  {
    region: '전북특별자치도',
    regionShort: '전북',
    settlementFund: '1,200만 원',
    numericFund: 1200,
    disbursementPlan: '일시금 지급',
    centerName: '전북특별자치도 자립지원전담기관',
    phone: '063-282-3865',
    address: '전북특별자치도 전주시 덕진구 백제대로 706 국민연금빌딩 8층',
    specialBenefits: [
      '전북 청년생생통장 (저축액 1:1 매칭)',
      '청년 면접정장 무료 대여 서비스',
      '치과 임플란트 및 보철 치료비 지원'
    ],
    keyAdvice: '청년생생통장은 신청 마감이 빠르므로 상반기 모집 공고를 수시로 확인하세요.'
  },
  {
    region: '경상남도',
    regionShort: '경남',
    settlementFund: '1,200만 원',
    numericFund: 1200,
    disbursementPlan: '일시금 지급',
    centerName: '경상남도 자립지원전담기관',
    phone: '055-263-3865',
    address: '경상남도 창원시 의창구 원이대로 362 창원컨벤션센터 내',
    specialBenefits: [
      '경남 희망디딤돌센터(진주, 창원) 거주 우대',
      '조선·기계 제조업 청년 채용장려금 연계',
      '운전면허 및 중장비 자격증 취득비 지원'
    ],
    keyAdvice: '창원 및 진주 희망디딤돌센터를 이용하면 무상으로 쾌적한 1인실 주거가 가능합니다.'
  },
  {
    region: '경상북도',
    regionShort: '경북',
    settlementFund: '1,200만 원',
    numericFund: 1200,
    disbursementPlan: '일시금 지급',
    centerName: '경상북도 자립지원전담기관',
    phone: '054-853-3865',
    address: '경상북도 안동시 풍천면 검무로 229 경북여성가족플라자 2층',
    specialBenefits: [
      '경북 청년행복주택 임대보증금 무이자 융자 (최대 5,000만원)',
      '청년 일자리 매칭 및 기숙사비 지원',
      '응급 구호키트 제공'
    ],
    keyAdvice: '경북 청년행복주택 무이자 융자로 보증금 부담 없이 자립할 수 있습니다.'
  },
  {
    region: '강원특별자치도',
    regionShort: '강원',
    settlementFund: '1,200만 원',
    numericFund: 1200,
    disbursementPlan: '일시금 지급',
    centerName: '강원특별자치도 자립지원전담기관',
    phone: '033-255-3865',
    address: '강원특별자치도 춘천시 외솔길 25 강원도사회서비스원 내',
    specialBenefits: [
      '강원형 청년일자리 근속장려금 (최대 300만원)',
      '청년 디딤돌 임대주택 공급',
      '심리치유 숲체험 힐링캠프'
    ],
    keyAdvice: '도내 취업 시 6개월, 1년마다 지급되는 근속장려금을 꼭 챙기세요.'
  },
  {
    region: '제주특별자치도',
    regionShort: '제주',
    settlementFund: '1,500만 원',
    numericFund: 1500,
    disbursementPlan: '일시금 지급',
    centerName: '제주특별자치도 자립지원전담기관',
    phone: '064-753-3865',
    address: '제주특별자치도 제주시 청사로 59 제주사회복지타운 3층',
    specialBenefits: [
      '도외 진학 및 취업 면접용 항공료 연 6회 실비 지원',
      '제주개발공사(JPDC) 삼다수 장학금 및 매입임대 우선권',
      '운전면허 취득 비용 전액 지원'
    ],
    keyAdvice: '내륙 면접이나 시험 응시 시 항공료 지원 바우처를 사전에 신청하세요.'
  }
];

export const EMERGENCY_HOTLINES = [
  {
    name: '자립지원 대표 콜센터',
    number: '1522-3865',
    hours: '평일 09:00 ~ 18:00',
    description: '자립수당, 정착금, 주거, 취업 등 자립준비청년 전용 원스톱 상담'
  },
  {
    name: '보건복지상담센터',
    number: '국번없이 129',
    hours: '365일 24시간 연중무휴',
    description: '긴급 생계비, 위기 지원, 복지제도 종합 안내'
  },
  {
    name: '청소년·청년 위기전화',
    number: '국번없이 1388',
    hours: '24시간 운영',
    description: '심리적 위기, 우울감, 자살예방 긴급 심리상담'
  },
  {
    name: '대한법률구조공단',
    number: '국번없이 132',
    hours: '평일 09:00 ~ 18:00',
    description: '전세 사기, 보증금 미반환, 임대차 분쟁 무료 법률상담'
  },
  {
    name: 'LH 마이홈 주거상담',
    number: '1600-1004',
    hours: '평일 09:00 ~ 18:00',
    description: '청년 전세임대, 매입임대, 행복주택 신청 자격 및 공고 상담'
  }
];
