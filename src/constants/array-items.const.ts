export const menuItems = [
  { name: 'Главная', scrollTo: '.main' },
  { name: 'Направления', scrollTo: '.about' },
  { name: 'Абонементы', scrollTo: '.abonements' },
  { name: 'Расписание', scrollTo: '.shedule' },
  { name: 'Контакты', scrollTo: '.contacts' },
]

export const panelItems = [
  { name: 'Профиль', link: '', disabled: true },
  { name: 'Заявки', link: '/admin/notify', disabled: false },
  { name: 'Настройки', link: '', disabled: true },
]

export const directionItems = [
  {
    title: 'Брейк-данс',
    ageCategory: '7+',
    desc: `Уличный танец, сформировавшийся в Нью-Йорке в 60-х годах. Это одно из
      самых популярных и зрелищных направлений, включающее сложные физические элементы,
      насчитывающий богатую историю развития и совершенствования. Кроме того, брейкинг
      набирает особую популярность в настоящее время и обладает большой перспективой
      развития, в 2024 году эта дисциплина включена в Олимпийскую программу.`,
  },
  {
    title: 'Хип-хоп (choreo)',
    ageCategory: '7+ (Идет набор групп)',
    desc: `Cпособ передачи стиля Хип-хоп с упором на перфоманс, широко используется
      для шоу, постановок в клипах, концертах, рекламе и на TV. В этом направлении внимание
      акцентировано на точности, выразительности, музыкальности. Choreo может сочетать в
      себе и смежные с хип-хопом стили.`,
  },
  {
    title: 'Дэнс-холл',
    ageCategory: '14+ (Идет набор групп)',
    desc: `Понятие Dancehall гораздо шире, чем кажется на первый взгляд. Это не просто
      танец под музыку, он наполнен смыслом, он имеет свою историю, его необходимо хорошо
      узнать и почувствовать, чтобы понять. Это целая культура, зародившаяся в гетто Кингстона,
      столицы Ямайки. Дэнсхолл включает в себя множество социальных танцев и, обязательно,
      attitude (подача, характер).`,
  },
  {
    title: 'Вог',
    ageCategory: '14+ (Идет набор групп)',
    desc: `Стиль танца, базирующийся на модельных позах и подиумной походке. Отличительные
      особенности: быстрая техника движения руками, вычурная манерная походка, падения,
      вращения, обильное количество позировок, эмоциональная игра. Исполняется Vogue под музыку
      в стиле House.`,
  },
  {
    title: 'High Heels',
    ageCategory: '14+ (Идет набор групп)',
    desc: `Это танцевальное направление известно во всем мире, идея исполнить популярные
      движения,встав на каблуки, пришла известному американскому хореографу Энди Джею
      (Andy J.). Постановщик проектов на MTV первым выложил в сеть ролики с танцем в стиле
      хип-хоп, изюминкой которого стала обувь на шпильке.`,
  },
]

export const abonementItems = [
  {
    id: 1, name: 'Абонемент на 12 занятий', price: 3000, total: 3000, counter: 1,
  },
  {
    id: 2, name: 'Абонемент на 8 занятий', price: 2400, total: 2400, counter: 1,
  },
  {
    id: 3, name: 'Абонемент на 4 занятия', price: 1400, total: 1400, counter: 1,
  },
  {
    id: 4, name: 'Разовое посещение', price: 400, total: 400, counter: 1,
  },
  {
    id: 5, name: 'Индивидуальные тренировки', price: 800, total: 800, counter: 1,
  },
]

export const trainerItems = [
  {
    name: 'Джан',
    photo: 'diamond.jpg',
    directions: 'Брейк-данс',
    desc: `Дипломированный тренер, организовывал тренировки для
      атлетов #adidasrunners по направлению "Breakletics", сооснователь проектов
      и коллабораций совместно с #redbullrussia и другими известными брендами.`,
  },
  {
    name: 'Михаил',
    photo: 'boogieknight.jpg',
    directions: 'Брейк-данс',
    desc: `Человек , который в теме много лет, любит танцевать и обучать этому других.
      Совершентсвует свои профессиональные навыки, участвуя в различных соревнованиях
      и фестивалях. Имеет опыт как групповой, так и индивидуальной работы с детьми`,
  },
]

export const sheduleTable = {
  headers: [
    { text: '', value: 'name' },
    { text: 'Понедельник', value: 'mon', align: 'center' },
    { text: 'Вторник', value: 'tue', align: 'center' },
    { text: 'Среда', value: 'wed', align: 'center' },
    { text: 'Четверг', value: 'thu', align: 'center' },
    { text: 'Пятница', value: 'fri', align: 'center' },
  ],
  days: [
    {
      name: '19:00',
      mon: null,
      tue: null,
      wed: null,
      thu: null,
      fri: null,
    },
    {
      name: '20:00',
      mon: 'Брейк-данс',
      tue: null,
      wed: 'Брейк-данс',
      thu: null,
      fri: 'Брейк-данс',
    },
    {
      name: '21:00',
      mon: '',
      tue: null,
      wed: null,
      thu: null,
      fri: null,
    },
  ],
}
