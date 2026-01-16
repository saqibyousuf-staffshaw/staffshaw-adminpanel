export const RedirectIcon = ({ width = "40", height = "41", className, fill = "black", stroke = "white" }) => (
    <svg width={width} height={height} className={className} viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20.5" r="20" fill={fill} />
        <path d="M14.045 27.0009L26.773 14.273M26.773 14.273V23.8189M26.773 14.273H17.227" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

)
export const RedirectArrowIcon = ({width="16",
        height="16", className}) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3.42829 12.5714L12.5711 3.42857M12.5711 3.42857L12.5712 10.2857M12.5711 3.42857L5.71401 3.42857"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
export const Dot = ({ width = "8", height = "9", className }) => (
    <svg width={width} height={height} className={className} viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.469727" width="8" height="8" rx="4" fill="currentColor" />
    </svg>

)
export const ArrowLeft = ({ width = "30", height = "60", className }) => (
    <svg width={width} height={height} className={className} viewBox="0 0 39 71" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M37.3656 65.4497C37.6617 65.7459 37.8966 66.0975 38.0569 66.4844C38.2172 66.8714 38.2997 67.2861 38.2997 67.7049C38.2997 68.1237 38.2172 68.5384 38.0569 68.9254C37.8966 69.3123 37.6617 69.6639 37.3656 69.9601C37.0694 70.2562 36.7178 70.4911 36.3309 70.6514C35.944 70.8117 35.5292 70.8942 35.1104 70.8942C34.6916 70.8942 34.2769 70.8117 33.8899 70.6514C33.503 70.4911 33.1514 70.2562 32.8553 69.9601L0.98026 38.0851C0.683898 37.789 0.448793 37.4375 0.288384 37.0505C0.127976 36.6636 0.0454102 36.2488 0.0454102 35.8299C0.0454102 35.411 0.127976 34.9962 0.288384 34.6093C0.448793 34.2223 0.683898 33.8708 0.98026 33.5747L32.8553 1.69974C33.4534 1.10164 34.2646 0.765625 35.1104 0.765625C35.9563 0.765625 36.7675 1.10164 37.3656 1.69974C37.9637 2.29785 38.2997 3.10905 38.2997 3.9549C38.2997 4.80074 37.9637 5.61195 37.3656 6.21005L7.74174 35.8299L37.3656 65.4497Z" fill="currentColor" fillOpacity="1" />
    </svg>

)
export const ArrowLeft2 = ({ width = "15", height = "26", className }) => (
    <svg width={width} height={height} className={className} viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.75 1.75L1.5 13L12.75 24.25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)


export const ArrowRight = ({ width = "30", height = "60", className }) => (
    <svg width={width} height={height} className={className} style={{ transform: 'rotate(180deg)' }} viewBox="0 0 39 71" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.47476 65.1197C1.1786 65.4158 0.943687 65.7674 0.783413 66.1543C0.623135 66.5413 0.540638 66.956 0.540638 67.3748C0.540638 67.7936 0.623135 68.2084 0.783413 68.5953C0.943687 68.9822 1.1786 69.3338 1.47476 69.63C1.77091 69.9261 2.12249 70.161 2.50943 70.3213C2.89637 70.4816 3.31109 70.5641 3.72992 70.5641C4.14874 70.5641 4.56346 70.4816 4.9504 70.3213C5.33734 70.161 5.68892 69.9261 5.98507 69.63L37.8601 37.755C38.1564 37.4589 38.3915 37.1074 38.5519 36.7204C38.7124 36.3335 38.7949 35.9187 38.7949 35.4998C38.7949 35.0809 38.7124 34.6661 38.5519 34.2792C38.3915 33.8922 38.1564 33.5407 37.8601 33.2447L5.98507 1.36966C5.38697 0.771558 4.57576 0.435547 3.72992 0.435547C2.88407 0.435547 2.07286 0.771558 1.47476 1.36966C0.876652 1.96777 0.540638 2.77897 0.540638 3.62482C0.540638 4.47067 0.876652 5.28187 1.47476 5.87997L31.0986 35.4998L1.47476 65.1197Z" fill="currentColor" fillOpacity="1" />
    </svg>

)
export const ArrowRight2 = ({ width = "15", height = "26", className }) => (
    <svg width={width} height={height} className={className} viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.25 1.75L13.5 13L2.25 24.25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
export const ArrowDown = ({ width = "32.11", height = "58.11", className }) => (
    <svg width={width} height={height} className={className} style={{ transform: 'rotate(90deg)' }} viewBox="0 0 60 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.38866 1.36426C5.14007 1.11567 4.84494 0.918472 4.52014 0.783936C4.19534 0.649395 3.84721 0.580147 3.49565 0.580147C3.14408 0.580147 2.79596 0.649395 2.47116 0.783936C2.14635 0.918472 1.85123 1.11567 1.60263 1.36426C1.35404 1.61285 1.15685 1.90798 1.02231 2.23278C0.887772 2.55759 0.81852 2.90571 0.81852 3.25728C0.81852 3.60884 0.887772 3.95696 1.02231 4.28177C1.15685 4.60657 1.35404 4.9017 1.60263 5.15029L28.359 31.9067C28.6075 32.1554 28.9026 32.3528 29.2274 32.4874C29.5522 32.6221 29.9004 32.6914 30.252 32.6914C30.6037 32.6914 30.9518 32.6221 31.2766 32.4874C31.6015 32.3528 31.8966 32.1554 32.1451 31.9067L58.9014 5.15029C59.4035 4.64823 59.6855 3.96729 59.6855 3.25728C59.6855 2.54726 59.4035 1.86632 58.9014 1.36426C58.3994 0.862202 57.7184 0.580147 57.0084 0.580147C56.2984 0.580147 55.6175 0.862202 55.1154 1.36426L30.252 26.231L5.38866 1.36426Z" fill="currentColor" fillOpacity="1" />
    </svg>
)
export const CirclePlus = ({ width = "18", height = "19", className }) => (
    <svg width={width} height={height} className={className} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.5" width="18" height="18" rx="9" fill="currentColor" />
        <rect x="8" y="5.5" width="2" height="8" fill="#0A0A0A" />
        <rect x="13" y="8.5" width="2" height="8" transform="rotate(90 13 8.5)" fill="#0A0A0A" />
    </svg>

)
export const MinusIcon = ({ width = "16", height = "3" }) => (
    <svg width={width} height={height} viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="0.970703" width="2" height="16" transform="rotate(90 16 0.970703)" fill="currentColor" />
    </svg>
)
export const PlusIcon = ({ width = "16", height = "17" }) => (
    <svg width={width} height={height} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="0.166016" width="2" height="16" fill="currentColor" />
        <rect x="16" y="7.16602" width="2" height="16" transform="rotate(90 16 7.16602)" fill="currentColor" />
    </svg>
)
export const SwiftIcon = ({ width = "28", height = "35", className }) => (
    <svg width={width} height={height} className={className} viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.07 11.8456H8.54L2.485 5.97648L5.81 2.5409L11.55 8.51738V0H16.52V8.51738L22.26 2.5409L25.585 5.97648L19.53 11.8098H28V16.6411H19.495L25.55 22.6176L22.225 25.9816L14 17.5716L5.775 26.0174L2.45 22.6176L8.505 16.6411H0V11.8456H0.07ZM11.585 23.5481H16.555V35H11.585V23.5481Z" fill="currentColor" />
    </svg>

)

export const ScrollUpIcon = ({ width = "130", height = "130", className }) => (
    <svg width={width} height={height} className={className} viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="65" cy="65" r="63.75" stroke="white" strokeWidth="2.5" />
        <path d="M65.0001 97.9336V32.9336M65.0001 32.9336L89.2667 57.3086M65.0001 32.9336L40.7334 57.3086" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
export const BurgerIcon = ({ height = "1em", width = "1em", className }) => (
    <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" className={className} height={height} width={width} xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor"></path></svg>
)
export const LayoutIcon = ({ className }) => (
    <svg stroke="currentColor" className={className} fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
)
export const JobsIcon = ({ className }) => (
    <svg stroke="currentColor" fill="currentColor" className={className} strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5z"></path></svg>
)