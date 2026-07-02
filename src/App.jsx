import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import logo from './logo.png'
import helmetIcon from './helmet.png'

// UI tekstid kolmes keeles (et = eesti, en = inglise, ru = vene)
const TR = {
  loginSubtitle: { et: 'Jätkamiseks logi sisse', en: 'Log in to continue', ru: 'Войдите, чтобы продолжить' },
  email: { et: 'E-post', en: 'Email', ru: 'Эл. почта' },
  password: { et: 'Parool', en: 'Password', ru: 'Пароль' },
  alertEmailPassword: { et: 'Sisesta email ja parool', en: 'Enter email and password', ru: 'Введите эл. почту и пароль' },
  alertConfirmEmail: { et: 'Kinnita oma e-post enne sisselogimist', en: 'Confirm your email before logging in', ru: 'Подтвердите эл. почту перед входом' },
  logIn: { et: 'Logi sisse', en: 'Log in', ru: 'Войти' },
  noAccount: { et: 'Pole kontot?', en: 'No account?', ru: 'Нет аккаунта?' },
  register: { et: 'Registreeru', en: 'Sign up', ru: 'Регистрация' },
  companyName: { et: 'Ettevõtte nimi', en: 'Company name', ru: 'Название компании' },
  firstName: { et: 'Eesnimi', en: 'First name', ru: 'Имя' },
  lastName: { et: 'Perekonnanimi', en: 'Last name', ru: 'Фамилия' },
  safetyCard: { et: 'Tööohutuskaart', en: 'Safety card', ru: 'Карта безопасности труда' },
  uploadFile: { et: 'Lae fail üles', en: 'Upload file', ru: 'Загрузить файл' },
  alertSafetyCardRequired: { et: 'Tööohutuskaart on kohustuslik', en: 'Safety card is required', ru: 'Карта безопасности труда обязательна' },
  alertEnterPassword: { et: 'Sisesta parool', en: 'Enter password', ru: 'Введите пароль' },
  alertEnterEmail: { et: 'Sisesta e-post', en: 'Enter email', ru: 'Введите эл. почту' },
  haveAccount: { et: 'Konto juba olemas?', en: 'Already have an account?', ru: 'Уже есть аккаунт?' },
  welcomeNew: { et: 'Tere tulemast!', en: 'Welcome!', ru: 'Добро пожаловать!' },
  welcomeBack: { et: 'Tere tulemast tagasi!', en: 'Welcome back!', ru: 'С возвращением!' },
  startNewCheck: { et: 'Alusta uut ohutuskontrolli', en: 'Start a new safety check', ru: 'Начать новую проверку безопасности' },
  logOut: { et: 'Logi välja', en: 'Log out', ru: 'Выйти' },
  workLocation: { et: 'Tööasukoht', en: 'Work location', ru: 'Место работы' },
  enterAddress: { et: 'Sisesta aadress, kus töötad', en: 'Enter the address where you work', ru: 'Введите адрес места работы' },
  street: { et: 'Tänav', en: 'Street', ru: 'Улица' },
  houseNo: { et: 'Nr', en: 'No.', ru: '№' },
  city: { et: 'Linn', en: 'City', ru: 'Город' },
  postalCode: { et: 'Postikood', en: 'Postal code', ru: 'Индекс' },
  nextRisks: { et: 'Edasi: vali riskid ja meetmed', en: 'Next: select risks and measures', ru: 'Далее: выберите риски и меры' },
  identifyRisks: { et: 'Tuvasta riskid ja ohutusmeetmed', en: 'Identify risks and safety measures', ru: 'Определите риски и меры безопасности' },
  workType: { et: 'Tööliik', en: 'Work type', ru: 'Вид работ' },
  risksLabel: { et: 'Riskid', en: 'Risks', ru: 'Риски' },
  safetyMeasures: { et: 'Ohutusmeetmed', en: 'Safety measures', ru: 'Меры безопасности' },
  measuresLabel: { et: 'Meetmed', en: 'Measures', ru: 'Меры' },
  confirmAware: { et: 'Kinnitan, et olen ohutusmeetmetest teadlik ja järgin neid töö käigus!', en: 'I confirm that I am aware of the safety measures and will follow them during the work!', ru: 'Подтверждаю, что ознакомлен с мерами безопасности и буду соблюдать их во время работы!' },
  alertUserNotFound: { et: 'Kasutajat ei leitud', en: 'User not found', ru: 'Пользователь не найден' },
  confirmMeasures: { et: 'Kinnita ohutusmeetmed →', en: 'Confirm safety measures →', ru: 'Подтвердить меры безопасности →' },
  successRegistered: { et: 'Kasutaja registreeritud', en: 'User registered', ru: 'Пользователь зарегистрирован' },
  successSaved: { et: 'Andmed salvestatud', en: 'Data saved', ru: 'Данные сохранены' },
  successCheckEmail: { et: 'Kontrolli oma e-posti ja kinnita registreerimine enne sisselogimist.', en: 'Check your email and confirm registration before logging in.', ru: 'Проверьте эл. почту и подтвердите регистрацию перед входом.' },
  successSafeWork: { et: 'Turvalist tööd!', en: 'Work safely!', ru: 'Безопасной работы!' },
  logsAll: { et: 'Kõik logid', en: 'All logs', ru: 'Все записи' },
  logsWeek: { et: 'See nädal', en: 'This week', ru: 'Эта неделя' },
  logsMonth: { et: 'See kuu', en: 'This month', ru: 'Этот месяц' },
  logsYear: { et: 'See aasta', en: 'This year', ru: 'Этот год' },
  logsRange: { et: 'Valitud vahemik', en: 'Selected range', ru: 'Выбранный период' },
  tabAll: { et: 'Kõik', en: 'All', ru: 'Все' },
  tabWeek: { et: 'Nädal', en: 'Week', ru: 'Неделя' },
  tabMonth: { et: 'Kuu', en: 'Month', ru: 'Месяц' },
  tabRange: { et: 'Vahemik', en: 'Range', ru: 'Период' },
  start: { et: 'Algus', en: 'Start', ru: 'Начало' },
  end: { et: 'Lõpp', en: 'End', ru: 'Конец' },
  day: { et: 'Päev', en: 'Day', ru: 'День' },
  month: { et: 'Kuu', en: 'Month', ru: 'Месяц' },
  year: { et: 'Aasta', en: 'Year', ru: 'Год' },
  exportCsvEt: { et: 'Ekspordi CSV (eesti)', en: 'Export CSV (Estonian)', ru: 'Экспорт CSV (эст.)' },
  exportCsvEn: { et: 'Ekspordi CSV (inglise)', en: 'Export CSV (English)', ru: 'Экспорт CSV (англ.)' },
  noLogs: { et: 'Logikirjeid veel ei ole', en: 'No log entries yet', ru: 'Записей пока нет' },
  navHome: { et: 'Kodu', en: 'Home', ru: 'Главная' },
  navLogs: { et: 'Logi', en: 'Logs', ru: 'Записи' },
  navAdmin: { et: 'Admin', en: 'Admin', ru: 'Админ' },
  navLanguage: { et: 'Keel', en: 'Language', ru: 'Язык' },
  alertLoginFirst: { et: 'Logi sisse enne', en: 'Log in first', ru: 'Сначала войдите' },
}

// Riskide / meetmete / tööliikide kuvatavad sildid.
// Salvestamisel ja CSV-s kasutatakse alati eestikeelset kanoonilist väärtust,
// siit tuleb ainult ekraanil kuvatav tõlge.
const OPTION_LABELS = {
  // meetmed
  'Turvarakmed': { en: 'Safety harness', ru: 'Страховочная привязь' },
  'YoYo turvakinnitus': { en: 'YoYo fall arrester', ru: 'Блокирующее устройство YoYo' },
  'Kiiver': { en: 'Helmet', ru: 'Каска' },
  'Turvajalatsid': { en: 'Safety shoes', ru: 'Защитная обувь' },
  'Helkurriietus': { en: 'Hi-vis clothing', ru: 'Светоотражающая одежда' },
  'Töökindad': { en: 'Work gloves', ru: 'Рабочие перчатки' },
  'Kaitseprillid': { en: 'Safety glasses', ru: 'Защитные очки' },
  'Varustus kontrollitud ja turvaline': { en: 'Equipment checked and safe', ru: 'Оборудование проверено и безопасно' },
  // tööliigid
  'Tellingu paigaldamine': { en: 'Scaffold assembly', ru: 'Монтаж лесов' },
  'Tellingu demonteerimine': { en: 'Scaffold dismantling', ru: 'Демонтаж лесов' },
  'Ilmakaitse paigaldamine': { en: 'Weather protection assembly', ru: 'Монтаж защиты от непогоды' },
  'Ilmakaitse demonteerimine': { en: 'Weather protection dismantling', ru: 'Демонтаж защиты от непогоды' },
  'Tõstetööd': { en: 'Lifting work', ru: 'Подъёмные работы' },
  // riskid
  'Kukkumis oht': { en: 'Fall hazard', ru: 'Опасность падения' },
  'Libisemis oht': { en: 'Slipping hazard', ru: 'Опасность скольжения' },
  'Platvormi kokkuvarisemise oht': { en: 'Platform collapse hazard', ru: 'Опасность обрушения платформы' },
  'Komistamis oht': { en: 'Tripping hazard', ru: 'Опасность спотыкания' },
  'Tuleoht': { en: 'Fire hazard', ru: 'Опасность пожара' },
  'Tellingu kokkuvarisemise oht': { en: 'Scaffold collapse hazard', ru: 'Опасность обрушения лесов' },
  'Tõstetööde riskid': { en: 'Lifting work risks', ru: 'Риски подъёмных работ' },
  'Elektri oht': { en: 'Electrical hazard', ru: 'Опасность поражения током' },
  'Materjalide käsitsemise riskid': { en: 'Material handling risks', ru: 'Риски обращения с материалами' },
  'Tööriistade kasutamise riskid': { en: 'Tool use risks', ru: 'Риски использования инструментов' },
}

function App() {
  const [profile, setProfile] = useState(null)
  const [screen, setScreen] = useState('language')
  const [loginEmail, setLoginEmail] = useState('')
const [loginPassword, setLoginPassword] = useState('')
  const [successType, setSuccessType] = useState('')
useEffect(() => {
  if (screen === 'home' && successType === 'register') {
    const timer = setTimeout(() => {
      setSuccessType('')
    }, 1000)

    return () => clearTimeout(timer)
  }
}, [screen, successType])


  const [registerPassword, setRegisterPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [language, setLanguage] = useState(null)
  const [logs, setLogs] = useState([])
  const [range, setRange] = useState('all')
const [fromDay, setFromDay] = useState('')
const [fromMonth, setFromMonth] = useState('')
const [fromYear, setFromYear] = useState('')

const [toDay, setToDay] = useState('')
const [toMonth, setToMonth] = useState('')
const [toYear, setToYear] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminView, setAdminView] = useState(false)
  const [street, setStreet] = useState('')
const [houseNumber, setHouseNumber] = useState('')
const [city, setCity] = useState('')
const [postalCode, setPostalCode] = useState('')
const [locationFormKey, setLocationFormKey] = useState(0)
const [workerName, setWorkerName] = useState('')
const [lastName, setLastName] = useState('')
const [companyName, setCompanyName] = useState('')
  const [safetyCardFile, setSafetyCardFile] = useState(null)
  const [safetyConfirmed, setSafetyConfirmed] = useState(false)
const [selectedWorkTypes, setSelectedWorkTypes] = useState([])
const [selectedRisks, setSelectedRisks] = useState([])
const [selectedMeasures, setSelectedMeasures] = useState([])
const [isLoggedIn, setIsLoggedIn] = useState(false)

useEffect(() => {
  const loadProfile = async (user) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single()

    if (!error) {
      setProfile(data)
      setIsAdmin(data.role === 'admin')
    } else {
      setProfile(null)
      setIsAdmin(false)
    }
  }

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

if (session?.user?.email_confirmed_at) {
  setIsLoggedIn(true)
  setScreen('home')
  loadProfile(session.user)
} else {
  setIsLoggedIn(false)
  setProfile(null)
  setScreen('login')
}
  }

  checkSession()


const {
  data: { subscription },
} = supabase.auth.onAuthStateChange((_event, session) => {
  const user = session?.user

  if (!user) {
    setIsLoggedIn(false)
    setIsAdmin(false)
    setProfile(null)
    setScreen('login')
    return
  }

  if (!user.email_confirmed_at) {
    setIsLoggedIn(false)
    setIsAdmin(false)
    setProfile(null)
    setScreen('login')
    return
  }

  setIsLoggedIn(true)
  setScreen('home')
  loadProfile(user)
})

  return () => subscription.unsubscribe()
}, [])
const isWorkLocationValid =
  street.trim() &&
  houseNumber.trim() &&
  city.trim() &&
  postalCode.trim()

const measures = [
  'Turvarakmed',
  'YoYo turvakinnitus',
  'Kiiver',
  'Turvajalatsid',
  'Helkurriietus',
  'Töökindad',
  'Kaitseprillid',
  'Varustus kontrollitud ja turvaline',
]

const workTypes = [
  'Tellingu paigaldamine',
  'Tellingu demonteerimine',
  'Ilmakaitse paigaldamine',
  'Ilmakaitse demonteerimine',
  'Tõstetööd',
]

const risks = [
  'Kukkumis oht',
  'Libisemis oht',
  'Platvormi kokkuvarisemise oht',
  'Komistamis oht',
  'Tuleoht',
  'Tellingu kokkuvarisemise oht',
  'Tõstetööde riskid',
  'Elektri oht',
  'Materjalide käsitsemise riskid',
  'Tööriistade kasutamise riskid',
]

// Aktiivne keel (kui pole valitud, näita eesti keeles)
const lang = language || 'et'
// t('võti') tagastab teksti aktiivses keeles, muidu eesti keeles
const t = (key) => TR[key]?.[lang] ?? TR[key]?.et ?? key
// Riski/meetme/tööliigi kuvatav silt aktiivses keeles (salvestatakse ikka eesti keeles)
const optLabel = (val) => (lang === 'et' ? val : OPTION_LABELS[val]?.[lang] ?? val)

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '16px',
    border: '1px solid #d8dde6',
    fontSize: '16px',
    marginBottom: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  }
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
const titleStyle = {
  margin: 0,
  fontSize: '28px',
  fontWeight: '700',
  color: '#1f2937',
  letterSpacing: '-0.3px',
  textAlign: 'center',
}

const getDateFromRange = () => {
  if (range === 'all') return null

  const now = new Date()
  const date = new Date()

  if (range === 'week') date.setDate(now.getDate() - 7)
  if (range === 'month') date.setMonth(now.getMonth() - 1)
  if (range === 'year') date.setFullYear(now.getFullYear() - 1)

  return date.toISOString()
}

// locale: 'et' = eestikeelne väljavõte, 'en' = ingliskeelne (ametitele esitamiseks)
const exportCSV = (locale = 'et') => {
  if (!logs.length) return

  const en = locale === 'en'

  const headers = en
    ? [
        'Date',
        'Address',
        'Worker',
        'Email',
        'Joined app',
        'Work type',
        'Risks',
        'Measures',
        'Confirmed',
      ]
    : [
        'Kuupäev',
        'Aadress',
        'Töötaja',
        'E-post',
        'Liitunud äpiga',
        'Tööliik',
        'Riskid',
        'Meetmed',
        'Kinnitatud',
      ]

  // Salvestatud väärtus on alati eesti keeles — ingliskeelses väljavõttes tõlgime
  const tr = (val) => (en ? OPTION_LABELS[val]?.en ?? val : val)

  const rows = logs.map((log) => [
    log.dateTime || '',
    log.address || '',
    log.workerName || '',
    log.email || '',
    log.joinedAt || '',
    Array.isArray(log.workTypes) ? log.workTypes.map(tr).join(', ') : '',
    Array.isArray(log.risks) ? log.risks.map(tr).join(', ') : '',
    Array.isArray(log.measures) ? log.measures.map(tr).join(', ') : '',
    en
      ? `Work type, risks and measures confirmed — ${log.dateTime || ''}`
      : `Tööliik, riskid ja meetmed kinnitatud — ${log.dateTime || ''}`,
  ])

  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')
    )
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = en ? 'safety-log.csv' : 'ohutuslogi.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

useEffect(() => {
  const loadLogs = async () => {
  const {
  data: { user },
  error: userError,
} = await supabase.auth.getUser()

console.log('USER:', user)
console.log('USER ERROR:', userError)
if (userError || !user) return

let fromDate = null
let toDate = null

if (range === 'custom') {
  if (fromYear && fromMonth && fromDay) {
    const start = new Date(
      Number(fromYear),
      Number(fromMonth) - 1,
      Number(fromDay),
      0,
      0,
      0,
      0
    )
    fromDate = start.toISOString()
  }

  if (toYear && toMonth && toDay) {
    const end = new Date(
      Number(toYear),
      Number(toMonth) - 1,
      Number(toDay),
      23,
      59,
      59,
      999
    )
    toDate = end.toISOString()
  }
} else {
  fromDate = getDateFromRange()
}

if (
  range === 'custom' &&
  !fromDay &&
  !fromMonth &&
  !fromYear &&
  !toDay &&
  !toMonth &&
  !toYear
) {
  setLogs([])
  return
}

console.log('FROM DATE:', fromDate)
console.log('TO DATE:', toDate)

let query = supabase
  .from('logs')
  .select('*, profiles(email, created_at)')
  .order('created_at', { ascending: false })

if (fromDate) {
  query = query.gte('created_at', fromDate)
}

if (toDate) {
  query = query.lte('created_at', toDate)
}

if (!adminView) {
  query = query.eq('user_id', user.id)
}

const { data, error } = await query
console.log('LOGS DATA:', data)
console.log('LOGS ERROR:', error)
console.log('ADMIN DATA:', data)

if (error) {
  console.log(error.message)
  return
}

const formattedLogs = data.map((log) => ({
  dateTime: new Date(log.created_at).toLocaleString(),
  address: log.address,
  workerName: log.worker_name,
  email: log.profiles?.email || '',
  joinedAt: log.profiles?.created_at
    ? new Date(log.profiles.created_at).toLocaleString()
    : '',
  workTypes: log.work_types || [],
  risks: log.risks || [],
  measures: log.measures || [],
}))

setLogs(formattedLogs)
}
console.log('RANGE:', range)
if (screen === 'logs') {
  loadLogs()
}
}, [screen, adminView, range, fromDay, fromMonth, fromYear, toDay, toMonth, toYear])
useEffect(() => {
  if (screen === 'login') {
    setLoginEmail('')
    setLoginPassword('')
  }
}, [screen])
useEffect(() => {
  if (screen === 'register') {
    setRegisterEmail('')
    setRegisterPassword('')
  }
}, [screen])
useEffect(() => {
  const checkConfirmedAfterReturn = async () => {
    if (screen !== 'success' || successType !== 'register') return

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (!error && user?.email_confirmed_at) {
      setScreen('login')
    }
  }

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      checkConfirmedAfterReturn()
    }
  }

  window.addEventListener('focus', checkConfirmedAfterReturn)
  document.addEventListener('visibilitychange', handleVisibilityChange)

  return () => {
    window.removeEventListener('focus', checkConfirmedAfterReturn)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}, [screen, successType])
// 👆 SIIN LÕPPEB

useEffect(() => {
  if (screen === 'location') {
    setStreet('')
    setHouseNumber('')
    setCity('')
    setPostalCode('')
    setLocationFormKey((prev) => prev + 1)
  }
}, [screen])
  const buttonStyle = {
    width: '100%',
    padding: '18px',
    borderRadius: '18px',
    border: 'none',
    background: 'linear-gradient(135deg, #2f3e0f, #4f6b1b)',
    color: 'white',
    fontSize: '17px',
    fontWeight: '600',
    cursor: 'pointer',
  }

  return (
    
    <div
      style={{
        
position: 'relative',
width: '100%',
height: '100dvh',
overflowY:
  screen === 'risk-measures' ||
  screen === 'logs' ||
  screen === 'register' ||
  screen === 'login' ||
  screen === 'location'
    ? 'auto'
    : 'hidden',
overflowX: 'hidden',
touchAction:
  screen === 'risk-measures' ||
  screen === 'logs' ||
  screen === 'register' ||
  screen === 'login' ||
  screen === 'location'
    ? 'pan-y'
    : 'none',
WebkitOverflowScrolling: 'touch',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: screen === 'language' ? 'center' : 'flex-start',
        alignItems: 'center',
        background: '#f4f6f2',
  padding:
  screen === 'risk-measures'
    ? '100px 24px 140px'
    : screen === 'logs'
    ? '100px 24px 110px'
    : '80px 20px 80px',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
      }}
    >
{isLoggedIn && profile?.full_name && (
<div style={{
  position: 'absolute',
  top: 20,
  right: 20,
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'linear-gradient(145deg, #7ea52a, #58751d)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  zIndex: 999,
  boxShadow: '0 4px 10px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.25)',
  border: '1px solid rgba(255,255,255,0.25)',
}}>
    {profile.full_name.charAt(0).toUpperCase()}
  </div>
)}
      <div
        style={{
          position: 'absolute',
          top: 6,
          left: 6,
          fontSize: '11px',
          fontWeight: 'bold',
          color: '#ffffff',
          background: '#dc2626',
          padding: '2px 6px',
          borderRadius: '6px',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        v15
      </div>
      <div
        style={{
         position: 'absolute',
top: 0,
left: 0,
          width: '100%',
          height: '70px',
          background: '#2f3e0f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        
{screen !== 'login' && screen !== 'success' && (
  <img
    src={helmetIcon}
    alt="icon"
    style={{
      height: '60px',
      objectFit: 'contain',
    }}
  />
)}
      </div>

      {screen === 'language' && (
  <div
    style={{
      display: 'flex',
      gap: '28px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px',
    }}
  >
<button
 onClick={() => {
  setLanguage('et')
  setScreen(isLoggedIn ? 'home' : 'login')
}}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)'
        e.currentTarget.style.boxShadow =
          '0 5px 12px rgba(0,0,0,0.18), inset 0 2px 6px rgba(0,0,0,0.10)'
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow =
          '0 12px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -8px 16px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow =
          '0 12px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -8px 16px rgba(0,0,0,0.08)'
      }}
      onTouchStart={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)'
        e.currentTarget.style.boxShadow =
          '0 5px 12px rgba(0,0,0,0.18), inset 0 2px 6px rgba(0,0,0,0.10)'
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow =
          '0 12px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -8px 16px rgba(0,0,0,0.08)'
      }}
      style={{
        width: '70px',
        height: '70px',
        borderRadius: '18px',
        border: '1px solid rgba(255,255,255,0.65)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow:
          '0 12px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -8px 16px rgba(0,0,0,0.08)',
        transition: 'transform 0.08s ease, box-shadow 0.08s ease',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
     <div
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '33.33%',
    background: '#4891d9',
  }}
/>
<div
  style={{
    position: 'absolute',
    top: '33.33%',
    left: 0,
    width: '100%',
    height: '33.33%',
    background: '#000000',
  }}
/>
<div
  style={{
    position: 'absolute',
    top: '66.66%',
    left: 0,
    width: '100%',
    height: '33.34%',
    background: '#ffffff',
  }}
/>
<div
  style={{
    position: 'absolute',
    top: '4%',
    left: '8%',
    width: '84%',
    height: '38%',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.18))',
    borderRadius: '18px',
    transform: 'rotate(-8deg)',
    zIndex: 2,
    pointerEvents: 'none',
  }}
/>
</button>
<button
onClick={() => {
  setLanguage('ru')
  setScreen(isLoggedIn ? 'home' : 'login')
}}
  onMouseDown={(e) => {
    e.currentTarget.style.transform = 'scale(0.95)'
    e.currentTarget.style.boxShadow =
      '0 5px 12px rgba(0,0,0,0.18), inset 0 2px 6px rgba(0,0,0,0.10)'
  }}
  onMouseUp={(e) => {
    e.currentTarget.style.transform = 'scale(1)'
    e.currentTarget.style.boxShadow =
      '0 12px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -8px 16px rgba(0,0,0,0.08)'
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)'
    e.currentTarget.style.boxShadow =
      '0 12px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -8px 16px rgba(0,0,0,0.08)'
  }}
  onTouchStart={(e) => {
    e.currentTarget.style.transform = 'scale(0.95)'
    e.currentTarget.style.boxShadow =
      '0 5px 12px rgba(0,0,0,0.18), inset 0 2px 6px rgba(0,0,0,0.10)'
  }}
  onTouchEnd={(e) => {
    e.currentTarget.style.transform = 'scale(1)'
    e.currentTarget.style.boxShadow =
      '0 12px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -8px 16px rgba(0,0,0,0.08)'
  }}
  style={{
    width: '70px',
    height: '70px',
    borderRadius: '18px',
    border: '1px solid rgba(255,255,255,0.65)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    background: '#ffffff',
    boxShadow:
      '0 12px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -8px 16px rgba(0,0,0,0.08)',
    transition: 'transform 0.08s ease, box-shadow 0.08s ease',
    WebkitTapHighlightColor: 'transparent',
  }}
>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '33.33%',
          background: '#ffffff',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '33.33%',
          left: 0,
          width: '100%',
          height: '33.33%',
          background: '#2b67c8',
        }}
      />
     <div
  style={{
    position: 'absolute',
    top: '66.66%',
    left: 0,
    width: '100%',
   height: '33.34%',
    background: '#d52b1e',
  }}
/>
      <div
        style={{
          position: 'absolute',
          top: '6%',
          left: '10%',
          width: '80%',
          height: '34%',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.08))',
          borderRadius: '18px',
          transform: 'rotate(-8deg)',
        }}
      />
    </button>

<button
  onClick={() => {
    setLanguage('en')
    setScreen(isLoggedIn ? 'home' : 'login')
  }}
  style={{
    width: '70px',
    height: '70px',
    borderRadius: '18px',
    border: '1px solid rgba(255,255,255,0.65)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    background: '#012169',
    boxShadow:
      '0 12px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -8px 16px rgba(0,0,0,0.08)',
  }}
>
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: '#012169',
    }}
  />

  <div
    style={{
      position: 'absolute',
      width: '140%',
      height: '14%',
      background: '#ffffff',
      transform: 'rotate(45deg)',
      top: '43%',
      left: '-20%',
    }}
  />
  <div
    style={{
      position: 'absolute',
      width: '140%',
      height: '14%',
      background: '#ffffff',
      transform: 'rotate(-45deg)',
      top: '43%',
      left: '-20%',
    }}
  />

  <div
    style={{
      position: 'absolute',
      width: '140%',
      height: '8%',
      background: '#c8102e',
      transform: 'rotate(45deg)',
      top: '46%',
      left: '-20%',
    }}
  />
  <div
    style={{
      position: 'absolute',
      width: '140%',
      height: '8%',
      background: '#c8102e',
      transform: 'rotate(-45deg)',
      top: '46%',
      left: '-20%',
    }}
  />

  <div
    style={{
      position: 'absolute',
      top: '40%',
      left: 0,
      width: '100%',
      height: '20%',
      background: '#ffffff',
    }}
  />
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: '40%',
      width: '20%',
      height: '100%',
      background: '#ffffff',
    }}
  />

  <div
    style={{
      position: 'absolute',
      top: '44%',
      left: 0,
      width: '100%',
      height: '12%',
      background: '#c8102e',
    }}
  />
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: '44%',
      width: '12%',
      height: '100%',
      background: '#c8102e',
    }}
  />

  <div
    style={{
      position: 'absolute',
      top: '6%',
      left: '10%',
      width: '80%',
      height: '34%',
      background:
        'linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05))',
      borderRadius: '18px',
      transform: 'rotate(-8deg)',
    }}
  />
</button>

  </div>
)}

      {screen === 'login' && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '90px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2,
            }}                 
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: '460px',
                height: '230px',
                objectFit: 'contain',
                marginTop: '-20px',
              }}
            />

            <p
              style={{
                margin: '-40px 0 0 0',
                fontSize: '15px',
                color: '#5f6b66',
              }}
            >
              {t('loginSubtitle')}
            </p>
          </div>

          <div
            style={{
              width: '100%',
              maxWidth: '300px',
              position: 'relative',
              top: '240px',
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderRadius: '28px',
              padding: '35px 12px 12px',
              boxShadow: '0 18px 45px rgba(0,0,0,0.12)',
              border: '1px solid rgba(255,255,255,0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <input
  type="email"
  placeholder={t('email')}
  value={loginEmail}
  onChange={(e) => setLoginEmail(e.target.value)}
  name="no-autofill-email"
autoComplete="off"
  style={{
                width: '100%',
                padding: '15px 16px',
                borderRadius: '16px',
                border: '1px solid #d8dde6',
                fontSize: '16px',
                marginBottom: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

           <input
  type="password"
  placeholder={t('password')}
  value={loginPassword}
  onChange={(e) => setLoginPassword(e.target.value)}
  name="no-autofill-password"
autoComplete="new-password"
  style={{
 
                width: '100%',
                padding: '15px 16px',
                borderRadius: '16px',
                border: '1px solid #d8dde6',
                fontSize: '16px',
                marginBottom: '16px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

            <button
onClick={async () => {

  const email = loginEmail.trim()
  const password = loginPassword.trim()

  if (!email || !password) {
    alert(t('alertEmailPassword'))
    return
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    alert(error.message)
    return
  }

  if (!data.user.email_confirmed_at) {
    await supabase.auth.signOut()
    setIsLoggedIn(false)
    setIsAdmin(false)
    setProfile(null)
    setLoginPassword('')
    setScreen('login')
    alert(t('alertConfirmEmail'))
    return
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (profile?.role === 'admin') {
    setIsAdmin(true)
  } else {
    setIsAdmin(false)
  }

  setIsLoggedIn(true)
  setLoginEmail('')
  setLoginPassword('')
  setScreen('home')
}}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '18px',
                border: 'none',
                background: 'linear-gradient(135deg, #2f3e0f, #4f6b1b)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {t('logIn')}
            </button>

            <p
              style={{
                marginTop: '18px',
                fontSize: '13px',
                color: '#6b7280',
              }}
            >
              {t('noAccount')}{' '}
              <span
                onClick={() => setScreen('register')}
                style={{
                  color: '#2f3e0f',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {t('register')}
              </span>
            </p>
          </div>


        </>
      )}

      {screen === 'register' && (
  <>
    <div
      style={{
        position: 'absolute',
        top: '150px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2,
      }}
    >
      <p
        style={{
          margin: '0',
          fontSize: '13px',
          color: '#5f6b66',
        }}
      >
      </p>
    </div>

    <div
      style={{
        width: '100%',
        maxWidth: '300px',
        position: 'relative',
        top: '40px',
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderRadius: '28px',
    padding: '30px 12px 12px',
        boxShadow: '0 18px 45px rgba(0,0,0,0.12)',
        border: '1px solid rgba(255,255,255,0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 style={{ ...titleStyle, marginBottom: '24px' }}>
  {t('register')}
</h2>
<div style={{ width: '100%', marginBottom: '14px' }}>
  <div
    style={{
      fontSize: '12px',
      color: '#6b7280',
      marginBottom: '6px',
      paddingLeft: '4px',
      textAlign: 'left',
    }}
  >
    {t('companyName')}
  </div>

  <input
    type="text"
    value={companyName}
   onChange={(e) => {
  const value =
    e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
  setCompanyName(value)
}}
    style={{ ...inputStyle, marginBottom: 0 }}
  />
</div>

<div style={{ width: '100%', marginBottom: '14px' }}>
  <div
    style={{
      display: 'flex',
      gap: '10px',
      width: '100%',
    }}
  >
    <div style={{ width: '100%' }}>
      <div
        style={{
          fontSize: '12px',
          color: '#6b7280',
          marginBottom: '6px',
          paddingLeft: '4px',
          textAlign: 'left',
        }}
      >
        {t('firstName')}
      </div>
      <input
        type="text"
        value={workerName}
        onChange={(e) => {
  const value =
    e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
  setWorkerName(value)
}}
        style={{ ...inputStyle, marginBottom: 0 }}
      />
    </div>

    <div style={{ width: '100%' }}>
      <div
        style={{
          fontSize: '12px',
          color: '#6b7280',
          marginBottom: '6px',
          paddingLeft: '4px',
          textAlign: 'left',
        }}
      >
        {t('lastName')}
      </div>
      <input
        type="text"
        value={lastName}
        onChange={(e) => {
  const value =
    e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
  setLastName(value)
}}
        style={{ ...inputStyle, marginBottom: 0 }}
      />
    </div>
  </div>
</div>

      <div style={{ width: '100%', marginBottom: '14px' }}>
        <div
          style={{
            fontSize: '12px',
            color: '#6b7280',
            marginBottom: '6px',
            paddingLeft: '4px',
            textAlign: 'left',
          }}
        >
          {t('email')}
        </div>
        <input
  type="email"
  value={registerEmail}
  onChange={(e) => setRegisterEmail(e.target.value)}
  style={{ ...inputStyle, marginBottom: 0 }}
/>
      </div>

      <div style={{ width: '100%', marginBottom: '14px' }}>
        <div
          style={{
            fontSize: '12px',
            color: '#6b7280',
            marginBottom: '6px',
            paddingLeft: '4px',
            textAlign: 'left',
          }}
        >
          {t('password')}
        </div>

<input
  type="text"
  value={registerPassword}
  onChange={(e) => setRegisterPassword(e.target.value)}
  style={{ ...inputStyle, marginBottom: 0 }}
/>
      </div>

      <div style={{ width: '100%', marginBottom: '14px' }}>
        <div
          style={{
            fontSize: '12px',
            color: '#6b7280',
            marginBottom: '6px',
            paddingLeft: '4px',
            textAlign: 'left',
          }}
        >
          {t('safetyCard')}
        </div>

        <label
          style={{
            width: '100%',
            minHeight: '56px',
            borderRadius: '16px',
            border: '2px dashed #cfd8d3',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxSizing: 'border-box',
          }}
        >
          <span style={{ fontSize: '18px' }}>☁️</span>
          <span
            style={{
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            {safetyCardFile ? safetyCardFile.name : t('uploadFile')}
          </span>

<input
  type="file"
  style={{ display: 'none' }}
  onChange={(e) => setSafetyCardFile(e.target.files[0] || null)}
/>
        </label>
      </div>

      <button
   onClick={async () => {
  if (!safetyCardFile) {
    
    alert(t('alertSafetyCardRequired'))
    return
  }
  if (!registerPassword) {
    alert(t('alertEnterPassword'))
    return
  }


 const email = registerEmail.trim()

  if (!email) {
    alert(t('alertEnterEmail'))
    return
  }

const { data, error } = await supabase.auth.signUp({
  email,
  password: registerPassword,
  options: {
    data: {
      full_name: `${workerName} ${lastName}`.trim(),
      company_name: companyName,
      role: 'user',
    },
  },
})

if (error) {
  alert(error.message)
  return
}

setCompanyName('')
setWorkerName('')
setLastName('')
setRegisterEmail('')
setRegisterPassword('')
setSafetyCardFile(null)
setSuccessType('register')
setScreen('success')
}}
        style={{
          width: '100%',
          padding: '15px',
          borderRadius: '16px',
          border: 'none',
          background: 'linear-gradient(135deg, #2f3e0f, #4f6b1b)',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        {t('register')}
      </button>

      <p
        style={{
          marginTop: '18px',
          fontSize: '13px',
          color: '#6b7280',
        }}
      >
        {t('haveAccount')}{' '}
        <span
          onClick={() => setScreen('login')}
          style={{
            color: '#2f3e0f',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          {t('logIn')}
        </span>
      </p>
    </div>
  </>
)}

      {screen === 'home' && (
        <>
          <div
            style={{
              width: '100%',
              maxWidth: '320px',
              marginTop: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '60px',
            }}
          >
<h2 style={titleStyle}>
  {successType === 'register'
    ? t('welcomeNew')
    : t('welcomeBack')}
</h2>

     <button
  onClick={() => {
  setStreet('')
  setHouseNumber('')
  setCity('')
  setPostalCode('')
  setScreen('location')
}}
onTouchStart={(e) => {
  e.currentTarget.style.transform = 'scale(0.97)'
  e.currentTarget.style.boxShadow = '0 6px 14px rgba(79,107,27,0.22)'
}}
onTouchEnd={(e) => {
  e.currentTarget.style.transform = 'scale(1)'
  e.currentTarget.style.boxShadow = '0 10px 25px rgba(79,107,27,0.35)'
}}
  style={{
  width: '100%',
  padding: '20px',
  borderRadius: '20px',
  border: 'none',
  background: 'linear-gradient(135deg, #6f8f2f, #8faa3a)',
  fontSize: '19px',
  fontWeight: '600',
  color: '#ffffff',
  cursor: 'pointer',
  boxShadow: '0 10px 25px rgba(79,107,27,0.35)',
  transition: 'transform 0.1s ease',
}}
>
  {t('startNewCheck')}
</button>

<button
onClick={async () => {
  await supabase.auth.signOut()
  setIsLoggedIn(false)
  setProfile(null)
  setScreen('language')
}}
  onTouchStart={(e) => {
  e.currentTarget.style.transform = 'scale(0.97)'
  e.currentTarget.style.boxShadow = '0 3px 8px rgba(220,38,38,0.18)'
}}
onTouchEnd={(e) => {
  e.currentTarget.style.transform = 'scale(1)'
  e.currentTarget.style.boxShadow = '0 6px 16px rgba(220,38,38,0.12)'
}}
  style={{
    width: '100%',
    padding: '20px',
    borderRadius: '20px',
    border:'none',
    background: '#fef2f2',
    fontSize: '19px',
    fontWeight: '600',
    color: '#dc2626',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 6px 16px rgba(220,38,38,0.12)',
  }}
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#dc2626"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
    <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
  </svg>

  {t('logOut')}
</button>
          </div>

       
        </>
      )}

      {screen === 'location' && (
        <>
          <div
  key={locationFormKey}
  style={{
              width: '100%',
              maxWidth: '320px',
              marginTop: '70px',
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderRadius: '28px',
              padding: '28px 16px 20px',
              boxShadow: '0 18px 45px rgba(0,0,0,0.12)',
              border: '1px solid rgba(255,255,255,0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
   <h2 style={titleStyle}>
  {t('workLocation')}
</h2>

            <p
             style={{
  marginTop: '10px',
  marginBottom: '30px',
  fontSize: '15px',
  color: '#6b7280',
  textAlign: 'center',
}}
            >
              {t('enterAddress')}
            </p>

           <div style={{ width: '100%', marginBottom: '14px' }}>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
    
    {/* Tänav */}
    <div style={{ width: '75%' }}>
<div
  style={{
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '6px',
    paddingLeft: '4px',
    textAlign: 'left',
  }}
>
  {t('street')}
</div>

 <input
  type="text"
  value={street}
 name="street"
autoComplete="off"

  onChange={(e) => {
    let value = e.target.value

    const digits = value.replace(/\D/g, '')

    if (digits && value !== '') {
      setHouseNumber((prev) => prev + digits)
    }

    value = value.replace(/[0-9]/g, '').trim()
    value = value.charAt(0).toUpperCase() + value.slice(1)

    if (!value) {
      setHouseNumber('')
    }

    setStreet(value)
  }}
  style={{ ...inputStyle, marginBottom: 0, paddingLeft: '12px' }}
/>
    </div>

    {/* Maja nr */}
    <div style={{ width: '25%' }}>
<div
  style={{
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '6px',
    display: 'flex',
    justifyContent: 'flex-start',
  }}
>
  {t('houseNo')}
</div>

     <input
  type="text"
  value={houseNumber}
  onChange={(e) => {
    // lubab ainult numbreid
    const value = e.target.value.replace(/[^0-9]/g, '')
    setHouseNumber(value)
  }}
  style={{ ...inputStyle, marginBottom: 0 }}
/>
    </div>

  </div>
</div>

            <div style={{ width: '100%', marginBottom: '14px' }}>
              <div
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '6px',
                  paddingLeft: '4px',
                  textAlign: 'left',
                }}
              >
                {t('city')}
              </div>
 <input
  type="text"
  value={city}
  onChange={(e) => {
    const value =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    setCity(value)
  }}
  style={{ ...inputStyle, marginBottom: 0 }}
/>
<div
  style={{
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
    width: '100%',
  }}
>
  <button
    onClick={() => setCity('Helsinki')}
    style={{
      padding: '8px 12px',
      borderRadius: '999px',
      border: '1px solid #e5e7eb',
      background: 'rgba(255,255,255,0.85)',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
    }}
  >
    Helsinki
  </button>

  <button
    onClick={() => setCity('Vantaa')}
    style={{
      padding: '8px 12px',
      borderRadius: '999px',
      border: '1px solid #e5e7eb',
      background: 'rgba(255,255,255,0.85)',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
    }}
  >
    Vantaa
  </button>

  <button
    onClick={() => setCity('Espoo')}
    style={{
      padding: '8px 12px',
      borderRadius: '999px',
      border: '1px solid #e5e7eb',
      background: 'rgba(255,255,255,0.85)',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
    }}
  >
    Espoo
  </button>
</div>
            </div>

            <div style={{ width: '100%', marginBottom: '18px' }}>
              <div
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '6px',
                  paddingLeft: '4px',
                  textAlign: 'left',
                }}
              >
                {t('postalCode')}
              </div>
             <input
  type="text"
  value={postalCode}
  onChange={(e) => setPostalCode(e.target.value)}
  style={{ ...inputStyle, marginBottom: 0 }}
/>
            </div>

          <button
  onClick={() => setScreen('risk-measures')}
  disabled={!isWorkLocationValid}
  style={{
    ...buttonStyle,
    opacity: isWorkLocationValid ? 1 : 0.5,
    cursor: isWorkLocationValid ? 'pointer' : 'not-allowed',
  }}
>
  {t('nextRisks')}
</button>
          </div>
        </>
      )}
      {screen === 'risk-measures' && (
<div
  style={{
    width: '100%',
    maxWidth: '320px',
    marginTop: '-30px',
    paddingTop: '40px',
    height: 'calc(100dvh - 110px)',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  }}
>
  <h2 style={{ ...titleStyle, marginTop: '0', marginBottom: '30px' }}>
    {t('identifyRisks')}
  </h2>

  <div
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      paddingBottom: '20px',
    }}
  >
      <div
  style={{
    background: '#ffffff',
    padding: '16px',
    borderRadius: '18px',
  }}
>
 <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  }}
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9.5 12.5l1.5 1.5 3.5-4" />
  </svg>

  <p
    style={{
      margin: 0,
      fontWeight: '700',
      fontSize: '18px',
      color: '#1f2937',
    }}
  >
    {t('workType')}
  </p>
</div>

  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    }}
  >
    
   {workTypes.map((type) => (
  <button
    key={type}
    onClick={() => {
      if (selectedWorkTypes.includes(type)) {
        setSelectedWorkTypes(selectedWorkTypes.filter((t) => t !== type))
      } else {
        setSelectedWorkTypes([...selectedWorkTypes, type])
      }
    }}
style={{
  padding: '16px 20px',
  borderRadius: '999px',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  appearance: 'none',
  WebkitAppearance: 'none',
  WebkitTapHighlightColor: 'transparent',
  userSelect: 'none',
  background: selectedWorkTypes.includes(type) ? '#2f6fed' : '#f3f4f6',
  color: selectedWorkTypes.includes(type) ? '#ffffff' : '#374151',
  fontSize: '16px',
  cursor: 'pointer',
}}
  >
    {optLabel(type)}
  </button>
))}
      
     

  </div>
</div>
      

    <div
  style={{
    background: '#ffffff',
    padding: '16px',
    borderRadius: '18px',
  }}
>
 <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  }}
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f97316"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86l-7.4 12.8A2 2 0 0 0 4.6 20h14.8a2 2 0 0 0 1.71-3.34l-7.4-12.8a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>

  <p
    style={{
      margin: 0,
      fontWeight: '700',
      fontSize: '18px',
      color: '#1f2937',
    }}
  >
    {t('risksLabel')}
  </p>
</div>
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    }}
  >
{risks.map((risk) => (
  <button
    key={risk}
    onClick={() => {
      if (selectedRisks.includes(risk)) {
        setSelectedRisks(selectedRisks.filter((r) => r !== risk))
      } else {
        setSelectedRisks([...selectedRisks, risk])
      }
    }}
    style={{
      padding: '16px 20px',
      borderRadius: '999px',
      border: 'none',
      background: selectedRisks.includes(risk) ? '#f97316' : '#f3f4f6',
      color: selectedRisks.includes(risk) ? '#ffffff' : '#374151',
      fontSize: '16px',
      cursor: 'pointer',
    }}
  >
    {optLabel(risk)}
  </button>
))}
  </div>
</div>

      <div
  style={{
    background: '#ffffff',
    padding: '16px',
    borderRadius: '18px',
  }}
>
  <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  }}
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#16a34a"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9.5 12.5l1.5 1.5 3.5-4" />
  </svg>

  <p
    style={{
      margin: 0,
      fontWeight: '700',
      fontSize: '18px',
      color: '#1f2937',
    }}
  >
    {t('safetyMeasures')}
  </p>
</div>

  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
     
    }}
  >
  {measures.map((measure) => (
  <button
    key={measure}
    onClick={() => {
      if (selectedMeasures.includes(measure)) {
        setSelectedMeasures(selectedMeasures.filter((m) => m !== measure))
      } else {
        setSelectedMeasures([...selectedMeasures, measure])
      }
    }}
    style={{
      padding: '16px 20px',
      borderRadius: '999px',
      border: 'none',
      background: selectedMeasures.includes(measure) ? '#16a34a' : '#f3f4f6',
      color: selectedMeasures.includes(measure) ? '#ffffff' : '#374151',
      fontSize: '16px',
      cursor: 'pointer',
    }}
  >
    {optLabel(measure)}
  </button>
))}
  </div>
</div>

      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '18px' }}>
        <label style={{ fontSize: '16px' }}>
          <input
            type="checkbox"
            checked={safetyConfirmed}
            onChange={(e) => setSafetyConfirmed(e.target.checked)}
          />{' '}
          {t('confirmAware')}
        </label>
      </div>

     <button
onClick={async () => {
  if (!safetyConfirmed) return

const {
  data: { session },
} = await supabase.auth.getSession()

const user = session?.user
console.log('USER:', user)

if (!user) {
  alert(t('alertUserNotFound'))
  return
}

const { data: profile, error: profileError } = await supabase
  .from('profiles')
  .select('full_name')
  .eq('id', user.id)
  .single()

if (profileError) {
  alert(profileError.message)
  return
}

const { error } = await supabase.from('logs').insert({
  user_id: user.id,
  address: `${street} ${houseNumber}, ${city}, ${postalCode}`,
  worker_name: profile?.full_name || '',
  work_types: selectedWorkTypes,
  risks: selectedRisks,
  measures: selectedMeasures,
})

if (error) {
  alert(error.message)
  return
}
setSelectedWorkTypes([])
setSelectedRisks([])
setSelectedMeasures([])
setSafetyConfirmed(false)
setSuccessType('log')
setScreen('success')
}}

  onTouchStart={(e) => {
    if (!safetyConfirmed) return
    e.currentTarget.style.transform = 'scale(0.97)'
    e.currentTarget.style.boxShadow = '0 6px 14px rgba(234,88,12,0.22)'
  }}
  onTouchEnd={(e) => {
    if (!safetyConfirmed) return
    e.currentTarget.style.transform = 'scale(1)'
    e.currentTarget.style.boxShadow = '0 10px 24px rgba(234,88,12,0.30)'
  }}
  style={{
    width: '100%',
    padding: '24px',
    borderRadius: '22px',
    border: 'none',
    background: safetyConfirmed
      ? 'linear-gradient(135deg, #ea580c, #fb923c)'
      : '#9ca3af',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '600',
    cursor: safetyConfirmed ? 'pointer' : 'not-allowed',
    boxShadow: safetyConfirmed
      ? '0 10px 24px rgba(234,88,12,0.30)'
      : 'none',
    transition: 'transform 0.1s ease, box-shadow 0.1s ease',
  }}
>
  {t('confirmMeasures')}
</button>
    </div>
  </div>
)}
{screen === 'success' && (
  <>
    <div
      style={{
        marginTop: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '16px',
      }}
    >
     

<h2
  style={{
    fontSize: '26px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  }}
>
  {successType === 'register'
    ? t('successRegistered')
    : t('successSaved')}
</h2>

      <p
        style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: 0,
        }}
      >
  {successType === 'register'
  ? t('successCheckEmail')
  : t('successSafeWork')}
      </p>

      <img
        src={logo}
        alt="logo"
        style={{
         width: '460px',
height: '230px',
objectFit: 'contain',
marginTop: '10px',
        }}
      />
    </div>
  </>
)}


          
{screen === 'logs' && (
  <>
    <div
      style={{
        marginTop: '30px',
        width: '100%',
        maxWidth: '340px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
<h2
  style={{
    margin: '0 0 8px 0',
    fontSize: '22px',
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  }}
>
 {range === 'all'
  ? t('logsAll')
  : range === 'week'
  ? t('logsWeek')
  : range === 'month'
  ? t('logsMonth')
  : range === 'year'
  ? t('logsYear')
  : t('logsRange')}
</h2>

      <div
        style={{
          display: 'flex',
          gap: 6,
          marginBottom: 12,
          background: '#e5e7eb',
          borderRadius: 12,
          padding: 4,
        }}
      >
     {[
  { key: 'all', label: t('tabAll') },
  { key: 'week', label: t('tabWeek') },
  { key: 'month', label: t('tabMonth') },
  { key: 'custom', label: t('tabRange') },
].map((r) => (
          <button
            key={r.key}
            onClick={() => {
  setRange(r.key)

if (r.key === 'custom') {
  setFromDay('')
  setFromMonth('')
  setFromYear('')
  setToDay('')
  setToMonth('')
  setToYear('')
  setLogs([])
}
  if (r.key === 'custom') {
    setCustomFrom('')
    setCustomTo('')
    setLogs([])
  }
}}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 10,
              border: 'none',
              background: range === r.key ? '#ffffff' : 'transparent',
              color: '#111827',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            {r.label}
          </button>
        ))}
      </div>
  {range === 'custom' && (
  <div
    style={{
      width: '100%',
      marginBottom: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}
  >
    <div style={{ width: '100%' }}>
      <div
        style={{
          fontSize: '12px',
          marginBottom: '6px',
          color: '#6b7280',
        }}
      >
        {t('start')}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '8px',
          width: '100%',
        }}
      >
        <select
          value={fromDay}
          onChange={(e) => setFromDay(e.target.value)}
          style={{
            ...inputStyle,
            marginBottom: 0,
            background: '#fff',
            padding: '14px 12px',
          }}
        >
          <option value="">{t('day')}</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <select
          value={fromMonth}
          onChange={(e) => setFromMonth(e.target.value)}
          style={{
            ...inputStyle,
            marginBottom: 0,
            background: '#fff',
            padding: '14px 12px',
          }}
        >
          <option value="">{t('month')}</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={fromYear}
          onChange={(e) => setFromYear(e.target.value)}
          style={{
            ...inputStyle,
            marginBottom: 0,
            background: '#fff',
            padding: '14px 12px',
          }}
        >
          <option value="">{t('year')}</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div style={{ width: '100%' }}>
      <div
        style={{
          fontSize: '12px',
          marginBottom: '6px',
          color: '#6b7280',
        }}
      >
        {t('end')}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '8px',
          width: '100%',
        }}
      >
        <select
          value={toDay}
          onChange={(e) => setToDay(e.target.value)}
          style={{
            ...inputStyle,
            marginBottom: 0,
            background: '#fff',
            padding: '14px 12px',
          }}
        >
          <option value="">{t('day')}</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <select
          value={toMonth}
          onChange={(e) => setToMonth(e.target.value)}
          style={{
            ...inputStyle,
            marginBottom: 0,
            background: '#fff',
            padding: '14px 12px',
          }}
        >
          <option value="">{t('month')}</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={toYear}
          onChange={(e) => setToYear(e.target.value)}
          style={{
            ...inputStyle,
            marginBottom: 0,
            background: '#fff',
            padding: '14px 12px',
          }}
        >
          <option value="">{t('year')}</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
  )}


    {adminView && (
  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
    <button
      onClick={() => exportCSV('et')}
      style={{
        flex: 1,
        padding: '12px',
        borderRadius: '12px',
        border: 'none',
        background: '#111827',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
      }}
    >
      {t('exportCsvEt')}
    </button>
    <button
      onClick={() => exportCSV('en')}
      style={{
        flex: 1,
        padding: '12px',
        borderRadius: '12px',
        border: '1px solid #111827',
        background: '#ffffff',
        color: '#111827',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
      }}
    >
      {t('exportCsvEn')}
    </button>
  </div>
)}

      {logs.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            padding: '18px',
            color: '#6b7280',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          {t('noLogs')}
        </div>
      ) : (
        logs.map((log, index) => (
          <div
            key={index}
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '18px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ fontSize: '15px', fontWeight: '600' }}>
              {log.dateTime}
            </div>

            <div style={{ fontSize: '14px', fontWeight: '600' }}>
              {log.address}
            </div>

            <div style={{ fontSize: '14px', fontWeight: '600' }}>
              {log.workerName || '—'}
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>{t('workType')}</div>
              <div>{log.workTypes.map(optLabel).join(', ')}</div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>{t('risksLabel')}</div>
              <div>{log.risks.map(optLabel).join(', ')}</div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>{t('measuresLabel')}</div>
              <div>{log.measures.map(optLabel).join(', ')}</div>
            </div>
          </div>
        ))
      )}
    </div>
  </>
)}

      
     {screen !== 'language' && (
        <div
         style={{
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  height: '70px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f5f5f5',
  borderTop: '1px solid rgba(0,0,0,0.06)',
  zIndex: 999,
}}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              padding: '0 24px',
              boxSizing: 'border-box',
            }}
          >
           <button
onClick={() => {
  if (!isLoggedIn) {
    alert(t('alertLoginFirst'))
    return
  }

  if (screen === 'login' || screen === 'register' || screen === 'language') return
  setScreen('home')
}}
  style={{
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
   color:
  screen === 'login' || screen === 'register' || screen === 'language'
    ? '#d1d5db'
    : screen === 'home'
    ? '#111111'
    : '#9ca3af',
cursor: isLoggedIn ? 'pointer' : 'not-allowed',
opacity: isLoggedIn ? 1 : 0.5,
    gap: '4px',
    width: '72px',
    padding: '0',
  }}
>
 <svg
  width="26"
  height="26"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#4b5563"
  strokeWidth="1.6"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M3 10.5L12 3l9 7.5" />
  <path d="M5 9.5V20h14V9.5" />
</svg>
  <span
    style={{
      fontSize: '11px',
      lineHeight: '11px',
      width: '100%',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    }}
  >
    {t('navHome')}
  </span>
</button>
<button
onClick={() => {
  if (!isLoggedIn) {
    alert(t('alertLoginFirst'))
    return
  }

  if (screen === 'login' || screen === 'register' || screen === 'language') return
  setAdminView(false)
  setScreen('logs')
}}
  style={{
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: screen === 'logs' ? '#111111' : '#9ca3af',
    cursor: isLoggedIn ? 'pointer' : 'not-allowed',
opacity: isLoggedIn ? 1 : 0.5,
    gap: '4px',
    width: '72px',
    padding: '0',
  }}
>
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#4b5563"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 6h13" />
    <path d="M8 12h13" />
    <path d="M8 18h13" />
    <path d="M3 6h.01" />
    <path d="M3 12h.01" />
    <path d="M3 18h.01" />
  </svg>

  <span
    style={{
      fontSize: '11px',
      lineHeight: '11px',
      width: '100%',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    }}
  >
    {t('navLogs')}
  </span>
</button>
{isAdmin && (
  <button
onClick={() => {
  if (!isLoggedIn) {
    alert(t('alertLoginFirst'))
    return
  }

  if (screen === 'login' || screen === 'register' || screen === 'language') return
  setAdminView(true)
  setScreen('logs')
}}


    style={{
      background: 'none',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: screen === 'admin-logs' ? '#111111' : '#9ca3af',
      cursor: isLoggedIn ? 'pointer' : 'not-allowed',
opacity: isLoggedIn ? 1 : 0.5,
      gap: '4px',
      width: '72px',
      padding: '0',
    }}
  >
   <svg
  width="26"
  height="26"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#4b5563"
  strokeWidth="1.6"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
  <path d="M9.5 12l1.5 1.5 3.5-3.5" />
</svg>

<span
  style={{
    fontSize: '11px',
    lineHeight: '11px',
    width: '100%',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  }}
>
  {t('navAdmin')}
</span>
  </button>
)}

    <button
  onClick={() => setScreen('language')}
  style={{
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: screen === 'language' ? '#111111' : '#9ca3af',
    cursor: 'pointer',
    gap: '4px',
    width: '72px',
    padding: '0',
  }}
>
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#4b5563"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18" />
    <path d="M12 3a15 15 0 0 0 0 18" />
  </svg>

  <span
    style={{
      fontSize: '11px',
      lineHeight: '11px',
      width: '100%',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    }}
  >
    {t('navLanguage')}
  </span>
</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
