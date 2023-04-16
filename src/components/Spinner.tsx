
export default function Spinner() {

  return (
    <>
      <div className="base-spinner">
        <svg className="spinner" viewBox="0 0 50 50">
            <defs>
                <linearGradient id="linear-gradient" y1="0.5" x2="0.139" y2="0.15" gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="#fbfcfe"/>
                <stop offset="1" stopColor="#dfdfdf"/>
                </linearGradient>
            </defs>
            <circle className="path" cx="25" cy="25" r="20" fill="none" stroke="url(#linear-gradient)" strokeWidth="5"></circle>
        </svg>
      </div>
    </>
  )
}